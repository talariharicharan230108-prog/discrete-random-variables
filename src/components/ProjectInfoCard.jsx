import React from 'react';
import { FlaskConical, Award, BookOpen, Calendar, Layers } from 'lucide-react';

export default function ProjectInfoCard({ className = '' }) {
  return (
    <section className={`py-16 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] ${className}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card p-8 sm:p-10 border-cyan-500/30 relative overflow-hidden">
          {/* Subtle gradient background accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-blue-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6 mb-8">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#070a13] rounded-[10px] flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                  Group Academic Project
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Plus_Jakarta_Sans'] tracking-tight">
                  PROJECT INFORMATION
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-400 self-start sm:self-auto">
              <Layers className="w-3.5 h-3.5" />
              <span>Academic Laboratory • 2026–27</span>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            
            {/* Project */}
            <div className="p-5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
              <div className="text-[10px] uppercase font-mono text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                <span>PROJECT</span>
              </div>
              <div className="text-lg font-bold text-white font-['Plus_Jakarta_Sans']">
                ProbabilityLab
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Interactive Probability &amp; Statistical Analysis Laboratory
              </p>
            </div>

            {/* Academic Project Year */}
            <div className="p-5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
              <div className="text-[10px] uppercase font-mono text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>ACADEMIC PROJECT</span>
              </div>
              <div className="text-lg font-bold text-emerald-400 font-mono">
                2026–27
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Mathematics &amp; Statistical Modeling Curriculum
              </p>
            </div>

            {/* Project Title */}
            <div className="md:col-span-2 p-5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
              <div className="text-[10px] uppercase font-mono text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>PROJECT TITLE</span>
              </div>
              <div className="text-base sm:text-lg font-semibold text-cyan-200 leading-snug">
                Statistical Analysis of Real-World Data Using Discrete and Continuous Probability Distributions
              </div>
            </div>

            {/* Module */}
            <div className="md:col-span-2 p-5 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
              <div className="text-[10px] uppercase font-mono text-[var(--text-muted)] font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>MODULE</span>
              </div>
              <div className="text-sm sm:text-base font-semibold text-purple-300">
                Module IV – Discrete Probability Distributions
              </div>
            </div>

          </div>

          {/* Core Syllabus Topics List */}
          <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
            <div className="text-[11px] font-mono uppercase text-[var(--text-muted)] font-bold mb-3">
              Core Module Topics Covered:
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                Binomial Distribution
              </span>
              <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                Moment Generating Function
              </span>
              <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Mean and Variance of Binomial
              </span>
              <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Poisson Distribution
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Mean and Variance of Poisson
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Relationship Between Binomial &amp; Poisson
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
