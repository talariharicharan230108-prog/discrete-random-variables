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
import { 
  FlaskConical, 
  Database, 
  RefreshCw,
  Binary,
  Clock
} from 'lucide-react';
import { 
  parseObservations, 
  calculateDescriptiveStats, 
  calculatePoissonObservedVsExpected, 
  SAMPLE_DATASETS 
} from '../utils/statistics';
import Tooltip from './Tooltip';

export default function StatisticalLab() {
  const [labMode, setLabMode] = useState('poisson'); // 'binomial' | 'poisson' | 'custom'
  const [inputText, setInputText] = useState('4, 6, 5, 7, 3, 4, 6, 5, 4, 6');
  
  const observations = parseObservations(inputText);
  const stats = calculateDescriptiveStats(observations);
  const poissonAnalysis = calculatePoissonObservedVsExpected(observations);

  const handleDatasetSelect = (key) => {
    if (SAMPLE_DATASETS[key]) {
      setInputText(SAMPLE_DATASETS[key].rawStr);
    }
  };

  return (
    <section id="stat-lab" className="real-world-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header with 48px margin bottom and 1.7 line height */}
        <div className="section-header">
          <div className="eyebrow-label">
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            <span>Empirical Model Fitting</span>
          </div>
          <h2 className="section-title">
            Statistical Laboratory &amp; Model Fitting
          </h2>
          <p className="section-subtitle">
            Fit theoretical Binomial and Poisson probability distributions to illustrative project datasets or custom observations, evaluating goodness-of-fit via Chi-Square.
          </p>
        </div>

        {/* 2 LARGE EXPERIMENT MODE SELECTION BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <button
            onClick={() => {
              setLabMode('poisson');
              handleDatasetSelect('customerArrivals');
            }}
            className={`p-5 rounded-2xl border text-left transition-all flex items-center gap-4 ${
              labMode === 'poisson'
                ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'glass-card text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-purple-400 font-bold">Experiment Mode A</div>
              <div className="text-base font-bold text-white">Poisson Fitting</div>
            </div>
          </button>

          <button
            onClick={() => {
              setLabMode('binomial');
              handleDatasetSelect('examScores');
            }}
            className={`p-5 rounded-2xl border text-left transition-all flex items-center gap-4 ${
              labMode === 'binomial'
                ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'glass-card text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Binary className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-blue-400 font-bold">Experiment Mode B</div>
              <div className="text-base font-bold text-white">Binomial Fitting</div>
            </div>
          </button>

          <button
            onClick={() => setLabMode('custom')}
            className={`p-5 rounded-2xl border text-left transition-all flex items-center gap-4 ${
              labMode === 'custom'
                ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'glass-card text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-cyan-400 font-bold">Experiment Mode C</div>
              <div className="text-base font-bold text-white">Custom Dataset</div>
            </div>
          </button>
        </div>

        {/* DATASET INPUT CARD */}
        <div className="glass-card p-6 border-cyan-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {labMode === 'custom' ? 'Custom Raw Data Input' : 'Illustrative Project Dataset'}
                </h3>
                <span className="text-[11px] text-[var(--text-muted)] block">
                  Illustrative sample values for academic demonstration of theoretical distribution fitting
                </span>
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[var(--text-muted)] font-mono">Illustrative Presets:</span>
              {Object.keys(SAMPLE_DATASETS).map((key) => (
                <button
                  key={key}
                  onClick={() => handleDatasetSelect(key)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-xs font-medium text-cyan-300 border border-cyan-500/30 transition-colors"
                >
                  {SAMPLE_DATASETS[key].type}: {SAMPLE_DATASETS[key].title.split(':')[1]?.trim()?.split('(')[0] || key}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            className="w-full p-4 rounded-xl bg-black/60 border border-white/10 text-cyan-300 font-mono text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            placeholder="Enter comma-separated numerical observations (e.g. 4, 6, 5, 7, 3, 4, 6, 5, 4, 6)..."
          />

          <div className="flex flex-wrap justify-between items-center text-xs text-[var(--text-muted)] font-mono gap-2">
            <span>Parsed Observations: <strong className="text-cyan-400">{stats.count}</strong> numbers | Active: <span className="text-white">Illustrative Project Dataset</span></span>
            <button
              onClick={() => setInputText('')}
              className="text-rose-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Clear Observations</span>
            </button>
          </div>
        </div>

        {/* SUMMARY STAT CARDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 stats-grid">
          <div className="glass-card stat-card p-4 border-blue-500/20 text-center">
            <div className="text-[10px] uppercase text-[var(--text-muted)] font-mono mb-1 stat-label">
              Mean (μ)
              <Tooltip text="Sample mean average of observations." />
            </div>
            <div className="text-2xl font-extrabold text-blue-400 math-font stat-value">{stats.mean}</div>
          </div>

          <div className="glass-card stat-card p-4 border-purple-500/20 text-center">
            <div className="text-[10px] uppercase text-[var(--text-muted)] font-mono mb-1 stat-label">
              Median
              <Tooltip text="Middle value of ordered dataset." />
            </div>
            <div className="text-2xl font-extrabold text-purple-400 math-font stat-value">{stats.median}</div>
          </div>

          <div className="glass-card stat-card p-4 border-cyan-500/20 text-center">
            <div className="text-[10px] uppercase text-[var(--text-muted)] font-mono mb-1 stat-label">Mode</div>
            <div className="text-xl font-extrabold text-cyan-400 math-font truncate stat-value">
              {stats.mode.length > 0 ? stats.mode.join(', ') : 'None'}
            </div>
          </div>

          <div className="glass-card stat-card p-4 border-emerald-500/20 text-center">
            <div className="text-[10px] uppercase text-[var(--text-muted)] font-mono mb-1 stat-label">
              Sample Var (s²)
              <Tooltip text="Sample variance measure of dispersion." />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 math-font stat-value">{stats.sampleVariance}</div>
          </div>

          <div className="glass-card stat-card p-4 border-amber-500/20 text-center">
            <div className="text-[10px] uppercase text-[var(--text-muted)] font-mono mb-1 stat-label">Std Dev (s)</div>
            <div className="text-2xl font-extrabold text-amber-400 math-font stat-value">{stats.sampleStdDev}</div>
          </div>

          <div className="glass-card stat-card p-4 border-rose-500/20 text-center">
            <div className="text-[10px] uppercase text-[var(--text-muted)] font-mono mb-1 stat-label">Skewness</div>
            <div className="text-2xl font-extrabold text-rose-400 math-font stat-value">{stats.skewness}</div>
          </div>
        </div>

        {/* OBSERVED VS EXPECTED FITTING CHART */}
        <div className="glass-card p-6 border-white/10 space-y-6">
          <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-4">
            <div>
              <h3 className="text-base font-bold text-white font-['Plus_Jakarta_Sans']">
                Observed Frequencies vs Theoretical Model Fit
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Auto-estimated Rate λ = <strong className="text-cyan-300">{poissonAnalysis.lambda}</strong> | Goodness-of-fit Chi-Square χ² = <strong className="text-purple-300">{poissonAnalysis.chiSquare}</strong>
              </p>
            </div>
          </div>

          <div className="h-72 w-full chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={poissonAnalysis.data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="x" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <RechartsTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="glass-card p-2.5 text-xs font-mono">
                          <div className="text-cyan-400 font-bold">Value (x) = {d.x}</div>
                          <div className="text-purple-300">Observed Count: {d.observed}</div>
                          <div className="text-emerald-400">Theoretical Expected: {d.expected}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="observed" name="Observed Count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expected" name="Theoretical Poisson Expected" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
}
