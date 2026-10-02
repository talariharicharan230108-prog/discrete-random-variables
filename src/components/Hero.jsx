import React from 'react';
import { ArrowRight, FlaskConical, Sparkles } from 'lucide-react';

export default function Hero({ onTriggerDemo }) {
  return (
    <section id="hero" className="hero relative pt-36 pb-24 md:pt-40 md:pb-28 overflow-hidden bg-math-grid">
      
      {/* Background Soft Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-tr from-blue-600/15 to-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow Badge with 18px margin bottom */}
          <div className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Probability &amp; Statistics • Module IV (2026–27)</span>
          </div>

          {/* Main Hero Headline with 20px margin bottom */}
          <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] mb-5 font-['Plus_Jakarta_Sans']">
            Statistical Analysis of <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">Real-World Data</span>
          </h1>

          {/* Subtitle with 1.7 line height & 760px max width */}
          <p className="text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl font-normal leading-relaxed mx-auto mb-10">
            Explore <strong className="text-[var(--text-primary)] font-semibold">Binomial and Poisson</strong> probability distributions through interactive simulations, theoretical insights, and empirical dataset fitting.
          </p>

          {/* Action Buttons with 40px top space */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#calculator"
              className="btn btn-primary px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all flex items-center gap-2 text-decoration-none"
            >
              <span>Explore Calculator Lab</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#real-world"
              className="btn btn-outline px-8 py-3.5 rounded-xl bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold text-sm border border-[var(--border-color)] hover:border-cyan-500/40 hover:bg-white/5 transition-all flex items-center gap-2 text-decoration-none"
            >
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              <span>Real-World Scenarios</span>
            </a>
          </div>

          {/* 3 Academic Metrics Cards with 24px internal padding */}
          <div className="pt-10 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            <div className="glass-card p-6 border-blue-500/20 flex flex-col items-center justify-center space-y-1.5">
              <div className="text-3xl font-extrabold text-blue-400 font-mono">2</div>
              <div className="text-xs font-semibold text-[var(--text-primary)]">Core Distributions</div>
              <div className="text-[11px] text-[var(--text-muted)] font-mono">Binomial &amp; Poisson</div>
            </div>

            <div className="glass-card p-6 border-purple-500/20 flex flex-col items-center justify-center space-y-1.5">
              <div className="text-3xl font-extrabold text-purple-400 font-mono">3</div>
              <div className="text-xs font-semibold text-[var(--text-primary)]">Real-World Case Studies</div>
              <div className="text-[11px] text-[var(--text-muted)] font-mono">Exams, Arrivals, Calls</div>
            </div>

            <div className="glass-card p-6 border-emerald-500/20 flex flex-col items-center justify-center space-y-1.5">
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">100%</div>
              <div className="text-xs font-semibold text-[var(--text-primary)]">Interactive Lab Framework</div>
              <div className="text-[11px] text-[var(--text-muted)] font-mono">Simulators &amp; Fits</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
