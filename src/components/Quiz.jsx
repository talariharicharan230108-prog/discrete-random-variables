import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, Sparkles } from 'lucide-react';

export default function Quiz() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState({});

  const questions = [
    {
      id: 1,
      category: 'Binomial',
      question: 'If n = 10 trials and probability of success p = 0.5, what is the expected number of successes E(X)?',
      options: [
        { label: 'A. 2', correct: false },
        { label: 'B. 5', correct: true },
        { label: 'C. 10', correct: false },
        { label: 'D. 2.5', correct: false }
      ],
      explanation: 'The mean of a Binomial distribution is E(X) = n · p = 10 × 0.5 = 5.'
    },
    {
      id: 2,
      category: 'Poisson',
      question: 'What is the hallmark property of a Poisson distribution regarding its Mean and Variance?',
      options: [
        { label: 'A. Mean is twice the Variance', correct: false },
        { label: 'B. Variance is always zero', correct: false },
        { label: 'C. Mean and Variance are equal (E(X) = Var(X) = λ)', correct: true },
        { label: 'D. Mean is always equal to 1', correct: false }
      ],
      explanation: 'For a Poisson distribution, the expected mean and variance are identical: E(X) = Var(X) = λ.'
    },
    {
      id: 3,
      category: 'Approximation',
      question: 'Under what conditions does the Binomial distribution converge into a Poisson distribution?',
      options: [
        { label: 'A. Small n and large p', correct: false },
        { label: 'B. Large n and small p with constant product λ = np', correct: true },
        { label: 'C. When trials are dependent', correct: false },
        { label: 'D. When probability p equals 1.0', correct: false }
      ],
      explanation: 'According to the Poisson Limit Theorem, Binomial(n,p) approaches Poisson(λ) as n → ∞ and p → 0 with np = λ.'
    }
  ];

  const handleSelect = (qId, optIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setShowResults(prev => ({ ...prev, [qId]: true }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults({});
  };

  return (
    <section id="quiz" className="py-20 bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Interactive Self-Assessment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-['Plus_Jakarta_Sans']">
            Test Your Understanding
          </h2>
          <p className="text-[var(--text-secondary)] text-base">
            Check your mastery of discrete random variables with quick conceptual questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {questions.map((q) => {
            const userChoice = selectedAnswers[q.id];
            const isAnswered = showResults[q.id];

            return (
              <div 
                key={q.id}
                className="glass-card p-6 border-emerald-500/20 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {q.category} Quiz
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-4 leading-snug">
                    {q.question}
                  </h3>

                  <div className="space-y-2">
                    {q.options.map((opt, idx) => {
                      const isSelected = userChoice === idx;
                      let btnStyle = 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10';
                      
                      if (isAnswered) {
                        if (opt.correct) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-bold';
                        } else if (isSelected && !opt.correct) {
                          btnStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(q.id, idx)}
                          className={`w-full p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt.label}</span>
                          {isAnswered && opt.correct && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {isAnswered && isSelected && !opt.correct && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {isAnswered && (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 animate-fadeIn">
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={resetQuiz}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Quiz Answers</span>
          </button>
        </div>

      </div>
    </section>
  );
}
