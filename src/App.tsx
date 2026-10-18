import React, { useState, useEffect, useCallback } from 'react';
import { CareConnectProvider, useCareConnect } from './context/CareConnectContext';
import { AppLayout } from './components/layout/AppLayout';
import { LoginView } from './components/auth/LoginView';
import { unlockAudio } from './utils/audioService';

// App Pages
import { DashboardPage } from './components/pages/DashboardPage';
import { DischargeSummaryPage } from './components/pages/DischargeSummaryPage';
import { MyMedicinesPage } from './components/pages/MyMedicinesPage';
import { RemindersPage } from './components/pages/RemindersPage';
import { RecoveryTrackerPage } from './components/pages/RecoveryTrackerPage';
import { HerbDrugSafetyPage } from './components/pages/HerbDrugSafetyPage';
import { CaregiverSupportPage } from './components/pages/CaregiverSupportPage';
import { NotificationsPage } from './components/pages/NotificationsPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { ProfilePage } from './components/pages/ProfilePage';

// Quantex'26 Presentation Deck Components
import { Header } from './components/Header';
import { SpeakerNotes } from './components/SpeakerNotes';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { PrintDeck } from './components/PrintDeck';
import { SLIDES } from './data/slidesData';

// Slides
import { Slide1Intro } from './components/slides/Slide1Intro';
import { Slide2Problem } from './components/slides/Slide2Problem';
import { Slide3Solution } from './components/slides/Slide3Solution';
import { Slide4Methodology } from './components/slides/Slide4Methodology';
import { Slide5TechStack } from './components/slides/Slide5TechStack';
import { Slide6Innovation } from './components/slides/Slide6Innovation';
import { Slide7Feasibility } from './components/slides/Slide7Feasibility';
import { Slide8Outcomes } from './components/slides/Slide8Outcomes';
import { Slide9GitHub } from './components/slides/Slide9GitHub';
import { Slide10Summary } from './components/slides/Slide10Summary';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

function QuantexDeckView() {
  const { setShowQuantexDeck } = useCareConnect();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) return;

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      setCurrentSlide((prev) => Math.min(10, prev + 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      setCurrentSlide((prev) => Math.max(1, prev - 1));
    } else if (e.key.toLowerCase() === 's') {
      setShowNotes((prev) => !prev);
    } else if (e.key.toLowerCase() === 'd') {
      setIsSimulatorOpen((prev) => !prev);
    } else if (e.key.toLowerCase() === 'p') {
      window.print();
    } else if (e.key === 'Escape') {
      setShowQuantexDeck(false);
    }
  }, [setShowQuantexDeck]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const renderActiveSlide = () => {
    switch (currentSlide) {
      case 1: return <Slide1Intro />;
      case 2: return <Slide2Problem />;
      case 3: return <Slide3Solution />;
      case 4: return <Slide4Methodology />;
      case 5: return <Slide5TechStack />;
      case 6: return <Slide6Innovation />;
      case 7: return <Slide7Feasibility />;
      case 8: return <Slide8Outcomes />;
      case 9: return <Slide9GitHub />;
      case 10: return <Slide10Summary />;
      default: return <Slide1Intro />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100 select-none">
      {/* Deck Top Header */}
      <Header
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        showNotes={showNotes}
        setShowNotes={setShowNotes}
        onOpenSimulator={() => setIsSimulatorOpen(true)}
        onExportPdf={() => window.print()}
      />

      {/* Return to App Button Bar */}
      <div className="no-print bg-indigo-950/80 border-b border-indigo-900/50 px-4 py-1.5 flex items-center justify-between text-xs">
        <button
          onClick={() => setShowQuantexDeck(false)}
          className="flex items-center gap-1.5 text-teal-300 hover:text-white font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Back to CareConnect Live Application</span>
        </button>
        <span className="text-slate-400 font-mono text-[11px]">
          Press ESC or click button to return to App
        </span>
      </div>

      {/* Main 16:9 Presentation Canvas */}
      <main className="no-print flex-1 flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-hidden">
        <div className="w-full max-w-7xl aspect-[16/9] bg-white text-slate-900 rounded-2xl shadow-2xl shadow-slate-950/80 border border-slate-700/50 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-hidden relative transition-all">
          {renderActiveSlide()}
        </div>
      </main>

      {/* Bottom Deck Controls */}
      <footer className="no-print bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
              disabled={currentSlide === 1}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide(Math.min(10, currentSlide + 1))}
              disabled={currentSlide === 10}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="font-mono text-xs">
            Slide <strong className="text-indigo-400">{currentSlide}</strong> / 10: {SLIDES.find(s => s.id === currentSlide)?.officialHeading}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQuantexDeck(false)}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Switch to App
          </button>
        </div>
      </footer>

      {/* Overlays */}
      <SpeakerNotes currentSlide={currentSlide} isOpen={showNotes} onClose={() => setShowNotes(false)} />
      <InteractiveSimulator isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)} />
      <PrintDeck />
    </div>
  );
}

function MainAppContent() {
  const { isAuthenticated, activeTab, showQuantexDeck } = useCareConnect();

  useEffect(() => {
    const handleFirstClick = () => {
      unlockAudio();
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    window.addEventListener('keydown', handleFirstClick, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstClick);
      window.removeEventListener('keydown', handleFirstClick);
    };
  }, []);

  if (showQuantexDeck) {
    return <QuantexDeckView />;
  }

  if (!isAuthenticated) {
    return <LoginView />;
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'discharge':
        return <DischargeSummaryPage />;
      case 'medicines':
        return <MyMedicinesPage />;
      case 'reminders':
        return <RemindersPage />;
      case 'recovery':
        return <RecoveryTrackerPage />;
      case 'safety':
        return <HerbDrugSafetyPage />;
      case 'caregivers':
        return <CaregiverSupportPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AppLayout>
      {renderActivePage()}
    </AppLayout>
  );
}

export default function App() {
  return (
    <CareConnectProvider>
      <MainAppContent />
    </CareConnectProvider>
  );
}
