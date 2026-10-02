import React, { useState } from 'react';
import { Calculator, AlertCircle, BookOpen, ChevronDown, Check } from 'lucide-react';
import { binomialMean, binomialVariance, binomialStdDev } from '../utils/binomial';
import { poissonMean, poissonVariance, poissonStdDev } from '../utils/poisson';
import { calculateRangeProbability } from '../utils/calculations';
import Tooltip from './Tooltip';

export default function ProbabilityCalculator({ 
  activeBinom, 
  activePoisson, 
  onSyncBinom, 
  onSyncPoisson 
}) {
  const [distType, setDistType] = useState('binomial');
  const [operator, setOperator] = useState('equals');
  const [showFormula, setShowFormula] = useState(false);
  
  // Parameters
  const [n, setN] = useState(activeBinom?.n ?? 10);
  const [p, setP] = useState(activeBinom?.p ?? 0.5);
  const [lambda, setLambda] = useState(activePoisson?.lambda ?? 5.0);
  const [xVal, setXVal] = useState(5);
  const [minVal, setMinVal] = useState(2);
  const [maxVal, setMaxVal] = useState(7);

  // Sync back to parent simulator states when values change if handler exists
  const handleNChange = (val) => {
    const num = parseInt(val, 10) || 1;
    setN(num);
    if (onSyncBinom) onSyncBinom(num, p, xVal);
  };

  const handlePChange = (val) => {
    const num = parseFloat(val) || 0;
    setP(num);
    if (onSyncBinom) onSyncBinom(n, num, xVal);
  };

  const handleLambdaChange = (val) => {
    const num = parseFloat(val) || 0.1;
    setLambda(num);
    if (onSyncPoisson) onSyncPoisson(num, xVal);
  };

  const handleXChange = (val) => {
    const num = parseInt(val, 10) || 0;
    setXVal(num);
    if (distType === 'binomial' && onSyncBinom) onSyncBinom(n, p, num);
    if (distType === 'poisson' && onSyncPoisson) onSyncPoisson(lambda, num);
  };

  // Validation
  let errorMsg = null;
  if (distType === 'binomial') {
    if (n < 1) errorMsg = 'Number of trials (n) must be at least 1.';
    if (p < 0 || p > 1) errorMsg = 'Probability of success (p) must be between 0.0 and 1.0 (0% to 100%).';
    if (xVal > n && operator !== 'between') errorMsg = `Target successes (x = ${xVal}) cannot exceed trials (n = ${n}).`;
    if (operator === 'between' && minVal > maxVal) errorMsg = 'Minimum bound (a) cannot exceed maximum bound (b).';
    if (operator === 'between' && maxVal > n) errorMsg = `Upper bound (b = ${maxVal}) cannot exceed trials (n = ${n}).`;
  } else {
    if (lambda <= 0) errorMsg = 'Average event rate λ must be greater than 0.';
    if (operator === 'between' && minVal > maxVal) errorMsg = 'Minimum bound (a) cannot exceed maximum bound (b).';
  }

  // Calculate Result
  const params = { n, p, lambda };
  const calcResult = !errorMsg 
    ? calculateRangeProbability(distType, params, operator, xVal, minVal, maxVal) 
    : { probability: 0, percentage: '0%', explanation: '' };

  const mean = distType === 'binomial' ? binomialMean(n, p) : poissonMean(lambda);
  const variance = distType === 'binomial' ? binomialVariance(n, p) : poissonVariance(lambda);
  const stdDev = distType === 'binomial' ? binomialStdDev(n, p) : poissonStdDev(lambda);

  // Friendly query description generator
  const getQueryTitle = () => {
    const term = distType === 'binomial' ? 'successes' : 'events';
    switch (operator) {
      case 'equals':
        return `Probability of exactly ${xVal} ${term}`;
      case 'lessThanEq':
        return `Probability of at most ${xVal} ${term} (0 to ${xVal})`;
      case 'lessThan':
        return `Probability of fewer than ${xVal} ${term} (< ${xVal})`;
      case 'greaterThanEq':
        return `Probability of at least ${xVal} ${term} (≥ ${xVal})`;
      case 'greaterThan':
        return `Probability of more than ${xVal} ${term} (> ${xVal})`;
      case 'between':
        return `Probability of between ${minVal} and ${maxVal} ${term} (${minVal} ≤ X ≤ ${maxVal})`;
      default:
        return `Probability of target ${term}`;
    }
  };

  const getInterpretationText = () => {
    const term = distType === 'binomial' ? 'successes' : 'events';
    const distName = distType === 'binomial' ? 'Binomial' : 'Poisson';
    let condition = `exactly ${xVal} ${term}`;
    if (operator === 'lessThanEq') condition = `at most ${xVal} ${term}`;
    else if (operator === 'lessThan') condition = `strictly fewer than ${xVal} ${term}`;
    else if (operator === 'greaterThanEq') condition = `at least ${xVal} ${term}`;
    else if (operator === 'greaterThan') condition = `strictly more than ${xVal} ${term}`;
    else if (operator === 'between') condition = `between ${minVal} and ${maxVal} ${term}`;

    return `There is approximately a ${calcResult.percentage} probability of obtaining ${condition} under the selected ${distName} model.`;
  };

  return (
    <section id="calculator" className="calculator-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Lab Header (max-width 900px, 55px margin bottom, 1.7 line height) */}
        <div className="lab-header">
          <div className="eyebrow">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>Project: Statistical Analysis of Real-World Data</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans'] tracking-tight">
            Probability Analysis Lab
          </h2>
          
          <p className="text-[var(--text-secondary)]">
            Explore Module IV probability distributions through interactive calculations, theoretical bounds, and real-time numerical solutions.
          </p>
        </div>

        {/* Responsive 2-Column Calculator Layout (32px gap) */}
        <div className="calculator-layout">
          
          {/* LEFT: Parameter Controls Card (32px/36px padding) */}
          <div className="glass-card calculator-card border-cyan-500/30">
            
            {/* STEP 1: Choose a Distribution */}
            <div className="step-section">
              <span className="step-label">
                STEP 1: Choose a Distribution
              </span>
              
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => setDistType('binomial')}
                  className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border text-left flex items-center justify-between ${
                    distType === 'binomial'
                      ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/30'
                      : 'bg-white/5 text-[var(--text-secondary)] border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm">Binomial</div>
                    <div className="text-[11px] font-mono opacity-80 mt-0.5">Parameters (n, p)</div>
                  </div>
                  {distType === 'binomial' && <Check className="w-4 h-4 text-white" />}
                </button>

                <button
                  type="button"
                  onClick={() => setDistType('poisson')}
                  className={`py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border text-left flex items-center justify-between ${
                    distType === 'poisson'
                      ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/25 ring-2 ring-purple-400/30'
                      : 'bg-white/5 text-[var(--text-secondary)] border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm">Poisson</div>
                    <div className="text-[11px] font-mono opacity-80 mt-0.5">Rate (λ)</div>
                  </div>
                  {distType === 'poisson' && <Check className="w-4 h-4 text-white" />}
                </button>
              </div>
            </div>

            {/* STEP 2: Choose What You Want to Find */}
            <div className="step-section">
              <span className="step-label">
                STEP 2: Choose What You Want to Find
              </span>
              <div className="relative">
                <select
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                  className="calculator-input pr-10 cursor-pointer appearance-none text-cyan-300 font-mono text-xs sm:text-sm"
                >
                  <option value="equals">Exact Point: P(X = x)</option>
                  <option value="lessThanEq">Cumulative: P(X ≤ x)</option>
                  <option value="lessThan">Strict Less: P(X &lt; x)</option>
                  <option value="greaterThanEq">Survival / At Least: P(X ≥ x)</option>
                  <option value="greaterThan">Strict Greater: P(X &gt; x)</option>
                  <option value="between">Bounded Interval: P(a ≤ X ≤ b)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-cyan-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* STEP 3: Enter the Values */}
            <div className="step-section mb-0 pt-4 border-t border-[var(--border-color)]">
              <span className="step-label">
                STEP 3: Enter the Values
              </span>

              {distType === 'binomial' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 form-group">
                  <div>
                    <label className="form-label">
                      Number of Trials (n)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="200"
                      value={n}
                      onChange={(e) => handleNChange(e.target.value)}
                      className="calculator-input"
                      placeholder="e.g. 10"
                    />
                    <div className="form-help">Value between 1 and 200</div>
                  </div>

                  <div>
                    <label className="form-label">
                      Probability of Success (p)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.05"
                      value={p}
                      onChange={(e) => handlePChange(e.target.value)}
                      className="calculator-input"
                      placeholder="e.g. 0.5"
                    />
                    <div className="form-help">Probability between 0.0 and 1.0</div>
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">
                    Average Event Rate (λ)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={lambda}
                    onChange={(e) => handleLambdaChange(e.target.value)}
                    className="calculator-input"
                    placeholder="e.g. 5.0"
                  />
                  <div className="form-help">Expected average arrival rate per interval</div>
                </div>
              )}

              {/* Target Values Inputs */}
              {operator === 'between' ? (
                <div className="grid grid-cols-2 gap-4 form-group">
                  <div>
                    <label className="form-label">Lower Bound (a)</label>
                    <input
                      type="number"
                      min="0"
                      value={minVal}
                      onChange={(e) => setMinVal(parseInt(e.target.value, 10) || 0)}
                      className="calculator-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Upper Bound (b)</label>
                    <input
                      type="number"
                      min="0"
                      value={maxVal}
                      onChange={(e) => setMaxVal(parseInt(e.target.value, 10) || 0)}
                      className="calculator-input"
                    />
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">
                    {distType === 'binomial' ? 'Target Number of Successes (x)' : 'Target Number of Events (x)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={distType === 'binomial' ? n : undefined}
                    value={xVal}
                    onChange={(e) => handleXChange(e.target.value)}
                    className="calculator-input"
                    placeholder="e.g. 5"
                  />
                  <div className="form-help">Target count to calculate probability for</div>
                </div>
              )}
            </div>

            {/* Error Message Box */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3 animate-fadeIn mt-4">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

          </div>

          {/* RIGHT: Calculated Outcome Card (Spacious hierarchy, 32px/36px padding) */}
          <div className="glass-card result-card">
            
            <div>
              {/* Header / Step 4 */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-color)] pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                    STEP 4: View Your Result
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-secondary)]">
                    Calculated Outcome
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFormula(!showFormula)}
                  className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{showFormula ? 'Hide Formula' : 'Show Mathematical Formula'}</span>
                </button>
              </div>

              {/* Main Result Title & Large Value */}
              <div className="result-title">
                {getQueryTitle()}
              </div>

              <div className="result-value">
                <span className="text-cyan-300">{calcResult.percentage}</span>
              </div>
              <div className="text-xs sm:text-sm text-[var(--text-muted)] font-mono mb-6">
                Exact decimal representation: <strong className="text-white">{calcResult.probability}</strong>
              </div>

              {/* WHAT DOES THIS MEAN? Box with 28px bottom margin */}
              <div className="result-explanation">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono mb-2 flex items-center gap-1.5">
                  <span>💡 WHAT DOES THIS MEAN?</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  "{getInterpretationText()}"
                </p>
              </div>

              {/* Mathematical Formula Display (Expandable) */}
              {showFormula && (
                <div className="p-4 rounded-xl bg-black/60 border border-cyan-500/30 font-mono text-xs text-purple-200 space-y-2 mb-6 animate-fadeIn">
                  <div className="text-cyan-400 font-bold uppercase text-[10px] tracking-wider">
                    Theoretical Formulation:
                  </div>
                  {distType === 'binomial' ? (
                    <div className="space-y-1">
                      <div className="text-white font-bold text-sm">
                        P(X = x) = C(n, x) · p^x · (1 - p)^(n - x)
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)]">
                        Active Query: {calcResult.explanation}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-white font-bold text-sm">
                        P(X = x) = (e^(-λ) · λ^x) / x!
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)]">
                        Active Query: {calcResult.explanation}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Distribution Moments Summary (18px padding, min-height 82px) */}
            <div className="pt-6 border-t border-[var(--border-color)]">
              <span className="moments-label">
                Distribution Moments (Theoretical Model)
              </span>
              <div className="grid grid-cols-3 gap-3.5">
                <div className="moment-card">
                  <div className="moment-label flex items-center justify-center gap-1">
                    <span>Mean E(X)</span>
                    <Tooltip text="Theoretical expected value of random variable X." />
                  </div>
                  <div className="moment-value text-cyan-300">
                    {mean.toFixed(2)}
                  </div>
                </div>

                <div className="moment-card">
                  <div className="moment-label flex items-center justify-center gap-1">
                    <span>Variance Var(X)</span>
                    <Tooltip text="Measure of dispersion around the mean." />
                  </div>
                  <div className="moment-value text-purple-300">
                    {variance.toFixed(2)}
                  </div>
                </div>

                <div className="moment-card">
                  <div className="moment-label flex items-center justify-center gap-1">
                    <span>Std Dev σ</span>
                    <Tooltip text="Standard deviation measure (square root of variance)." />
                  </div>
                  <div className="moment-value text-emerald-300">
                    {stdDev.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
