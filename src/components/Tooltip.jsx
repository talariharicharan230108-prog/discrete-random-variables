import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function Tooltip({ text, children, position = 'top' }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center group">
      {children ? (
        <span 
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onClick={() => setVisible(!visible)}
          className="cursor-help"
        >
          {children}
        </span>
      ) : (
        <button
          type="button"
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          onClick={() => setVisible(!visible)}
          className="text-cyan-400 hover:text-cyan-300 ml-1 inline-flex items-center transition-colors focus:outline-none"
          aria-label="Contextual Help"
        >
          <HelpCircle className="w-3.5 h-3.5 inline" />
        </button>
      )}

      {visible && (
        <div 
          className={`absolute z-50 w-64 p-3 text-xs font-normal text-slate-200 bg-slate-900/95 border border-cyan-500/40 rounded-xl shadow-xl backdrop-blur-md transition-opacity pointer-events-none ${
            position === 'top' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' :
            position === 'bottom' ? 'top-full mt-2 left-1/2 -translate-x-1/2' :
            position === 'left' ? 'right-full mr-2 top-1/2 -translate-y-1/2' :
            'left-full ml-2 top-1/2 -translate-y-1/2'
          }`}
        >
          {text}
          <div 
            className={`absolute w-2 h-2 bg-slate-900 border-cyan-500/40 transform rotate-45 ${
              position === 'top' ? 'top-full -mt-1 left-1/2 -translate-x-1/2 border-b border-r' :
              position === 'bottom' ? 'bottom-full -mb-1 left-1/2 -translate-x-1/2 border-t border-l' :
              'left-full -ml-1 top-1/2 -translate-y-1/2'
            }`}
          />
        </div>
      )}
    </div>
  );
}
