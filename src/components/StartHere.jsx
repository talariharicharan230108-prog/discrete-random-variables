import React from 'react';
import { BookOpen, Sliders, BarChart3, ArrowRight, Compass } from 'lucide-react';

export default function StartHere() {
  const steps = [
    {
      step: '01',
      title: 'Learn the Concept',
      icon: BookOpen,
      color: 'from-blue-500/20 to-cyan-500/10',
      borderColor: 'border-blue-500/30',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      description: 'Understand how Binomial and Poisson distributions work with plain-language definitions and visual cards.',
      btnText: 'Learn Now',
      btnHref: '#learn'
    },
    {
      step: '02',
      title: 'Try the Simulator',
      icon: Sliders,
      color: 'from-purple-500/20 to-pink-500/10',
      borderColor: 'border-purple-500/30',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      description: 'Adjust trial count, probability, or event rates using intuitive sliders to see probabilities update live.',
      btnText: 'Try Simulator',
      btnHref: '#binomial-lab'
    },
    {
      step: '03',
      title: 'Analyze the Data',
      icon: BarChart3,
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/30',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description: 'Apply models to real-world scenarios like exam pass rates, customer arrivals, and call center event volumes.',
      btnText: 'Analyze Data',
      btnHref: '#real-world'
    }
  ];

  return (
    <section id="start-here" className="py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Guided Learning Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
            START HERE
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg">
            New to probability? Follow these three simple steps to explore the project.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item) => {
            const IconComp = item.icon;
            return (
              <div 
                key={item.step}
                className={`glass-card p-6 border ${item.borderColor} bg-gradient-to-b ${item.color} flex flex-col justify-between space-y-6 hover:scale-[1.02] transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border ${item.badgeColor}`}>
                      STEP {item.step}
                    </span>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 font-['Plus_Jakarta_Sans']">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <a
                  href={item.btnHref}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all flex items-center justify-center gap-2 group text-decoration-none"
                >
                  <span>{item.btnText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
