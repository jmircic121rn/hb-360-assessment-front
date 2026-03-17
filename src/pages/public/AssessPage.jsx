import React, { useState, useEffect } from 'react';
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
  const [currentPillar, setCurrentPillar] = useState(0);
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
  const pillars = [...new Set(questions.map(q => q.pillar))];
  const pillarQuestions = questions.filter(q => q.pillar === pillars[currentPillar]);
  const totalAnswered = Object.keys(answers).length;
  const allAnswered = totalAnswered === questions.length;
  const pillarAnswered = pillarQuestions.every(q => answers[q.id] !== undefined);

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
      }));
      console.log('[submit] questions count:', questionsPayload.length, '| sample:', questionsPayload.slice(0, 2));
      const payload = { answers, questions: questionsPayload };
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
        {/* Pillar nav */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {pillars.map((p, i) => {
            const pQuestions = questions.filter(q => q.pillar === p);
            const pAnswered = pQuestions.every(q => answers[q.id] !== undefined);
            return (
              <button key={p} onClick={() => setCurrentPillar(i)} style={{
                padding: '7px 16px', borderRadius: 'var(--radius-md)',
                border: 'none', cursor: 'pointer', fontSize: '0.83rem', fontWeight: 500,
                background: currentPillar === i ? 'var(--ink)' : pAnswered ? 'var(--success-pale)' : 'var(--canvas-white)',
                color: currentPillar === i ? '#fff' : pAnswered ? 'var(--success)' : 'var(--ink-soft)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all var(--transition)',
              }}>
                {pAnswered && currentPillar !== i && '✓ '}{p}
              </button>
            );
          })}
        </div>

        {/* Pillar title */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '4px' }}>
            {pillars[currentPillar]}
          </h2>
          {data?.type && (
            <p style={{ fontSize: '0.83rem', color: 'var(--ink-soft)' }}>
              {data.type} · {data.language === 'sr' ? 'Srpski' : 'English'}
            </p>
          )}
        </div>

        {error && <div style={{ marginBottom: '20px' }}><Alert type="error">{error}</Alert></div>}

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {pillarQuestions.map((q, qi) => (
            <Card key={q.id} style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
                  background: answers[q.id] !== undefined ? 'var(--success-pale)' : 'var(--canvas-warm)',
                  color: answers[q.id] !== undefined ? 'var(--success)' : 'var(--ink-faint)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700,
                }}>
                  {answers[q.id] !== undefined ? '✓' : qi + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.65, marginBottom: '20px' }}>
                    {(q.text.includes(':') ? q.text.split(':').slice(1).join(':').trim() : q.text).replace(/\[Name\]/g, subjectFirstName)}
                  </p>

                  {/* Options (A/B/C radio style) */}
                  {q.options ? (
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
                              onChange={() => setAnswers(prev => ({ ...prev, [q.id]: opt.score }))}
                              style={{ marginTop: '2px', accentColor: 'var(--ink)' }}
                            />
                            <div>
                              <span style={{ fontWeight: 600, color: selected ? 'var(--ink)' : 'var(--ink-soft)', fontSize: '0.82rem', marginRight: '8px' }}>{optLabel}.</span>
                              <span style={{ fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.6 }}>{opt.text.replace(/^[A-Z]\.\s*/, '').replace(/\[Name\]/g, subjectFirstName)}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    /* 1-5 scale for simple rating questions */
                    <div>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', maxWidth: 360 }}>
                        {[1, 2, 3, 4, 5].map(n => (
                          <label key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name={q.id}
                              value={n}
                              checked={answers[q.id] === n}
                              onChange={() => setAnswers(prev => ({ ...prev, [q.id]: n }))}
                              style={{ width: 20, height: 20, accentColor: 'var(--teal)', cursor: 'pointer' }}
                            />
                            <span style={{
                              fontSize: '0.75rem', fontWeight: 600,
                              color: answers[q.id] === n ? 'var(--teal)' : 'var(--ink-faint)',
                            }}>{n}</span>
                          </label>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 360, marginTop: '4px' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--ink-faint)' }}>Strongly Disagree</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--ink-faint)' }}>Strongly Agree</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', gap: '12px' }}>
          <Btn
            variant="outline"
            onClick={() => setCurrentPillar(p => Math.max(0, p - 1))}
            disabled={currentPillar === 0}
          >
            ← Previous
          </Btn>

          {currentPillar < pillars.length - 1 ? (
            <Btn
              variant="primary"
              onClick={() => setCurrentPillar(p => p + 1)}
            >
              Next: {pillars[currentPillar + 1]} →
            </Btn>
          ) : (
            <Btn
              variant="teal"
              onClick={handleSubmit}
              loading={submitting}
              disabled={!allAnswered}
              style={{ minWidth: 180 }}
            >
              Submit Assessment
            </Btn>
          )}
        </div>

        {!allAnswered && currentPillar === pillars.length - 1 && (
          <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.82rem', color: 'var(--ink-soft)' }}>
            Please answer all questions before submitting. {questions.length - totalAnswered} remaining.
          </p>
        )}
      </div>
    </div>
  );
}
