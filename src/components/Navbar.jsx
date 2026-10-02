import React, { useState, useEffect } from 'react';
import { 
  FlaskConical, 
  Calculator, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Play
} from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onTriggerDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'Learn', href: '#learn' },
    { name: 'Explore', href: '#explore' },
    { name: 'Real-World', href: '#real-world' },
    { name: 'About', href: '#about' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar ${
        scrolled 
          ? 'bg-[var(--bg-nav)] backdrop-blur-md shadow-lg border-b border-[var(--border-color)] py-2.5' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
        
        {/* Brand Logo with 12px gap and clear line-heights */}
        <a href="#hero" className="logo-section group text-decoration-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full bg-[#070a13] rounded-[10px] flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="logo-title text-white font-['Plus_Jakarta_Sans'] tracking-tight">
                PROBABILITY<span className="text-cyan-400">LAB</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                MOD IV
              </span>
            </div>
            <div className="logo-subtitle text-[var(--text-muted)] font-sans hidden sm:block">
              Interactive Probability & Statistical Analysis Laboratory
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links - breakpoint 1050px */}
        <nav className="hidden min-[1051px]:flex items-center gap-7 bg-[var(--bg-card)] px-6 py-2 rounded-full border border-[var(--border-color)] backdrop-blur-md nav-links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link text-xs font-semibold text-[var(--text-secondary)] hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Quick Demo Button */}
          {onTriggerDemo && (
            <button
              onClick={onTriggerDemo}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/20 transition-all"
              title="Try Interactive Demo Mode"
            >
              <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
              <span>Try Demo</span>
            </button>
          )}

          {/* Probability Calculator Button */}
          <a
            href="#calculator"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md hover:shadow-blue-500/25 hover:opacity-95 transition-all text-decoration-none"
            title="Open Probability Analysis Lab"
          >
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">Calculator</span>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-cyan-500/50 transition-all"
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-500" />
            )}
          </button>

          {/* Mobile Menu Hamburger - shows at <= 1050px */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[1051px]:hidden p-2.5 rounded-xl bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-color)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="min-[1051px]:hidden bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-6 pt-4 pb-6 mt-3 space-y-3 backdrop-blur-xl animate-fadeIn shadow-2xl">
          <div className="text-[11px] font-mono uppercase text-[var(--text-muted)] tracking-wider px-2">
            Navigation Menu
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-sm font-semibold text-[var(--text-secondary)] hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-[var(--border-color)] flex flex-col gap-2">
            {onTriggerDemo && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onTriggerDemo();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-xl"
              >
                <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                <span>Launch Interactive Demo</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
