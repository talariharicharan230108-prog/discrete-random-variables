import React, { useState } from 'react';
import { Target, CheckSquare, Square, Award } from 'lucide-react';

export default function Objectives() {
  const [completed, setCompleted] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  const objectivesList = [
    'Understand discrete probability distributions and random variable properties.',
    'Apply Binomial distribution model to independent real-world trials.',
    'Apply Poisson distribution model to rare event-count data over intervals.',
    'Calculate theoretical expected values (mean) and variances dynamically.',
    'Understand moment generating functions (MGF) and moment derivation.',
    'Compare empirical observed frequency data against theoretical model expectations.',
    'Analyze Binomial to Poisson limit convergence as n → ∞ and p → 0.',
    'Utilize interactive web data visualizations to interpret statistical outputs.'
  ];

  const toggleObjective = (idx) => {
    if (completed.includes(idx)) {
      setCompleted(completed.filter(i => i !== idx));
    } else {
      setCompleted([...completed, idx]);
    }
  };

  return (
    <section id="objectives" className="py-24 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span>Academic Syllabus Alignment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
            Project Objectives
          </h2>
          <p className="text-[var(--text-secondary)] text-base">
            Track fulfillment of key learning goals across Module IV Discrete Random Variables.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 border-emerald-500/30 max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold text-white font-['Plus_Jakarta_Sans']">Module IV Mastery Checklist</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              {completed.length} / {objectivesList.length} Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {objectivesList.map((obj, i) => {
              const isDone = completed.includes(i);
              return (
                <div
                  key={i}
                  onClick={() => toggleObjective(i)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border flex items-start gap-3 ${
                    isDone 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-white' 
                      : 'bg-white/5 border-white/5 text-[var(--text-secondary)] hover:text-white'
                  }`}
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-5 h-5 text-[var(--text-muted)] shrink-0 mt-0.5" />
                  )}
                  <span className="text-xs leading-relaxed font-medium">
                    {i + 1}. {obj}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
