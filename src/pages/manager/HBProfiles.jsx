import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { Layout, NAV } from './managerUtils';
import { PortalLayout } from '../../components/Layout';
import {
  PageHeader, Card, Btn, Spinner, Alert, EmptyState, Select
} from '../../components/UI';

export function HBProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [profileLang, setProfileLang] = useState('en');
  const [loading, setLoading] = useState(true);
  const [langLoading, setLangLoading] = useState(false);
  const [facetsLoading, setFacetsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedFacets, setExpandedFacets] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  const facetsCacheRef = React.useRef({});

  useEffect(() => {
    api.hbProfiles.getAll('en')
      .then(data => {
        const raw = Array.isArray(data) ? data : [];
        console.log('[HBProfiles] all profiles from backend:', raw);
        const seen = new Set();
        const list = raw.filter(p => { const k = p.profileType; if (seen.has(k)) return false; seen.add(k); return true; });
        setProfiles(list);
        if (list.length > 0) {
          setSelected(list[0]);
          setActiveTab(list[0].introText ? 'overview' : 'framework');
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []); // eslint-disable-line

  function selectProfile(p) {
    setExpandedFacets({});
    setSelected(p);
    setActiveTab(p.introText ? 'overview' : 'framework');
  }

  function switchLang(lang) {
    if (lang === profileLang) return;
    setLangLoading(true);
    setExpandedFacets({});
    api.hbProfiles.getAll(lang)
      .then(data => {
        const raw = Array.isArray(data) ? data : [];
        const seen2 = new Set();
        const list = raw.filter(p => { const k = p.profileType; if (seen2.has(k)) return false; seen2.add(k); return true; });
        setProfiles(list);
        setProfileLang(lang);
        // Keep same profile selected if possible
        const reSelected = selected
          ? list.find(p => p.profileType === selected.profileType) || list[0]
          : list[0];
        if (reSelected) {
          setSelected(reSelected);
          setActiveTab(reSelected.introText ? 'overview' : 'framework');
        }
      })
      .catch(() => {})
      .finally(() => setLangLoading(false));
  }

  // Lazy-load facets when Facets tab is opened
  useEffect(() => {
    if (!selected || selected.facets?.length) return;
    if (activeTab !== 'framework' && selected.introText) return;
    const cacheKey = `${selected.profileType}-${profileLang}`;
    if (facetsCacheRef.current[cacheKey]) {
      setSelected(prev => prev ? { ...prev, facets: facetsCacheRef.current[cacheKey] } : prev);
      return;
    }
    setFacetsLoading(true);
    api.hbProfiles.getOne(selected.profileType, profileLang)
      .then(full => {
        const facets = full?.facets || [];
        facetsCacheRef.current[cacheKey] = facets;
        setSelected(prev => prev?.profileType === selected.profileType ? { ...prev, facets } : prev);
      })
      .catch(() => {})
      .finally(() => setFacetsLoading(false));
  }, [activeTab, selected?.profileType, profileLang]); // eslint-disable-line

  function toggleFacet(key) {
    setExpandedFacets(prev => ({ ...prev, [key]: !prev[key] }));
  }

  // Group facets by dimension → pillar
  function groupFacets(facets = []) {
    const dims = {};
    facets.forEach(f => {
      if (!dims[f.dimension]) dims[f.dimension] = {};
      if (!dims[f.dimension][f.pillar]) dims[f.dimension][f.pillar] = [];
      dims[f.dimension][f.pillar].push(f);
    });
    return dims;
  }


  return (
    <PortalLayout role="admin" navItems={NAV}>
      <PageHeader title="HB Profiles" subtitle="Competency frameworks for each profile type." />

      {error && <Alert type="error" style={{ marginBottom: 20 }}>{error}</Alert>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}><Spinner /></div>
      ) : (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

          {/* Left: profile list */}
          <div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {profiles.map(p => {
              const active = selected?.profileType === p.profileType;
              return (
                <button
                  key={p.profileType}
                  onClick={() => selectProfile(p)}
                  style={{
                    padding: '11px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    background: active ? 'var(--ink)' : 'transparent',
                    textAlign: 'left', fontFamily: 'var(--font-body)', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--canvas-warm)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: active ? '#fff' : 'var(--ink)' }}>
                    {p.profileName || p.profileType}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: profile detail */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {!selected ? (
              <Card style={{ padding: '64px 32px', textAlign: 'center' }}>
                <p style={{ color: 'var(--ink-soft)' }}>Select a profile to view its framework.</p>
              </Card>
            ) : (() => {
              const availLangs = selected.availableLangs || selected.available_langs || selected.languages || [];
              console.log('[HBProfiles] selected keys:', JSON.stringify(Object.keys(selected)));
              console.log('[HBProfiles] full object:', JSON.stringify(selected).slice(0, 400));
              const grouped = groupFacets(selected.facets);
              const DIM_ORDER = ['RESULTS', 'MINDSET', 'SKILLS', 'INFLUENCE'];
              const sortedDims = Object.keys(grouped).sort((a, b) => {
                const ai = DIM_ORDER.indexOf(a); const bi = DIM_ORDER.indexOf(b);
                return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
              });
              const hasIntro = !!selected.introText;
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Profile title + lang switcher + tab switcher */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '4px' }}>
                        {selected.profileType}
                      </p>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--ink)', margin: 0 }}>
                        {selected.profileName || selected.profileType}
                      </h2>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {availLangs.length > 1 && (
                        <div style={{ display: 'flex', gap: '2px', background: 'var(--canvas-warm)', borderRadius: '8px', padding: '3px' }}>
                          {availLangs.map(l => (
                            <button key={l} onClick={() => switchLang(l)} disabled={langLoading} style={{
                              padding: '6px 14px', borderRadius: '6px', border: 'none',
                              cursor: langLoading ? 'default' : 'pointer',
                              fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 700,
                              letterSpacing: '0.06em',
                              background: profileLang === l ? '#000' : 'transparent',
                              color: profileLang === l ? '#fff' : 'var(--ink-soft)',
                              boxShadow: profileLang === l ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                              opacity: langLoading && profileLang !== l ? 0.45 : 1,
                              transition: 'all 0.15s',
                            }}>{LANG_LABELS[l] || l.toUpperCase()}</button>
                          ))}
                        </div>
                      )}
                      {hasIntro && (
                        <div style={{ display: 'flex', gap: '2px', background: 'var(--canvas-warm)', borderRadius: '8px', padding: '3px' }}>
                          {[['overview', 'Overview'], ['framework', 'Facets']].map(([key, label]) => (
                            <button key={key} onClick={() => setActiveTab(key)} style={{
                              padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                              fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 600,
                              background: activeTab === key ? '#fff' : 'transparent',
                              color: activeTab === key ? 'var(--ink)' : 'var(--ink-soft)',
                              boxShadow: activeTab === key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                              transition: 'all 0.15s',
                            }}>{label}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Overview tab — 3 accordion items, one per level */}
                  {activeTab === 'overview' && hasIntro && (() => {
                    const ld = selected.levelDescriptions || selected.level_descriptions || {};
                    const levelChunks = (selected.introText || '').split(/(?=(?:LEVEL|NIVO)\s+[123]\s*[—–-])/i).filter(c => c.trim());
                    const levels = [
                      { label: (levelChunks[0] || '').split('\n')[0].trim() || 'Level 1', desc: ld.level1 || ld['1'] || '', chunk: levelChunks[0] || '' },
                      { label: (levelChunks[1] || '').split('\n')[0].trim() || 'Level 2', desc: ld.level2 || ld['2'] || '', chunk: levelChunks[1] || '' },
                      { label: (levelChunks[2] || '').split('\n')[0].trim() || 'Level 3', desc: ld.level3 || ld['3'] || '', chunk: levelChunks[2] || '' },
                    ];
                    return (
                      <Card style={{ padding: '8px 0' }}>
                        {levels.map((lvl, i) => (
                          <LevelAccordionItem
                            key={lvl.label}
                            label={lvl.label}
                            desc={lvl.desc}
                            chunk={lvl.chunk}
                            isLast={i === levels.length - 1}
                          />
                        ))}
                      </Card>
                    );
                  })()}

                  {/* Framework tab — facets */}
                  {(activeTab === 'framework' || !hasIntro) && (
                  facetsLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}><Spinner /></div>
                  ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {sortedDims.map(dimension => { const pillars = grouped[dimension]; return (
                    <div key={dimension}>
                      {/* Dimension header */}
                      <div style={{
                        padding: '8px 16px', borderRadius: '6px',
                        background: 'var(--ink)', color: '#fff',
                        fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em',
                        textTransform: 'uppercase', marginBottom: '12px',
                        display: 'inline-block',
                      }}>
                        {dimension}
                      </div>

                      {Object.entries(pillars).map(([pillar, facets]) => (
                        <div key={pillar} style={{ marginBottom: '16px' }}>
                          {/* Pillar label */}
                          <div style={{
                            fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em',
                            color: 'var(--ink)', marginBottom: '10px', marginTop: '4px',
                            paddingLeft: '12px',
                            borderLeft: '3px solid var(--ink)',
                          }}>
                            {pillar}
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {facets.map((facet, fi) => {
                              const key = `${dimension}__${pillar}__${fi}`;
                              const open = !!expandedFacets[key];
                              return (
                                <Card key={key} style={{ padding: 0, overflow: 'hidden' }}>
                                  {/* Facet header (clickable) */}
                                  <button
                                    onClick={() => toggleFacet(key)}
                                    style={{
                                      width: '100%', padding: '14px 18px',
                                      background: 'none', border: 'none', cursor: 'pointer',
                                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                      gap: '12px', textAlign: 'left', fontFamily: 'var(--font-body)',
                                    }}
                                  >
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--ink)' }}>
                                        {facet.facet}
                                      </div>
                                      {!open && facet.description && (
                                        <div style={{
                                          fontSize: '0.8rem', color: 'var(--ink-soft)',
                                          marginTop: '3px', overflow: 'hidden',
                                          whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                                          maxWidth: '100%',
                                        }}>
                                          {facet.description}
                                        </div>
                                      )}
                                    </div>
                                    <svg
                                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                      style={{ flexShrink: 0, color: 'var(--ink-faint)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                                    >
                                      <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                  </button>

                                  {/* Expanded content */}
                                  {open && (
                                    <div style={{ borderTop: '1px solid var(--canvas-warm)', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                      {facet.description && (
                                        <p style={{ fontSize: '0.84rem', color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>
                                          {facet.description}
                                        </p>
                                      )}
                                      {facet.levels && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                          {Object.entries(facet.levels).map(([level, text]) => {
                                            return (
                                              <div key={level} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                <span style={{
                                                  flexShrink: 0, width: '80px',
                                                  fontSize: '0.68rem', fontWeight: 700,
                                                  textTransform: 'uppercase', letterSpacing: '0.07em',
                                                  color: 'var(--ink-faint)', textAlign: 'center',
                                                }}>
                                                  {level}
                                                </span>
                                                <p style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
                                                  {text}
                                                </p>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ); })}
                </div>
                ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}


    </PortalLayout>
  );
}

// ── Helper Functions ───────────────────────────────────────────────────────

function parseIntroText(text = '') {
  if (!text) return [];
  const blocks = [];
  const paragraphs = text.split(/\n\n+/);
  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) continue;
    // Major ALL-CAPS section header (e.g. "CONTENT", "LEVEL 1 – THE PORTRAIT", "FACET REFERENCE – ALL 40 FACETS")
    if (/^[A-Z][A-Z\s\-–—0-9]+$/.test(trimmed) || /^(?:LEVEL|NIVO)\s+\d+/i.test(trimmed)) {
      blocks.push({ type: 'section', text: trimmed });
      continue;
    }
    // Dimension header: "Dimension X — ..."
    if (/^(?:Dimension|Dimenzija)\s+\d+\s*[—–-]/i.test(trimmed)) {
      const lines = trimmed.split('\n');
      blocks.push({ type: 'dimheader', text: lines[0] });
      if (lines.length > 1) blocks.push({ type: 'body', text: lines.slice(1).join('\n') });
      continue;
    }
    // Pillar header: "Pillar X — ..."
    if (/^(?:Pillar|Stub)\s+\d+\s*[—–-]/i.test(trimmed)) {
      const lines = trimmed.split('\n');
      blocks.push({ type: 'pillarheader', text: lines[0] });
      if (lines.length > 1) blocks.push({ type: 'body', text: lines.slice(1).join('\n') });
      continue;
    }
    // Dimension sub-label: "Mindset dimension", "Skills dimension" etc.
    if (/^(Mindset|Skills|Results|Influence)\s+dimension$/.test(trimmed)) {
      blocks.push({ type: 'dimheader', text: trimmed });
      continue;
    }
    // Short lines that are likely sub-headings (bold intro labels under a pillar)
    if (/^Facets:\s/.test(trimmed)) {
      blocks.push({ type: 'facetlabel', text: trimmed });
      continue;
    }
    // HB footer line
    if (trimmed.startsWith('HB Foundation ·')) {
      blocks.push({ type: 'footer', text: trimmed });
      continue;
    }
    // Default: body paragraph (may contain \n within)
    blocks.push({ type: 'body', text: trimmed });
  }
  return blocks;
}

function IntroTextRenderer({ text }) {
  const blocks = parseIntroText(text);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {blocks.map((block, i) => {
        if (block.type === 'section') return (
          <div key={i} style={{
            marginTop: i > 0 ? '40px' : 0, marginBottom: '20px',
            paddingBottom: '10px', borderBottom: '2px solid var(--ink)',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '1.05rem',
              fontWeight: 700, letterSpacing: '0.06em', color: 'var(--ink)',
            }}>{block.text}</span>
          </div>
        );
        if (block.type === 'dimheader') return (
          <div key={i} style={{ marginTop: '28px', marginBottom: '8px' }}>
            <span style={{
              display: 'inline-block', padding: '5px 14px', borderRadius: '4px',
              background: 'var(--ink)', color: '#fff',
              fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.06em',
            }}>{block.text}</span>
          </div>
        );
        if (block.type === 'pillarheader') return (
          <div key={i} style={{ marginTop: '20px', marginBottom: '6px', paddingLeft: '12px', borderLeft: '3px solid var(--ink)' }}>
            <span style={{
              fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em',
              color: 'var(--ink)',
            }}>{block.text}</span>
          </div>
        );
        if (block.type === 'facetlabel') return (
          <div key={i} style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-soft)', fontStyle: 'italic' }}>
              {block.text}
            </span>
          </div>
        );
        if (block.type === 'footer') return (
          <div key={i} style={{ marginTop: '40px', paddingTop: '16px', borderTop: '1px solid var(--canvas-warm)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--ink-faint)', lineHeight: 1.6, margin: 0 }}>{block.text}</p>
          </div>
        );
        // body — handle inline \n as line breaks
        return (
          <p key={i} style={{ fontSize: '0.88rem', color: 'var(--ink-soft)', lineHeight: 1.75, margin: '0 0 12px 0', whiteSpace: 'pre-wrap' }}>
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function LevelAccordionItem({ label, desc, chunk, isLast }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid var(--canvas-warm)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: '16px', padding: '22px 32px', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink)', marginBottom: desc ? '6px' : 0 }}>
            {label}
          </div>
          {desc && (
            <p style={{ fontSize: '0.86rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
              {desc}
            </p>
          )}
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, marginTop: '2px', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--ink-faint)' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div style={{ padding: '0 32px 28px' }}>
          <IntroTextRenderer text={chunk} />
        </div>
      )}
    </div>
  );
}

const LANG_LABELS = { en: 'EN', sr: 'SR', de: 'DE', fr: 'FR', es: 'ES' };
