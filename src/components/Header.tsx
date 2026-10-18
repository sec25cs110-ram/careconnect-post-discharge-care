import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  FileDown, 
  Maximize2, 
  Minimize2, 
  FileText, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { SLIDES, TEAM_INFO } from '../data/slidesData';

interface HeaderProps {
  currentSlide: number;
  setCurrentSlide: (slide: number) => void;
  showNotes: boolean;
  setShowNotes: (show: boolean) => void;
  onOpenSimulator: () => void;
  onExportPdf: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlide,
  setCurrentSlide,
  showNotes,
  setShowNotes,
  onOpenSimulator,
  onExportPdf,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pitchSeconds, setPitchSeconds] = useState(180); // 3-minute pitch timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && pitchSeconds > 0) {
      interval = setInterval(() => {
        setPitchSeconds((prev) => prev - 1);
      }, 1000);
    } else if (pitchSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, pitchSeconds]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const timerColor = pitchSeconds < 30 ? 'text-rose-400' : pitchSeconds < 60 ? 'text-amber-400' : 'text-emerald-400';

  return (
    <header className="no-print bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4 sticky top-0 z-40 select-none">
      {/* Brand & Competition Zone */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-teal-400 flex items-center justify-center font-bold text-white shadow-sm shadow-indigo-500/30">
            N
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">{TEAM_INFO.teamName}</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30">
                {TEAM_INFO.competition}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-[220px] lg:max-w-[340px]">
              {TEAM_INFO.institution}
            </p>
          </div>
        </div>
      </div>

      {/* Slide Navigation Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-2 bg-slate-900/80 rounded-lg border border-slate-800/80">
        <button
          onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
          disabled={currentSlide === 1}
          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          title="Previous slide (Left Arrow)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          {SLIDES.map((slide) => {
            const isActive = currentSlide === slide.id;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(slide.id)}
                className={`w-7 h-7 text-xs font-mono font-medium rounded-md transition-all flex items-center justify-center ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/40 ring-1 ring-indigo-400 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
                title={`Slide ${slide.id}: ${slide.officialHeading}`}
              >
                {slide.number}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setCurrentSlide(Math.min(10, currentSlide + 1))}
          disabled={currentSlide === 10}
          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          title="Next slide (Right Arrow)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Action Controls & Pitch Timer */}
      <div className="flex items-center gap-2 lg:gap-3 shrink-0">
        {/* 3-Minute Pitch Timer */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Pitch</span>
          <span className={`font-mono text-xs font-bold tabular-nums ${timerColor}`}>
            {formatTimer(pitchSeconds)}
          </span>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="text-slate-300 hover:text-white transition-colors"
            title={isTimerRunning ? "Pause timer" : "Start 3-minute pitch timer"}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              setIsTimerRunning(false);
              setPitchSeconds(180);
            }}
            className="text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset timer to 3:00"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Live Simulator Modal Button */}
        <button
          onClick={onOpenSimulator}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-teal-500/15 text-teal-300 border border-teal-500/30 hover:bg-teal-500/25 transition-all shadow-sm"
          title="Interactive Simulator (Tamil/Tanglish Voice Escalation & Herb-Drug Matrix)"
        >
          <Volume2 className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          <span className="hidden md:inline">Voice & Safety Simulator</span>
          <span className="md:hidden">Demo</span>
        </button>

        {/* Speaker Notes Toggle */}
        <button
          onClick={() => setShowNotes(!showNotes)}
          className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
            showNotes 
              ? 'bg-indigo-950 text-indigo-300 border-indigo-600/50' 
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
          title="Toggle Judge Presentation Notes"
        >
          <FileText className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Speaker Notes</span>
        </button>

        {/* Export PDF Button */}
        <button
          onClick={onExportPdf}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-all cursor-pointer"
          title="Export official 10-slide PDF (landscape formatted)"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span>Export PDF</span>
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Toggle Fullscreen (F)"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
