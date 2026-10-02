import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Cell 
} from 'recharts';
import { Sparkles, Sliders, CheckCircle2, Zap } from 'lucide-react';
import { binomialPMF } from '../utils/binomial';
import { poissonPMF } from '../utils/poisson';
import { generateBinomialPoissonComparisonData } from '../utils/calculations';

export default function BinomialPoissonApprox() {
  const [n, setN] = useState(100);
  const [p, setP] = useState(0.04);
  const [targetX, setTargetX] = useState(4);

  const lambda = n * p;
  const bProb = binomialPMF(n, targetX, p);
  const pProb = poissonPMF(lambda, targetX);
  const diff = Math.abs(bProb - pProb);
  const pctDiff = bProb > 0 ? (diff / bProb) * 100 : 0;

  const comparison = generateBinomialPoissonComparisonData(n, p);

  return (
    <section id="approx-lab" className="py-24 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Poisson Approximation Laboratory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
            From Binomial to Poisson
          </h2>
          <p className="text-[var(--text-secondary)] text-base">
            The Poisson distribution acts as an accurate approximation to the Binomial distribution when trial count <code className="math-font text-cyan-400">n</code> is large, success probability <code className="math-font text-purple-400">p</code> is small, and the mean rate <code className="math-font text-emerald-400">λ = np</code> remains constant.
          </p>
        </div>

        {/* Live Approximation Badge */}
        <div className="glass-card p-6 border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-cyan-950/40 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="text-xs uppercase font-mono text-emerald-400 font-bold mb-1">
              Live Approximation Metric (Target x = {targetX})
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-white math-font">
                Diff: {diff.toFixed(6)}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                diff < 0.005 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {diff < 0.005 ? 'High Accuracy Fit' : 'Moderate Approximation'}
              </span>
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-2">
              Percentage Difference: <strong className="text-cyan-300">{pctDiff.toFixed(3)}%</strong>
            </div>
          </div>

          {/* Side-by-side values */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto text-center font-mono">
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <div className="text-[10px] text-blue-300 uppercase">Binomial P(X={targetX})</div>
              <div className="text-xl font-bold text-white">{(bProb * 100).toFixed(3)}%</div>
            </div>
            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <div className="text-[10px] text-purple-300 uppercase">Poisson P(X={targetX})</div>
              <div className="text-xl font-bold text-white">{(pProb * 100).toFixed(3)}%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-6 space-y-6 border-cyan-500/20">
              <h3 className="text-base font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
                Approximation Controls
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">Trials (n)</span>
                  <span className="text-cyan-400 font-mono">n = {n}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={n}
                  onChange={(e) => setN(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">Probability (p)</span>
                  <span className="text-purple-400 font-mono">p = {p.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.001"
                  max="0.25"
                  step="0.005"
                  value={p}
                  onChange={(e) => setP(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">Target Outcome (x)</span>
                  <span className="text-emerald-400 font-mono">x = {targetX}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.min(30, n)}
                  value={targetX}
                  onChange={(e) => setTargetX(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Calculated Rate λ = np:</span>
                  <span className="font-mono text-emerald-300 font-bold">{lambda.toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Avg Approximation Error:</span>
                  <span className="font-mono text-cyan-300">{comparison.avgDiff}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 border-white/10">
              <h4 className="text-sm font-bold text-[var(--text-primary)] mb-6">
                Comparative Overlay Chart (Binomial vs Poisson)
              </h4>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparison.data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <XAxis dataKey="x" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="glass-card p-2 text-xs font-mono">
                              <div>Outcome (x) = {d.x}</div>
                              <div className="text-blue-400">Binomial: {d.formattedBinomial}</div>
                              <div className="text-purple-400">Poisson: {d.formattedPoisson}</div>
                              <div className="text-emerald-400">Abs Error: {d.diff}</div>
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

      </div>
    </section>
  );
}
