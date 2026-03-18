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

  const assessmentType = data?.assessmentType || data?.type || 'self';
  // First name used to replace [Name] placeholders in questions
  const subjectFirstName = (data?.employeeName || '').split(' ')[0] || '[Name]';
  // requiresIdentity = true kada je shared link (peer/DR/external bez poznate osobe)
  // Backend šalje data.requiresIdentity: true za shared linkove, false za individualne
  const needsIdentity = data?.requiresIdentity === true ||
    (data?.requiresIdentity === undefined && ['external'].includes(assessmentType));

  // Identity step — prikazuje se samo za shared linkove
  if (!loading && !error && !submitted && needsIdentity && !identityConfirmed) {
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

  // Select question set based on assessment type, then language
  const rawLang = data?.language || data?.lang || 'en';
  const lang = rawLang === 'en' ? 'eng' : rawLang;
  const questionBank =
    assessmentType === 'manager' ? managerQuestions :
    ['peer', 'directreport', 'direct_report', 'external', 'other'].includes(assessmentType) ? peerQuestions :
    leaderQuestions40;
  const langQuestions = questionBank[lang] || questionBank['eng'];
  const questions = langQuestions ? Object.values(langQuestions).flat() : [];

  // Shuffle all question types once when questions load
  const shuffledQuestions = useMemo(() => {
    if (questions.length === 0) return questions;
    const arr = [...questions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [questions.length]); // eslint-disable-line

  const [currentQ, setCurrentQ] = useState(0);

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
        type: q.type, // 'core' | 'reflection'
      }));

      // For self-assessment: remap reflection answer scores
      // Reflection: 1 → -2 (contradicts), 3 → 0 (neutral), 5 → +1 (affirms)
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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas)' }}>
      {/* Header */}
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

      {/* Progress bar */}
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
                {/* Question counter */}
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
