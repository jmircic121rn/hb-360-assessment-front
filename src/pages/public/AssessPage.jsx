import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { api } from '../../utils/api';
import { Logo } from '../../components/Layout';
import { Btn, Spinner, Alert, Card, FormField, Input } from '../../components/UI';
import { leaderQuestions40 } from '../../data/leaderQuestions40';
import { employeeQuestions40 } from '../../data/employeeQuestions40';
import { managerQuestions } from '../../data/managerQuestions';
import { peerQuestions } from '../../data/peerQuestions';

export default function AssessPage() {
  const { token } = useParams();
  const [, setSearchParams] = useSearchParams();
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

  const PROGRESS_KEY = `compass_progress_${token}`;
  const hasRestoredRef = React.useRef(false);
  const totalStepsRef = React.useRef(1);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = '';
  }, [introStep, currentQ]);

  useEffect(() => {
    api.getAssessment(token)
      .then(initial => {
        const lng = initial?.language || initial?.lang || 'en';
        if (lng && lng !== 'en') {
          return api.getAssessment(token, lng)
            .then(localized => ({
              ...initial,
              ...localized,
              // always use questions from the first call — second call may return EN fallback
              questions: initial?.questions ?? localized?.questions,
              introText: localized?.introText || initial?.introText,
            }))
            .catch(() => initial); // if localized call fails, fall back to initial data
        }
        return initial;
      })
      .then(data => {
        setData(data);
      })
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

  // Restore progress: URL params take priority, then localStorage
  useEffect(() => {
    if (!data) return;
    const params = new URLSearchParams(window.location.search);
    const s = params.get('s');
    const saved = localStorage.getItem(PROGRESS_KEY);
    const parsed = saved ? (() => { try { return JSON.parse(saved); } catch { return null; } })() : null;

    // always restore answers from localStorage regardless of URL
    if (parsed?.answers && Object.keys(parsed.answers).length > 0) setAnswers(parsed.answers);

    if (s) {
      // URL param takes priority for navigation position
      if (s.startsWith('q')) {
        const n = parseInt(s.slice(1), 10);
        if (!isNaN(n) && n >= 0) { setCurrentQ(n); setIntroStep(9999); }
      } else if (s.startsWith('i')) {
        const n = parseInt(s.slice(1), 10);
        if (!isNaN(n) && n >= 1) setIntroStep(n);
      }
    } else if (parsed) {
      if (typeof parsed.currentQ === 'number' && parsed.currentQ >= 0) setCurrentQ(parsed.currentQ);
      if (typeof parsed.introStep === 'number' && parsed.introStep > 1) setIntroStep(parsed.introStep);
    }
    hasRestoredRef.current = true;
  }, [data]); // eslint-disable-line

  // Sync URL with current navigation position (intro step or question index)
  useEffect(() => {
    if (!hasRestoredRef.current) return;
    const ts = totalStepsRef.current;
    const s = introStep > ts ? `q${currentQ}` : `i${introStep}`;
    setSearchParams(prev => { const n = new URLSearchParams(prev); n.set('s', s); return n; }, { replace: true });
  }, [currentQ, introStep]); // eslint-disable-line

  // Save answers to localStorage — only after restore has run
  useEffect(() => {
    if (!hasRestoredRef.current) return;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ answers, currentQ, introStep }));
  }, [answers, currentQ, introStep]); // eslint-disable-line

  // Derive question set here (before early returns) so useMemo is always called
  const assessmentType = data?.assessmentType || data?.type || 'self';
  const subjectFirstName = (data?.employeeName || '').split(' ')[0] || '[Name]';
  const needsIdentity = data?.requiresIdentity === true ||
    (data?.requiresIdentity === undefined && ['external'].includes(assessmentType));

  const rawLang = data?.language || data?.lang || 'en';
  const lang = rawLang === 'en' ? 'eng' : rawLang;

  const isSr = rawLang === 'sr';
  const isSelf = assessmentType === 'self';
  const T = {
    loading: isSr ? 'Učitavanje vaše procene…' : 'Loading your assessment…',
    linkIssue: isSr ? 'Problem sa linkom' : 'Link Issue',
    alreadyCompleted: isSr ? 'Ova procena je već popunjena.' : 'This assessment has already been completed.',
    invalidLink: isSr ? 'Ovaj link je nevažeći ili je istekao.' : 'This link is invalid or has expired.',
    thankYou: isSr ? 'Hvala!' : 'Thank You!',
    thankYouBody: isSr
      ? 'Vaša procena je uspešno poslata. Vaše iskreno mišljenje doprinosi smislenom razvoju liderstva.'
      : 'Your assessment has been submitted successfully. Your honest feedback contributes to meaningful development.',
    assessmentFor: isSr ? 'Procena za' : 'Assessment for',
    beforeYouBegin: isSr ? 'Pre nego što počnete' : 'Before you begin',
    identityBody: isSr
      ? 'Molimo unesite vaše podatke. Ove informacije će biti zabeležene zajedno sa vašim odgovorima.'
      : 'Please enter your details. This information will be recorded alongside your assessment responses.',
    firstName: isSr ? 'Ime' : 'First Name',
    lastName: isSr ? 'Prezime' : 'Last Name',
    email: isSr ? 'Email adresa' : 'Email address',
    continueToAssessment: isSr ? 'Nastavi na procenu →' : 'Continue to Assessment →',
    instructions: isSr ? 'Uputstva' : 'Instructions',
    prepGuideTitle: isSr ? 'HB Compass — Vodič za pripremu' : 'HB Compass — Preparation Guide',
    prepGuideSubtitle: isSr
      ? 'Ova stranica će vam trebati oko 3 minuta. Molimo pročitajte je pre nego što počnete.'
      : 'This page will take you about 3 minutes to read. Please read it before you begin.',
    continueBtn: isSr ? 'Nastavi →' : 'Continue →',
    startBtn: isSr ? 'Pokreni procenu →' : 'Start Assessment →',
    prevBtn: isSr ? '← Prethodno' : '← Previous',
    nextBtn: isSr ? 'Sledeće →' : 'Next →',
    submitBtn: isSr ? 'Predaj procenu' : 'Submit Assessment',
    questionOf: (cur, total) => isSr ? `Pitanje ${cur} od ${total}` : `Question ${cur} of ${total}`,
    answered: isSr ? 'odgovoreno' : 'answered',
    remaining: (n) => isSr ? `Preostalo: ${n}` : `${n} remaining`,
    levelLabel: (n, total) => isSr ? `Nivo ${n} od ${total}` : `Level ${n} of ${total}`,
  };

  const profileName = (data?.profileName || data?.profilName || data?.profile?.name || data?.ProfilName || '').toLowerCase();
  const isEmployeeProfile = profileName.includes('employee') || profileName.includes('modern');

  // Use questions from DB if available; fall back to local question files
  const questions = (() => {
    const dbQ = data?.questions;
    if (dbQ) {
      const flat = Array.isArray(dbQ) ? dbQ : Object.values(dbQ).flat();
      if (flat.length > 0) return flat;
    }
    const questionBank =
      assessmentType === 'manager' ? managerQuestions :
      ['peer', 'directreport', 'direct_report', 'external', 'other'].includes(assessmentType) ? peerQuestions :
      isEmployeeProfile ? employeeQuestions40 :
      leaderQuestions40;
    const langQuestions = questionBank[lang] || questionBank['eng'];
    return langQuestions ? Object.values(langQuestions).flat() : [];
  })();

  // Shuffle once — restore saved order on return visits so answered questions stay in place
  const ORDER_KEY = `${PROGRESS_KEY}_order`;
  const shuffledQuestions = useMemo(() => {
    if (questions.length === 0) return questions;
    if (assessmentType !== 'self') return questions;
    try {
      const savedOrder = localStorage.getItem(ORDER_KEY);
      if (savedOrder) {
        const ids = JSON.parse(savedOrder);
        const qMap = Object.fromEntries(questions.map(q => [String(q.id), q]));
        const ordered = ids.map(id => qMap[String(id)]).filter(Boolean);
        if (ordered.length === questions.length) return ordered;
      }
    } catch {}
    const arr = [...questions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    localStorage.setItem(ORDER_KEY, JSON.stringify(arr.map(q => q.id)));
    return arr;
  }, [questions.length, assessmentType]); // eslint-disable-line

  const totalAnswered = shuffledQuestions.filter(q => answers[q.id] !== undefined).length;
  const allAnswered = totalAnswered === shuffledQuestions.length;

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

      // answers stores option index — resolve to score first
      const qMap = {};
      questions.forEach(q => { qMap[q.id] = q; });
      let processedAnswers = {};
      Object.entries(answers).forEach(([qId, optIdx]) => {
        const q = qMap[qId];
        processedAnswers[qId] = q?.options[optIdx]?.score ?? optIdx;
      });

      if (assessmentType === 'self') {
        const REFLECTION_MAP = { 1: -2, 3: 0, 5: 1 };
        const resolved = {};
        Object.entries(processedAnswers).forEach(([qId, score]) => {
          const q = qMap[qId];
          resolved[qId] = (q?.type === 'reflection' && REFLECTION_MAP[score] !== undefined)
            ? REFLECTION_MAP[score]
            : score;
        });
        processedAnswers = resolved;
      }

      const payload = { answers: processedAnswers, questions: questionsPayload };
      if (needsIdentity) payload.assessorInfo = { ...assessorInfo, language: rawLang || 'en' };
      await api.submitAssessment(token, payload);
      localStorage.removeItem(PROGRESS_KEY);
      localStorage.removeItem(ORDER_KEY);
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
      <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{T.loading}</p>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--canvas)' }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔗</div>
        <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '12px' }}>{T.linkIssue}</h2>
        <Alert type="error">{error}</Alert>
      </div>
    </div>
  );

  if (submitted) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--canvas)' }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '12px' }}>{T.thankYou}</h2>
        <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          {T.thankYouBody}
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
              {T.assessmentFor} <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{data.employeeName}</strong>
            </div>
          )}
        </header>
        <div style={{ maxWidth: 480, margin: '60px auto', padding: '0 24px' }}>
          <Card style={{ padding: '36px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '8px' }}>{T.beforeYouBegin}</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '28px' }}>
              {T.identityBody}
            </p>
            <form onSubmit={handleIdentitySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <FormField label={T.firstName} required>
                  <Input
                    value={assessorInfo.firstName}
                    onChange={e => setAssessorInfo(i => ({ ...i, firstName: e.target.value }))}
                    placeholder={T.firstName}
                    required
                    autoFocus
                  />
                </FormField>
                <FormField label={T.lastName} required>
                  <Input
                    value={assessorInfo.lastName}
                    onChange={e => setAssessorInfo(i => ({ ...i, lastName: e.target.value }))}
                    placeholder={T.lastName}
                    required
                  />
                </FormField>
              </div>
              <FormField label={T.email} required>
                <Input
                  type="email"
                  value={assessorInfo.email}
                  onChange={e => setAssessorInfo(i => ({ ...i, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                />
              </FormField>
              <Btn type="submit" style={{ marginTop: '8px', justifyContent: 'center' }}>
                {T.continueToAssessment}
              </Btn>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // ── Intro pages ──────────────────────────────────────────────────────────

  // Parse introText from profile into typed blocks
  function parseIntroText(text = '') {
    if (!text) return [];
    const blocks = [];
    const paragraphs = text.split(/\n\n+/);
    for (const para of paragraphs) {
      const trimmed = para.trim();
      if (!trimmed) continue;
      if (/^[A-Z][A-Z\s\-–—0-9]+$/.test(trimmed) || /^(?:LEVEL|NIVO)\s+\d+/i.test(trimmed)) { blocks.push({ type: 'section', text: trimmed }); continue; }
      if (/^(?:Dimension|Dimenzija)\s+\d+\s*[—–-]/i.test(trimmed)) {
        const lines = trimmed.split('\n');
        blocks.push({ type: 'dimheader', text: lines[0] });
        if (lines.length > 1) blocks.push({ type: 'body', text: lines.slice(1).join('\n') });
        continue;
      }
      if (/^(?:Pillar|Stub)\s+\d+\s*[—–-]/i.test(trimmed)) {
        const lines = trimmed.split('\n');
        blocks.push({ type: 'pillarheader', text: lines[0] });
        if (lines.length > 1) blocks.push({ type: 'body', text: lines.slice(1).join('\n') });
        continue;
      }
      if (/^Facets:\s/.test(trimmed)) { blocks.push({ type: 'facetlabel', text: trimmed }); continue; }
      blocks.push({ type: 'body', text: trimmed });
    }
    return blocks;
  }

  // Profile display name (original casing from data)
  const profileDisplayName = data?.profileName || data?.profilName || data?.ProfilName || data?.profile?.name || 'Profile';
  const profileIntroText = data?.introText || data?.profile?.introText || '';

  // Split parsed introText into per-level block groups (level 1, 2, 3)
  function getLevelBlocks(allBlocks, levelNum) {
    const result = [];
    let inside = false;
    for (const block of allBlocks) {
      if (block.type === 'section') {
        const m = block.text.match(/^(?:LEVEL|NIVO)\s+(\d+)/i);
        if (m) {
          const n = parseInt(m[1]);
          if (n === levelNum) { inside = true; result.push(block); continue; }
          if (n > levelNum) break;
          inside = false; continue;
        }
      }
      if (inside) result.push(block);
    }
    return result;
  }

  function LevelBlocks({ blocks }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {blocks.map((block, i) => {
          if (block.type === 'section') return (
            <div key={i} style={{ marginBottom: '24px', paddingBottom: '10px', borderBottom: '2px solid var(--ink)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--ink)' }}>{block.text}</span>
            </div>
          );
          if (block.type === 'dimheader') return (
            <div key={i} style={{ marginTop: '28px', marginBottom: '8px' }}>
              <span style={{ display: 'inline-block', padding: '5px 14px', borderRadius: '4px', background: 'var(--ink)', color: '#fff', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.06em' }}>{block.text}</span>
            </div>
          );
          if (block.type === 'pillarheader') return (
            <div key={i} style={{ marginTop: '20px', marginBottom: '6px', paddingLeft: '12px', borderLeft: '3px solid var(--ink)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em', color: 'var(--ink)' }}>{block.text}</span>
            </div>
          );
          if (block.type === 'facetlabel') return (
            <div key={i} style={{ marginBottom: '8px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-soft)', fontStyle: 'italic' }}>{block.text}</span>
            </div>
          );
          return (
            <p key={i} style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', lineHeight: 1.75, margin: '0 0 12px 0', whiteSpace: 'pre-wrap' }}>{block.text}</p>
          );
        })}
      </div>
    );
  }

  const compassIntro = isSr ? (
    <>
      <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '20px' }}>
        Većina profesionalaca ima iskrenu, ali nepotpunu sliku o sebi. Znate svoje snage — bar one kojih ste svesni. Znate oblasti koje vam se čine izazovnim. Ali jaz između toga kako vi vidite sebe i kako vaš rad zaista deluje na druge, kako vaše razmišljanje oblikuje vaše odluke, kako vaše prisustvo utiče na ljude oko vas — taj jaz je upravo tamo gde leži najvredniji uvid za razvoj. HB Compass samoprocena je dizajnirana da zatvori taj jaz.
      </p>
      <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '32px' }}>
        HB Compass je okvir profesionalnog razvoja izgrađen na jednostavnoj, ali moćnoj ideji: ono što nekoga čini istinski odličnim u svom poslu nije jedna stvar — to su četiri međusobno povezane stvari koje deluju zajedno. Većina razvojnih alata fokusira se na veštine ili rezultate. HB Compass ide dalje, procenjujući celovitu sliku onoga što pokreće profesionalnu efikasnost — jer trajna izvrsnost nikada nije samo stvar toga šta možete da radite. Jednako je važno i kako razmišljate, ko ste u svojim odnosima, i kakav uticaj imate na ljude i okruženje oko vas.
      </p>
    </>
  ) : (
    <>
      <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '20px' }}>
        Most professionals have a genuine but incomplete picture of themselves. You know your strengths — at least the ones you are aware of. You know the areas you find challenging. But the gap between how you see yourself and how your work actually lands with others, how your thinking shapes your decisions, how your presence influences the people around you — that gap is where the most valuable development insight lives. The HB Compass self-assessment is designed to close that gap.
      </p>
      <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '32px' }}>
        HB Compass is a professional development framework built on a simple but powerful idea: what makes someone genuinely excellent at their work is not one thing — it is four interconnected things, working together. Most development tools focus on skills or results. HB Compass goes further, assessing the full picture of what drives professional effectiveness — because sustainable excellence is never just about what you can do. It is equally about how you think, who you are in your relationships, and the impact you have on the people and environment around you.
      </p>
    </>
  );

  const allParsedBlocks = parseIntroText(profileIntroText);
  const levelPages = profileIntroText
    ? [1, 2, 3].map(n => {
        const blocks = getLevelBlocks(allParsedBlocks, n);
        return {
          key: `level${n}`,
          title: profileDisplayName,
          subtitle: null,
          label: T.levelLabel(n, 3),
          body: blocks.length > 0
            ? <>{n === 1 && compassIntro}<LevelBlocks blocks={blocks} /></>
            : null,
        };
      }).filter(p => p.body)
    : [];

  const totalSteps = levelPages.length + 1; // levels + instructions
  totalStepsRef.current = totalSteps;

  const introPages = [
    ...levelPages,
    {
      key: 'intro',
      title: T.prepGuideTitle,
      subtitle: T.prepGuideSubtitle,
      label: T.instructions,
      body: isSr ? (
        <>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>
            {isSelf ? 'Šta vas čeka' : `Šta ćete raditi`}
          </p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '20px', fontSize: '0.9rem' }}>
            {isSelf
              ? 'Čitaćete niz realnih radnih scenarija — situacija sa kojima se osobe u ovoj ulozi redovno susreću. Za svaki scenarij birate opis koji najbliže odgovara tome kako vi zapravo reagujete. Nema tačnih ili pogrešnih odgovora. Tri opcije predstavljaju različite pristupe na različitim razvojnim nivoima.'
              : `Čitaćete niz realnih radnih scenarija — situacija sa kojima se osobe u ovoj ulozi redovno susreću. Za svaki scenarij birate opis koji najbliže odgovara tome kako ${subjectFirstName} zapravo reaguje na osnovu vašeg zapažanja. Nema tačnih ili pogrešnih odgovora. Tri opcije predstavljaju različite pristupe na različitim razvojnim nivoima.`
            }
          </p>
          <div style={{ background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', padding: '16px 18px', marginBottom: '20px' }}>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>Najvažnija stvar</p>
            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, fontSize: '0.88rem' }}>
              {isSelf
                ? <>Odgovarajte na osnovu toga kako zaista radite — ne kako mislite da treba da radite. Svaki scenarij je uparen sa dodatnim pitanjem koje pita šta se zapravo dogodilo kao rezultat vašeg pristupa. <strong>Iskren odgovor 3 vredniji je od ulepšanog 5.</strong></>
                : <>Odgovarajte na osnovu onoga što ste zaista primetili — ne kako mislite da bi {subjectFirstName} trebalo da radi ili kako želi da bude viđen/viđena. <strong>Iskren odgovor 3 vredniji je od ulepšanog 5.</strong></>
              }
            </p>
          </div>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', color: 'var(--ink)' }}>Šta znače tri opcije</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {(isSelf ? [
              { label: 'Opcija A', desc: 'Profesionalac na ranijem razvojnom stepenu u ovoj oblasti. Nije "loš" odgovor — legitiman pristup koji koriste mnogi sposobni ljudi, posebno u oblastima koje još razvijaju.' },
              { label: 'Opcija B', desc: 'Solidan, kompetentan profesionalac koji radi dosledno i samostalno. Za većinu ljudi u većini oblasti, ovo je realan i tačan opis.' },
              { label: 'Opcija C', desc: 'Visoko vešt profesionalac koji izvrsno radi i počinje da uzdiže druge oko sebe. Izaberite ovo samo ako zaista odražava vaš tipičan pristup — ne vaš najbolji dan.' },
            ] : [
              { label: 'Opcija A', desc: `Profesionalac na ranijem razvojnom stepenu u ovoj oblasti. Nije "loš" odgovor — legitiman pristup koji koriste mnogi sposobni ljudi, posebno u oblastima koje još razvijaju.` },
              { label: 'Opcija B', desc: `Solidan, kompetentan profesionalac koji radi dosledno i samostalno. Za većinu ljudi u većini oblasti, ovo je realan i tačan opis.` },
              { label: 'Opcija C', desc: `Visoko vešt profesionalac koji izvrsno radi i počinje da uzdiže druge oko sebe. Izaberite ovo samo ako zaista odražava tipičan pristup osobe koju ocenjujete — ne njihov najbolji dan.` },
            ]).map(({ label, desc }) => (
              <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)', minWidth: 60 }}>{label}</span>
                <p style={{ color: 'var(--ink-soft)', lineHeight: 1.65, fontSize: '0.85rem' }}>{desc}</p>
              </div>
            ))}
          </div>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>Kako čitati svako pitanje</p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '20px', fontSize: '0.88rem' }}>
            {isSelf
              ? 'Zapitajte se: "Tokom tipične sedmice, u ovakvim situacijama — koji opis najtačnije opisuje ono što zapravo radim?" Razmišljajte o obrascima, ne o izuzecima. Vaša najimpresivnija interakcija nije vaša tipična.'
              : `Zapitajte se: "Na osnovu mojih interakcija sa ${subjectFirstName} — koji opis najtačnije opisuje ono što tipično rade?" Razmišljajte o obrascima, ne o izuzecima. Njihova najimpresivnija interakcija nije njihova tipična.`
            }
          </p>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', color: 'var(--ink)' }}>Stvari koje treba imati na umu</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {(isSelf ? [
              'Razmišljajte o obrascima, ne o izuzecima — birajte ono što je tipično, ne izuzetno',
              'Nijedna opcija nije inherentno bolja ili lošija — svaka opisuje drugačiji pristup na različitom razvojnom stepenu',
              'Varijacija je zdrava — dosledno biranje najimpresivnije opcije daje manje tačan profil',
              'Ako ste između dve opcije — izaberite konzervativniju; pruža pošteniju polaznu tačku za razvoj',
              'Pitanja i opcije su u nasumičnom redosledu — A, B i C ne odgovaraju niskim, srednjim ili visokim ocenama',
              'Možete pauzirati i nastaviti — vaš napredak se automatski čuva',
            ] : [
              `Razmišljajte o obrascima, ne o izuzecima — birajte ono što je tipično za ${subjectFirstName}, ne izuzetno`,
              'Nijedna opcija nije inherentno bolja ili lošija — svaka opisuje drugačiji pristup na različitom razvojnom stepenu',
              'Vaša povratna informacija je korisnija kada je iskrena — dosledno biranje najimpresivnije opcije daje netačniju sliku',
              'Ako ste između dve opcije — izaberite konzervativniju; pruža pošteniju polaznu tačku za razvoj',
              'Pitanja i opcije su u nasumičnom redosledu — A, B i C ne odgovaraju niskim, srednjim ili visokim ocenama',
              'Možete pauzirati i nastaviti — vaš napredak se automatski čuva',
            ]).map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: 'var(--ink)', marginTop: '8px' }} />
                <p style={{ color: 'var(--ink-soft)', lineHeight: 1.65, fontSize: '0.88rem' }}>{item}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>Kada ste spremni</p>
            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, fontSize: '0.88rem' }}>
              {isSelf
                ? 'Pronađite mirno mesto. Odvojite 20 minuta bez prekida. Vaša iskrena refleksija je najvrednija stvar koju možete doneti ovoj proceni — vrednija od bilo koje ocene.'
                : `Pronađite mirno mesto. Odvojite 20 minuta bez prekida. Vaše iskreno, promišljeno zapažanje je najvrednije što možete doneti ovoj proceni — vrednije za razvoj ${subjectFirstName} od bilo koje ulepšane ocene.`
              }
            </p>
          </div>
        </>
      ) : (
        <>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>
            {isSelf ? 'What you are about to do' : 'What you are about to do'}
          </p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '20px', fontSize: '0.9rem' }}>
            {isSelf
              ? 'You are going to read a series of realistic workplace scenarios — situations that people in this role regularly face. For each one, you will choose the description that best fits how you actually respond. There are no right or wrong answers. The three options represent different approaches at different stages of development.'
              : `You are going to read a series of realistic workplace scenarios — situations that people in this role regularly face. For each one, you will choose the description that best fits how ${subjectFirstName} actually handles these situations, based on your observation. There are no right or wrong answers. The three options represent different approaches at different stages of development.`
            }
          </p>
          <div style={{ background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', padding: '16px 18px', marginBottom: '20px' }}>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>The single most important thing</p>
            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, fontSize: '0.88rem' }}>
              {isSelf
                ? <>Answer based on how you actually work — not how you think you should work. Each scenario is paired with a follow-up question that asks what actually happened as a result of your approach. If your first answer describes behaviour you don't typically exhibit, the follow-up will reveal the gap. <strong>An honest 3 is more useful than an inflated 5.</strong></>
                : <>Answer based on what you have actually observed — not how you think {subjectFirstName} should work or how they appear to want to be seen. <strong>An honest 3 is more useful to {subjectFirstName}'s development than an inflated 5.</strong></>
              }
            </p>
          </div>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', color: 'var(--ink)' }}>What the three options mean</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {(isSelf ? [
              { label: 'Option A', desc: 'A professional at an earlier stage of development in this area. Not the "bad" answer — a legitimate approach that many capable people use, especially in areas they\'re still building.' },
              { label: 'Option B', desc: 'A solid, competent professional performing consistently and independently. For most people in most areas, this is a realistic and accurate description.' },
              { label: 'Option C', desc: 'A highly skilled professional who performs excellently and begins to elevate others around them. Select this only if it genuinely reflects your typical approach — not your best day.' },
            ] : [
              { label: 'Option A', desc: 'A professional at an earlier stage of development in this area. Not the "bad" answer — a legitimate approach that many capable people use, especially in areas they\'re still building.' },
              { label: 'Option B', desc: 'A solid, competent professional performing consistently and independently. For most people in most areas, this is a realistic and accurate description.' },
              { label: 'Option C', desc: `A highly skilled professional who performs excellently and begins to elevate others around them. Select this only if it genuinely reflects ${subjectFirstName}'s typical approach — not their best day.` },
            ]).map(({ label, desc }) => (
              <div key={label} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)', minWidth: 60 }}>{label}</span>
                <p style={{ color: 'var(--ink-soft)', lineHeight: 1.65, fontSize: '0.85rem' }}>{desc}</p>
              </div>
            ))}
          </div>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>How to read each question</p>
          <p style={{ color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: '20px', fontSize: '0.88rem' }}>
            {isSelf
              ? 'Ask yourself: "Across a typical week, in situations like this — which description most accurately captures what I actually do?" Think about patterns, not highlights. Your most impressive interaction is not your typical one.'
              : `Ask yourself: "Based on my interactions with ${subjectFirstName} — which description most accurately captures what they typically do?" Think about patterns, not highlights. Their most impressive interaction is not their typical one.`
            }
          </p>
          <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px', color: 'var(--ink)' }}>Things to remember while answering</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {(isSelf ? [
              'Think patterns, not highlights — choose what\'s typical, not exceptional',
              'No option is inherently better or worse — each describes a different approach at a different stage of development',
              'Variation is healthy — consistently choosing the most impressive-sounding option produces a less accurate profile',
              'If you\'re between two options — choose the more conservative one; it gives a more honest starting point for development',
              'Questions and answer options are in randomised order — A, B, and C do not correspond to low, mid, or high scores',
              'You can pause and return — your progress saves automatically',
            ] : [
              `Think patterns, not highlights — choose what's typical of ${subjectFirstName}, not exceptional`,
              'No option is inherently better or worse — each describes a different approach at a different stage of development',
              'Your feedback is more useful when it\'s honest — consistently choosing the most impressive option produces a less accurate picture',
              'If you\'re between two options — choose the more conservative one; it gives a more honest starting point for development',
              'Questions and answer options are in randomised order — A, B, and C do not correspond to low, mid, or high scores',
              'You can pause and return — your progress saves automatically',
            ]).map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 6, height: 6, borderRadius: '50%', background: 'var(--ink)', marginTop: '8px' }} />
                <p style={{ color: 'var(--ink-soft)', lineHeight: 1.65, fontSize: '0.88rem' }}>{item}</p>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--canvas-warm)', borderRadius: 'var(--radius-md)', padding: '16px 18px' }}>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: 'var(--ink)' }}>When you're ready</p>
            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7, fontSize: '0.88rem' }}>
              {isSelf
                ? 'Find a quiet place. Set aside 20 minutes without interruptions. Your honest reflection is the most valuable thing you can bring to this assessment — more valuable than any particular score.'
                : `Find a quiet place. Set aside 20 minutes without interruptions. Your honest, considered observation is the most valuable thing you can bring to this assessment — more useful to ${subjectFirstName}'s development than any inflated score.`
              }
            </p>
          </div>
        </>
      ),
    },
  ];


  if (introStep <= totalSteps) {
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
              {T.assessmentFor} <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{data.employeeName}</strong>
            </div>
          )}
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>
            {introStep} of {totalSteps}
          </div>
        </header>

        <div style={{ height: '3px', background: 'var(--canvas-warm)' }}>
          <div style={{
            height: '100%', background: 'var(--accent)',
            width: `${(introStep / totalSteps) * 100}%`,
            transition: 'width 0.4s ease',
          }} />
        </div>

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '8px' }}>
              {page.label}
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', marginBottom: '8px', lineHeight: 1.25 }}>{page.title}</h1>
            {page.subtitle && <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem' }}>{page.subtitle}</p>}
          </div>

          <Card style={{ padding: '32px' }}>
            {page.body}
          </Card>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px' }}>
            <Btn variant="outline" onClick={() => setIntroStep(s => s - 1)} disabled={introStep === 1}>
              {T.prevBtn}
            </Btn>
            <Btn onClick={() => setIntroStep(s => s + 1)}>
              {introStep < totalSteps ? T.continueBtn : T.startBtn}
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
            {T.assessmentFor} <strong style={{ color: 'rgba(255,255,255,0.85)' }}>{data.employeeName}</strong>
          </div>
        )}
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>
          {totalAnswered} / {questions.length} {T.answered}
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
          const safeIdx = Math.min(Math.max(currentQ, 0), shuffledQuestions.length - 1);
          const q = shuffledQuestions[safeIdx];
          if (!q) return <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-soft)' }}><Spinner /></div>;
          return (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', fontWeight: 500 }}>
                  {T.questionOf(safeIdx + 1, shuffledQuestions.length)}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--ink-faint)' }}>
                  {totalAnswered} {T.answered}
                </span>
              </div>
              

              <Card style={{ padding: '28px' }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.65, marginBottom: '24px' }}>
                  {(q.text.includes(':') ? q.text.split(':').slice(1).join(':').trim() : q.text).replace(/\[Name\]/g, subjectFirstName)}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {q.options.map((opt, oi) => {
                    const optLabel = String.fromCharCode(65 + oi);
                    const selected = answers[q.id] === oi;
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
                          value={oi}
                          checked={selected}
                          onChange={() => setAnswers(prev => ({ ...prev, [q.id]: oi }))}
                          style={{ marginTop: '2px', accentColor: 'var(--ink)', flexShrink: 0 }}
                        />
                        <div>
                          <span style={{ fontWeight: 600, color: selected ? 'var(--ink)' : 'var(--ink-soft)', fontSize: '0.82rem', marginRight: '8px' }}>{optLabel}.</span>
                          <span style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.6 }}>{(opt.text || opt.desc || opt.label || '').replace(/^[A-Z]\.\s*/, '').replace(/\[Name\]/g, subjectFirstName)}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </Card>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px', gap: '12px' }}>
                <Btn variant="outline" onClick={() => setCurrentQ(i => Math.max(0, i - 1))} disabled={safeIdx === 0}>
                  {T.prevBtn}
                </Btn>
                {safeIdx < shuffledQuestions.length - 1 ? (
                  <Btn onClick={() => setCurrentQ(i => i + 1)}>
                    {T.nextBtn}
                  </Btn>
                ) : (
                  <Btn onClick={handleSubmit} loading={submitting} disabled={!allAnswered}>
                    {allAnswered ? T.submitBtn : T.remaining(shuffledQuestions.length - totalAnswered)}
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
