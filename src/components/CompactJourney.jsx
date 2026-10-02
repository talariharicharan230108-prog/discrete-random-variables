import React from 'react';
import { BookOpen, Sliders, BarChart3, ArrowRight } from 'lucide-react';

export default function CompactJourney() {
  const steps = [
    {
      num: '01',
      title: 'Learn',
      icon: BookOpen,
      desc: 'Understand fundamental probability distributions.',
      color: 'border-blue-500/30 text-blue-400',
      href: '#learn'
    },
    {
      num: '02',
      title: 'Experiment',
      icon: Sliders,
      desc: 'Adjust live parameters and observe probability shifts.',
      color: 'border-purple-500/30 text-purple-400',
      href: '#binomial-lab'
    },
    {
      num: '03',
      title: 'Analyze',
      icon: BarChart3,
      desc: 'Apply models to empirical real-world datasets.',
      color: 'border-emerald-500/30 text-emerald-400',
      href: '#real-world'
    }
  ];

  return (
    <section id="journey" className="py-12 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <a
                key={item.num}
                href={item.href}
                className={`glass-card p-4 border ${item.color.split(' ')[0]} flex items-center justify-between hover:scale-[1.02] transition-all duration-200 text-decoration-none group max-h-[130px]`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <IconComp className={`w-5 h-5 ${item.color.split(' ')[1]}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--text-muted)]">
                      <span>STEP {item.num}</span>
                    </div>
                    <div className="text-sm font-bold text-white font-['Plus_Jakarta_Sans']">{item.title}</div>
                    <div className="text-[11px] text-[var(--text-secondary)] line-clamp-1">{item.desc}</div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[var(--text-muted)] group-hover:text-white group-hover:bg-white/10 transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
