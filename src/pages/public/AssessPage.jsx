import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../utils/api';
import { Logo } from '../../components/Layout';
import { Btn, Spinner, Alert, Card, FormField, Input } from '../../components/UI';
import { leaderQuestions40 } from '../../data/leaderQuestions40';
import { managerQuestions } from '../../data/managerQuestions';
import { peerQuestions } from '../../data/peerQuestions';

export default function AssessPage() {
  const { token } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [assessorInfo, setAssessorInfo] = useState({ firstName: '', lastName: '', email: '' });
  const [identityConfirmed, setIdentityConfirmed] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [introStep, setIntroStep] = useState(1); // 1=compass, 2=leader, 3=intro, 4=questions

  useEffect(() => {
    api.getAssessment(token)
      .then(setData)
      .catch(e => {
        const msg = e.message || '';
        if (msg.includes('već popunjen') || msg.includes('completed')) {
          setError('This assessment has already been completed.');
        } else if (msg.includes('istekao') || msg.includes('pronađen') || msg.includes('404')) {
          setError('This link is invalid or has expired.');
        } else {
          setError(msg);
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  // Derive question set here (before early returns) so useMemo is always called
  const assessmentType = data?.assessmentType || data?.type || 'self';
  const subjectFirstName = (data?.employeeName || '').split(' ')[0] || '[Name]';
  const needsIdentity = data?.requiresIdentity === true ||
    (data?.requiresIdentity === undefined && ['external'].includes(assessmentType));

  const rawLang = data?.language || data?.lang || 'en';
  const lang = rawLang === 'en' ? 'eng' : rawLang;
  const questionBank =
    assessmentType === 'manager' ? managerQuestions :
    ['peer', 'directreport', 'direct_report', 'external', 'other'].includes(assessmentType) ? peerQuestions :
    leaderQuestions40;
  const langQuestions = questionBank[lang] || questionBank['eng'];
  const questions = langQuestions ? Object.values(langQuestions).flat() : [];

  // Shuffle once when questions load — must be before any early returns
  const shuffledQuestions = useMemo(() => {
    if (questions.length === 0) return questions;
    const arr = [...questions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [questions.length]); // eslint-disable-line

  const totalAnswered = Object.keys(answers).length;
  const allAnswered = totalAnswered === questions.length;

  function pillarDim(pillar) {
    const p = (pillar || '').toUpperCase().trim();
    if (p.includes('CILJEVI') || p.includes('PROMEN') || p.includes('SHORT-TERM') || p.includes('LONG-TERM')) return 'rezultati';
    if (p.includes('PREMA') || p.includes('TOWARDS')) return 'mindset';
    if (p.includes('EFIKASNOST') || p.includes('KOMUNIKACIJA') || p.includes('RAZVOJ TIMA') || p.includes('EFFICIENCY') || p.includes('COMMUNICATION') || p.includes('PEOPLE DEVELOPMENT')) return 'vestine';
    return 'uticaj';
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const questionsPayload = questions.map(q => ({
        id: q.id,
        pillar: q.pillar,
        dimension: q.dimension || pillarDim(q.pillar),
        type: q.type,
      }));

      let processedAnswers = answers;
      if (assessmentType === 'self') {
        const REFLECTION_MAP = { 1: -2, 3: 0, 5: 1 };
        const qMap = {};
        questions.forEach(q => { qMap[q.id] = q; });
        processedAnswers = {};
        Object.entries(answers).forEach(([qId, score]) => {
          const q = qMap[qId];
          processedAnswers[qId] = (q?.type === 'reflection' && REFLECTION_MAP[score] !== undefined)
            ? REFLECTION_MAP[score]
            : score;
        });
      }

      const payload = { answers: processedAnswers, questions: questionsPayload };
      if (needsIdentity) payload.assessorInfo = assessorInfo;
      await api.submitAssessment(token, payload);
      setSubmitted(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  // ── Early returns (after all hooks) ──────────────────────────────────────

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', background: 'var(--canvas)' }}>
      <Spinner size={32} />
      <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>Loading your assessment…</p>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--canvas)' }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔗</div>
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '12px' }}>Link Issue</h2>
        <Alert type="error">{error}</Alert>
      </div>
    </div>
  );

  if (submitted) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--canvas)' }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '12px' }}>Thank You!</h2>
        <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          Your assessment has been submitted successfully. Your honest feedback contributes to meaningful leadership development.
        </p>
      </div>
    </div>
  );

  // Identity step
  if (needsIdentity && !identityConfirmed) {
    function handleIdentitySubmit(e) {
      e.preventDefault();
      setIdentityConfirmed(true);
    }
    return (
      <div style={{ minHeight: '100vh', background: 'var(--canvas)' }}>
        <header style={{
          background: 'var(--ink)', padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <Logo light size="sm" />
          {data?.employeeName && (
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
              Assessment for <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{data.employeeName}</strong>
            </div>
          )}
        </header>
        <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 24px' }}>
          <Card style={{ padding: '36px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '8px' }}>Before you begin</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '28px' }}>
              Please enter your details. This information will be recorded alongside your assessment responses.
            </p>
            <form onSubmit={handleIdentitySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <FormField label="First Name" required>
                  <Input
                    value={assessorInfo.firstName}
                    onChange={e => setAssessorInfo(i => ({ ...i, firstName: e.target.value }))}
                    placeholder="First name"
                    required
                    autoFocus
                  />
                </FormField>
                <FormField label="Last Name" required>
                  <Input
                    value={assessorInfo.lastName}
                    onChange={e => setAssessorInfo(i => ({ ...i, lastName: e.target.value }))}
                    placeholder="Last name"
                    required
                  />
                </FormField>
              </div>
              <FormField label="Email address" required>
                <Input
                  type="email"
                  value={assessorInfo.email}
                  onChange={e => setAssessorInfo(i => ({ ...i, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                />
              </FormField>
              <Btn type="submit" style={{ marginTop: '8px', justifyContent: 'center' }}>
                Continue to Assessment →
              </Btn>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // ── Intro pages ──────────────────────────────────────────────────────────

  const introPages = [
    {
      key: 'compass',
      title: 'HB Compass — Know Where You Stand. Know Where to Grow.',
      subtitle: null,
      body: (
        <>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '20px' }}>
            Most professionals have a genuine but incomplete picture of themselves. You know your strengths — at least the ones you are aware of. You know the areas you find challenging. But the gap between how you see yourself and how your work actually lands with others, how your thinking shapes your decisions, how your presence influences the people around you — that gap is where the most valuable development insight lives. The HB Compass self-assessment is designed to close that gap.
          </p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '24px' }}>
            HB Compass is a professional development framework built on a simple but powerful idea: what makes someone genuinely excellent at their work is not one thing — it is four interconnected things, working together. Most development tools focus on skills or results. HB Compass goes further, assessing the full picture of what drives professional effectiveness — because sustainable excellence is never just about what you can do. It is equally about how you think, who you are in your relationships, and the impact you have on the people and environment around you.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
            {[
              { label: 'Mindset — The Foundation', desc: 'How you think shapes everything else. Your beliefs about your own capacity to grow, your resilience when things get difficult, your openness to feedback, your sense of ownership over your work — these are not personality traits you are stuck with. They are patterns that can be understood, developed, and deliberately changed. The Mindset dimension helps you see clearly what is driving your behaviour, so you can build from your strengths and address the patterns that are holding you back.' },
              { label: 'Skills — The Toolkit', desc: 'Skills are the practical capabilities you bring to your role — how you manage your time and priorities, how you communicate, how you solve problems, how you develop the people around you. The Skills dimension assesses not just whether you have a capability, but how reliably and sophisticatedly you apply it in the real complexity of your work.' },
              { label: 'Results — The Measure', desc: 'Results are the outcomes you create — in the short term through effective execution and goal achievement, and in the long term through strategic thinking, innovation, and building capability that outlasts any individual project. The Results dimension connects your day-to-day work to the larger contribution you make and helps you see where your impact is strongest and where it could be greater.' },
              { label: 'Influence — The Multiplier', desc: 'How you affect the people around you determines whether your professional contribution stays with you or multiplies through others. The Influence dimension examines how you make people feel, whether you inspire trust and belonging, and whether you are able to move others toward action — not through authority, but through genuine connection and credibility.' },
            ].map(({ label, desc }) => (
              <div key={label} style={{ borderLeft: '3px solid var(--canvas-warm)', paddingLeft: '16px' }}>
                <p style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--ink)' }}>{label}</p>
                <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, fontSize: '0.88rem' }}>{desc}</p>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, fontSize: '0.88rem', marginBottom: '16px' }}>
            Each of these dimensions is further divided into pillars and detailed facets, with precisely defined proficiency levels, allowing you to clearly see where you stand and where you can go.
          </p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, fontSize: '0.88rem' }}>
            Understanding where you currently are is the most practical thing you can do for your professional development. Not where you hope you are, or where you think you should be — where you actually are, honestly assessed against a clear description of what excellent looks like in your specific role. When you know that, development stops being vague. You have a starting point.
          </p>
        </>
      ),
    },
    {
      key: 'leader',
      title: 'The Leader Others Choose to Follow',
      subtitle: 'HB Compass — Inspiring Leadership Profile',
      body: (
        <>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '16px' }}>
            There is a difference between holding a leadership position and actually leading. Most people who manage teams, run projects, or carry responsibility for others' performance understand this instinctively — because they have experienced both kinds of leader themselves. They have worked for someone who made them want to give their best, and they have worked for someone who made them want to leave. The difference between those two experiences is not seniority, intelligence, or technical expertise. It is leadership.
          </p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '20px' }}>
            The Inspiring Leadership profile describes what genuinely effective leadership looks like today — not as an abstract ideal, but as a set of observable, developable capabilities that real leaders at every level can understand, assess, and grow.
          </p>
          <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px', color: 'var(--ink)' }}>What Does an Inspiring Leader Look Like?</p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '20px', fontSize: '0.9rem' }}>
            The Inspiring Leadership profile is built on a clear and honest view of what leadership demands in today's organisations. An inspiring leader does four things simultaneously — and the combination of all four is what makes the difference between someone who occupies a leadership role and someone who genuinely leads.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
            {[
              {
                title: 'They Deliver Results — and Build the Capacity for Future Results',
                text: 'An inspiring leader gets things done. They set clear, ambitious goals that their team understands and commits to. They make good decisions under pressure. They manage performance with both honesty and care — holding people to high standards while investing in their development. But they do not stop at short-term delivery. They think strategically about where their team and organisation need to go. They build capability in the people around them so that results are sustainable — not dependent on their own constant presence and effort.',
              },
              {
                title: 'They Lead From the Right Mindset',
                text: 'How a leader thinks shapes everything their team experiences. An inspiring leader brings a growth mindset to their role — they believe that capability is developed through effort and learning, not fixed by talent or circumstance. They are self-aware — genuinely so, not performatively. They understand their own strengths and the edges of those strengths. They seek feedback and use it. They own their decisions and their outcomes without deflecting blame onto circumstances or other people.',
              },
              {
                title: 'They Have the Skills That Leadership Actually Requires',
                text: 'Technical expertise gets people into leadership roles. What keeps them effective is a different set of capabilities entirely. An inspiring leader manages their time and priorities with real sophistication — not just staying busy, but consistently focusing on what matters most. They communicate in ways that connect with different audiences and drive genuine understanding rather than mere compliance. They delegate with intention — creating ownership. They have difficult conversations without damaging the relationship. They develop people deliberately.',
              },
              {
                title: 'They Create an Environment Others Want to Be Part Of',
                text: 'The final dimension of inspiring leadership is perhaps the least tangible — and the most powerful. It is the experience a leader creates for the people around them. An inspiring leader makes their team feel genuinely valued — not through generic praise, but through authentic presence, real empathy, and inclusion that ensures every voice contributes to outcomes. They build trust through consistency — doing what they say, saying what they mean. And they move people to action through vision that makes the work meaningful.',
              },
            ].map(({ title, text }) => (
              <div key={title} style={{ borderLeft: '3px solid var(--canvas-warm)', paddingLeft: '16px' }}>
                <p style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px', color: 'var(--ink)' }}>{title}</p>
                <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, fontSize: '0.88rem' }}>{text}</p>
              </div>
            ))}
          </div>
          <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px', color: 'var(--ink)' }}>The Five Levels of Leadership Development</p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '16px', fontSize: '0.88rem' }}>
            The Inspiring Leadership profile does not describe leadership as something you either have or do not have. It describes a developmental journey — one that every leader is somewhere on, and one that never truly ends. Across every capability in the profile, development is described at five levels:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {[
              { name: 'Emerging', text: 'You are building foundational understanding and beginning to develop this capability. Your approach may be inconsistent, and you benefit from guidance and structured support.' },
              { name: 'Developing', text: 'You are growing in this area and demonstrating the capability in straightforward situations. You are building confidence and consistency, though complex situations may still stretch you.' },
              { name: 'Proficient', text: 'You demonstrate this capability reliably and effectively across most situations. This is a genuine strength you can build on and that others can depend on.' },
              { name: 'Advanced', text: 'You demonstrate sophisticated, nuanced capability that goes beyond effective performance. You anticipate complexity, adapt skilfully, and help others develop in this area.' },
              { name: 'Expert', text: 'You demonstrate masterful, distinctive capability that shapes how others think about and practice this aspect of leadership. You are a recognised resource and a model for others.' },
            ].map(({ name, text }) => (
              <div key={name} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)', minWidth: 72 }}>{name}</span>
                <p style={{ color: 'var(--ink-soft)', lineHeight: 1.65, fontSize: '0.85rem' }}>{text}</p>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, fontSize: '0.85rem' }}>
            Most leaders will find themselves at different levels across different capabilities — and that variation is exactly what makes the self-assessment useful. It shows you not just where you are strong, but where the most valuable development focus lies for you specifically.
          </p>
        </>
      ),
    },
    {
      key: 'intro',
      title: 'HB Compass Self-Assessment — Preparation Guide',
      subtitle: 'This page will take you about 3 minutes to read. Please read it before you begin.',
      body: (
        <>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>What you are about to do</p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '20px', fontSize: '0.9rem' }}>
            You are going to read a series of realistic workplace scenarios — situations that people in the particular role regularly face. For each one, you will choose the description that best fits how you actually respond. There are no right or wrong answers. The three options in each question represent different approaches to the same situation — not different levels of moral worth or professional value.
          </p>
          <div style={{ background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', padding: '16px 18px', marginBottom: '20px' }}>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>The single most important thing</p>
            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, fontSize: '0.88rem' }}>
              Answer based on how you actually work — not how you think you should work. It is tempting to choose the most impressive-sounding option on every question. We'd ask you not to — for a practical reason. Each scenario is paired with a follow-up question that asks what actually happened as a result of your approach. If your first answer describes behaviour you don't typically exhibit, the follow-up will reveal the gap. You'll score lower than if you'd been honest from the start. <strong>An honest 3 is more useful than an inflated 5.</strong>
            </p>
          </div>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', color: 'var(--ink)' }}>What the three options mean</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {[
              { label: 'Option A', desc: 'A professional at an earlier stage of development in this area. Not the "bad" answer. A legitimate approach that many capable people use, especially in areas they\'re still building.' },
              { label: 'Option B', desc: 'A solid, competent professional performing consistently and independently. For most people in most areas, this is a realistic and accurate description.' },
              { label: 'Option C', desc: 'A highly skilled professional who performs excellently and begins to elevate others around them. Select this only if it genuinely reflects your typical approach — not your best day.' },
            ].map(({ label, desc }) => (
              <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)', minWidth: 60 }}>{label}</span>
                <p style={{ color: 'var(--ink-soft)', lineHeight: 1.65, fontSize: '0.85rem' }}>{desc}</p>
              </div>
            ))}
          </div>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>How to read each question</p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '20px', fontSize: '0.88rem' }}>
            Ask yourself: "Across a typical week, in situations like this — which description most accurately captures what I actually do?" Think about patterns, not highlights. Your most impressive interaction is not your typical one.
          </p>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', color: 'var(--ink)' }}>Five things to remember while answering</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {[
              'Think patterns, not highlights — choose what\'s typical, not exceptional',
              'Both options A and B are respectable — they describe real professionals, not failures',
              'Variation is healthy — a profile with some A\'s, B\'s and C\'s is more honest and more useful than wall-to-wall C\'s',
              'If you\'re between two options — choose the lower one; the follow-up question gives you room to show nuance',
              'You can pause and return — your progress saves automatically; use the same link to continue',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: 'var(--ink)', marginTop: '8px' }} />
                <p style={{ color: 'var(--ink-soft)', lineHeight: 1.65, fontSize: '0.88rem' }}>{item}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>When you're ready</p>
            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, fontSize: '0.88rem' }}>
              Find a quiet place. Set aside 20 minutes without interruptions. Your honest reflection is the most valuable thing you can bring to this assessment — more valuable than any particular score.
            </p>
          </div>
        </>
      ),
    },
  ];

  if (introStep <= 3) {
    const page = introPages[introStep - 1];
    return (
      <div style={{ minHeight: '100vh', background: 'var(--canvas)' }}>
        <header style={{
          background: 'var(--ink)', padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <Logo light size="sm" />
          {data?.employeeName && (
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
              Assessment for <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{data.employeeName}</strong>
            </div>
          )}
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
            {introStep} of 3
          </div>
        </header>

        <div style={{ height: '3px', background: 'var(--canvas-warm)' }}>
          <div style={{
            height: '100%', background: 'var(--accent)',
            width: `${(introStep / 3) * 100}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>

        <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '8px' }}>
              {introStep === 1 ? 'The Framework' : introStep === 2 ? 'Leadership Model' : 'Instructions'}
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', marginBottom: '8px', lineHeight: 1.25 }}>{page.title}</h1>
            {page.subtitle && <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem' }}>{page.subtitle}</p>}
          </div>

          <Card style={{ padding: '32px' }}>
            {page.body}
          </Card>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px' }}>
            <Btn onClick={() => setIntroStep(s => s + 1)}>
              {introStep < 3 ? 'Continue →' : 'Start Assessment →'}
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  // ── Main assessment UI ────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas)' }}>
      <header style={{
        background: 'var(--ink)', padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <Logo light size="sm" />
        {data?.employeeName && (
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
            Assessment for <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{data.employeeName}</strong>
          </div>
        )}
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
          {totalAnswered} / {questions.length} answered
        </div>
      </header>

      <div style={{ height: '3px', background: 'var(--canvas-warm)' }}>
        <div style={{
          height: '100%', background: 'var(--accent)',
          width: `${(totalAnswered / questions.length) * 100}%`,
          transition: 'width 0.4s ease',
        }} />
      </div>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '32px 24px' }}>

        {error && <div style={{ marginBottom: '20px' }}><Alert type="error">{error}</Alert></div>}

        {(() => {
          const q = shuffledQuestions[currentQ];
          if (!q) return null;
          return (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', fontWeight: 500 }}>
                  Question {currentQ + 1} <span style={{ color: 'var(--ink-faint)' }}>of {shuffledQuestions.length}</span>
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--ink-faint)' }}>
                  {totalAnswered} answered
                </span>
              </div>

              <Card style={{ padding: '28px' }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.65, marginBottom: '24px' }}>
                  {(q.text.includes(':') ? q.text.split(':').slice(1).join(':').trim() : q.text).replace(/\[Name\]/g, subjectFirstName)}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {q.options.map((opt, oi) => {
                    const optLabel = String.fromCharCode(65 + oi);
                    const selected = answers[q.id] === opt.score;
                    return (
                      <label key={oi} style={{
                        display: 'flex', gap: '12px', alignItems: 'flex-start',
                        padding: '12px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                        border: `1.5px solid ${selected ? 'var(--ink)' : 'var(--canvas-warm)'}`,
                        background: selected ? 'var(--canvas-warm)' : 'var(--canvas)',
                        transition: 'all var(--transition)',
                      }}>
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.score}
                          checked={selected}
                          onChange={() => {
                            setAnswers(prev => ({ ...prev, [q.id]: opt.score }));
                            if (currentQ < shuffledQuestions.length - 1) {
                              setTimeout(() => setCurrentQ(i => i + 1), 350);
                            }
                          }}
                          style={{ marginTop: '2px', accentColor: 'var(--ink)', flexShrink: 0 }}
                        />
                        <div>
                          <span style={{ fontWeight: 600, color: selected ? 'var(--ink)' : 'var(--ink-soft)', fontSize: '0.82rem', marginRight: '8px' }}>{optLabel}.</span>
                          <span style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.6 }}>{opt.text.replace(/^[A-Z]\.\s*/, '').replace(/\[Name\]/g, subjectFirstName)}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </Card>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px', gap: '12px' }}>
                <Btn variant="outline" onClick={() => setCurrentQ(i => Math.max(0, i - 1))} disabled={currentQ === 0}>
                  ← Previous
                </Btn>
                {currentQ < shuffledQuestions.length - 1 ? (
                  <Btn onClick={() => setCurrentQ(i => i + 1)}>
                    Next →
                  </Btn>
                ) : (
                  <Btn onClick={handleSubmit} loading={submitting} disabled={!allAnswered}>
                    {allAnswered ? 'Submit Assessment' : `${shuffledQuestions.length - totalAnswered} remaining`}
                  </Btn>
                )}
              </div>
            </>
          );
        })()}

      </div>
    </div>
  );
}
