'use client';
import { useState, useEffect } from 'react';

const studentData = {
  name: 'Narhen K.', learningStyle: 'Long-term Gradual', weeksActive: 6,
  modules: [{ name: 'SC1003 M1: Intro to Python', progress: 100 },{ name: 'SC1003 M2: Control Structures', progress: 67 },{ name: 'SC1003 M3: Functions', progress: 30 }],
  weeklyHoursHistory: [8, 12, 15, 10, 14, 16],
  quizHistory: [
    { topic: 'Variables', score: 90, week: 1 },{ topic: 'Data Types', score: 85, week: 1 },{ topic: 'If-Else', score: 80, week: 2 },{ topic: 'Loops Intro', score: 75, week: 3 },
    { topic: 'For Loops', score: 85, week: 3 },{ topic: 'While Loops', score: 70, week: 4 },{ topic: 'Nested Loops', score: 65, week: 4 },{ topic: 'Functions Intro', score: 80, week: 5 },
    { topic: 'Scope', score: 60, week: 5 },{ topic: 'Return Values', score: 75, week: 6 },
  ],
  loginFrequency: [3, 5, 6, 4, 5, 6], avgSessionMinutes: 95,
  weakTopics: ['Nested Loops', 'Scope', 'Recursion'], strongTopics: ['Variables', 'Data Types', 'For Loops'],
  flashcardsReviewed: 24, lostClicks: 3, lastActive: '2 hours ago', daysSinceLogin: 0,
};

const pc = { 'onboarding':'#3b82f6','building-momentum':'#10b981','steady-progress':'#22c55e','accelerating':'#8b5cf6','plateauing':'#f59e0b','declining':'#ef4444','inactive':'#6b7280','at-risk':'#dc2626' };
const pe = { 'onboarding':'🌱','building-momentum':'🚀','steady-progress':'📈','accelerating':'⚡','plateauing':'📊','declining':'📉','inactive':'💤','at-risk':'🚨' };

