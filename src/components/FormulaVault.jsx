import React, { useState } from 'react';
import { BookOpen, Copy, Check, Sparkles } from 'lucide-react';
import { FORMULA_VAULT } from '../utils/calculations';

export default function FormulaVault() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (formulaObj) => {
    navigator.clipboard.writeText(formulaObj.plainText || formulaObj.formula);
    setCopiedId(formulaObj.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="formulas" className="theory-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow-label bg-purple-500/10 border-purple-500/30 text-purple-400">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Academic Reference</span>
          </div>
          <h2 className="section-title">
            Formula Vault
          </h2>
          <p className="section-subtitle">
            Quick mathematical reference library containing standard formulations, moment derivations, and asymptotic limit theorems.
          </p>
        </div>

        {/* Formula Cards Grid (28px gap) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {FORMULA_VAULT.map((card) => (
            <div 
              key={card.id}
              className="glass-card formula-card p-6 border-purple-500/20 flex flex-col justify-between hover:border-purple-500/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider font-mono font-bold px-2.5 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    {card.category}
                  </span>

                  <button
                    onClick={() => handleCopy(card)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
                    title="Copy plain-text formula"
                  >
                    {copiedId === card.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 font-['Plus_Jakarta_Sans']">
                  {card.title}
                </h3>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-sm text-cyan-300 mb-4 overflow-x-auto formula">
                  {card.plainText}
                </div>

                <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Variables List */}
              <div className="pt-3 border-t border-[var(--border-color)] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Variables:</span>
                <div className="flex flex-wrap gap-2 text-[11px] text-[var(--text-secondary)] font-mono">
                  {card.variables.map((v, idx) => (
                    <span key={idx} className="bg-white/5 px-2 py-0.5 rounded">
                      <strong className="text-cyan-400">{v.name}</strong>: {v.desc}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
