import React, { useState } from 'react';
import { Network, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Methodology() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Data Collection',
      desc: 'Gather discrete empirical counting data or define theoretical process parameters (trials n, rate λ, or trial outcomes).'
    },
    {
      num: '02',
      title: 'Data Cleaning & Preprocessing',
      desc: 'Filter extreme non-physical outliers, remove invalid data types, and normalize observations into integer count vectors.'
    },
    {
      num: '03',
      title: 'Distribution Selection',
      desc: 'Determine whether the underlying physical mechanism follows fixed Bernoulli trials (Binomial) or continuous-interval arrivals (Poisson).'
    },
    {
      num: '04',
      title: 'Parameter Estimation',
      desc: 'Compute sample moments: sample mean x̄ and variance s² to estimate parameters (n, p) or rate λ.'
    },
    {
      num: '05',
      title: 'Probability Calculation',
      desc: 'Apply exact PMF formulas or log-factorial expansions to compute point P(X=x) and cumulative P(X≤x) probabilities.'
    },
    {
      num: '06',
      title: 'Interactive Visualization',
      desc: 'Render dynamic histogram overlays, PMF bar charts, and side-by-side limit convergence graphs.'
    },
    {
      num: '07',
      title: 'Statistical Interpretation',
      desc: 'Compare observed empirical frequencies against theoretical expectations using Chi-Square goodness-of-fit metrics.'
    },
    {
      num: '08',
      title: 'Synthesis & Conclusion',
      desc: 'Summarize mathematical findings, validate model assumptions, and document practical decision boundaries.'
    }
  ];

  return (
    <section id="methodology" className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-400">
            Research Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
            Project Methodology
          </h2>
          <p className="text-[var(--text-secondary)] text-base">
            An 8-stage rigorous statistical workflow for analyzing real-world discrete data.
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Steps List */}
          <div className="lg:col-span-6 space-y-3">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                  activeStep === idx
                    ? 'bg-blue-600/15 border-blue-500/50 shadow-md'
                    : 'glass-card hover:bg-white/5 border-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-sm font-bold ${
                    activeStep === idx ? 'text-cyan-400' : 'text-[var(--text-muted)]'
                  }`}>
                    Step {step.num}
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {step.title}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  activeStep === idx ? 'text-cyan-400 rotate-90' : 'text-[var(--text-muted)]'
                }`} />
              </div>
            ))}
          </div>

          {/* Active Step Display Box */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="glass-card p-8 border-cyan-500/30 space-y-6 bg-gradient-to-br from-slate-900/80 to-blue-950/40">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-extrabold text-cyan-400 math-font">
                  {steps[activeStep].num}
                </span>
                <div>
                  <span className="text-xs uppercase font-mono text-blue-400">Active Workflow Stage</span>
                  <h3 className="text-xl font-bold text-white font-['Plus_Jakarta_Sans']">
                    {steps[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed bg-black/40 p-4 rounded-xl border border-white/10">
                {steps[activeStep].desc}
              </p>

              <div className="pt-4 border-t border-[var(--border-color)] flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>Standard Academic Data Science Protocol</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
