'use client';

import FeatureShell from '@/components/feature/FeatureShell';
import Link from 'next/link';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type StatCardProps = {
  label: string;
  value: string;
  emoji: string;
  accent?: 'yellow' | 'blue' | 'purple' | 'green' | 'orange';
};

const accentMap: Record<NonNullable<StatCardProps['accent']>, string> = {
  yellow: 'from-yellow-500/20 to-transparent',
  blue: 'from-sky-500/20 to-transparent',
  purple: 'from-violet-500/20 to-transparent',
  green: 'from-emerald-500/20 to-transparent',
  orange: 'from-orange-500/20 to-transparent',
};

function StatCard({ label, value, emoji, accent = 'yellow' }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${accentMap[accent]}`} />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-white/55">{label}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</div>
        </div>
        <div className="text-2xl">{emoji}</div>
      </div>
    </div>
  );
}

const studyHours = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1.8 },
  { day: 'Wed', hours: 3.2 },
  { day: 'Thu', hours: 2.0 },
  { day: 'Fri', hours: 1.5 },
  { day: 'Sat', hours: 4.0 },
  { day: 'Sun', hours: 0.5 },
];

const quizTrend = [
  { quiz: 'M1 S1', score: 90 },
  { quiz: 'M1 S2', score: 85 },
  { quiz: 'M1 S3', score: 95 },
  { quiz: 'M2 S1', score: 80 },
  { quiz: 'M2 S2', score: 85 },
  { quiz: 'M3 S1', score: 70 },
];

function Card({ title, emoji, children }: { title: string; emoji?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="mb-4 flex items-center gap-2">
        {emoji ? <span className="text-lg">{emoji}</span> : null}
        <h3 className="text-sm font-semibold tracking-tight text-white/90">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const userName = 'Narhen';
  const learnerDNA = 'Long-term Gradual Learner';

  const totalHours = studyHours.reduce((a, b) => a + b.hours, 0).toFixed(1);

  return (
    <FeatureShell variant="app">
      {/* Background */}
      <div className="min-h-screen bg-[#070707] text-white">
        <div className="pointer-events-none fixed inset-0">
          {/* subtle glow */}
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[120px]" />
          <div className="absolute -left-44 top-40 h-[420px] w-[420px] rounded-full bg-yellow-500/10 blur-[140px]" />
          <div className="absolute -right-44 top-60 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[140px]" />
          {/* faint grid */}
          <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.25)_1px,transparent_0)] [background-size:22px_22px]" />
        </div>

        {/* Top bar */}
        <div className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <div className="text-sm font-semibold tracking-[0.32em] text-white/70">NTUlearn</div>

            <div className="flex items-center gap-3">
              {/* renamed */}
              <Link
                href="/course"
                className="rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
              >
                Courses
              </Link>

              {/* clickable profile chip */}
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 hover:bg-white/[0.08] transition"
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-semibold">
                  N
                </div>
                <div className="leading-tight">
                  <div className="text-[15px] font-semibold">{userName} K.</div>
                  <div className="text-[11px] text-white/55">View profile</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
          {/* Header */}
          <div className="mb-8">
            <div className="text-3xl font-semibold tracking-tight">
              Welcome back, <span className="text-yellow-300">{userName}</span>! 👋
            </div>
            <div className="mt-2 text-lg text-white/65">
              Learner DNA: <span className="text-white/85 font-semibold">{learnerDNA}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard label="Overall Progress" value="66%" emoji="📈" accent="yellow" />
            <StatCard label="Day Streak" value="7 days" emoji="🔥" accent="orange" />
            <StatCard label="Hours This Week" value={`${totalHours}h`} emoji="⏱️" accent="blue" />
            <StatCard label="AI Flashcards" value="24" emoji="🧠" accent="purple" />
            <StatCard label="Practice Qs" value="47" emoji="✅" accent="green" />
          </div>

          {/* Main grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* left: module progress + charts */}
            <div className="lg:col-span-2 space-y-6">
              <Card title="Module Progress" emoji="📚">
                <div className="space-y-4">
                  {[
                    {
                      title: 'SC1003 Module 2: Control Structures',
                      subtitle: 'Segments: 2/3 · Quiz Avg: 85%',
                      pct: 67,
                      status: 'IN PROGRESS',
                    },
                    {
                      title: 'SC1003 Module 3: Functions',
                      subtitle: 'Segments: 1/4 · Quiz Avg: 70%',
                      pct: 30,
                      status: 'IN PROGRESS',
                    },
                    {
                      title: 'SC1003 Module 1: Intro to Python',
                      subtitle: 'Segments: 3/3 · Quiz Avg: 95%',
                      pct: 100,
                      status: 'COMPLETE',
                    },
                  ].map((m) => (
                    <div key={m.title} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-white/90">{m.title}</div>
                          <div className="mt-1 text-xs text-white/55">{m.subtitle}</div>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white/70">
                          {m.status}
                        </span>
                      </div>

                      <div className="mt-3">
                        <div className="h-2 w-full rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full bg-yellow-400"
                            style={{ width: `${m.pct}%` }}
                          />
                        </div>
                        <div className="mt-2 text-xs text-white/50">{m.pct}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Study Hours This Week" emoji="🗓️">
                {/* FIX: ResponsiveContainer needs height */}
                <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studyHours} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                      <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 12 }} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(10,10,10,0.92)',
                          border: '1px solid rgba(255,255,255,0.10)',
                          borderRadius: 12,
                          color: 'white',
                        }}
                        labelStyle={{ color: 'rgba(255,255,255,0.8)' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        stroke="#facc15"
                        strokeWidth={2.5}
                        dot={{ r: 3, fill: '#facc15' }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-xs text-white/50">Total: {totalHours} hours this week</div>
              </Card>

              <Card title="Quiz Score Trend" emoji="🧪">
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={quizTrend} margin={{ top: 10, right: 12, left: -10, bottom: 0 }}>
                      <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                      <XAxis dataKey="quiz" tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 12 }} />
                      <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(10,10,10,0.92)',
                          border: '1px solid rgba(255,255,255,0.10)',
                          borderRadius: 12,
                          color: 'white',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#facc15"
                        strokeWidth={2.5}
                        dot={{ r: 3, fill: '#facc15' }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="AI Practice Paper Generator" emoji="📝">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-white/70">
                    Generate a targeted practice paper based on your weak topics and recent quiz performance.
                  </div>
                  <button className="rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90 transition">
                    Generate Practice Paper
                  </button>
                </div>
              </Card>
            </div>

            {/* right column */}
            <div className="space-y-6">
              <Card title="Anonymous Peer Comparison" emoji="👥">
                {[
                  { label: 'Your Score', val: 78, color: 'bg-yellow-400' },
                  { label: 'Cohort Average', val: 65, color: 'bg-sky-400' },
                  { label: 'Top 10%', val: 92, color: 'bg-emerald-400' },
                ].map((row) => (
                  <div key={row.label} className="mb-4">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>{row.label}</span>
                      <span className="text-white/80 font-semibold">{row.val}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                      <div className={`h-2 rounded-full ${row.color}`} style={{ width: `${row.val}%` }} />
                    </div>
                  </div>
                ))}
                <div className="text-[11px] text-white/40">
                  All comparisons are anonymous. No individual data is shared.
                </div>
              </Card>

              <Card title="Burnout Check" emoji="🧘">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white/85">Low Risk</div>
                    <div className="mt-1 text-xs text-white/55">
                      Your study patterns look healthy. Keep it up.
                    </div>
                  </div>
                  <button className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold hover:bg-white/[0.10] transition">
                    Check Now
                  </button>
                </div>
                <div className="mt-3 text-xs text-white/45">Score: 15/100</div>
              </Card>

              <Card title="Study Streak" emoji="🏅">
                <div className="flex items-end justify-between">
                  <div className="text-4xl font-semibold text-yellow-300">7</div>
                  <div className="text-xs text-white/55">consecutive days</div>
                </div>
                <div className="mt-4 flex gap-1">
                  {'MTWTFSS'.split('').map((d) => (
                    <div
                      key={d}
                      className="grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-[11px] text-white/70"
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="AI Features Used" emoji="🤖">
                <div className="space-y-2 text-xs text-white/65">
                  <div className="flex justify-between">
                    <span>Flashcards Generated</span>
                    <span className="font-semibold text-white/85">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Practice Qs Attempted</span>
                    <span className="font-semibold text-white/85">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span>“I am lost” Clicks</span>
                    <span className="font-semibold text-white/85">3</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </FeatureShell>
  );
}
