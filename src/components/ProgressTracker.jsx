import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Award, RotateCcw } from 'lucide-react';

export default function ProgressTracker() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('probability_learning_progress');
      return saved ? JSON.parse(saved) : {
        concept: true,
        simulator: true,
        realWorld: false,
        quiz: false
      };
    } catch (e) {
      return { concept: true, simulator: true, realWorld: false, quiz: false };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('probability_learning_progress', JSON.stringify(progress));
    } catch (e) {}
  }, [progress]);

  const toggleStep = (key) => {
    setProgress(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(progress).filter(Boolean).length;
  const pct = Math.round((completedCount / 4) * 100);

  return (
    <div className="glass-card p-4 border-cyan-500/30 max-w-4xl mx-auto my-8 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans']">
            YOUR LEARNING PROGRESS: <span className="text-cyan-400 font-mono">{pct}% COMPLETED</span>
          </h4>
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-48 bg-black/50 h-2.5 rounded-full overflow-hidden border border-white/10">
          <div 
            className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
        <button
          onClick={() => toggleStep('concept')}
          className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
            progress.concept 
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-300 font-semibold' 
              : 'bg-white/5 border-white/10 text-slate-400'
          }`}
        >
          {progress.concept ? <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> : <Circle className="w-4 h-4 shrink-0" />}
          <span>1. Concept</span>
        </button>

        <button
          onClick={() => toggleStep('simulator')}
          className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
            progress.simulator 
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-300 font-semibold' 
              : 'bg-white/5 border-white/10 text-slate-400'
          }`}
        >
          {progress.simulator ? <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> : <Circle className="w-4 h-4 shrink-0" />}
          <span>2. Simulator</span>
        </button>

        <button
          onClick={() => toggleStep('realWorld')}
          className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
            progress.realWorld 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-semibold' 
              : 'bg-white/5 border-white/10 text-slate-400'
          }`}
        >
          {progress.realWorld ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <Circle className="w-4 h-4 shrink-0" />}
          <span>3. Real-World</span>
        </button>

        <button
          onClick={() => toggleStep('quiz')}
          className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
            progress.quiz 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 font-semibold' 
              : 'bg-white/5 border-white/10 text-slate-400'
          }`}
        >
          {progress.quiz ? <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> : <Circle className="w-4 h-4 shrink-0" />}
          <span>4. Quiz</span>
        </button>
      </div>
    </div>
  );
}
