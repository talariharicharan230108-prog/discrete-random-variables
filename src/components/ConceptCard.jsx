import React, { useState } from 'react';
import { 
  Binary, 
  Clock, 
  Activity,
  Award,
  Sparkles, 
  X, 
  ArrowRight,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export default function ConceptCard() {
  const [selectedConcept, setSelectedConcept] = useState(null);

  const primaryDistributions = [
    {
      id: 'bernoulli',
      title: 'Bernoulli Distribution',
      isModuleIV: false,
      cardStyle: 'border-[var(--border-color)]',
      icon: Activity,
      iconColor: 'text-slate-400',
      summary: 'Models a single trial with two outcomes: success (1) or failure (0).',
      example: 'Flipping a coin once or testing a single component.',
      notation: 'P(X = 1) = p, \\quad P(X = 0) = 1 - p',
      details: {
        definition: 'A Bernoulli trial is an experiment with exactly two possible outcomes: Success with probability p and Failure with probability (1 - p). It serves as the building block for the Binomial distribution.',
        keyProperties: [
          'Support: X ∈ {0, 1}',
          'Expected Value E(X) = p',
          'Variance Var(X) = p(1 - p)'
        ]
      }
    },
    {
      id: 'binomial',
      title: 'Binomial Distribution',
      isModuleIV: true,
      cardStyle: 'border-blue-500/40 bg-blue-950/10 shadow-md shadow-blue-500/10',
      icon: Binary,
      iconColor: 'text-blue-400',
      summary: 'Counts successes across a fixed number of independent trials.',
      example: '20 students taking an examination.',
      notation: 'P(X = x) = \\binom{n}{x} p^x (1-p)^{n-x}',
      details: {
        definition: 'The Binomial distribution Bin(n, p) models the total number of success outcomes across n independent Bernoulli trials, each having constant success probability p.',
        keyProperties: [
          'Fixed number of trials (n)',
          'Independent trials with constant probability (p)',
          'Mean E(X) = n · p',
          'Variance Var(X) = n · p · (1 - p)'
        ]
      }
    },
    {
      id: 'poisson',
      title: 'Poisson Distribution',
      isModuleIV: true,
      cardStyle: 'border-purple-500/40 bg-purple-950/10 shadow-md shadow-purple-500/10',
      icon: Clock,
      iconColor: 'text-purple-400',
      summary: 'Counts rare independent events occurring over a fixed interval.',
      example: 'Customer arrivals at a store every 10 minutes.',
      notation: 'P(X = x) = \\frac{e^{-\\lambda} \\lambda^x}{x!}',
      details: {
        definition: 'The Poisson distribution Poisson(λ) expresses the probability of observing a count of independent arrivals/events occurring at constant rate λ per interval.',
        keyProperties: [
          'Rate parameter λ > 0 (average rate per interval)',
          'Equal Mean & Variance: E(X) = Var(X) = λ',
          'Limiting distribution of Binomial as n → ∞ and p → 0'
        ]
      }
    },
    {
      id: 'normal',
      title: 'Normal Distribution',
      isModuleIV: false,
      cardStyle: 'border-[var(--border-color)]',
      icon: Award,
      iconColor: 'text-slate-400',
      summary: 'Symmetric bell curve modeling continuous natural variations around a mean.',
      example: 'Human heights or measurement error distributions.',
      notation: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}',
      details: {
        definition: 'The Normal (Gaussian) distribution is a continuous distribution specified by mean μ and standard deviation σ. By Central Limit Theorem, sums of independent random variables approach Normal.',
        keyProperties: [
          'Symmetric bell-shaped curve centered at mean μ',
          '68-95-99.7 Empirical Rule for standard deviations'
        ]
      }
    }
  ];

  return (
    <section id="concepts" className="section bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with 48px margin bottom and 1.7 line height */}
        <div className="section-header">
          <div className="eyebrow-label">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Theoretical Foundations</span>
          </div>
          <h2 className="section-title">
            Choose a Distribution
          </h2>
          <p className="section-subtitle">
            Explore core discrete random variables with primary emphasis on Module IV Binomial and Poisson laws.
          </p>
        </div>

        {/* 4 Cards Grid with 24px gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {primaryDistributions.map((item) => {
            const IconComp = item.icon;
            return (
              <div 
                key={item.id}
                className={`glass-card p-6 border flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-300 h-full ${item.cardStyle}`}
              >
                {/* Module IV Badge only on Binomial & Poisson */}
                {item.isModuleIV && (
                  <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-300" />
                    <span>⭐ MODULE IV</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="p-3 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <IconComp className={`w-6 h-6 ${item.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="pt-2 border-t border-[var(--border-color)]">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] block">Example</span>
                    <p className="text-xs text-slate-300 italic">{item.example}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
                  <button
                    onClick={() => setSelectedConcept(item)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/40 text-xs font-semibold text-[var(--text-primary)] hover:text-cyan-300 transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Explore →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Window for Expanded Explanation */}
        {selectedConcept && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="glass-card max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border-cyan-500/40 shadow-2xl space-y-6">
              
              <button
                onClick={() => setSelectedConcept(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-white/5 ${selectedConcept.iconColor}`}>
                  <selectedConcept.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
                    {selectedConcept.title}
                  </h3>
                </div>
              </div>

              {/* Formula box */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-sm sm:text-base text-cyan-300 text-center">
                {selectedConcept.notation}
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[var(--text-secondary)]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1">
                    Definition
                  </h4>
                  <p className="leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 text-slate-200">
                    {selectedConcept.details.definition}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2">
                    Key Properties
                  </h4>
                  <ul className="space-y-2">
                    {selectedConcept.details.keyProperties.map((prop, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{prop}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)] flex justify-between items-center">
                {selectedConcept.id === 'binomial' || selectedConcept.id === 'poisson' ? (
                  <a
                    href={`#${selectedConcept.id}-lab`}
                    onClick={() => setSelectedConcept(null)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs transition-all hover:opacity-95"
                  >
                    Open {selectedConcept.title} Simulator →
                  </a>
                ) : (
                  <span className="text-xs text-[var(--text-muted)]">Foundation Concept</span>
                )}

                <button
                  onClick={() => setSelectedConcept(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