export default function InsightsPage() {
  const [ins, setIns] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('timeline');
  const [expNudge, setExpNudge] = useState(null);
  const [expInsight, setExpInsight] = useState(null);

  const fetch_ = async () => {
    setLoading(true);
    try { const r = await fetch('/api/insights', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(studentData) }); setIns(await r.json()); } catch (e) { console.error(e); }
    setLoading(false);
  };
  useEffect(() => { fetch_(); }, []);

  const phase = ins?.learningStateAnalysis;
  const color = pc[phase?.currentPhase] || '#3b82f6';
  const emoji = pe[phase?.currentPhase] || '📈';
  const tabs = [
    { id: 'timeline', label: '📈 Timeline' },{ id: 'mastery', label: '🎯 Topic Mastery' },{ id: 'forgetting', label: '🧠 Forgetting Curve' },
    { id: 'velocity', label: '⚡ Velocity' },{ id: 'cognitive', label: '🔋 Cognitive Load' },{ id: 'optimal', label: '⏰ Best Study Time' },
    { id: 'nudges', label: '🔔 Nudges' },{ id: 'explainable', label: '🔍 AI Reasoning' },{ id: 'report', label: '📋 Weekly Report' },{ id: 'adaptive', label: '🎯 Adaptive Plan' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3"><h1 className="text-xl font-extrabold text-white">NTU<span className="text-blue-400">learn</span></h1><span className="text-slate-500">|</span><span className="text-sm text-slate-300">AI Insights</span></div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.location.href = '/dashboard'} className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-all">Dashboard</button>
            <button onClick={() => window.location.href = '/course'} className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-all">Course</button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-start justify-between mb-6">
          <div><h2 className="text-2xl font-bold text-white mb-1">AI Learning Intelligence 🧠</h2><p className="text-sm text-slate-400">6 AI engines analyzing {studentData.quizHistory.length} scores, {studentData.weeksActive} weeks of data</p></div>
          <button onClick={fetch_} disabled={loading} className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white text-sm px-5 py-2.5 rounded-xl transition-all">{loading ? '⏳ Analyzing...' : '🔄 Refresh'}</button>
        </div>

        {loading ? (
          <div className="text-center py-20"><svg className="animate-spin h-12 w-12 mx-auto text-blue-400 mb-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg><p className="text-lg text-blue-300">Running 6 AI analysis engines...</p><p className="text-sm text-slate-500 mt-2">Topic Mastery · Forgetting Curve · Velocity · Cognitive Load · Optimal Time · Behavioral Analysis</p></div>
        ) : ins && !ins.error ? (
          <>
            {/* Phase Banner */}
            {phase && (
              <div className="p-6 rounded-2xl border bg-white/5 mb-6" style={{ borderColor: color + '40' }}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                      <span className="text-lg font-bold" style={{ color }}>{emoji} {(phase.currentPhase || '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                      <span className="text-xs bg-white/10 text-slate-300 px-2 py-0.5 rounded-full">Confidence: {Math.round((phase.confidenceScore || 0) * 100)}%</span>
                    </div>
                    <p className="text-sm text-slate-400 max-w-xl">{phase.phaseDescription}</p>
                    {phase.signals?.length > 0 && <div className="flex flex-wrap gap-2 mt-2">{phase.signals.map((s, i) => <span key={i} className="text-xs bg-white/5 border border-white/10 text-slate-400 px-2 py-1 rounded-lg">📊 {s}</span>)}</div>}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">vs Last Week</p>
                    <p className={`text-sm font-bold ${phase.comparedToLastWeek === 'improving' ? 'text-green-400' : phase.comparedToLastWeek === 'declining' ? 'text-red-400' : 'text-amber-400'}`}>{phase.comparedToLastWeek === 'improving' ? '📈 Improving' : phase.comparedToLastWeek === 'declining' ? '📉 Declining' : '➡️ Stable'}</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">{phase.predictedTrajectory}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">{tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${tab === t.id ? 'bg-blue-500 text-white shadow-lg' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>{t.label}</button>))}</div>

            {/* TIMELINE */}
            {tab === 'timeline' && (
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Learning Phase Evolution</h3>
                  <div className="relative"><div className="absolute top-6 left-6 right-6 h-1 bg-white/10 rounded" />
                    <div className="flex justify-between relative px-2">{(ins.weeklyMetrics || []).map((w, i) => {
                      const phases = ['onboarding','building-momentum','steady-progress','plateauing','declining','building-momentum'];
                      const c = pc[phases[i]] || '#3b82f6';
                      return (<div key={i} className="flex flex-col items-center relative z-10"><div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg mb-2" style={{ backgroundColor: c }}>{w.week}</div><p className="text-xs" style={{ color: c }}>{w.avgScore || '—'}%</p><p className="text-xs text-slate-500">{w.hours}h</p></div>);
                    })}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-white mb-3">📊 Avg Quiz Score</h4>
                    <div className="flex items-end gap-2" style={{ height: '180px' }}>
                      {(ins.weeklyMetrics || []).map((w, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-xs font-bold" style={{ color: (w.avgScore||0) >= 80 ? '#22c55e' : (w.avgScore||0) >= 70 ? '#f59e0b' : '#ef4444' }}>{w.avgScore||'—'}%</span>
                          <div className="w-full rounded-t-lg" style={{ height: `${Math.max(8, ((w.avgScore||0)/100)*160)}px`, backgroundColor: (w.avgScore||0) >= 80 ? '#22c55e' : (w.avgScore||0) >= 70 ? '#f59e0b' : '#ef4444' }} />
                          <span className="text-xs text-slate-500">{w.week}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-white mb-3">⏱️ Study Hours</h4>
                    <div className="flex items-end gap-2" style={{ height: '180px' }}>
                      {(ins.weeklyMetrics || []).map((w, i) => {
                        const maxH = Math.max(...(ins.weeklyMetrics || []).map(m => m.hours));
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-xs font-bold text-blue-300">{w.hours}h</span>
                            <div className="w-full rounded-t-lg bg-blue-500" style={{ height: `${Math.max(8, (w.hours/maxH)*160)}px` }} />
                            <span className="text-xs text-slate-500">{w.week}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-white mb-3">💬 Engagement</h4>
                    <div className="flex items-end gap-2" style={{ height: '180px' }}>
                      {(ins.weeklyMetrics || []).map((w, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-xs font-bold text-violet-300">{w.engagement}%</span>
                          <div className="w-full rounded-t-lg bg-violet-500" style={{ height: `${Math.max(8, (w.engagement/100)*160)}px` }} />
                          <span className="text-xs text-slate-500">{w.week}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {ins.timelineNarrative && <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl"><p className="text-xs font-bold text-blue-300 mb-1">🤖 AI Narrative</p><p className="text-sm text-slate-300">{ins.timelineNarrative}</p></div>}
              </div>
            )}

            {/* TOPIC MASTERY HEATMAP */}
            {tab === 'mastery' && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">🎯 Topic Mastery Heatmap</h3>
                <p className="text-sm text-slate-400 mb-4">Color-coded by mastery level — green is mastered, amber developing, red struggling</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {(ins.topicMastery || []).map((t, i) => (
                    <div key={i} className={`p-4 rounded-xl border text-center transition-all hover:scale-105 ${t.mastery === 'mastered' ? 'bg-green-500/15 border-green-500/30' : t.mastery === 'developing' ? 'bg-amber-500/15 border-amber-500/30' : 'bg-red-500/15 border-red-500/30'}`}>
                      <p className="text-xs font-medium text-white mb-2">{t.topic}</p>
                      <p className={`text-2xl font-extrabold ${t.mastery === 'mastered' ? 'text-green-400' : t.mastery === 'developing' ? 'text-amber-400' : 'text-red-400'}`}>{t.avgScore}%</p>
                      <p className="text-xs text-slate-400 mt-1">{t.attempts} attempts</p>
                      <p className={`text-xs mt-1 ${t.trend === 'improving' ? 'text-green-400' : t.trend === 'declining' ? 'text-red-400' : 'text-slate-500'}`}>{t.trend === 'improving' ? '↑ improving' : t.trend === 'declining' ? '↓ declining' : '→ stable'}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-6 mt-4 text-xs text-slate-500"><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500" /> Mastered (≥85%)</span><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500" /> Developing (70-84%)</span><span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500" /> Struggling (&lt;70%)</span></div>
              </div>
            )}

            {/* FORGETTING CURVE */}
            {tab === 'forgetting' && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">🧠 Forgetting Curve Predictor</h3>
                  <p className="text-sm text-slate-400 mb-4">AI predicts when you'll forget each topic using Ebbinghaus decay model</p>
                  <div className="space-y-3">
                    {(ins.forgettingCurve || []).sort((a, b) => a.estimatedRetention - b.estimatedRetention).map((f, i) => (
                      <div key={i} className={`p-4 rounded-xl border ${f.urgency === 'urgent' ? 'bg-red-500/10 border-red-500/20' : f.urgency === 'soon' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{f.topic}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${f.urgency === 'urgent' ? 'bg-red-500/20 text-red-300' : f.urgency === 'soon' ? 'bg-amber-500/20 text-amber-300' : 'bg-green-500/20 text-green-300'}`}>{f.urgency === 'urgent' ? '🚨 Review NOW' : f.urgency === 'soon' ? '⏰ Review Soon' : '✅ Fresh'}</span>
                          </div>
                          <span className="text-xs text-slate-400">Studied {f.weeksSinceStudied}w ago · Original: {f.originalScore}%</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${f.estimatedRetention}%`, backgroundColor: f.urgency === 'urgent' ? '#ef4444' : f.urgency === 'soon' ? '#f59e0b' : '#22c55e' }} />
                          </div>
                          <span className="text-sm font-bold text-white w-16 text-right">{f.estimatedRetention}%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">📅 Recommended review: in {f.reviewInDays} day{f.reviewInDays > 1 ? 's' : ''}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {ins.aiAdvice?.forgettingCurve && <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"><p className="text-xs font-bold text-blue-300 mb-1">🤖 AI Advice</p><p className="text-sm text-slate-300">{ins.aiAdvice.forgettingCurve}</p></div>}
              </div>
            )}

            {/* LEARNING VELOCITY */}
            {tab === 'velocity' && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">⚡ Learning Velocity</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl text-center">
                      <p className="text-xs text-violet-400 mb-1">Speed</p>
                      <p className={`text-3xl font-extrabold ${ins.learningVelocity?.velocity > 0 ? 'text-green-400' : ins.learningVelocity?.velocity < 0 ? 'text-red-400' : 'text-amber-400'}`}>{ins.learningVelocity?.velocity > 0 ? '+' : ''}{ins.learningVelocity?.velocity}</p>
                      <p className="text-xs text-slate-500">pts/quiz</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                      <p className="text-xs text-blue-400 mb-1">Efficiency</p>
                      <p className="text-3xl font-extrabold text-blue-300">{ins.learningVelocity?.efficiency}</p>
                      <p className="text-xs text-slate-500">pts/hour</p>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                      <p className="text-xs text-green-400 mb-1">Trend</p>
                      <p className="text-2xl font-extrabold text-white">{ins.learningVelocity?.trend === 'accelerating' ? '🚀' : ins.learningVelocity?.trend === 'decelerating' ? '🐌' : '➡️'}</p>
                      <p className="text-xs text-slate-500">{ins.learningVelocity?.trend}</p>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-3">Points per Hour by Week</h4>
                  <div className="flex items-end gap-3 h-32">{(ins.learningVelocity?.weeklyVelocity || []).map((w, i) => (<div key={i} className="flex-1 flex flex-col items-center gap-1"><span className="text-xs text-emerald-300">{w.pointsPerHour || '—'}</span><div className="w-full rounded-t-md bg-emerald-500" style={{ height: `${((w.pointsPerHour || 0) / 20) * 100}%`, minHeight: '4px' }} /><span className="text-xs text-slate-500">{w.week}</span></div>))}</div>
                </div>
                {ins.aiAdvice?.velocity && <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"><p className="text-xs font-bold text-blue-300 mb-1">🤖 AI Advice</p><p className="text-sm text-slate-300">{ins.aiAdvice.velocity}</p></div>}
              </div>
            )}

            {/* COGNITIVE LOAD */}
            {tab === 'cognitive' && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">🔋 Cognitive Load Detector</h3>
                  <p className="text-sm text-slate-400 mb-4">Are you studying too many hard topics at once?</p>
                  <div className="space-y-3">{(ins.cognitiveLoad || []).map((c, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${c.level === 'overloaded' ? 'bg-red-500/10 border-red-500/20' : c.level === 'moderate' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-white">{c.week}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${c.level === 'overloaded' ? 'bg-red-500/20 text-red-300' : c.level === 'moderate' ? 'bg-amber-500/20 text-amber-300' : 'bg-green-500/20 text-green-300'}`}>{c.level === 'overloaded' ? '🔴 Overloaded' : c.level === 'moderate' ? '🟡 Moderate' : '🟢 Optimal'}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-2"><div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${c.cognitiveLoad}%`, backgroundColor: c.level === 'overloaded' ? '#ef4444' : c.level === 'moderate' ? '#f59e0b' : '#22c55e' }} /></div><span className="text-sm font-bold text-white">{c.cognitiveLoad}%</span></div>
                      <div className="flex gap-4 text-xs text-slate-400"><span>{c.topicCount} topics</span><span>{c.hardTopicCount} hard</span><span>Avg: {c.avgScore}%</span><span>Topics: {c.topics.join(', ')}</span></div>
                    </div>
                  ))}</div>
                </div>
                {ins.aiAdvice?.cognitiveLoad && <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"><p className="text-xs font-bold text-blue-300 mb-1">🤖 AI Advice</p><p className="text-sm text-slate-300">{ins.aiAdvice.cognitiveLoad}</p></div>}
              </div>
            )}

            {/* OPTIMAL STUDY TIME */}
            {tab === 'optimal' && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-2">⏰ Optimal Study Time Analysis</h3>
                  <p className="text-sm text-slate-400 mb-4">AI detected when you perform best based on session data</p>
                  <div className="space-y-3">{(ins.optimalStudyTime || []).map((t, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${t.performance === 'peak' ? 'bg-green-500/10 border-green-500/20' : t.performance === 'good' ? 'bg-blue-500/10 border-blue-500/20' : t.performance === 'low' ? 'bg-red-500/10 border-red-500/20' : 'bg-white/5 border-white/10'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-white">{t.label}</p>
                          <p className="text-xs text-slate-400 mt-1">{t.sessionCount} sessions · avg {t.avgDuration || '—'} min</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-extrabold ${t.performance === 'peak' ? 'text-green-400' : t.performance === 'good' ? 'text-blue-400' : t.performance === 'low' ? 'text-red-400' : 'text-slate-500'}`}>{t.avgScore || '—'}%</p>
                          <p className={`text-xs ${t.performance === 'peak' ? 'text-green-300' : t.performance === 'good' ? 'text-blue-300' : t.performance === 'low' ? 'text-red-300' : 'text-slate-500'}`}>{t.performance === 'peak' ? '⭐ Peak Performance' : t.performance === 'good' ? '👍 Good' : t.performance === 'low' ? '⚠️ Low Performance' : 'No data'}</p>
                        </div>
                      </div>
                    </div>
                  ))}</div>
                </div>
                {ins.aiAdvice?.optimalTime && <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"><p className="text-xs font-bold text-blue-300 mb-1">🤖 AI Advice</p><p className="text-sm text-slate-300">{ins.aiAdvice.optimalTime}</p></div>}
              </div>
            )}

            {/* NUDGES */}
            {tab === 'nudges' && <div className="space-y-4">{(ins.nudges || []).map((n, i) => (
              <div key={i} className={`border rounded-2xl overflow-hidden ${n.priority === 'high' ? 'bg-red-500/5 border-red-500/20' : n.priority === 'medium' ? 'bg-amber-500/5 border-amber-500/20' : 'bg-green-500/5 border-green-500/20'}`}>
                <div className="p-5 cursor-pointer" onClick={() => setExpNudge(expNudge === i ? null : i)}>
                  <div className="flex items-start gap-3"><span className="text-2xl">{{ 'topic-reminder':'📚','study-pattern':'📊','streak-motivation':'🔥','difficulty-adjustment':'⚙️','inactivity-warning':'⏰','acceleration-praise':'🚀' }[n.type] || '📌'}</span><div className="flex-1"><div className="flex items-center gap-2 mb-1"><h4 className="text-sm font-bold text-white">{n.title}</h4><span className={`text-xs px-2 py-0.5 rounded-full ${n.priority === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'}`}>{n.priority}</span></div><p className="text-sm text-slate-300">{n.message}</p></div><span className="text-slate-500">{expNudge === i ? '▲' : '▼'}</span></div>
                </div>
                {expNudge === i && <div className="px-5 pb-5 border-t border-white/10 pt-4 grid grid-cols-2 gap-4"><div className="p-3 bg-white/5 rounded-xl"><p className="text-xs text-slate-400 mb-1">🎯 Action</p><p className="text-sm text-white">{n.action}</p></div><div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl"><p className="text-xs text-blue-400 mb-1">🧠 Why? (XAI)</p><p className="text-sm text-blue-200">{n.reasoning}</p></div></div>}
              </div>
            ))}</div>}

            {/* EXPLAINABLE AI */}
            {tab === 'explainable' && <div className="space-y-4">{(ins.explainableInsights || []).map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-5 cursor-pointer" onClick={() => setExpInsight(expInsight === i ? null : i)}>
                  <div className="flex items-start justify-between gap-4"><div className="flex-1"><p className="text-sm font-bold text-white mb-1">{item.insight}</p><p className="text-xs text-slate-400">{item.recommendation}</p></div><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: item.confidence > 0.8 ? '#22c55e' : '#f59e0b' }}><span className="text-xs font-bold text-white">{Math.round(item.confidence * 100)}%</span></div><span className="text-slate-500">{expInsight === i ? '▲' : '▼'}</span></div></div>
                </div>
                {expInsight === i && <div className="px-5 pb-5 border-t border-white/10 pt-4 space-y-3"><div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl"><p className="text-xs text-blue-400 mb-1">📊 Evidence</p><p className="text-sm text-blue-200">{item.evidence}</p></div><div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl"><p className="text-xs text-violet-400 mb-1">⚡ Impact</p><p className="text-sm text-violet-200">{item.impact}</p></div></div>}
              </div>
            ))}</div>}

            {/* WEEKLY REPORT */}
            {tab === 'report' && ins.weeklyReport && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">📋 AI Weekly Report</h3>
                <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-4"><p className="text-sm text-slate-200 leading-relaxed">{ins.weeklyReport.summary}</p></div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl"><p className="text-xs font-bold text-green-400 mb-2">✅ Highlights</p>{(ins.weeklyReport.highlights || []).map((h, i) => <p key={i} className="text-sm text-green-200 mb-1">• {h}</p>)}</div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl"><p className="text-xs font-bold text-amber-400 mb-2">⚠️ Needs Attention</p>{(ins.weeklyReport.concerns || []).map((c, i) => <p key={i} className="text-sm text-amber-200 mb-1">• {c}</p>)}</div>
                </div>
                <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl mb-4"><p className="text-xs font-bold text-violet-400 mb-1">🎯 Goal for Next Week</p><p className="text-sm text-violet-200">{ins.weeklyReport.goalForNextWeek}</p></div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl"><p className="text-sm text-slate-300 italic">💬 {ins.weeklyReport.motivationalNote}</p></div>
              </div>
            )}

            {/* ADAPTIVE */}
            {tab === 'adaptive' && <div className="space-y-4">{(ins.adaptiveRecommendations || []).map((r, i) => {
              const icons = { content:'📚', schedule:'📅', difficulty:'⚙️', format:'🎨' };
              const colors = { content:'#3b82f6', schedule:'#22c55e', difficulty:'#f59e0b', format:'#8b5cf6' };
              return (<div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: (colors[r.category]||'#3b82f6') + '20' }}>{icons[r.category]||'🎯'}</div><div className="flex-1"><p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: colors[r.category] }}>{r.category}</p><p className="text-base font-bold text-white mb-3">{r.recommendation}</p><div className="grid grid-cols-2 gap-3"><div className="p-3 bg-white/5 rounded-xl"><p className="text-xs text-slate-400 mb-1">🧠 Reason</p><p className="text-xs text-slate-300">{r.reason}</p></div><div className="p-3 rounded-xl" style={{ backgroundColor: (colors[r.category]||'#3b82f6') + '15' }}><p className="text-xs mb-1" style={{ color: colors[r.category] }}>📈 Impact</p><p className="text-xs text-slate-300">{r.expectedImpact}</p></div></div></div></div></div>);
            })}</div>}

            {/* Meta */}
            {ins.meta && <div className="flex items-center gap-4 text-xs text-slate-500 mt-6"><span>⚡ {ins.meta.analysisTimeMs}ms</span><span>📊 {ins.meta.dataPointsAnalyzed} data points</span><span>🔧 {ins.meta.rulesApplied} rules</span><span>🧠 {ins.meta.featuresComputed} engines</span><span>🤖 {ins.meta.aiModel}</span></div>}
          </>
        ) : <div className="text-center py-16"><p className="text-red-400">Analysis failed. Click Refresh.</p></div>}
      </div>
    </div>
  );
}
