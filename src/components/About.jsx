import React, { useState } from 'react';
import { FlaskConical, FileText, X, CheckCircle2, BookOpen, Award, Calendar, Layers } from 'lucide-react';

export default function About() {
  const [docModalOpen, setDocModalOpen] = useState(false);

  return (
    <section id="about" className="theory-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="section-header">
          <div className="eyebrow-label">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Group Academic Project</span>
          </div>

          <h2 className="section-title">
            PROJECT OVERVIEW
          </h2>

          <p className="section-subtitle">
            This project demonstrates the application of discrete and continuous probability distributions to real-world scenarios through an interactive web-based statistical laboratory.
          </p>
        </div>

        {/* Primary Project Identity Card */}
        <div className="glass-card p-8 sm:p-10 border-cyan-500/30 max-w-4xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[var(--border-color)] pb-8">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#070a13] rounded-[14px] flex items-center justify-center">
                  <FlaskConical className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block font-bold">
                  Interactive Statistical Platform
                </span>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
                  ProbabilityLab
                </h3>
                <p className="text-xs font-mono text-[var(--text-secondary)] mt-0.5">
                  Interactive Probability &amp; Statistical Analysis Laboratory
                </p>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  Academic Project • 2026–27
                </p>
              </div>
            </div>

            <button
              onClick={() => setDocModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 hover:opacity-95 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Project Documentation</span>
            </button>
          </div>

          {/* Academic Details Spec Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="text-[var(--text-muted)] uppercase text-[10px] flex items-center gap-1 font-bold">
                <FlaskConical className="w-3 h-3 text-cyan-400" />
                <span>PROJECT</span>
              </div>
              <div className="text-[var(--text-primary)] font-bold text-sm">
                ProbabilityLab
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="text-[var(--text-muted)] uppercase text-[10px] flex items-center gap-1 font-bold">
                <Award className="w-3 h-3 text-purple-400" />
                <span>MODULE</span>
              </div>
              <div className="text-purple-300 font-bold text-xs">
                Module IV – Discrete Distributions
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="text-[var(--text-muted)] uppercase text-[10px] flex items-center gap-1 font-bold">
                <Calendar className="w-3 h-3 text-emerald-400" />
                <span>ACADEMIC PROJECT</span>
              </div>
              <div className="text-emerald-300 font-bold text-sm">
                2026–27
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="text-[var(--text-muted)] uppercase text-[10px] flex items-center gap-1 font-bold">
                <BookOpen className="w-3 h-3 text-blue-400" />
                <span>FOCUS</span>
              </div>
              <div className="text-cyan-400 font-bold text-xs">
                Empirical Data Modeling
              </div>
            </div>
          </div>

          {/* Full Project Title Banner */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--text-muted)] font-bold block">
              PROJECT TITLE
            </span>
            <div className="text-base sm:text-lg font-bold text-white font-['Plus_Jakarta_Sans'] leading-snug">
              Statistical Analysis of Real-World Data Using Discrete and Continuous Probability Distributions
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-1">
              Interactive laboratory and numerical framework exploring discrete random variables, moment generating functions (MGF), parameter estimation, and the asymptotic limiting convergence of Binomial processes toward Poisson laws.
            </p>
          </div>

          {/* Core Syllabus Scope Covered */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-widest text-cyan-400 font-bold block">
              Core Module IV Syllabus Covered:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Binomial Distribution &amp; PMF Formulation</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Poisson Distribution &amp; Arrival Rate λ</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Moment Generating Function: M_X(t)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Mean &amp; Variance of Binomial (np, npq)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mean &amp; Variance of Poisson (E=Var=λ)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Relationship Between Binomial &amp; Poisson</span>
              </div>
            </div>
          </div>

        </div>

        {/* Project Documentation Modal */}
        {docModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="glass-card max-w-3xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border-cyan-500/40 shadow-2xl">
              
              <button
                onClick={() => setDocModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-[var(--text-muted)] hover:text-white"
                aria-label="Close documentation modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-cyan-400" />
                <div>
                  <span className="text-xs font-mono uppercase text-cyan-400">Academic Project Report Summary</span>
                  <h3 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">
                    Statistical Analysis Documentation
                  </h3>
                </div>
              </div>

              <div className="space-y-6 text-xs text-[var(--text-secondary)]">
                <div className="p-4 rounded-xl bg-black/50 border border-white/10 font-mono space-y-2">
                  <div className="text-white font-bold">Project Title:</div>
                  <div className="text-cyan-300">
                    Statistical Analysis of Real-World Data Using Discrete and Continuous Probability Distributions
                  </div>
                  <div className="text-[var(--text-muted)] border-t border-white/10 pt-2 mt-2">
                    Platform: ProbabilityLab | Module IV – Discrete Probability Distributions | Academic Project: 2026–27
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">
                    Abstract &amp; Academic Scope
                  </h4>
                  <p className="leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                    This project investigates empirical count phenomena through Module IV Discrete Probability Distributions. By formulating independent Bernoulli trials under Binomial laws and continuous arrival frequencies under Poisson laws, we establish mathematical formulations for expected values, variances, and moment generating functions M_X(t). Dynamic interactive visualizations evaluate real-world scenarios and verify the limit theorem convergence as n → ∞, p → 0, np = λ.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[var(--border-color)] flex justify-between items-center">
                <span className="text-[10px] font-mono text-[var(--text-muted)]">Verified Project Documentation • Module IV</span>
                <button
                  onClick={() => setDocModalOpen(false)}
                  className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
                >
                  Close Summary
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
