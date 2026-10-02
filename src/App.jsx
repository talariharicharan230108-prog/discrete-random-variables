import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CompactJourney from './components/CompactJourney';
import ConceptCard from './components/ConceptCard';
import FeaturedDemo from './components/FeaturedDemo';
import HowItWorks from './components/HowItWorks';
import RealWorldData from './components/RealWorldData';
import Overview from './components/Overview';
import LabCTA from './components/LabCTA';
import ProjectInfoCard from './components/ProjectInfoCard';

import BinomialLab from './components/BinomialLab';
import BinomialMGF from './components/BinomialMGF';
import PoissonLab from './components/PoissonLab';
import Comparison from './components/Comparison';
import BinomialPoissonApprox from './components/BinomialPoissonApprox';
import StatisticalLab from './components/StatisticalLab';
import ProbabilityCalculator from './components/ProbabilityCalculator';
import FormulaVault from './components/FormulaVault';
import Quiz from './components/Quiz';
import ProgressTracker from './components/ProgressTracker';

import Applications from './components/Applications';
import Methodology from './components/Methodology';
import Objectives from './components/Objectives';
import KeyFindings from './components/KeyFindings';
import Conclusion from './components/Conclusion';
import About from './components/About';
import QuickCalcModal from './components/QuickCalcModal';
import Footer from './components/Footer';

export default function App() {
  // Persistent Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Hash-based simple routing
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setCurrentHash(hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Shared Simulator States for Key Findings & Live Synchronization
  const [binomN, setBinomN] = useState(20);
  const [binomP, setBinomP] = useState(0.6);
  const [binomX, setBinomX] = useState(12);

  const [poissonLambda, setPoissonLambda] = useState(5.0);
  const [poissonX, setPoissonX] = useState(3);

  // Quick Calculator Modal State
  const [quickCalcOpen, setQuickCalcOpen] = useState(false);

  // Demo Trigger Handler
  const triggerDemo = () => {
    window.location.hash = '#explore';
  };

  const getActiveTab = () => {
    if (['#learn', '#mgf'].includes(currentHash)) return 'learn';
    if (['#explore', '#binomial-lab', '#poisson-lab', '#comparison'].includes(currentHash)) return 'explore';
    if (['#real-world', '#applications'].includes(currentHash)) return 'real-world';
    if (['#stat-lab', '#calculator', '#lab', '#insights'].includes(currentHash)) return 'lab';
    if (['#about', '#methodology'].includes(currentHash)) return 'about';
    return 'home';
  };

  const activeTab = getActiveTab();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-sans antialiased selection:bg-cyan-500 selection:text-black">
      
      {/* Sticky Navbar */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onOpenQuickCalc={() => setQuickCalcOpen(true)} 
        onTriggerDemo={triggerDemo}
      />

      {/* Main Content Sections */}
      <main className="main-content">
        
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* 1. Landing Page Hero */}
            <Hero onTriggerDemo={triggerDemo} />
            
            {/* 2. Compact Learning Journey */}
            <CompactJourney />
            
            {/* 3. Choose a Distribution */}
            <ConceptCard />
            
            {/* 4. Featured Interactive Demo */}
            <FeaturedDemo onOpenSimulator={() => window.location.hash = '#explore'} />
            
            {/* 5. How It Works */}
            <HowItWorks />
            
            {/* 6. Real-World Probability Preview */}
            <RealWorldData isPreview={true} />
            
            {/* 7. Why This Project? (Short Overview) */}
            <Overview />

            {/* 8. Project Information Card (Requirement 13) */}
            <ProjectInfoCard />
            
            {/* 9. Launch Statistical Lab CTA */}
            <LabCTA onOpenLab={() => window.location.hash = '#calculator'} />
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="animate-fadeIn pt-16 pb-16 space-y-16">
            <div className="page-header">
              <div className="eyebrow-label">Curriculum Theory</div>
              <h1>Learn Probability</h1>
              <p>Master the fundamental principles, moment generating functions, and distributions of discrete random variables.</p>
            </div>
            
            <ConceptCard />
            <BinomialMGF n={binomN} p={binomP} />
            <FormulaVault />
            <div className="max-w-7xl mx-auto px-4"><ProgressTracker /></div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="animate-fadeIn pt-16 pb-16 space-y-16">
            <div className="page-header">
              <div className="eyebrow-label">Visual Simulators</div>
              <h1>Explore Interactive Simulators</h1>
              <p>Interactive laboratory experiments visualizing probability mass functions, convergence properties, and parameter sensitivities.</p>
            </div>

            <BinomialLab 
              n={binomN} setN={setBinomN} p={binomP} setP={setBinomP} selectedX={binomX} setSelectedX={setBinomX}
            />
            <PoissonLab 
              lambda={poissonLambda} setLambda={setPoissonLambda} selectedX={poissonX} setSelectedX={setPoissonX}
            />
            <Comparison />
            <BinomialPoissonApprox />
          </div>
        )}

        {activeTab === 'real-world' && (
          <div className="animate-fadeIn pt-16">
            <RealWorldData />
            <Applications />
            <Quiz />
          </div>
        )}

        {/* CALCULATOR & STATISTICAL WORKSPACE TAB (Requirement 2 & 10) */}
        {activeTab === 'lab' && (
          <div className="animate-fadeIn pt-16">
            {/* 1. CALCULATOR (with .calculator-section & .calculator-layout) */}
            <ProbabilityCalculator 
              activeBinom={{ n: binomN, p: binomP, x: binomX }}
              activePoisson={{ lambda: poissonLambda, x: poissonX }}
              onSyncBinom={(n, p, x) => { setBinomN(n); setBinomP(p); setBinomX(x); }}
              onSyncPoisson={(l, x) => { setPoissonLambda(l); setPoissonX(x); }}
            />

            {/* 2. INSIGHTS (with .insights-section & .insights-grid) */}
            <KeyFindings 
              binomParams={{ n: binomN, p: binomP, selectedX: binomX }}
              poissonParams={{ lambda: poissonLambda, selectedX: poissonX }}
            />

            {/* 3. REAL-WORLD ANALYSIS (with .real-world-section) */}
            <StatisticalLab />

            {/* 4. FORMULA / THEORY (with .theory-section) */}
            <FormulaVault />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="animate-fadeIn pt-16">
            <About />
            <ProjectInfoCard />
            <Methodology />
            <Objectives />
            <Conclusion />
          </div>
        )}

      </main>

      {/* Quick Calculator Pop-up Modal */}
      <QuickCalcModal 
        isOpen={quickCalcOpen} 
        onClose={() => setQuickCalcOpen(false)} 
      />

      {/* Premium Footer */}
      <Footer />

    </div>
  );
}
