import React from 'react';
import { 
  HeartPulse, 
  Building2, 
  ShoppingCart, 
  Cpu, 
  Wifi, 
  Car, 
  Headphones, 
  GraduationCap 
} from 'lucide-react';

export default function Applications() {
  const domains = [
    {
      title: 'Healthcare & Epidemiology',
      icon: HeartPulse,
      color: 'text-rose-400',
      borderColor: 'border-rose-500/30',
      model: 'Poisson & Binomial',
      desc: 'Modeling rare disease occurrence rates over population cohorts and assessing vaccine efficacy across clinical trials.'
    },
    {
      title: 'Banking & Risk Finance',
      icon: Building2,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      model: 'Poisson',
      desc: 'Detecting credit card transaction fraud spikes and estimating rare corporate loan default probabilities.'
    },
    {
      title: 'E-Commerce & Tech',
      icon: ShoppingCart,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      model: 'Binomial',
      desc: 'Evaluating user click-through rates (CTR), web checkout conversions, and A/B test significance.'
    },
    {
      title: 'Manufacturing Quality Control',
      icon: Cpu,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      model: 'Binomial & Poisson',
      desc: 'Inspecting printed circuit boards (PCB) for micro-defects per batch and setting Six-Sigma tolerance bounds.'
    },
    {
      title: 'Telecommunications',
      icon: Wifi,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      model: 'Poisson',
      desc: 'Analyzing network packet loss over fiber channels and predicting cellular tower call drop frequencies.'
    },
    {
      title: 'Traffic & Urban Planning',
      icon: Car,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      model: 'Poisson',
      desc: 'Estimating vehicle arrival counts per signal cycle to optimize traffic light timing algorithms.'
    },
    {
      title: 'Customer Service Queuing',
      icon: Headphones,
      color: 'text-pink-400',
      borderColor: 'border-pink-500/30',
      model: 'Poisson',
      desc: 'Managing call center queue capacity to prevent agent overload and calculate SLA hold-time probabilities.'
    },
    {
      title: 'Education & Assessment',
      icon: GraduationCap,
      color: 'text-teal-400',
      borderColor: 'border-teal-500/30',
      model: 'Binomial',
      desc: 'Modeling multiple-choice examination outcomes, guessing probabilities, and mastery thresholds.'
    }
  ];

  return (
    <section id="applications" className="py-24 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400">
            Industry Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
            Real-World Industry Applications
          </h2>
          <p className="text-[var(--text-secondary)] text-base">
            Discrete probability distributions provide the quantitative engine powering modern data science across diverse industries.
          </p>
        </div>

        {/* 8 Domains Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((d, i) => {
            const IconComp = d.icon;
            return (
              <div 
                key={i}
                className={`glass-card p-6 border ${d.borderColor} flex flex-col justify-between hover:-translate-y-1.5 transition-all group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${d.color}`}>
                      <IconComp className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/5 text-[var(--text-muted)]">
                      {d.model}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 font-['Plus_Jakarta_Sans']">
                    {d.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {d.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-[10px] font-mono text-[var(--text-muted)] group-hover:text-cyan-400 transition-colors">
                  Applied Statistical Modeling →
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
