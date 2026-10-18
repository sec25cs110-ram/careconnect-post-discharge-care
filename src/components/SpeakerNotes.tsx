import React from 'react';
import { FileText, Lightbulb, X, Clock, CheckCircle2 } from 'lucide-react';
import { SLIDES } from '../data/slidesData';

interface SpeakerNotesProps {
  currentSlide: number;
  isOpen: boolean;
  onClose: () => void;
}

export const SpeakerNotes: React.FC<SpeakerNotesProps> = ({ currentSlide, isOpen, onClose }) => {
  if (!isOpen) return null;

  const slide = SLIDES.find((s) => s.id === currentSlide) || SLIDES[0];

  return (
    <div className="no-print fixed bottom-14 left-4 right-4 md:left-12 md:right-12 lg:left-24 lg:right-24 z-30 bg-slate-950/95 border border-indigo-500/40 rounded-2xl shadow-2xl backdrop-blur-md p-4 text-white">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            Slide {slide.number} Presenter & Pitch Notes (Quantex’26)
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            · {slide.officialHeading}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          title="Close speaker notes"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* Left: Key talking points */}
        <div className="md:col-span-8 space-y-1.5 text-xs text-slate-300 leading-relaxed">
          {slide.speakerNotes.map((note, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold shrink-0 mt-0.5">•</span>
              <p>{note}</p>
            </div>
          ))}
        </div>

        {/* Right: Key takeaway and timing guidance */}
        <div className="md:col-span-4 bg-indigo-950/60 border border-indigo-500/30 rounded-xl p-3 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300">
            <Lightbulb className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>Judge Takeaway Anchor</span>
          </div>
          <p className="text-[11px] text-indigo-100 leading-snug">
            {slide.keyTakeaway}
          </p>
          <div className="pt-1 border-t border-indigo-900/60 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              Target: ~18-20s per slide
            </span>
            <span className="text-teal-400 font-semibold">3-Minute Total</span>
          </div>
        </div>
      </div>
    </div>
  );
};
