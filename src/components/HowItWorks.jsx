import React from 'react';
import { MousePointerClick, SlidersHorizontal, Calculator, Lightbulb } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Choose',
      icon: MousePointerClick,
      desc: 'Select a probability distribution that fits your problem.'
    },
    {
      num: '02',
      title: 'Adjust',
      icon: SlidersHorizontal,
      desc: 'Set the parameters like trials or average rates.'
    },
    {
      num: '03',
      title: 'Calculate',
      icon: Calculator,
      desc: 'Instantly compute the exact probabilities.'
    },
    {
      num: '04',
      title: 'Understand',
      icon: Lightbulb,
      desc: 'Review the plain-language explanation of results.'
    }
  ];

  return (
    <section className="py-24 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="section-container">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            How It Works
          </h2>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div key={step.num} className="flex flex-col items-center text-center space-y-4 group">
                
                <div className="w-16 h-16 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all shadow-sm">
                  <IconComp className="w-7 h-7" />
                </div>
                
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-400 mb-1">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 font-['Plus_Jakarta_Sans']">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed px-4">
                    {step.desc}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
