import React from 'react';
import { Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Conclusion() {
  return (
    <section id="conclusion" className="py-24 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card p-8 sm:p-12 border-cyan-500/30 max-w-4xl mx-auto space-y-6 text-center relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-blue-950/40 to-slate-900/90">
          
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
            Project Synthesis & Conclusion
          </h2>

          <p className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Discrete probability distributions serve as the cornerstone of mathematical statistics, transforming stochastic uncertainty into actionable mathematical models.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs pt-4 border-t border-[var(--border-color)]">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Theoretical Connection</span>
              </div>
              <p className="text-[var(--text-secondary)]">
                Through interactive parameter manipulation, theoretical equations for mean <code className="math-font text-white">E(X)</code>, variance <code className="math-font text-white">Var(X)</code>, and MGF derivatives are verified visually.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="font-bold text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Empirical Modeling Scope</span>
              </div>
              <p className="text-[var(--text-secondary)]">
                Interactive labs demonstrate how discrete models describe real-world count events while respecting the boundaries of supplied empirical sample datasets.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <a
              href="#binomial-lab"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors text-decoration-none"
            >
              <span>Return to Simulator Lab</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
