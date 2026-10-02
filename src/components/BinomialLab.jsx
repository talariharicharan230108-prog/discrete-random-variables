import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  Cell 
} from 'recharts';
import { 
  Sliders, 
  Sparkles, 
  RotateCcw,
  BookOpen,
  Info,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { 
  binomialPMF, 
  binomialMean, 
  binomialVariance, 
  binomialStdDev, 
  generateBinomialData 
} from '../utils/binomial';
import Tooltip from './Tooltip';

export default function BinomialLab({ n, setN, p, setP, selectedX, setSelectedX }) {
  const [showFormula, setShowFormula] = useState(false);

  // Dynamic calculations
  const pmfVal = binomialPMF(n, selectedX, p);
  const meanVal = binomialMean(n, p);
  const varVal = binomialVariance(n, p);
  const stdVal = binomialStdDev(n, p);

  const chartData = generateBinomialData(n, p, selectedX);

  const resetDefaults = () => {
    setN(20);
    setP(0.6);
    setSelectedX(12);
  };

  const applyPreset = (presetN, presetP, presetX) => {
    setN(presetN);
    setP(presetP);
    setSelectedX(Math.min(presetX, presetN));
  };

  return (
    <section id="binomial-lab" className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Simulator • Module IV</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
            Binomial Distribution Simulator
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            How many successes can occur in a fixed number of independent trials?
          </p>
        </div>

        {/* STEP 1: UNDERSTAND */}
        <div className="glass-card p-6 border-blue-500/30 bg-gradient-to-r from-blue-950/30 via-slate-900/40 to-cyan-950/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Step 1 — Understand the Concept</span>
              <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                Exam Pass Rate Example
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                If <code className="math-font text-cyan-300">20</code> students take an exam and each has a <code className="math-font text-purple-300">60%</code> chance of passing, what is the probability that exactly <code className="math-font text-emerald-300">12</code> students pass?
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button 
                onClick={resetDefaults}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-[var(--text-secondary)] border border-white/10 flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Parameters</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN LAB LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lab-layout">
          
          {/* STEP 2: SET PARAMETERS */}
          <div className="lg:col-span-5 space-y-6 parameters-panel">
            <div className="glass-card p-6 space-y-6 border-blue-500/20">
              
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Step 2 — Set Parameters
                </span>
                <Sliders className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Control 1: Number of Trials */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-white">Number of Trials</span>
                    <Tooltip text="The fixed total count of repeated independent experiments (n)." />
                    <span className="block text-[10px] font-mono text-[var(--text-muted)]">Symbol: n</span>
                  </div>
                  <span className="text-cyan-400 font-mono text-sm bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30 font-bold">
                    n = {n}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={n}
                  onChange={(e) => {
                    const newN = parseInt(e.target.value, 10);
                    setN(newN);
                    if (selectedX > newN) setSelectedX(newN);
                  }}
                  className="w-full"
                />
              </div>

              {/* Control 2: Success Probability */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-white">Probability of Success</span>
                    <Tooltip text="The chance of success on each trial (p, between 0% and 100%)." />
                    <span className="block text-[10px] font-mono text-[var(--text-muted)]">Symbol: p</span>
                  </div>
                  <span className="text-purple-400 font-mono text-sm bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/30 font-bold">
                    {(p * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={p}
                  onChange={(e) => setP(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Control 3: Observed Successes */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-white">Observed Successes</span>
                    <Tooltip text="The target number of successes to evaluate probability P(X = x)." />
                    <span className="block text-[10px] font-mono text-[var(--text-muted)]">Symbol: x</span>
                  </div>
                  <span className="text-emerald-400 font-mono text-sm bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30 font-bold">
                    x = {selectedX}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={n}
                  value={selectedX}
                  onChange={(e) => setSelectedX(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>

              {/* Quick Presets Buttons */}
              <div className="pt-3 border-t border-[var(--border-color)] space-y-2">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Preset Experiments:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button 
                    onClick={() => applyPreset(10, 0.5, 5)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-blue-500/20 text-[11px] text-blue-300 border border-blue-500/30 transition-all"
                  >
                    Fair Coin (n=10, p=0.5)
                  </button>
                  <button 
                    onClick={() => applyPreset(20, 0.6, 12)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500/20 text-[11px] text-cyan-300 border border-cyan-500/30 transition-all"
                  >
                    Exam Passes (n=20, p=0.6)
                  </button>
                  <button 
                    onClick={() => applyPreset(50, 0.05, 2)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-purple-500/20 text-[11px] text-purple-300 border border-purple-500/30 transition-all"
                  >
                    Rare Defect (n=50, p=0.05)
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* STEP 3 & 4: RESULTS & VISUALIZATION */}
          <div className="lg:col-span-7 space-y-6 chart-panel">
            
            {/* STEP 3: RESULT BANNER */}
            <div className="glass-card p-6 border-cyan-500/40 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-purple-950/40 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                    Step 3 — See the Result
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white math-font mt-1">
                    Probability of exactly {selectedX} successes: <span className="text-cyan-300">{(pmfVal * 100).toFixed(2)}%</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowFormula(!showFormula)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-cyan-300 border border-white/10 transition-colors shrink-0"
                >
                  {showFormula ? 'Hide Formula' : 'Show Formula'}
                </button>
              </div>

              {/* Toggleable Mathematical Formula */}
              {showFormula && (
                <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 animate-fadeIn">
                  P(X = {selectedX}) = C({n}, {selectedX}) · ({p.toFixed(2)})^{selectedX} · ({(1-p).toFixed(2)})^{n - selectedX} = {(pmfVal).toFixed(6)}
                </div>
              )}

              {/* Dynamic Plain-Language Explanation */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed">
                💡 <strong>What does this mean?</strong> Based on {n} trials with a {(p * 100).toFixed(0)}% success rate, the expected average outcome is <strong>{meanVal.toFixed(1)}</strong> successes. The chance of observing exactly <strong>{selectedX}</strong> successes is <strong>{(pmfVal * 100).toFixed(2)}%</strong>.
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                  <div className="text-[10px] text-blue-300 font-mono uppercase">
                    Expected Mean E(X)
                    <Tooltip text="The average number of successes expected over many repeated trials: E(X) = n * p." />
                  </div>
                  <div className="text-lg font-bold text-white math-font">{meanVal.toFixed(2)}</div>
                </div>

                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                  <div className="text-[10px] text-purple-300 font-mono uppercase">
                    Variance Var(X)
                    <Tooltip text="Measures outcome spread: Var(X) = n * p * (1 - p)." />
                  </div>
                  <div className="text-lg font-bold text-white math-font">{varVal.toFixed(2)}</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="text-[10px] text-emerald-300 font-mono uppercase">
                    Std Dev σ
                    <Tooltip text="Standard deviation σ = √Var(X)." />
                  </div>
                  <div className="text-lg font-bold text-white math-font">{stdVal.toFixed(2)}</div>
                </div>
              </div>

            </div>

            {/* STEP 4: VISUALIZE CHART */}
            <div className="glass-card p-6 border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase text-cyan-400">
                  Step 4 — Visualize Distribution
                </span>
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  Highlighting x = {selectedX}
                </span>
              </div>

              <div className="h-72 w-full chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <XAxis 
                      dataKey="x" 
                      stroke="#64748b" 
                      fontSize={11}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={11}
                      tickLine={false}
                      tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                    />
                    <RechartsTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="glass-card p-3 border-cyan-500/40 text-xs font-mono">
                              <div className="font-bold text-cyan-400">Successes (x) = {data.x}</div>
                              <div className="text-white">P(X = {data.x}) = {data.pmf}</div>
                              <div className="text-emerald-400">Percentage = {data.formattedPmf}</div>
                              <div className="text-purple-300">CDF P(X ≤ {data.x}) = {data.cdf}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="pmf" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry) => (
                        <Cell 
                          key={`cell-${entry.x}`} 
                          fill={entry.x === selectedX ? '#06b6d4' : '#3b82f6'} 
                          opacity={entry.x === selectedX ? 1 : 0.65}
                          stroke={entry.x === selectedX ? '#ffffff' : 'none'}
                          strokeWidth={entry.x === selectedX ? 2 : 0}
                        />
                      ))}
                    </Bar>
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
