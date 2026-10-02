import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Overview() {
  return (
    <section id="overview" className="py-24 bg-[var(--bg-main)]">
      <div className="section-container">
        
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-2">
            <BookOpen className="w-6 h-6" />
          </div>
          
          <h2 className="section-title">
            Why This Project?
          </h2>
          
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            A mathematics project dedicated to visualizing and understanding discrete probability models. 
            By bridging theoretical mathematics with interactive data visualization, this platform transforms 
            abstract equations into tangible, experiential learning tools.
          </p>

          <p className="text-[var(--text-muted)] text-sm">
            Focus: Module IV (Discrete Random Variables) • Binomial & Poisson Distributions
          </p>
        </div>

      </div>
    </section>
  );
}
