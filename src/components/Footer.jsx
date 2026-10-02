import React from 'react';
import { FlaskConical, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#04060d] border-t border-[var(--border-color)] py-16 text-[var(--text-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#070a13] rounded-[10px] flex items-center justify-center">
                  <FlaskConical className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-['Plus_Jakarta_Sans'] tracking-tight block">
                  Probability<span className="text-cyan-400">Lab</span>
                </span>
                <span className="text-xs text-[var(--text-muted)] block">
                  Interactive Statistical Analysis Laboratory
                </span>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] italic max-w-md">
              "Turning discrete probability theory into interactive insights through numerical modeling and simulation."
            </p>

            <div className="text-xs text-[var(--text-secondary)]">
              Module IV – Discrete Probability Distributions
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#concepts" className="hover:text-cyan-400 transition-colors">Probability Concepts</a></li>
              <li><a href="#binomial-lab" className="hover:text-cyan-400 transition-colors">Binomial Simulator</a></li>
              <li><a href="#poisson-lab" className="hover:text-cyan-400 transition-colors">Poisson Simulator</a></li>
              <li><a href="#stat-lab" className="hover:text-cyan-400 transition-colors">Statistical Lab</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About Project</a></li>
            </ul>
          </div>

          {/* Project Details */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Project Details
            </h4>
            <div className="text-sm font-semibold text-cyan-300 leading-snug">
              Statistical Analysis of Real-World Data Using Discrete and Continuous Probability Distributions
            </div>
            <div className="text-purple-300 font-mono">
              Module IV – Discrete Probability Distributions
            </div>
            <div className="inline-block px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px] font-bold">
              Academic Project • 2026–27
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div>
            © 2026–27 ProbabilityLab • Academic Project • Module IV – Discrete Probability Distributions
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10 transition-colors flex items-center gap-1.5 font-mono"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
