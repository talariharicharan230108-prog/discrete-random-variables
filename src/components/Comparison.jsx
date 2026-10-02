import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  Legend 
} from 'recharts';
import { GitCompare, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';
import { generateBinomialPoissonComparisonData } from '../utils/calculations';

export default function Comparison() {
  const [n, setN] = useState(50);
  const [p, setP] = useState(0.08);

  // Decision Assistant State
  const [q1Binary, setQ1Binary] = useState('yes');
  const [q2FixedN, setQ2FixedN] = useState('yes');
  const [q3RareEvents, setQ3RareEvents] = useState('no');

  const comparisonResult = generateBinomialPoissonComparisonData(n, p);

  // Determine recommended model
  let recommendedModel = 'Binomial Distribution';
  let modelReason = 'Outcome is binary success/failure with a fixed number of trials n.';
  if (q3RareEvents === 'yes' || q2FixedN === 'no') {
    recommendedModel = 'Poisson Distribution';
    modelReason = 'Modeling event counts per continuous interval where event rate λ is constant.';
  }

  const tableRows = [
    {
      feature: 'Distribution Type',
      binomial: 'Discrete (Fixed trials n)',
      poisson: 'Discrete (Event rates over interval λ)'
    },
    {
      feature: 'Parameters',
      binomial: 'n (trials), p (success prob)',
      poisson: 'λ (average rate per interval)'
    },
    {
      feature: 'Number of Trials (n)',
      binomial: 'Fixed & finite (n = 1, 2, 3...)',
      poisson: 'Tends to infinity (n → ∞)'
    },
    {
      feature: 'Probability of Event (p)',
      binomial: 'Constant per trial (0 ≤ p ≤ 1)',
      poisson: 'Tends to zero (p → 0, rare events)'
    },
    {
      feature: 'Mean E(X)',
      binomial: 'n · p',
      poisson: 'λ (where λ = n·p)'
    },
    {
      feature: 'Variance Var(X)',
      binomial: 'n · p · (1 - p)',
      poisson: 'λ (Variance equals Mean)'
    },
    {
      feature: 'Typical Application',
      binomial: 'Exam passes, coin flips, survey checks',
      poisson: 'Customer arrivals, call center volume'
    }
  ];

  return (
    <section id="comparison" className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <GitCompare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Distribution Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
            Binomial vs Poisson
          </h2>
          <p className="text-[var(--text-secondary)] text-base">
            Understand key mathematical differences and discover how Poisson acts as the limit of Binomial as trial count expands.
          </p>
        </div>

        {/* DECISION ASSISTANT: WHICH DISTRIBUTION FITS? */}
        <div className="glass-card p-6 sm:p-8 border-cyan-500/40 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-purple-950/40 space-y-6">
          <div className="flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
              Which Distribution Fits Your Data?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Question 1 */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-200 block">1. Is the outcome binary (success / failure)?</label>
              <select
                value={q1Binary}
                onChange={(e) => setQ1Binary(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-cyan-300 font-mono text-xs focus:outline-none"
              >
                <option value="yes">Yes (Pass/Fail, Defect/No Defect)</option>
                <option value="no">No (Continuous or count data)</option>
              </select>
            </div>

            {/* Question 2 */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-200 block">2. Is the number of trials fixed (n)?</label>
              <select
                value={q2FixedN}
                onChange={(e) => setQ2FixedN(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-cyan-300 font-mono text-xs focus:outline-none"
              >
                <option value="yes">Yes (Fixed n trials)</option>
                <option value="no">No (Continuous time/space interval)</option>
              </select>
            </div>

            {/* Question 3 */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-200 block">3. Are you counting rare arrival events?</label>
              <select
                value={q3RareEvents}
                onChange={(e) => setQ3RareEvents(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-black/60 border border-white/10 text-cyan-300 font-mono text-xs focus:outline-none"
              >
                <option value="no">No (Standard binomial trials)</option>
                <option value="yes">Yes (Customer arrivals, call rates)</option>
              </select>
            </div>
          </div>

          {/* Recommended Result Box */}
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-cyan-400">Recommended Model:</span>
              <div className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">{recommendedModel}</div>
              <p className="text-xs text-slate-300 mt-0.5">{modelReason}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-cyan-400 shrink-0" />
          </div>
        </div>

        {/* Dynamic Dual Overlay Chart */}
        <div className="glass-card p-6 sm:p-8 border-cyan-500/30 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-4">
            <div>
              <span className="text-xs uppercase font-mono text-cyan-400 font-bold">Limit Theorem Experiment</span>
              <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">
                Dual Distribution Overlay (n = {n}, p = {p.toFixed(3)}, λ = {comparisonResult.lambda})
              </h3>
            </div>
            <div className="text-xs font-mono px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-bold">
              Max Error: {comparisonResult.maxDiff}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Trials (n)</span>
                  <span className="text-blue-400 font-mono font-bold">n = {n}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={n}
                  onChange={(e) => setN(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Probability (p)</span>
                  <span className="text-purple-400 font-mono font-bold">p = {p.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.005"
                  max="0.30"
                  step="0.005"
                  value={p}
                  onChange={(e) => setP(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
                💡 As <code className="math-font text-cyan-300">n</code> expands and <code className="math-font text-purple-300">p</code> decreases while <code className="math-font text-emerald-300">λ = np = {comparisonResult.lambda}</code> remains constant, the Binomial distribution converges smoothly into Poisson!
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="h-72 w-full chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonResult.data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <XAxis dataKey="x" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <RechartsTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="glass-card p-3 border-cyan-500/40 text-xs font-mono space-y-1">
                              <div className="font-bold text-white">Outcome Count (x) = {data.x}</div>
                              <div className="text-blue-400">Binomial: {data.formattedBinomial}</div>
                              <div className="text-purple-400">Poisson: {data.formattedPoisson}</div>
                              <div className="text-emerald-400">Abs Error: {data.diff}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar dataKey="binomial" name="Binomial PMF" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="poisson" name="Poisson PMF" fill="#a855f7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Matrix Table */}
        <div className="glass-card overflow-hidden border-white/10">
          <div className="p-5 border-b border-[var(--border-color)] bg-white/5">
            <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
              Feature Comparison Matrix
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/40 text-[var(--text-muted)] uppercase font-mono border-b border-[var(--border-color)]">
                <tr>
                  <th className="p-4 w-1/4">Feature / Aspect</th>
                  <th className="p-4 w-3/8 text-blue-400">Binomial Distribution</th>
                  <th className="p-4 w-3/8 text-purple-400">Poisson Distribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)] font-mono">
                {tableRows.map((row, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-white font-sans">{row.feature}</td>
                    <td className="p-4 text-blue-200">{row.binomial}</td>
                    <td className="p-4 text-purple-200">{row.poisson}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
