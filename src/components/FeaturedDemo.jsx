import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Cell 
} from 'recharts';
import { Sparkles, ArrowRight } from 'lucide-react';
import { binomialPMF, generateBinomialData } from '../utils/binomial';

export default function FeaturedDemo({ onOpenSimulator }) {
  const [n, setN] = useState(20);
  const [p, setP] = useState(0.60);

  const expectedSuccesses = Math.round(n * p);
  const chartData = generateBinomialData(n, p, expectedSuccesses);

  return (
    <section className="py-24 bg-[var(--bg-main)]">
      <div className="section-container space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Demo</span>
          </div>
          <h2 className="section-title">
            Try It Now
          </h2>
          <p className="section-subtitle">
            How many students are likely to pass? Adjust the parameters and see.
          </p>
        </div>

        {/* Demo Content */}
        <div className="glass-card max-w-5xl mx-auto p-6 sm:p-10 border-[var(--border-color)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Controls */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                
                {/* Control 1 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[var(--text-primary)]">Students (n)</span>
                    <span className="text-blue-400 font-mono text-sm bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20 font-bold">
                      {n}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={n}
                    onChange={(e) => setN(parseInt(e.target.value, 10))}
                    className="w-full"
                  />
                </div>

                {/* Control 2 */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[var(--text-primary)]">Probability of Success (p)</span>
                    <span className="text-purple-400 font-mono text-sm bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20 font-bold">
                      {(p * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="0.9"
                    step="0.05"
                    value={p}
                    onChange={(e) => setP(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Expected Value Result */}
              <div className="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <div className="text-xs uppercase text-[var(--text-muted)] font-semibold mb-2">
                  Expected successful students
                </div>
                <div className="text-4xl font-extrabold text-[var(--text-primary)] math-font">
                  {expectedSuccesses}
                </div>
              </div>

              <button
                onClick={onOpenSimulator}
                className="w-full btn btn-primary flex justify-center py-4"
              >
                <span>Open Full Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: Chart */}
            <div className="lg:col-span-7 h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis 
                    dataKey="x" 
                    stroke="#64748b" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                  />
                  <Bar dataKey="pmf" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry) => (
                      <Cell 
                        key={`cell-${entry.x}`} 
                        fill={entry.x === expectedSuccesses ? '#3b82f6' : '#1e293b'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
