import React, { useState } from 'react';
import { Calculator, X, Sparkles } from 'lucide-react';
import { binomialPMF, binomialMean, binomialVariance } from '../utils/binomial';
import { poissonPMF, poissonMean, poissonVariance } from '../utils/poisson';

export default function QuickCalcModal({ isOpen, onClose }) {
  const [model, setModel] = useState('binomial');
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.5);
  const [lambda, setLambda] = useState(4.0);
  const [x, setX] = useState(3);

  if (!isOpen) return null;

  const resultP = model === 'binomial' ? binomialPMF(n, x, p) : poissonPMF(lambda, x);
  const mean = model === 'binomial' ? binomialMean(n, p) : poissonMean(lambda);
  const variance = model === 'binomial' ? binomialVariance(n, p) : poissonVariance(lambda);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card max-w-lg w-full p-6 relative border-cyan-500/40 shadow-2xl space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-[var(--text-muted)] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-mono text-cyan-400">Quick Utility</span>
            <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">
              Probability Calculator
            </h3>
          </div>
        </div>

        {/* Model Selector */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setModel('binomial')}
            className={`py-2 rounded-lg font-bold text-xs ${
              model === 'binomial' ? 'bg-blue-600 text-white' : 'bg-white/5 text-[var(--text-secondary)]'
            }`}
          >
            Binomial
          </button>
          <button
            onClick={() => setModel('poisson')}
            className={`py-2 rounded-lg font-bold text-xs ${
              model === 'poisson' ? 'bg-purple-600 text-white' : 'bg-white/5 text-[var(--text-secondary)]'
            }`}
          >
            Poisson
          </button>
        </div>

        {/* Quick Sliders */}
        <div className="space-y-4 text-xs">
          {model === 'binomial' ? (
            <>
              <div>
                <div className="flex justify-between mb-1">
                  <span>n (trials)</span>
                  <span className="font-mono text-cyan-400">{n}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={n}
                  onChange={(e) => setN(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>p (probability)</span>
                  <span className="font-mono text-purple-400">{p.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={p}
                  onChange={(e) => setP(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </>
          ) : (
            <div>
              <div className="flex justify-between mb-1">
                <span>λ (rate)</span>
                <span className="font-mono text-purple-400">{lambda.toFixed(1)}</span>
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
          )}

          <div>
            <div className="flex justify-between mb-1">
              <span>x (observed)</span>
              <span className="font-mono text-emerald-400">{x}</span>
            </div>
            <input
              type="range"
              min="0"
              max={model === 'binomial' ? n : 20}
              value={x}
              onChange={(e) => setX(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>
        </div>

        {/* Result Banner */}
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center">
          <div className="text-xs text-cyan-400 font-mono">P(X = {x})</div>
          <div className="text-3xl font-extrabold text-white math-font my-1">
            {(resultP).toFixed(4)}
          </div>
          <div className="text-xs text-emerald-400">
            {(resultP * 100).toFixed(2)}% | Mean: {mean.toFixed(2)} | Var: {variance.toFixed(2)}
          </div>
        </div>

      </div>
    </div>
  );
}
