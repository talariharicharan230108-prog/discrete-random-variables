import React from 'react';
import { FlaskConical, ArrowRight } from 'lucide-react';

export default function LabCTA({ onOpenLab }) {
  return (
    <section className="py-24 bg-[var(--bg-main)]">
      <div className="section-container">
        
        <div className="glass-card max-w-4xl mx-auto p-10 sm:p-14 border-cyan-500/30 bg-gradient-to-br from-blue-900/20 via-[var(--bg-card)] to-purple-900/20 text-center space-y-8">
          
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mx-auto flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <FlaskConical className="w-8 h-8 text-cyan-400" />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
              Ready to Experiment?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
              Take control of the numbers and explore how probability changes.
            </p>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={onOpenLab}
              className="btn btn-primary px-8 py-4 text-base"
            >
              <span>Launch Statistical Lab</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
