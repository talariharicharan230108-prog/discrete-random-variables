import React, { useState } from 'react';
import { Sparkles, Sliders, CheckCircle2, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { binomialMGF, binomialMGFPrime, binomialMGFDoublePrime } from '../utils/binomial';
import Tooltip from './Tooltip';

export default function BinomialMGF({ n, p }) {
  const [t, setT] = useState(0.1);
  const [showDerivation, setShowDerivation] = useState(false);

  const mgfVal = binomialMGF(n, p, t);
  const mgfAtZero = binomialMGF(n, p, 0);
  const primeAtZero = binomialMGFPrime(n, p, 0);
  const doublePrimeAtZero = binomialMGFDoublePrime(n, p, 0);

  const calculatedMean = primeAtZero;
  const calculatedVar = doublePrimeAtZero - Math.pow(primeAtZero, 2);

  return (
    <section id="mgf-section" className="py-24 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Advanced Concepts • MGF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
            Moment Generating Function (MGF)
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            Understand how mathematical generating functions derive distribution moments like mean and variance.
          </p>
        </div>

        {/* 3 QUESTION EXPLANATION CARDS (PROGRESSIVE DISCLOSURE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border-purple-500/30 space-y-2">
            <div className="text-xs font-mono font-bold text-purple-400 uppercase">1. What is an MGF?</div>
            <h3 className="text-base font-bold text-white">Mathematical Fingerprint</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              The Moment Generating Function <code className="math-font text-purple-300">M_X(t) = E[e^(tX)]</code> uniquely identifies a random variable distribution, like a mathematical DNA profile.
            </p>
          </div>

          <div className="glass-card p-6 border-cyan-500/30 space-y-2">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase">2. Why do we use it?</div>
            <h3 className="text-base font-bold text-white">Moments via Calculus</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Instead of computing complicated infinite sums for higher moments <code className="math-font text-cyan-300">E(X^k)</code>, we simply take derivatives of <code className="math-font text-cyan-300">M_X(t)</code> at <code className="math-font text-cyan-300">t = 0</code>.
            </p>
          </div>

          <div className="glass-card p-6 border-emerald-500/30 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase">3. Mean & Variance Derivation</div>
            <h3 className="text-base font-bold text-white">Derivatives at t = 0</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              1st derivative <code className="math-font text-emerald-300">M'(0) = E(X)</code> gives the Mean. 2nd derivative <code className="math-font text-emerald-300">M''(0) = E(X²)</code> leads directly to Variance.
            </p>
          </div>
        </div>

        {/* INTERACTIVE EVALUATOR & TOGGLEABLE DERIVATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Formula & Derivation Toggle */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-card p-6 sm:p-8 border-purple-500/30 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] font-['Plus_Jakarta_Sans'] mb-2">
                  Binomial MGF Formula
                </h3>
                
                <div className="p-4 rounded-xl bg-black/60 border border-purple-500/30 text-center font-mono text-xl text-purple-300 shadow-inner">
                  M_X(t) = (1 - p + p e^t)^n
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowDerivation(!showDerivation)}
                  className="w-full py-3 px-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-xs font-bold text-purple-300 transition-all flex items-center justify-between"
                >
                  <span>{showDerivation ? 'Hide Mathematical Derivation' : 'Show Mathematical Derivation'}</span>
                  {showDerivation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Toggleable Derivation Content */}
              {showDerivation && (
                <div className="space-y-4 text-xs font-mono animate-fadeIn pt-2">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="text-cyan-400 font-bold">1st Derivative → Mean E(X):</div>
                    <div className="text-[var(--text-primary)]">
                      M'_X(t) = n (1 - p + p e^t)^(n-1) (p e^t)
                    </div>
                    <div className="text-emerald-400 font-bold pt-1">
                      M'_X(0) = n · p = {calculatedMean.toFixed(4)}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="text-purple-400 font-bold">2nd Derivative → Second Moment E(X²):</div>
                    <div className="text-[var(--text-primary)]">
                      M''_X(0) = n(n-1)p² + np = {doublePrimeAtZero.toFixed(4)}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                    <div className="text-emerald-400 font-bold">Variance Equation:</div>
                    <div className="text-white">
                      Var(X) = M''_X(0) - [M'_X(0)]² = np(1-p) = {calculatedVar.toFixed(4)}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right: Interactive Parameter Evaluator */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-card p-6 sm:p-8 border-cyan-500/30 space-y-6">
              <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <span>Interactive MGF Evaluator</span>
                <Sliders className="w-5 h-5 text-cyan-400" />
              </h3>

              <p className="text-xs text-[var(--text-secondary)]">
                Evaluate <code className="math-font text-cyan-400">M_X(t)</code> for active lab parameters <code className="math-font text-purple-400">n = {n}</code>, <code className="math-font text-purple-400">p = {p}</code>.
              </p>

              {/* Slider for t */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span>Parameter t</span>
                  <span className="text-cyan-400 font-mono text-sm bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
                    t = {t.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="-0.5"
                  max="0.5"
                  step="0.01"
                  value={t}
                  onChange={(e) => setT(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Results cards */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center">
                  <div className="text-xs text-cyan-400 font-semibold mb-1">M_X(t) at t = {t.toFixed(2)}</div>
                  <div className="text-2xl font-extrabold text-white math-font">
                    {mgfVal.toFixed(6)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-center">
                  <div className="text-xs text-purple-400 font-semibold mb-1">M_X(0) Identity</div>
                  <div className="text-2xl font-extrabold text-white math-font">
                    {mgfAtZero.toFixed(6)}
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
