import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { api } from '../../utils/api';
import { Logo } from '../../components/Layout';
import { Btn, Spinner, Alert, Card, FormField, Input } from '../../components/UI';

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
  const [introStep, setIntroStep] = useState(1); // 1=info page, 2=prep guide, 3=profile intro (if exists), then questions
  const [navOpen, setNavOpen] = useState(false);

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
      .then(data => setData(data))
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

  // Questions from DB — normalize so every item has `id` and `_format`
  const isFcThenScenarioPhase1 =
    (data?.selfFormat === 'fc_then_scenario') && ((data?.currentPhase ?? 1) <= 1);
  const questions = (() => {
    const dbQ = data?.questions;
    if (!dbQ) return [];
    const flat = Array.isArray(dbQ) ? dbQ : Object.values(dbQ).flat();
    return flat.map((q, idx) => {
      const n = { ...q };
      // Ensure stable id
      if (q.questionId) n.id = q.questionId;
      else if (q.quadId) n.id = q.quadId;
      else if (q.scenarioNumber !== undefined) n.id = `scenario_${q.scenarioNumber}`;
      else if (q.questionNumber !== undefined && !q.id) n.id = `q_${q.cluster || ''}_${q.questionNumber}`;
      else if (!q.id) n.id = `q_${idx}`;

      // Normalise options-as-object (e.g. short_20 ICT: { A: "...", B: "...", C: "..." })
      // into an array of { label, text, score } matching the rest of the pipeline.
      if (q.options && !Array.isArray(q.options) && typeof q.options === 'object') {
        const scoreMap = q.scoring || {};
        const keys = Object.keys(q.options).filter(k => typeof q.options[k] === 'string');
        if (keys.length) {
          n.options = keys.map(k => ({
            label: k,
            text: q.options[k],
            score: typeof scoreMap[k] === 'number' ? scoreMap[k] : undefined,
          }));
        }
      }

      // Short_20 placeholder stems look like "Core Scenario — Q1" / "Reflection on Impact — Q2".
      // Treat these as non-text so we render a proper topic + lead-in instead.
      const stemRaw = (q.stem || q.text || '').trim();
      const isPlaceholderStem = /^(Core\s+Scenario|Reflection\s+on\s+Impact)\s*[—–-]\s*Q\s*\d+$/i.test(stemRaw);
      if (isPlaceholderStem) {
        n._placeholderStem = true;
        n.stem = '';
        n.text = '';
      }

      // Detect rendering format
      if (q.statements) n._format = isFcThenScenarioPhase1 ? 'forced_choice_rank' : 'forced_choice';
      else if (q.stages) n._format = 'deep_scenario_staged';
      else if (q.questions && Array.isArray(q.questions)) n._format = 'deep_scenario_open';
      else if (q.scale && Array.isArray(q.scale)) n._format = 'likert';
      else if (q.scoringType === 'qualitative' || q.questionType === 'open_reflection') n._format = 'qualitative';
      else if (n.options && Array.isArray(n.options)) n._format = 'options';
      else n._format = 'options';

      // Normalise question sub-type for topic rendering (core vs reflection)
      const t = (q.questionType || q.type || '').toLowerCase();
      n._questionKind = t === 'reflection' ? 'reflection' : t === 'core' ? 'core' : null;

      return n;
    });
  })();

  // Shuffle once — restore saved order on return visits so answered questions stay in place
  // NOTE: depends on !!data so memo re-runs after data loads (not during loading state when
  // questions fall back to EN JS files, which would save wrong ORDER_KEY)
  const ORDER_KEY = `${PROGRESS_KEY}_order`;
  // Detect selfFormat from API — used for format-specific logic
  const selfFormat = data?.selfFormat || 'standard_40';

  const shuffledQuestions = useMemo(() => {
    if (questions.length === 0 || !data) return questions;
    if (assessmentType !== 'self') return questions;
    // Don't shuffle forced_choice or deep_scenario — order matters
    const hasCompound = questions.some(q => ['forced_choice', 'forced_choice_rank', 'deep_scenario_staged', 'deep_scenario_open'].includes(q._format));
    if (hasCompound) return questions;
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
  }, [questions.length, assessmentType, !!data]); // eslint-disable-line

  // Format-aware answer detection
  const isQAnswered = (q) => {
    if (!q) return false;
    const a = answers[q.id];
    switch (q._format) {
      case 'forced_choice':
        return a && typeof a === 'object' && a.most !== undefined && a.least !== undefined;
      case 'forced_choice_rank': {
        if (!a || typeof a !== 'object') return false;
        const n = (q.statements || []).length;
        const ranks = [];
        for (let i = 0; i < n; i++) {
          const r = a[`s${i}`];
          if (r !== 1 && r !== 2 && r !== 3 && r !== 4) return false;
          ranks.push(r);
        }
        return new Set(ranks).size === n;
      }
      case 'deep_scenario_staged':
        return (q.stages || []).every((_, i) => answers[`${q.id}_S${i + 1}`] !== undefined);
      case 'deep_scenario_open':
        return (q.questions || []).every((_, i) => {
          const v = answers[`${q.id}_Q${i + 1}`];
          return typeof v === 'string' && v.trim().length > 0;
        });
      case 'qualitative':
        return typeof a === 'string' && a.trim().length > 0;
      default: // options, likert
        return a !== undefined && a !== null;
    }
  };
  const totalAnswered = shuffledQuestions.filter(isQAnswered).length;
  const allAnswered = totalAnswered === shuffledQuestions.length;

  function pillarDim(pillar) {
    const p = String(pillar || '').toUpperCase().trim();
    // Direct dimension names (EN)
    if (p === 'RESULTS' || p === 'MINDSET' || p === 'SKILLS' || p === 'INFLUENCE') return p;
    // Serbian/ICT/KAM pillar names → dimension mapping
    if (p.includes('CILJEVI') || p.includes('PROMEN') || p.includes('SHORT-TERM') || p.includes('LONG-TERM')) return 'RESULTS';
    if (p.includes('PREMA') || p.includes('TOWARDS') || p.includes('YOURSELF') || p.includes('AUDIENCE') || p.includes('MESSAGE') || p.includes('CRAFT')) return 'MINDSET';
    if (p.includes('EFIKASNOST') || p.includes('KOMUNIKACIJA') || p.includes('RAZVOJ TIMA') || p.includes('EFFICIENCY') || p.includes('COMMUNICATION') || p.includes('PEOPLE DEVELOPMENT') || p.includes('TAKE-OFF') || p.includes('IN-FLIGHT') || p.includes('LANDING') || p.includes('PHYSICAL') || p.includes('PRESENCE')) return 'SKILLS';
    return 'INFLUENCE';
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const qMap = {};
      questions.forEach(q => { qMap[q.id] = q; });

      // Build questions metadata payload
      // Some formats (short_20) use numeric pillar ids with a separate pillarName.
      // Backend expects pillar as a string, so always coerce to a string label.
      const pillarStr = (qq) => {
        if (typeof qq.pillarName === 'string' && qq.pillarName.trim()) return qq.pillarName;
        if (typeof qq.pillar === 'string' && qq.pillar.trim()) return qq.pillar;
        if (qq.pillar != null) return String(qq.pillar);
        return null;
      };
      const questionsPayload = [];
      questions.forEach(q => {
        const pStr = pillarStr(q);
        if (q._format === 'deep_scenario_staged') {
          (q.stages || []).forEach((s, i) => questionsPayload.push({
            id: `${q.id}_S${i + 1}`, pillar: pStr,
            dimension: q.dimension || pillarDim(pStr), type: s.stageType || 'decision',
          }));
        } else if (q._format === 'deep_scenario_open') {
          (q.questions || []).forEach((sub, i) => questionsPayload.push({
            id: `${q.id}_Q${i + 1}`, pillar: pStr,
            dimension: q.dimension || pillarDim(pStr), type: 'qualitative',
          }));
        } else if (q._format === 'forced_choice') {
          questionsPayload.push({
            id: q.id, pillar: null, dimension: null, type: 'forced_choice',
            statements: q.statements, // backend needs this for ipsative scoring
          });
        } else if (q._format === 'forced_choice_rank') {
          questionsPayload.push({
            id: q.id, pillar: null, dimension: null, type: 'forced_choice_rank',
            statements: q.statements, // backend needs dimensionCode per position for Phase 1 scoring
          });
        } else {
          questionsPayload.push({
            id: q.id, pillar: pStr,
            dimension: q.dimension || pillarDim(pStr),
            type: q.questionType || q.type || q._format,
          });
        }
      });

      // Process answers based on format
      let processedAnswers = {};
      Object.entries(answers).forEach(([qId, val]) => {
        const q = qMap[qId];
        if (!q) {
          // Sub-question of a compound type (scenario_1_S1, scenario_1_Q1, etc.)
          // Find parent question
          const parentId = qId.replace(/_[SQ]\d+$/, '');
          const parent = qMap[parentId];
          if (parent?._format === 'deep_scenario_staged') {
            // val is option index → resolve to score
            const stageIdx = parseInt(qId.split('_S')[1], 10) - 1;
            const stage = parent.stages?.[stageIdx];
            processedAnswers[qId] = stage?.options?.[val]?.score ?? val;
          } else {
            // deep_scenario_open or other — text or direct value
            processedAnswers[qId] = val;
          }
          return;
        }

        switch (q._format) {
          case 'options': {
            const score = q.options?.[val]?.score ?? val;
            processedAnswers[qId] = score;
            break;
          }
          case 'likert': {
            // val is the direct scale value (1-5)
            processedAnswers[qId] = val;
            break;
          }
          case 'qualitative': {
            // val is text string
            processedAnswers[qId] = val;
            break;
          }
          case 'forced_choice': {
            // val is { most: idx, least: idx } — send as-is, backend handles ipsative scoring
            processedAnswers[qId] = val;
            break;
          }
          case 'forced_choice_rank': {
            // val is { s0: rank, s1: rank, s2: rank, s3: rank } — send as-is; backend scores +3/+1/-1/-3
            processedAnswers[qId] = val;
            break;
          }
          default:
            processedAnswers[qId] = val;
        }
      });

      // Apply reflection modifier for self-assessment with standard options format
      if (assessmentType === 'self') {
        const REFLECTION_MAP = { 1: -2, 3: 0, 5: 1 };
        const resolved = {};
        Object.entries(processedAnswers).forEach(([qId, score]) => {
          const q = qMap[qId];
          // Only apply reflection map to 'options' format questions (A/B/C scoring)
          // Likert reflection questions keep their original score
          if (q && q._format === 'options' && q.questionType === 'reflection' && typeof score === 'number' && REFLECTION_MAP[score] !== undefined) {
            resolved[qId] = REFLECTION_MAP[score];
          } else {
            resolved[qId] = score;
          }
        });
        processedAnswers = resolved;
      }

      const payload = {
        answers: processedAnswers,
        questions: questionsPayload,
        selfFormat: selfFormat,
      };
      if (needsIdentity) payload.assessorInfo = { ...assessorInfo, language: rawLang || 'en' };
      const resp = await api.submitAssessment(token, payload);

      // fc_then_scenario: Phase 1 submit transitions to Phase 2 — refetch and
      // keep the user on the assessment flow (new question set is DS tracks).
      if (resp && resp.nextPhase === 2) {
        localStorage.removeItem(PROGRESS_KEY);
        localStorage.removeItem(ORDER_KEY);
        setAnswers({});
        setCurrentQ(0);
        // Skip the intro pages on Phase 2 — respondent has already seen them
        // on Phase 1. Jump straight to the first deep-scenario question.
        setIntroStep(999);
        setLoading(true);
        setData(null);
        try {
          const fresh = await api.getAssessment(token);
          setData(fresh);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
        return;
      }

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

  // Profile display name (original casing from data)
  const profileDisplayName = data?.profileName || data?.profilName || data?.ProfilName || data?.profile?.name || 'Profile';

  // Profile Introduction data from API — supports both flat and multi-language JSON
  const profileIntroRaw = (() => {
    const candidates = [
      data?.profileIntro,
      data?.profile?.profileIntro,
      data?.ProfileIntroJSON,
    ];
    for (const c of candidates) {
      if (c && typeof c === 'object' && (c.portrait || c.dimensions || c.en || c.sr)) return c;
    }
    const raw = data?.introText;
    if (!raw) return null;
    if (typeof raw === 'object' && raw !== null && (raw.portrait || raw.dimensions || raw.en || raw.sr)) return raw;
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && (parsed.portrait || parsed.dimensions || parsed.en || parsed.sr)) return parsed;
      } catch {}
    }
    return null;
  })();

  // Resolve language-specific version: if JSON has { en: {...}, sr: {...} }, pick the right one
  // If JSON is flat (portrait at top level), use as-is (assumed to be the only language available)
  const profileIntro = (() => {
    if (!profileIntroRaw) return null;
    // Multi-language format: { en: { portrait, dimensions, ... }, sr: { ... } }
    if (profileIntroRaw.en || profileIntroRaw.sr) {
      const langKey = isSr ? 'sr' : 'en';
      // Prefer requested language, fall back to en, then to whatever is available
      return profileIntroRaw[langKey] || profileIntroRaw.en || profileIntroRaw.sr || null;
    }
    // Flat format (single language) — use as-is
    return profileIntroRaw;
  })();

  // ── Information Page content (What is HB Compass) ────────────────────────
  const dimensionCards = [
    { letter: 'M', name: isSr ? 'Način razmišljanja' : 'Mindset', desc: isSr ? 'Uverenja i orijentacije koje oblikuju kako pristupate svojoj ulozi i odnosima' : 'The beliefs and orientations that shape how you approach your role and relationships' },
    { letter: 'S', name: isSr ? 'Veštine' : 'Skills', desc: isSr ? 'Praktične sposobnosti koje uloga zahteva' : 'The practical capabilities the role requires' },
    { letter: 'R', name: isSr ? 'Rezultati' : 'Results', desc: isSr ? 'Konkretan uticaj i rezultati koje proizvodi vaš rad' : 'The concrete impact and outcomes you produce' },
    { letter: 'I', name: isSr ? 'Uticaj' : 'Influence', desc: isSr ? 'Kako pokrećete, inspirišete i angažujete ljude oko sebe' : 'How you move, inspire, and engage the people around you' },
  ];

  // Shared section style for info page (bordered sections like the HTML infographic)
  const secStyle = { padding: '40px 56px', borderBottom: '1px solid #d8d8d8' };
  const secNum = (n) => ({ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '6px' });
  const secTitle = { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--ink)', marginBottom: '16px', lineHeight: 1.2 };
  const secP = { fontSize: '14px', lineHeight: 1.75, color: '#333', marginBottom: '14px' };

  const infoPageBody = (
    <>
      {/* Section 1 — What is HB Compass */}
      <div style={secStyle}>
        <div style={secNum('01')}>01</div>
        <div style={secTitle}>{isSr ? 'Šta je HB Compass' : 'What is HB Compass'}</div>
        <p style={secP}>
          {isSr
            ? 'HB Compass je okvir profesionalnog razvoja izgrađen oko jednog centralnog pitanja: šta zapravo zahteva izvrsno obavljanje specifične uloge — i gde se konkretna osoba trenutno nalazi u odnosu na taj standard?'
            : 'HB Compass is a professional development framework built around one central question: what does excellent performance in a specific role actually require — and where does a specific person currently stand against that standard?'
          }
        </p>

        {/* Three source cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', marginTop: '20px' }}>
          {[
            { icon: '◎', name: isSr ? 'Samoprocena' : 'Self-Assessment', desc: isSr ? 'Kako vi vidite svoju profesionalnu efikasnost — u realnim scenarijima iz vaše uloge.' : 'How you see your own professional performance — in realistic scenarios drawn from your role.' },
            { icon: '◎', name: isSr ? '360° Povratna informacija' : '360° Feedback', desc: isSr ? 'Kako kolege koje rade sa vama u različitim kapacitetima posmatraju vašu efikasnost.' : 'How colleagues who work with you in different capacities observe your performance.' },
            { icon: '◎', name: isSr ? 'Idealni profil' : 'Ideal Profile', desc: isSr ? 'Precizno definisan standard za izvrsnu profesionalnu efikasnost u vašoj specifičnoj ulozi — referentna tačka za oba.' : 'A precisely defined standard for excellent performance in your specific role — the reference point for both.' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#f2f2f2', padding: '20px 18px' }}>
              <div style={{ fontSize: '20px', lineHeight: 1, marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', lineHeight: 1.3, marginBottom: '6px' }}>{s.name}</div>
              <p style={{ fontSize: '12.5px', color: '#666', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Arrow result */}
        <div style={{ marginTop: '8px', background: '#f2f2f2', border: '1px solid #ccc', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '20px', color: 'var(--ink)', flexShrink: 0 }}>→</span>
          <p style={{ fontSize: '13px', color: '#333', lineHeight: 1.55, margin: 0, fontStyle: 'italic' }}>
            {isSr
              ? 'Zajedno, ovi elementi proizvode profil jaza — razvojnu mapu koja pokazuje gde uložiti napor u učenje, i zašto. Rezultat ovog procesa je razvojni plan, ne presuda.'
              : 'Together, these produce a gap profile — a development map showing where to invest learning effort, and why. The output of this process is a development plan, not a verdict.'
            }
          </p>
        </div>

        {/* Not this */}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {(isSr
            ? ['Ovo nije alat za upravljanje učinkom', 'Nema prolaznih ili padajućih ocena', 'Vaši rezultati neće biti korišćeni u disciplinske ili formalne svrhe evaluacije']
            : ['This is not a performance management tool', 'There are no pass or fail scores', 'Your results will not be used for disciplinary or formal evaluation purposes']
          ).map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#666' }}>
              <span style={{ color: '#d4d4d4', flexShrink: 0 }}>—</span>{item}
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 — The Ideal Profile */}
      <div style={secStyle}>
        <div style={secNum('02')}>02</div>
        <div style={secTitle}>{isSr ? 'Idealni profil prema kome se procenjujete' : 'The Ideal Profile you are assessing against'}</div>

        <div style={{ background: '#f2f2f2', border: '1px solid #ccc', padding: '18px 22px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#666', flexShrink: 0 }}>
            {isSr ? 'Vaš profil' : 'Your profile'}
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--ink)' }}>{profileDisplayName}</span>
        </div>

        <p style={secP}>
          {isSr
            ? `Ova procena je izgrađena prema ${profileDisplayName} Idealnom Profilu — preciznoj, vidljivoj definiciji kako izgleda izvrsno obavljanje vaše uloge u četiri dimenzije:`
            : `This assessment is built against the ${profileDisplayName} Ideal Profile — a precise, observable definition of what excellent performance in this role looks like across four dimensions:`
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginTop: '4px' }}>
          {dimensionCards.map(d => (
            <div key={d.letter} style={{ background: '#f2f2f2', padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '32px', lineHeight: 1, color: '#e4e4e4' }}>{d.letter}</div>
              <div style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink)', marginTop: '6px' }}>{d.name}</div>
              <p style={{ fontSize: '12.5px', color: '#666', lineHeight: 1.6, margin: '6px 0 0' }}>{d.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ marginTop: '16px', fontSize: '13px', fontStyle: 'italic', color: '#666', lineHeight: 1.6, paddingLeft: '16px', borderLeft: '2px solid #d4d4d4' }}>
          {isSr
            ? 'Profil je napravljen specifično za ovu ulogu — ne iz generičkog okvira kompetencija. Kada budete čitali scenarije u proceni, prepoznaćete situacije kao realne za vaš kontekst. To je namerno.'
            : 'The profile was built specifically for this role — not from a generic competency framework. When you read the assessment scenarios, you will recognise the situations as real to your context. That recognition is intentional.'
          }
        </p>
      </div>

      {/* Section 3 — What the assessment involves */}
      <div style={secStyle}>
        <div style={secNum('03')}>03</div>
        <div style={secTitle}>{isSr ? 'Šta procena uključuje' : 'What the assessment involves'}</div>

        <p style={secP}>
          {isSr
            ? 'Procena predstavlja niz realnih radnih scenarija. Za svaki birate opis koji najbolje odgovara tome kako zaista radite — i odgovarate na kratko dodatno pitanje o tome šta se tipično dešava kao rezultat vašeg pristupa.'
            : 'The assessment presents a series of realistic workplace scenarios. For each one, you choose the description that best fits how you actually work — and answer a short follow-up question about what typically happens as a result of your approach.'
          }
        </p>

        {/* Step flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
          {(isSr ? [
            { num: '1', name: 'Pročitajte scenarij', desc: 'Realistična situacija iz vaše uloge — situacija sa kojom se profesionalci u ovoj poziciji redovno susreću.', key: true },
            { num: '2', name: 'Izaberite svoj pristup', desc: 'Tri opcije, svaka predstavlja različit stepen profesionalnog razvoja. Nema tačnih ili pogrešnih odgovora.', key: false },
            { num: '3', name: 'Odgovorite na dodatno pitanje', desc: 'Kratko pitanje o tome šta se zaista dešava kada radite na ovaj način — kakve rezultate vaš tipičan pristup proizvodi.', key: false },
            { num: '↺', name: 'Ponovite kroz sve dimenzije', desc: 'Procena pokriva sve četiri dimenzije. Pitanja su u nasumičnom redosledu. Vaš napredak se automatski čuva.', key: false },
          ] : [
            { num: '1', name: 'Read the scenario', desc: 'A realistic situation from your role — one that professionals in this position regularly face.', key: true },
            { num: '2', name: 'Choose your approach', desc: 'Three options, each representing a different stage of professional development. No right or wrong answers — only more or less accurate descriptions of how you actually work.', key: false },
            { num: '3', name: 'Answer the follow-up', desc: 'A short question about what actually happens when you operate this way — what results your typical approach typically produces.', key: false },
            { num: '↺', name: 'Repeat across all dimensions', desc: 'The full assessment covers Mindset, Skills, Results, and Influence. Questions are in randomised order. Your progress saves automatically — you can pause and return.', key: false },
          ]).map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
              <div style={{
                width: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px',
                background: step.key ? 'var(--ink)' : '#e4e4e4',
                color: step.key ? '#fff' : '#666',
              }}>{step.num}</div>
              <div style={{ flex: 1, padding: '14px 18px', background: '#f2f2f2' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: step.key ? 'var(--ink)' : 'var(--ink)', marginBottom: '4px' }}>{step.name}</div>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Honesty note */}
        <div style={{ marginTop: '16px', background: '#f2f2f2', border: '1px solid #ccc', padding: '18px 22px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '8px' }}>
            {isSr ? 'Najvažnija stvar' : 'The most important thing'}
          </div>
          <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: '#333', margin: 0, fontStyle: 'italic' }}>
            {isSr
              ? 'Odgovarajte na osnovu toga kako zaista radite — ne kako mislite da treba da radite. Iskren odgovor 3 vredniji je od ulepšanog 5. Dodatna pitanja su dizajnirana da otkriju jaz ako prvi odgovor nije tačan — tako da iskreni odgovori od početka proizvode korisniju sliku.'
              : 'Answer based on how you actually work — not how you think you should work. An honest 3 is more useful than an inflated 5. The follow-up questions are designed to surface the gap if the first answer isn\'t accurate — so honest responses produce a more useful picture from the start.'
            }
          </p>
        </div>
      </div>

      {/* Section 4 — What happens with your responses */}
      <div style={secStyle}>
        <div style={secNum('04')}>04</div>
        <div style={secTitle}>{isSr ? 'Šta se dešava sa vašim odgovorima' : 'What happens with your responses'}</div>

        {/* Data points with checkmarks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
          {(isSr ? [
            'Vaši odgovori se koriste za kreiranje profila jaza — slike gde se trenutno nalazite u odnosu na Idealni Profil, u svim dimenzijama.',
            'Profil jaza je polazna tačka za razvojni razgovor — ne izveštaj koji se šalje bez vašeg učešća.',
            'Vaši podaci se obrađuju u skladu sa politikom zaštite podataka vaše organizacije i ugovorom o obradi podataka kompanije HansenBeck.',
          ] : [
            'Your responses are used to produce a gap profile — a picture of where you currently stand relative to the Ideal Profile, across all four dimensions.',
            'The gap profile is the starting point for a development conversation — not a report that is sent upward without your input.',
            'Your data is processed in accordance with your organisation\'s data protection policy and HansenBeck\'s data processing agreement.',
          ]).map((item, i) => (
            <div key={i} style={{ background: '#f2f2f2', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #aaa',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: '1px', fontSize: '11px', fontWeight: 600, color: '#333',
              }}>✓</div>
              <p style={{ fontSize: '13.5px', color: '#333', lineHeight: 1.65, margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>

        {/* Confidentiality box */}
        <div style={{ marginTop: '16px', background: '#f2f2f2', border: '1px solid #ccc', padding: '18px 22px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#333', marginBottom: '8px' }}>
            {isSr ? 'Poverljivost' : 'Confidentiality'}
          </div>
          <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: '#333', margin: 0 }}>
            {isSr
              ? 'Vaši pojedinačni odgovori su poverljivi. Ne dele se sa vašim menadžerom ili organizacijom kao sirovi podaci. Profil jaza se prvo diskutuje sa vama, u strukturiranom razgovoru, pre nego što se dogovore bilo kakvi sledeći koraci.'
              : 'Your individual responses are confidential. They are not shared with your manager or your organisation as raw data. The gap profile is discussed with you first, in a structured feedback conversation, before any next steps are agreed.'
            }
          </p>
        </div>
      </div>

      {/* Role variant section */}
      <div style={{ padding: '40px 56px', borderBottom: '1px solid #d8d8d8', background: '#f2f2f2' }}>
        <div style={secNum('05')}>{isSr ? 'Pre nego što nastavite' : 'Before you continue'}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', color: 'var(--ink)', marginBottom: '8px', lineHeight: 1.2 }}>
          {isSr ? 'Jedna stvar koju treba imati na umu dok odgovarate' : 'One thing to hold in mind as you answer'}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginTop: '20px' }}>
          <div style={{ padding: '24px 22px', background: '#fff', borderTop: '3px solid var(--ink)' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '10px' }}>
              {isSr ? 'Ako popunjavate samoprocenu' : 'If you are completing a self-assessment'}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px', color: 'var(--ink)', marginBottom: '12px', lineHeight: 1.25 }}>
              {isSr ? 'Odgovarajte na osnovu toga kako zaista radite — ne na osnovu vašeg najboljeg dana.' : 'Answer based on how you actually work — not your best day.'}
            </div>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.68, margin: 0 }}>
              {isSr
                ? 'Procena je najvrednija kada odražava vaše tipične obrasce, ne vaše najimpresivnije interakcije. Razmislite o onome što dosledno radite — ne o onome što ste sposobni da uradite na dobar dan.'
                : 'The assessment is most valuable when it reflects your typical patterns, not your most impressive interactions. Think about what you consistently do — not what you are capable of on a good day.'
              }
            </p>
          </div>
          <div style={{ padding: '24px 22px', background: '#fff', borderTop: '3px solid #888' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888', marginBottom: '10px' }}>
              {isSr ? 'Ako pružate 360° povratnu informaciju' : 'If you are providing 360° feedback'}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px', color: 'var(--ink)', marginBottom: '12px', lineHeight: 1.25 }}>
              {isSr ? 'Opišite ono što zaista primećujete — ne ono što bi bilo najohrabrujuće.' : 'Describe what you actually observe — not what would be most encouraging.'}
            </div>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.68, margin: 0 }}>
              {isSr
                ? 'Najkorisnija stvar koju možete uraditi za osobu koju procenjujete je da budete tačni. Ocene koje su previše velikodušne proizvode sliku koja potcenjuje gde zaista trebaju da se razvijaju.'
                : 'The most helpful thing you can do for the person you are assessing is to be accurate. Scores that are too generous produce a picture that underestimates where they genuinely need to develop.'
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // ── Profile Introduction Page component ──────────────────────────────────
  // Section label with horizontal rule (for Profile Intro page)
  const secLabel = (text) => (
    <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
      {text}
      <span style={{ flex: 1, height: '1px', background: '#ebebeb' }} />
    </div>
  );

  function ProfileIntroSection() {
    if (!profileIntro) return null;
    const { portrait, dimensions, signatureFacet, fullProfileLink, scopeNote } = profileIntro;

    return (
      <>
        {/* Portrait */}
        {portrait && (
          <div style={secStyle}>
            {secLabel(isSr ? 'Koga ovaj profil opisuje' : 'Who this profile describes')}
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(16px, 2.2vw, 19px)', lineHeight: 1.7, color: '#333', borderLeft: '3px solid var(--ink)', paddingLeft: '24px' }}>
              {portrait}
            </p>
          </div>
        )}

        {/* Pillar Map */}
        {dimensions && dimensions.length > 0 && (
          <div style={secStyle}>
            {secLabel(isSr ? 'Šta ova procena obuhvata' : 'What this assessment covers')}
            {(() => {
              const maxPillars = Math.max(...dimensions.map(d => (d.pillars || []).length));
              return (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(dimensions.length, 4)}, 1fr)`, gap: '2px' }}>
                  {dimensions.map((dim, di) => {
                    const pillars = dim.pillars || [];
                    const padded = [...pillars, ...Array(maxPillars - pillars.length).fill(null)];
                    return (
                      <div key={di} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ background: 'var(--ink)', padding: '12px 14px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff' }}>{dim.name}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                          {padded.map((p, pi) => (
                            <div key={pi} style={{ background: p ? '#f4f4f4' : 'transparent', padding: '12px 14px', flex: 1 }}>
                              {p && <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.3, marginBottom: '4px' }}>{p.name}</div>}
                              {p && p.description && <div style={{ fontSize: '11.5px', color: '#666', lineHeight: 1.5, fontStyle: 'italic' }}>{p.description}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* Signature Facet */}
        {signatureFacet && (
          <div style={{ ...secStyle, background: '#f4f4f4' }}>
            {secLabel(isSr ? 'Faceta napisana specifično za ovu ulogu' : 'A facet written specifically for this role')}
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '32px', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'inline-block', background: 'var(--ink)', color: '#fff', fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '6px 14px', marginBottom: '16px' }}>
                  {isSr ? 'Signature faceta' : 'Signature facet'}
                </div>
                {signatureFacet.dimension && (
                  <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', lineHeight: 1.5 }}>
                    {signatureFacet.dimension}<br />{signatureFacet.pillar}
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px, 3vw, 28px)', color: 'var(--ink)', lineHeight: 1.15, marginBottom: '14px' }}>
                  {signatureFacet.name}
                </div>
                <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#333', lineHeight: 1.65, paddingLeft: '16px', borderLeft: '2px solid #666', margin: 0 }}>
                  {signatureFacet.definition}
                </p>
                {signatureFacet.why && (
                  <p style={{ marginTop: '14px', fontSize: '12.5px', color: '#666', lineHeight: 1.6 }}>
                    {signatureFacet.why}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Scope Note */}
        {scopeNote && (
          <div style={secStyle}>
            {secLabel(isSr ? 'Obim onoga o čemu ćete biti pitani' : 'The scope of what you will be asked')}
            {dimensions && dimensions.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(dimensions.length, 4)}, 1fr)`, gap: '2px', marginTop: '4px', marginBottom: '14px' }}>
                {dimensions.map((dim, di) => (
                  <div key={di} style={{ background: '#f4f4f4', padding: '16px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)', marginBottom: '4px' }}>{dim.name}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '32px', color: '#ebebeb', lineHeight: 1, marginBottom: '4px' }}>{(dim.pillars || []).length}</div>
                    <div style={{ fontSize: '11.5px', color: '#666' }}>{isSr ? 'stuba' : 'pillars'}</div>
                  </div>
                ))}
              </div>
            )}
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.65, fontStyle: 'italic' }}>
              {scopeNote}
            </p>
          </div>
        )}

        {/* Full Profile Link */}
        {fullProfileLink && (
          <div style={{ padding: '28px 56px', textAlign: 'center', borderTop: '1px solid #ebebeb' }}>
            <p style={{ fontSize: '13px', color: '#666' }}>
              {isSr ? 'Želite da istražite kompletan Idealni Profil pre početka?' : 'Want to explore the complete Ideal Profile before beginning?'}
              {' '}
              <a href={fullProfileLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                {isSr ? `Pogledajte kompletan ${profileDisplayName} profil →` : `View the full ${profileDisplayName} profile →`}
              </a>
            </p>
          </div>
        )}
      </>
    );
  }

  // ── Build intro pages: Info → Profile Intro → Prep Guide ─────────────────
  const hasProfileIntro = profileIntro && (profileIntro.portrait || (profileIntro.dimensions && profileIntro.dimensions.length > 0));
  const totalSteps = 2 + (hasProfileIntro ? 1 : 0); // info + (optional profile intro) + prep
  totalStepsRef.current = totalSteps;

  const introPages = [
    {
      key: 'info',
      title: isSr ? 'HB Compass — Pre nego što počnete' : 'HB Compass — Before You Begin',
      subtitle: isSr ? 'Ova stranica vam daje kontekst potreban za smisleno angažovanje u onome što sledi.' : 'This page gives you the context you need to engage meaningfully with what follows.',
      label: isSr ? 'Pre nego što počnete' : 'Before you begin',
      body: infoPageBody,
    },
    // Profile Introduction Page (only if data is available from API) — now page 2
    ...(hasProfileIntro ? [{
      key: 'profile-intro',
      title: profileDisplayName,
      subtitle: isSr
        ? 'Ovo je profil prema kome je vaša procena izgrađena — precizna definicija toga kako izgleda odličan učinak u vašoj ulozi. Čitanje ove stranice traje oko 2 minuta.'
        : 'This is the profile your assessment is built against — a precise definition of what excellent performance in your role looks like. This page takes about 2 minutes to read.',
      label: isSr ? 'Vaš idealni profil' : 'Your Ideal Profile',
      body: <ProfileIntroSection />,
    }] : []),
    {
      key: 'intro',
      title: T.prepGuideTitle,
      subtitle: T.prepGuideSubtitle,
      label: T.instructions,
      body: isSr ? (
        <div style={{ padding: '40px 56px', borderBottom: '1px solid #d8d8d8' }}>
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
        </div>
      ) : (
        <div style={{ padding: '40px 56px', borderBottom: '1px solid #d8d8d8' }}>
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
        </div>
      ),
    },
  ];


  // Step labels for progress trail
  const trailSteps = [
    isSr ? 'Informacije' : 'Information',
    ...(hasProfileIntro ? [isSr ? 'Vaš profil' : 'Your Profile'] : []),
    isSr ? 'Vodič za pripremu' : 'Preparation Guide',
    isSr ? 'Procena' : 'Assessment',
  ];

  if (introStep <= totalSteps) {
    const page = introPages[introStep - 1];
    return (
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Top band */}
        <div style={{ height: '3px', background: 'var(--ink)' }} />

        {/* Header */}
        <header style={{
          padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid #d8d8d8',
        }}>
          <img src="/hansenbeck.png" alt="HansenBeck™" style={{ height: '36px' }} />
          <span style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '0.1em', color: '#999' }}>
            {page.label}
          </span>
        </header>

        {/* Progress trail */}
        <div style={{ padding: '12px 56px', display: 'flex', alignItems: 'center', gap: 0, borderBottom: '1px solid #ebebeb', background: '#f4f4f4' }}>
          {trailSteps.map((step, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ fontSize: '10px', color: '#d8d8d8', padding: '0 10px' }}>›</span>}
              <span style={{
                fontSize: '11px', letterSpacing: '0.06em',
                fontWeight: i === introStep - 1 ? 600 : 400,
                color: i === introStep - 1 ? 'var(--ink)' : '#999',
              }}>{step}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Page content area */}
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 0 80px' }}>

          {/* Intro header */}
          <div style={{ padding: '40px 56px 32px', borderBottom: '1px solid #d8d8d8' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '12px' }}>
              {page.label}
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '10px', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{page.title}</h1>
            {page.subtitle && <p style={{ color: '#666', fontSize: '0.92rem', lineHeight: 1.7, maxWidth: 560 }}>{page.subtitle}</p>}
          </div>

          {/* Body — rendered as sections, not a card */}
          {page.body}

          {/* CTA / Navigation */}
          <div style={{ padding: '44px 56px', textAlign: 'center' }}>
            <div
              onClick={() => setIntroStep(s => s + 1)}
              style={{
                display: 'inline-block', background: 'var(--ink)', color: '#fff',
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '13px',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '16px 40px', cursor: 'pointer',
              }}
            >
              {introStep < totalSteps
                ? (isSr ? 'Nastavi →' : 'Continue →')
                : (isSr ? 'Pokreni procenu →' : 'Begin Assessment →')
              }
            </div>
            {introStep > 1 && (
              <div style={{ marginTop: '14px' }}>
                <span
                  onClick={() => setIntroStep(s => s - 1)}
                  style={{ fontSize: '0.82rem', color: '#999', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  {isSr ? '← Prethodna stranica' : '← Previous page'}
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '20px 56px', borderTop: '1px solid #d8d8d8',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <img src="/explore_master_deliver.png" alt="Explore, Master, Deliver." style={{ height: '28px' }} />
          </div>

        </div>
      </div>
    );
  }

  // ── Main assessment UI ────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Fullscreen loading overlay */}
      {submitting && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px',
        }}>
          <Spinner size={36} />
          <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--ink)', letterSpacing: '0.04em' }}>
            {isSr ? 'Slanje vaše procene...' : 'Submitting your assessment...'}
          </p>
          <p style={{ fontSize: '0.8rem', color: '#999' }}>
            {isSr ? 'Molimo sačekajte, ne zatvarajte stranicu.' : 'Please wait, do not close this page.'}
          </p>
        </div>
      )}

      {/* Top band */}
      <div style={{ height: '3px', background: 'var(--ink)' }} />

      {/* Header — matches intro pages */}
      <header style={{
        padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid #d8d8d8', position: 'sticky', top: 0, zIndex: 10, background: '#fff',
      }}>
        <img src="/hansenbeck.png" alt="HansenBeck™" style={{ height: '36px' }} />
        {data?.employeeName && (
          <span style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '0.1em', color: '#999' }}>
            {T.assessmentFor} <strong style={{ color: 'var(--ink)' }}>{data.employeeName}</strong>
          </span>
        )}
      </header>

      {/* Progress bar */}
      <div style={{ height: '3px', background: '#ebebeb' }}>
        <div style={{
          height: '100%', background: 'var(--ink)',
          width: `${(totalAnswered / questions.length) * 100}%`,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Question navigator strip */}
      {(() => {
        const safeCurrentIdx = Math.min(Math.max(currentQ, 0), shuffledQuestions.length - 1);
        return (
          <div style={{
            padding: '14px 56px', display: 'flex', alignItems: 'center', gap: '16px',
            borderBottom: '1px solid #ebebeb', background: '#fafafa',
          }}>
            {/* Progress label */}
            <div style={{ flexShrink: 0, textAlign: 'center', minWidth: '48px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>{totalAnswered}</div>
              <div style={{ fontSize: '9px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginTop: '2px' }}>/ {questions.length}</div>
            </div>

            <div style={{ width: '1px', height: '28px', background: '#d8d8d8', flexShrink: 0 }} />

            {/* Question numbers */}
            <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap', flex: 1, alignItems: 'center' }}>
              {shuffledQuestions.map((sq, i) => {
                const isAnswered = isQAnswered(sq);
                const isCurrent = i === safeCurrentIdx;
                return (
                  <div
                    key={i}
                    onClick={() => setCurrentQ(i)}
                    style={{
                      width: isCurrent ? '26px' : '18px',
                      height: isCurrent ? '26px' : '18px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: isCurrent ? '11px' : '8px',
                      fontWeight: isCurrent ? 700 : 500,
                      background: isCurrent ? 'var(--ink)' : isAnswered ? '#bbb' : '#e8e8e8',
                      color: isCurrent ? '#fff' : isAnswered ? '#fff' : '#aaa',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 0 80px' }}>

        {error && <div style={{ padding: '20px 56px' }}><Alert type="error">{error}</Alert></div>}

        {(() => {
          const safeIdx = Math.min(Math.max(currentQ, 0), shuffledQuestions.length - 1);
          const q = shuffledQuestions[safeIdx];
          if (!q) return <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-soft)' }}><Spinner /></div>;
          return (
            <>
              {/* Question label */}
              <div style={{ padding: '32px 56px 0' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '8px' }}>
                  {(q._format === 'forced_choice' || q._format === 'forced_choice_rank')
                    ? `${isSr ? 'Izbor' : 'Choice'} ${safeIdx + 1} / ${shuffledQuestions.length}`
                    : q._format?.startsWith('deep_scenario')
                      ? `${isSr ? 'Scenario' : 'Scenario'} ${safeIdx + 1} / ${shuffledQuestions.length}`
                      : `${isSr ? 'Pitanje' : 'Question'} ${safeIdx + 1} / ${shuffledQuestions.length}`
                  }
                </p>
              </div>

              {/* Question card — format-aware rendering */}
              <div style={{ padding: '16px 56px 0' }}>

                {/* ── OPTIONS (A/B/C) ── */}
                {q._format === 'options' && (
                  <>
                    <p style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '28px', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                      {q._placeholderStem
                        ? (q._questionKind === 'reflection'
                            ? (isSr
                                ? 'Kada se osvrnete na situacije poput ove, koja od sledećih tvrdnji najbolje opisuje ono što se obično dešavalo?'
                                : 'Looking back at situations like this, which of the following best describes what typically happened?')
                            : (isSr
                                ? 'Izaberite pristup koji najbolje opisuje kako biste vi postupili u ovoj situaciji.'
                                : 'Select the approach that best describes how you would act in this situation.'))
                        : ((q.text || q.stem || '').includes(':')
                            ? (q.text || q.stem || '').split(':').slice(1).join(':').trim()
                            : (q.text || q.stem || '')
                          ).replace(/\[Name\]/g, subjectFirstName)}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {q.options.map((opt, oi) => {
                        const optLabel = String.fromCharCode(65 + oi);
                        const selected = answers[q.id] === oi;
                        return (
                          <label key={oi} style={{
                            display: 'flex', gap: '14px', alignItems: 'flex-start',
                            padding: '14px 18px', cursor: 'pointer',
                            border: `1.5px solid ${selected ? 'var(--ink)' : '#e4e4e4'}`,
                            background: selected ? '#f4f4f4' : '#fff',
                            transition: 'all 0.15s ease',
                          }}>
                            <input type="radio" name={q.id} value={oi} checked={selected}
                              onChange={() => setAnswers(prev => ({ ...prev, [q.id]: oi }))}
                              style={{ marginTop: '3px', accentColor: 'var(--ink)', flexShrink: 0 }}
                            />
                            <div>
                              <span style={{ fontWeight: 600, color: selected ? 'var(--ink)' : '#999', fontSize: '0.8rem', marginRight: '8px' }}>{optLabel}.</span>
                              <span style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65 }}>{(opt.text || opt.desc || opt.label || '').replace(/^[A-Z]\.\s*/, '').replace(/\[Name\]/g, subjectFirstName)}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* ── LIKERT 1-5 SCALE ── */}
                {q._format === 'likert' && (
                  <>
                    <p style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '28px', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                      {(q.stem || q.text || '').replace(/\[Name\]/g, subjectFirstName)}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {(q.scale || []).map((s) => {
                        const selected = answers[q.id] === s.value;
                        return (
                          <label key={s.value} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: s.value }))}
                            style={{
                              display: 'flex', gap: '14px', alignItems: 'center',
                              padding: '14px 18px', cursor: 'pointer',
                              border: `1.5px solid ${selected ? 'var(--ink)' : '#e4e4e4'}`,
                              background: selected ? '#f4f4f4' : '#fff',
                              transition: 'all 0.15s ease',
                            }}>
                            <div style={{
                              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: selected ? 'var(--ink)' : '#f0f0f0',
                              color: selected ? '#fff' : '#666',
                              fontWeight: 700, fontSize: '0.9rem',
                            }}>{s.value}</div>
                            <span style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.5 }}>{s.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* ── QUALITATIVE (open text) ── */}
                {q._format === 'qualitative' && (
                  <>
                    <p style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '16px', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                      {(q.stem || q.text || '').replace(/\[Name\]/g, subjectFirstName)}
                    </p>
                    {q.followUpPrompts && (
                      <div style={{ background: '#f8f8f8', border: '1px solid #e8e8e8', padding: '16px 20px', marginBottom: '20px', fontSize: '0.82rem', color: '#555', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                        <div style={{ fontWeight: 600, marginBottom: '6px', color: 'var(--ink)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {isSr ? 'Smernice za odgovor' : 'Response guidance'}
                        </div>
                        {q.followUpPrompts}
                      </div>
                    )}
                    <textarea
                      value={answers[q.id] || ''}
                      onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder={isSr ? 'Unesite vaš odgovor ovde...' : 'Enter your response here...'}
                      style={{
                        width: '100%', minHeight: 180, padding: '14px 16px',
                        border: '1.5px solid #e4e4e4', fontSize: '0.9rem', lineHeight: 1.7,
                        fontFamily: 'inherit', resize: 'vertical', outline: 'none',
                        background: '#fff',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                      onBlur={e => e.target.style.borderColor = '#e4e4e4'}
                    />
                    <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '6px', textAlign: 'right' }}>
                      {(answers[q.id] || '').length} {isSr ? 'karaktera' : 'characters'}
                    </div>
                  </>
                )}

                {/* ── FORCED CHOICE (Most / Least) ── */}
                {q._format === 'forced_choice' && (
                  <>
                    {q.topic && (
                      <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                        {q.topic}
                      </p>
                    )}
                    <p style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '24px', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                      {isSr
                        ? 'Izaberite tvrdnju koja vas NAJVIŠE opisuje i tvrdnju koja vas NAJMANJE opisuje.'
                        : 'Select the statement that is MOST like you and the statement that is LEAST like you.'
                      }
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {(q.statements || []).map((st, si) => {
                        const fcAnswer = answers[q.id] || {};
                        const isMost = fcAnswer.most === si;
                        const isLeast = fcAnswer.least === si;
                        return (
                          <div key={si} style={{
                            display: 'flex', gap: '12px', alignItems: 'center',
                            padding: '14px 18px',
                            border: `1.5px solid ${isMost ? '#2a7d2a' : isLeast ? '#c44' : '#e4e4e4'}`,
                            background: isMost ? '#f0f8f0' : isLeast ? '#fef5f5' : '#fff',
                            transition: 'all 0.15s ease',
                          }}>
                            <div style={{ flex: 1, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65 }}>
                              {st.label && <span style={{ fontWeight: 600, color: '#999', marginRight: '8px' }}>{st.label}.</span>}
                              {st.text}
                            </div>
                            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                              <button type="button" onClick={() => {
                                setAnswers(prev => {
                                  const cur = prev[q.id] || {};
                                  const newMost = cur.most === si ? undefined : si;
                                  const newLeast = cur.least === si ? undefined : cur.least;
                                  return { ...prev, [q.id]: { most: newMost, least: newLeast === newMost ? undefined : newLeast } };
                                });
                              }} style={{
                                padding: '4px 10px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                                border: `1.5px solid ${isMost ? '#2a7d2a' : '#ccc'}`,
                                background: isMost ? '#2a7d2a' : '#fff', color: isMost ? '#fff' : '#666',
                                textTransform: 'uppercase', letterSpacing: '0.05em',
                              }}>
                                {isSr ? 'Najviše' : 'Most'}
                              </button>
                              <button type="button" onClick={() => {
                                setAnswers(prev => {
                                  const cur = prev[q.id] || {};
                                  const newLeast = cur.least === si ? undefined : si;
                                  const newMost = cur.most === si ? undefined : cur.most;
                                  return { ...prev, [q.id]: { most: newMost === newLeast ? undefined : newMost, least: newLeast } };
                                });
                              }} style={{
                                padding: '4px 10px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                                border: `1.5px solid ${isLeast ? '#c44' : '#ccc'}`,
                                background: isLeast ? '#c44' : '#fff', color: isLeast ? '#fff' : '#666',
                                textTransform: 'uppercase', letterSpacing: '0.05em',
                              }}>
                                {isSr ? 'Najmanje' : 'Least'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* ── FORCED CHOICE — 4-way ranking (fc_then_scenario Phase 1) ── */}
                {q._format === 'forced_choice_rank' && (() => {
                  const rankAnswer = answers[q.id] || {};
                  const rankLabels = isSr ? ['1. (najviše)', '2.', '3.', '4. (najmanje)'] : ['1st (most)', '2nd', '3rd', '4th (least)'];
                  const assignRank = (statementIdx, rank) => {
                    setAnswers(prev => {
                      const cur = { ...(prev[q.id] || {}) };
                      // If another statement already holds this rank, clear it.
                      for (const k of Object.keys(cur)) {
                        if (cur[k] === rank) delete cur[k];
                      }
                      // Toggle off if clicking the same rank again.
                      if (cur[`s${statementIdx}`] === rank) {
                        delete cur[`s${statementIdx}`];
                      } else {
                        cur[`s${statementIdx}`] = rank;
                      }
                      return { ...prev, [q.id]: cur };
                    });
                  };
                  return (
                    <>
                      {q.topic && (
                        <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                          {q.topic}
                        </p>
                      )}
                      <p style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '24px', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                        {q.instruction || (isSr
                          ? 'Rangirajte ove četiri tvrdnje od one koja vam NAJVIŠE liči (1.) do one koja vam NAJMANJE liči (4.).'
                          : 'Rank these four statements from most like you (1st) to least like you (4th).')}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(q.statements || []).map((st, si) => {
                          const currentRank = rankAnswer[`s${si}`];
                          return (
                            <div key={si} style={{
                              display: 'flex', gap: '12px', alignItems: 'center',
                              padding: '14px 18px',
                              border: `1.5px solid ${currentRank ? '#2a7d2a' : '#e4e4e4'}`,
                              background: currentRank ? '#f0f8f0' : '#fff',
                              transition: 'all 0.15s ease',
                            }}>
                              <div style={{ flex: 1, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65 }}>
                                {st.text}
                              </div>
                              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                                {[1, 2, 3, 4].map(r => {
                                  const active = currentRank === r;
                                  return (
                                    <button key={r} type="button" onClick={() => assignRank(si, r)} style={{
                                      minWidth: '80px', padding: '6px 10px', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                                      border: `1.5px solid ${active ? '#2a7d2a' : '#ccc'}`,
                                      background: active ? '#2a7d2a' : '#fff', color: active ? '#fff' : '#666',
                                      textTransform: 'uppercase', letterSpacing: '0.05em',
                                    }}>{rankLabels[r - 1]}</button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}

                {/* ── DEEP SCENARIO — staged (ICT/KAM: stages with decision/reflection options) ── */}
                {q._format === 'deep_scenario_staged' && (
                  <>
                    {q.title && (
                      <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
                        {q.title}
                      </p>
                    )}
                    {q.context && (
                      <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic', background: '#f8f8f8', padding: '14px 18px', border: '1px solid #e8e8e8' }}>
                        {q.context}
                      </p>
                    )}
                    {(q.stages || []).map((stage, si) => {
                      const stageKey = `${q.id}_S${si + 1}`;
                      return (
                        <div key={si} style={{ marginBottom: '28px', paddingBottom: '20px', borderBottom: si < q.stages.length - 1 ? '1px solid #eee' : 'none' }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginBottom: '8px' }}>
                            {isSr ? 'Faza' : 'Stage'} {si + 1} — {stage.stageType === 'reflection' ? (isSr ? 'Refleksija' : 'Reflection') : (isSr ? 'Odluka' : 'Decision')}
                          </div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '14px' }}>
                            {stage.situation}
                          </p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {(stage.options || []).map((opt, oi) => {
                              const optLabel = String.fromCharCode(65 + oi);
                              // Seed data sometimes prefixes option text with "A. "/"B. "/"C. "
                              // Strip it so we don't render the label twice.
                              const optText = (opt.text || '').replace(/^\s*[A-E]\s*[.)\-:]\s*/, '');
                              const selected = answers[stageKey] === oi;
                              return (
                                <label key={oi} style={{
                                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                                  padding: '14px 18px', cursor: 'pointer',
                                  border: `1.5px solid ${selected ? 'var(--ink)' : '#e4e4e4'}`,
                                  background: selected ? '#f4f4f4' : '#fff',
                                  transition: 'all 0.15s ease',
                                }}>
                                  <input type="radio" name={stageKey} value={oi} checked={selected}
                                    onChange={() => setAnswers(prev => ({ ...prev, [stageKey]: oi }))}
                                    style={{ marginTop: '3px', accentColor: 'var(--ink)', flexShrink: 0 }}
                                  />
                                  <div>
                                    <span style={{ fontWeight: 600, color: selected ? 'var(--ink)' : '#999', fontSize: '0.8rem', marginRight: '8px' }}>{optLabel}.</span>
                                    <span style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65 }}>{optText}</span>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {/* ── DEEP SCENARIO — open (TLS: scenarios with qualitative questions) ── */}
                {q._format === 'deep_scenario_open' && (
                  <>
                    {q.title && (
                      <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
                        {q.title}
                      </p>
                    )}
                    {q.facetsAssessed && (
                      <p style={{ fontSize: '0.78rem', color: '#999', marginBottom: '16px', fontWeight: 500 }}>
                        {q.facetsAssessed}
                      </p>
                    )}
                    {q.context && (
                      <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.7, marginBottom: '20px', fontStyle: 'italic', background: '#f8f8f8', padding: '14px 18px', border: '1px solid #e8e8e8' }}>
                        {q.context}
                      </p>
                    )}
                    {(q.questions || []).map((sub, si) => {
                      const subKey = `${q.id}_Q${si + 1}`;
                      return (
                        <div key={si} style={{ marginBottom: '24px' }}>
                          <p style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '10px', fontWeight: 500 }}>
                            {si + 1}. {sub.text}
                          </p>
                          <textarea
                            value={answers[subKey] || ''}
                            onChange={e => setAnswers(prev => ({ ...prev, [subKey]: e.target.value }))}
                            placeholder={isSr ? 'Vaš odgovor...' : 'Your response...'}
                            style={{
                              width: '100%', minHeight: 120, padding: '12px 14px',
                              border: '1.5px solid #e4e4e4', fontSize: '0.88rem', lineHeight: 1.65,
                              fontFamily: 'inherit', resize: 'vertical', outline: 'none', background: '#fff',
                            }}
                            onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                            onBlur={e => e.target.style.borderColor = '#e4e4e4'}
                          />
                        </div>
                      );
                    })}
                  </>
                )}

              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 56px', gap: '12px' }}>
                <span
                  onClick={() => safeIdx > 0 && setCurrentQ(i => Math.max(0, i - 1))}
                  style={{
                    fontSize: '0.82rem', color: safeIdx === 0 ? '#ccc' : '#999',
                    cursor: safeIdx === 0 ? 'default' : 'pointer',
                    textDecoration: safeIdx === 0 ? 'none' : 'underline', textUnderlineOffset: '3px',
                  }}
                >
                  ← {isSr ? 'Prethodno' : 'Previous'}
                </span>
                {safeIdx < shuffledQuestions.length - 1 ? (
                  <div
                    onClick={() => setCurrentQ(i => i + 1)}
                    style={{
                      display: 'inline-block', background: 'var(--ink)', color: '#fff',
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '13px',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '14px 36px', cursor: 'pointer',
                    }}
                  >
                    {isSr ? 'Sledeće →' : 'Next →'}
                  </div>
                ) : (
                  <div
                    onClick={() => allAnswered && !submitting && handleSubmit()}
                    style={{
                      display: 'inline-block',
                      background: allAnswered && !submitting ? 'var(--ink)' : '#ccc',
                      color: '#fff',
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: '13px',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '14px 36px', cursor: allAnswered && !submitting ? 'pointer' : 'default',
                      opacity: submitting ? 0.6 : 1,
                    }}
                  >
                    {submitting
                      ? (isSr ? 'Slanje...' : 'Submitting...')
                      : allAnswered
                        ? (isSr ? 'Pošalji procenu' : 'Submit Assessment')
                        : (isSr ? `Još ${shuffledQuestions.length - totalAnswered} preostalo` : `${shuffledQuestions.length - totalAnswered} remaining`)
                    }
                  </div>
                )}
              </div>
            </>
          );
        })()}

      </div>

      {/* Footer — matches intro pages */}
      <div style={{
        maxWidth: 800, margin: '0 auto',
        padding: '20px 56px', borderTop: '1px solid #d8d8d8',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <img src="/explore_master_deliver.png" alt="Explore, Master, Deliver." style={{ height: '28px' }} />
      </div>
    </div>
  );
}
