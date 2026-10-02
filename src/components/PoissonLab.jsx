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
import { Sliders, Clock, RotateCcw, Zap } from 'lucide-react';
import { 
  poissonPMF, 
  poissonMean, 
  poissonVariance, 
  poissonStdDev, 
  generatePoissonData 
} from '../utils/poisson';
import Tooltip from './Tooltip';

export default function PoissonLab({ lambda, setLambda, selectedX, setSelectedX }) {
  const [showFormula, setShowFormula] = useState(false);

  const pmfVal = poissonPMF(lambda, selectedX);
  const meanVal = poissonMean(lambda);
  const varVal = poissonVariance(lambda);
  const stdVal = poissonStdDev(lambda);

  const chartData = generatePoissonData(lambda, selectedX);

  const resetDefaults = () => {
    setLambda(5.0);
    setSelectedX(3);
  };

  const applyPreset = (presetLambda, presetX) => {
    setLambda(presetLambda);
    setSelectedX(presetX);
  };

  return (
    <section id="poisson-lab" className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Event Rate Simulator • Module IV</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
            Poisson Distribution Simulator
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            How many times does an event occur within a fixed interval of time or space?
          </p>
        </div>

        {/* STEP 1: UNDERSTAND */}
        <div className="glass-card p-6 border-purple-500/30 bg-gradient-to-r from-purple-950/30 via-slate-900/40 to-cyan-950/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Step 1 — Understand the Concept</span>
              <h3 className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                Customer Arrivals Example
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                If an average of <code className="math-font text-purple-300">5</code> customers arrive at a store every 10 minutes, what is the probability that exactly <code className="math-font text-cyan-300">3</code> customers arrive?
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
            <div className="glass-card p-6 space-y-6 border-purple-500/20">
              
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
                  Step 2 — Set Parameters
                </span>
                <Sliders className="w-4 h-4 text-purple-400" />
              </div>

              {/* Control 1: Average Event Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-white">Average Event Rate</span>
                    <Tooltip text="The average rate of event arrivals per fixed interval (λ)." />
                    <span className="block text-[10px] font-mono text-[var(--text-muted)]">Symbol: λ (lambda)</span>
                  </div>
                  <span className="text-purple-400 font-mono text-sm bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/30 font-bold">
                    λ = {lambda.toFixed(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="20"
                  step="0.1"
                  value={lambda}
                  onChange={(e) => setLambda(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Control 2: Events to Analyze */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-white">Events to Analyze</span>
                    <Tooltip text="The specific count of event occurrences to evaluate P(X = x)." />
                    <span className="block text-[10px] font-mono text-[var(--text-muted)]">Symbol: x</span>
                  </div>
                  <span className="text-cyan-400 font-mono text-sm bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30 font-bold">
                    x = {selectedX}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(25, Math.ceil(lambda + 3 * Math.sqrt(lambda)))}
                  value={selectedX}
                  onChange={(e) => setSelectedX(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>

              {/* Quick Presets */}
              <div className="pt-3 border-t border-[var(--border-color)] space-y-2">
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase">Preset Scenarios:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button 
                    onClick={() => applyPreset(2.5, 3)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-purple-500/20 text-[11px] text-purple-300 border border-purple-500/30 transition-all"
                  >
                    Call Center (λ=2.5)
                  </button>
                  <button 
                    onClick={() => applyPreset(5.0, 3)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500/20 text-[11px] text-cyan-300 border border-cyan-500/30 transition-all"
                  >
                    Store Arrivals (λ=5.0)
                  </button>
                  <button 
                    onClick={() => applyPreset(8.0, 8)}
                    className="px-2.5 py-1 rounded bg-white/5 hover:bg-blue-500/20 text-[11px] text-blue-300 border border-blue-500/30 transition-all"
                  >
                    Traffic (λ=8.0)
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* STEP 3 & 4: RESULTS & VISUALIZATION */}
          <div className="lg:col-span-7 space-y-6 chart-panel">
            
            {/* STEP 3: RESULT BANNER */}
            <div className="glass-card p-6 border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-cyan-950/40 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono uppercase text-purple-400 font-bold">
                    Step 3 — See the Result
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white math-font mt-1">
                    Probability of exactly {selectedX} events: <span className="text-purple-300">{(pmfVal * 100).toFixed(2)}%</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowFormula(!showFormula)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-purple-300 border border-white/10 transition-colors shrink-0"
                >
                  {showFormula ? 'Hide Formula' : 'Show Formula'}
                </button>
              </div>

              {/* Toggleable Formula */}
              {showFormula && (
                <div className="p-3 rounded-xl bg-black/60 border border-purple-500/30 text-xs font-mono text-purple-300 animate-fadeIn">
                  P(X = {selectedX}) = (e^-{lambda.toFixed(1)} · {lambda.toFixed(1)}^{selectedX}) / {selectedX}! = {(pmfVal).toFixed(6)}
                </div>
              )}

              {/* Dynamic Plain-Language Explanation */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed">
                💡 <strong>What does this mean?</strong> Based on the selected average rate of <strong>{lambda.toFixed(1)}</strong> events per interval, there is approximately a <strong>{(pmfVal * 100).toFixed(2)}%</strong> chance of observing exactly <strong>{selectedX}</strong> events occurring during the interval.
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                  <div className="text-[10px] text-purple-300 font-mono uppercase">
                    Mean E(X)
                    <Tooltip text="For Poisson processes, Mean E(X) is equal to rate parameter λ." />
                  </div>
                  <div className="text-lg font-bold text-white math-font">{meanVal.toFixed(2)}</div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                  <div className="text-[10px] text-cyan-300 font-mono uppercase">
                    Variance Var(X)
                    <Tooltip text="Key Poisson hallmark: Variance Var(X) equals Mean E(X) = λ." />
                  </div>
                  <div className="text-lg font-bold text-white math-font">{varVal.toFixed(2)}</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="text-[10px] text-emerald-300 font-mono uppercase">
                    Std Dev σ
                    <Tooltip text="Standard deviation σ = √λ." />
                  </div>
                  <div className="text-lg font-bold text-white math-font">{stdVal.toFixed(2)}</div>
                </div>
              </div>

            </div>

            {/* STEP 4: VISUALIZE CHART */}
            <div className="glass-card p-6 border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase text-purple-400">
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
                            <div className="glass-card p-3 border-purple-500/40 text-xs font-mono">
                              <div className="font-bold text-purple-400">Events (x) = {data.x}</div>
                              <div className="text-white">P(X = {data.x}) = {data.pmf}</div>
                              <div className="text-emerald-400">Percentage = {data.formattedPmf}</div>
                              <div className="text-cyan-300">CDF P(X ≤ {data.x}) = {data.cdf}</div>
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
                          fill={entry.x === selectedX ? '#a855f7' : '#6366f1'} 
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
