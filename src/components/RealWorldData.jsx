import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Cell 
} from 'recharts';
import { 
  GraduationCap, 
  Users, 
  PhoneCall, 
  ArrowRight, 
  X 
} from 'lucide-react';
import { binomialPMF, generateBinomialData } from '../utils/binomial';
import { poissonPMF, generatePoissonData } from '../utils/poisson';

export default function RealWorldData({ isPreview = false }) {
  const [activeScenarioModal, setActiveScenarioModal] = useState(null);

  // Scenario 1 State (Student Exam Passes)
  const [sc1N, setSc1N] = useState(20);
  const [sc1P, setSc1P] = useState(0.6);
  const [sc1X, setSc1X] = useState(12);

  // Scenario 2 State (Customer Arrivals)
  const [sc2Lambda, setSc2Lambda] = useState(5.0);
  const [sc2X, setSc2X] = useState(3);

  // Scenario 3 State (Call Center)
  const [sc3Lambda, setSc3Lambda] = useState(3.5);
  const [sc3X, setSc3X] = useState(4);

  const scenarioCards = [
    {
      id: 'case1',
      title: 'Illustrative Binomial Scenario: Student Examination Outcomes',
      icon: GraduationCap,
      color: 'border-blue-500/30 text-blue-400',
      problem: 'If 20 students take an exam, how many will pass above threshold?',
      distribution: 'Illustrative Binomial Scenario (n = 20, p = 0.60)',
      analysis: 'Calculates the probability of observing exactly x passed exams out of 20 trials.',
      modelType: 'binomial'
    },
    {
      id: 'case2',
      title: 'Illustrative Poisson Scenario: Store Customer Arrivals',
      icon: Users,
      color: 'border-purple-500/30 text-purple-400',
      problem: 'How many customers arrive at a retail store every 10 minutes?',
      distribution: 'Poisson Distribution (λ = 5.0 customers / 10 min)',
      analysis: 'Evaluates peak arrival counts for staffing and inventory buffer planning.',
      modelType: 'poisson'
    },
    {
      id: 'case3',
      title: 'Illustrative Poisson Scenario: Call Center Inbound Volume',
      icon: PhoneCall,
      color: 'border-cyan-500/30 text-cyan-400',
      problem: 'How many inbound support calls arrive per minute during morning peak hours?',
      distribution: 'Poisson Distribution (λ = 3.5 calls / min)',
      analysis: 'Predicts server queue overload risks and agent response times.',
      modelType: 'poisson'
    }
  ];

  return (
    <section id="real-world" className="real-world-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with 48px margin bottom and 1.7 line height */}
        <div className="section-header">
          <div className="eyebrow-label">
            Empirical Case Studies
          </div>
          <h2 className="section-title">
            Probability in the Real World
          </h2>
          <p className="section-subtitle">
            Apply probability distributions to practical scenarios in academic examination evaluation, retail foot-traffic modeling, and support queue forecasting.
          </p>
        </div>

        {/* 3 Spacious Case Study Cards (28px gap) */}
        <div className="real-world-grid">
          {scenarioCards.map((sc) => {
            const IconComp = sc.icon;
            return (
              <div 
                key={sc.id}
                className={`glass-card case-study-card border ${sc.color.split(' ')[0]} hover:scale-[1.015] transition-all duration-300`}
              >
                <div>
                  {/* ICON & Case Study Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3.5 rounded-2xl bg-white/5 border border-white/10 ${sc.color.split(' ')[1]}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-white/5 text-[var(--text-muted)] border border-white/10 tracking-wider font-bold">
                      Case Study
                    </span>
                  </div>

                  {/* TITLE with 18px top and bottom margin */}
                  <h3>
                    {sc.title}
                  </h3>

                  {/* Problem Statement Info Block */}
                  <div className="info-block">
                    <span className="info-block-label text-cyan-400">Problem Statement:</span>
                    <p className="info-block-text text-slate-200">{sc.problem}</p>
                  </div>

                  {/* Distribution Model Info Block */}
                  <div className="info-block bg-purple-500/10 border-purple-500/25">
                    <span className="info-block-label text-purple-300">Distribution Model:</span>
                    <p className="info-block-text text-purple-200 font-mono font-medium">{sc.distribution}</p>
                  </div>

                  {/* Analytical Insight Info Block */}
                  <div className="info-block bg-emerald-500/10 border-emerald-500/25 mb-6">
                    <span className="info-block-label text-emerald-300">Analytical Insight:</span>
                    <p className="info-block-text text-emerald-200">{sc.analysis}</p>
                  </div>
                </div>

                {!isPreview && (
                  <button
                    onClick={() => setActiveScenarioModal(sc.id)}
                    className="btn btn-primary w-full py-3.5 text-xs font-semibold shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Analyze Scenario Interactive Model →</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {isPreview && (
          <div className="flex justify-center pt-12">
            <button
              onClick={() => window.location.hash = '#real-world'}
              className="btn btn-primary px-8 py-4 text-sm shadow-lg flex items-center gap-2"
            >
              <span>Explore Full Empirical Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* INTERACTIVE SCENARIO MODAL MODE */}
        {activeScenarioModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="glass-card max-w-3xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border-cyan-500/40 shadow-2xl space-y-6">
              
              <button
                onClick={() => setActiveScenarioModal(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scenario 1: Student Examination */}
              {activeScenarioModal === 'case1' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-mono text-cyan-400 font-bold">Interactive Scenario</span>
                      <h3 className="text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
                        Student Performance Analysis
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300">
                    Imagine you are an instructor analyzing exam results for a class of <code className="math-font text-cyan-300">n = {sc1N}</code> students taking a test with <code className="math-font text-purple-300">{(sc1P * 100).toFixed(0)}%</code> passing probability per student.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Total Students (n)</label>
                      <input
                        type="number"
                        min="5"
                        max="100"
                        value={sc1N}
                        onChange={(e) => setSc1N(parseInt(e.target.value, 10) || 5)}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Pass Probability (p)</label>
                      <input
                        type="number"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={sc1P}
                        onChange={(e) => setSc1P(parseFloat(e.target.value) || 0.1)}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Target Passed Students (x)</label>
                      <input
                        type="number"
                        min="0"
                        max={sc1N}
                        value={sc1X}
                        onChange={(e) => setSc1X(parseInt(e.target.value, 10) || 0)}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Calculated Output Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 to-purple-950/40 border border-cyan-500/40 space-y-3">
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase">Scenario Result</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white math-font">
                      Probability P(X = {sc1X}): <span className="text-cyan-300">{(binomialPMF(sc1N, sc1X, sc1P) * 100).toFixed(2)}%</span>
                    </div>
                    <p className="text-xs text-slate-200">
                      💡 Out of {sc1N} students with a {(sc1P * 100).toFixed(0)}% pass rate, the expected average passes is <strong>{(sc1N * sc1P).toFixed(1)}</strong> students. The probability of observing exactly {sc1X} passing students is <strong>{(binomialPMF(sc1N, sc1X, sc1P) * 100).toFixed(2)}%</strong>.
                    </p>
                  </div>

                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={generateBinomialData(sc1N, sc1P, sc1X)}>
                        <XAxis dataKey="x" stroke="#64748b" fontSize={10} />
                        <YAxis stroke="#64748b" fontSize={10} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                        <Bar dataKey="pmf" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                          {generateBinomialData(sc1N, sc1P, sc1X).map((entry) => (
                            <Cell key={`cell-${entry.x}`} fill={entry.x === sc1X ? '#06b6d4' : '#3b82f6'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Scenario 2: Customer Arrivals */}
              {activeScenarioModal === 'case2' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-mono text-purple-400 font-bold">Interactive Scenario</span>
                      <h3 className="text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
                        Customer Arrival Analysis
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300">
                    Imagine you manage a retail store. The average customer arrival rate is <code className="math-font text-purple-300">λ = {sc2Lambda}</code> customers per 10-minute window.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Average Arrivals (λ per 10 min)</label>
                      <input
                        type="number"
                        min="0.5"
                        max="20"
                        step="0.5"
                        value={sc2Lambda}
                        onChange={(e) => setSc2Lambda(parseFloat(e.target.value) || 0.5)}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Arrivals to Evaluate (x)</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={sc2X}
                        onChange={(e) => setSc2X(parseInt(e.target.value, 10) || 0)}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Output */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-cyan-950/40 border border-purple-500/40 space-y-3">
                    <div className="text-xs font-mono text-purple-400 font-bold uppercase">Scenario Result</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white math-font">
                      Probability P(X = {sc2X}): <span className="text-purple-300">{(poissonPMF(sc2Lambda, sc2X) * 100).toFixed(2)}%</span>
                    </div>
                    <p className="text-xs text-slate-200">
                      💡 With an average arrival rate of {sc2Lambda} customers every 10 minutes, there is a <strong>{(poissonPMF(sc2Lambda, sc2X) * 100).toFixed(2)}%</strong> probability of seeing exactly {sc2X} customers.
                    </p>
                  </div>

                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={generatePoissonData(sc2Lambda, sc2X, 12)}>
                        <XAxis dataKey="x" stroke="#64748b" fontSize={10} />
                        <YAxis stroke="#64748b" fontSize={10} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                        <Bar dataKey="pmf" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                          {generatePoissonData(sc2Lambda, sc2X, 12).map((entry) => (
                            <Cell key={`cell-${entry.x}`} fill={entry.x === sc2X ? '#a855f7' : '#6366f1'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Scenario 3: Call Center */}
              {activeScenarioModal === 'case3' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                      <PhoneCall className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-mono text-cyan-400 font-bold">Interactive Scenario</span>
                      <h3 className="text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
                        Call Center Queue Analysis
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300">
                    Modeling inbound call volume with an average rate of <code className="math-font text-cyan-300">λ = {sc3Lambda}</code> calls per minute.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Average Call Rate (λ per min)</label>
                      <input
                        type="number"
                        min="0.5"
                        max="15"
                        step="0.5"
                        value={sc3Lambda}
                        onChange={(e) => setSc3Lambda(parseFloat(e.target.value) || 0.5)}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Target Calls (x)</label>
                      <input
                        type="number"
                        min="0"
                        max="15"
                        value={sc3X}
                        onChange={(e) => setSc3X(parseInt(e.target.value, 10) || 0)}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/40 space-y-3">
                    <div className="text-xs font-mono text-cyan-400 font-bold uppercase">Scenario Result</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white math-font">
                      Probability P(X = {sc3X}): <span className="text-cyan-300">{(poissonPMF(sc3Lambda, sc3X) * 100).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[var(--border-color)] flex justify-end">
                <button
                  onClick={() => setActiveScenarioModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                >
                  Close Scenario Analysis
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
