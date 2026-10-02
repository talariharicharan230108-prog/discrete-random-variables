import React from 'react';
import { Lightbulb } from 'lucide-react';
import { generateDynamicInsights } from '../utils/calculations';

export default function KeyFindings({ binomParams, poissonParams }) {
  const insights = generateDynamicInsights(
    binomParams || { n: 10, p: 0.5, selectedX: 5 }, 
    poissonParams || { lambda: 5.0, selectedX: 5 }
  );

  return (
    <section id="insights" className="insights-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with 48px margin bottom and 1.7 line height */}
        <div className="section-header">
          <div className="eyebrow-label bg-amber-500/10 border-amber-500/30 text-amber-400">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Statistical Interpretation</span>
          </div>
          
          <h2 className="section-title">
            What Does the Model Tell Us?
          </h2>
          
          <p className="section-subtitle">
            Understand what the calculated probability means in the context of the selected scenario, theoretical convergence limits, and underlying variability.
          </p>
        </div>

        {/* Dynamic Insights Grid (3 cols desktop, 2 cols tablet, 1 col mobile, 28px gap) */}
        <div className="insights-grid">
          {insights.map((item) => (
            <div 
              key={item.id}
              className="glass-card border-amber-500/25 flex flex-col justify-between hover:border-amber-500/50 transition-all"
              style={{ padding: '32px', minHeight: '280px' }}
            >
              <div>
                <div className="flex items-center justify-between mb-4 gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-white/5 text-cyan-400 border border-white/10 tracking-wider">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono font-semibold text-purple-300">
                    {item.metric}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] font-['Plus_Jakarta_Sans'] leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-emerald-300 flex items-center gap-2.5 mt-auto">
                <span className="shrink-0 text-base">💡</span>
                <span className="leading-relaxed">{item.highlight}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
