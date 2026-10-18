import React from 'react';
import { 
  Upload, 
  Scan, 
  Cpu, 
  UserCheck, 
  Camera, 
  Bell, 
  Volume2, 
  CheckSquare, 
  HeartPulse, 
  ShieldAlert,
  ArrowRight,
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';

export const Slide4Methodology: React.FC = () => {
  const steps = [
    { num: "01", title: "Upload", sub: "PDF / Image", icon: Upload },
    { num: "02", title: "OCR", sub: "Paddle / Tesseract", icon: Scan },
    { num: "03", title: "AI NLP", sub: "Dose & Timing Extr.", icon: Cpu },
    { num: "04", title: "Verification", sub: "Caregiver Audit", icon: UserCheck, highlight: true },
    { num: "05", title: "Pill Binding", sub: "Dispensed Photo", icon: Camera },
    { num: "06", title: "Schedule", sub: "Local Notification", icon: Bell },
    { num: "07", title: "3-Min Escalation", sub: "Vernacular Voice", icon: Volume2, highlight: true },
    { num: "08", title: "Action", sub: "Taken/Snooze/Help", icon: CheckSquare },
    { num: "09", title: "Recovery", sub: "Vitals & Symptoms", icon: HeartPulse },
    { num: "10", title: "Safety", sub: "Herb–Drug Matrix", icon: ShieldAlert }
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Official Template Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200/60">
            SLIDE 04 · OFFICIAL QUANTEX’26 HEADING: METHODOLOGY / WORKING MODEL
          </span>
          <span className="text-xs font-semibold text-slate-500">
            End-to-End Operational Pipeline & Escalation Logic
          </span>
        </div>
        <span className="text-xs font-bold text-slate-600">TEAM NEURALNOVA</span>
      </div>

      {/* Main Content Area */}
      <div className="my-auto space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              10-Step Deterministic Architecture & Escalation State Machine
            </h2>
            <p className="text-xs text-slate-600">
              Strictly enforces human-in-the-loop validation to prevent automated hallucination or incorrect dosing.
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-semibold border border-slate-200">
              Zero Autonomous Dose Modification
            </span>
          </div>
        </div>

        {/* 10-Step End-to-End Flowchart */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>End-to-End Execution Sequence (Steps 01 to 10)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div
                  key={idx}
                  className={`p-2 rounded-xl border flex flex-col justify-between text-center transition-all ${
                    st.highlight
                      ? 'bg-indigo-900 text-white border-indigo-700 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1 font-mono">
                    <span className={st.highlight ? 'text-teal-300 font-bold' : 'text-indigo-600 font-bold'}>
                      {st.num}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${st.highlight ? 'text-teal-300' : 'text-slate-400'}`} />
                  </div>
                  <div className="py-0.5">
                    <div className="text-xs font-bold truncate">{st.title}</div>
                    <div className={`text-[9px] truncate ${st.highlight ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {st.sub}
                    </div>
                  </div>
                  {st.highlight && (
                    <span className="mt-1 text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded bg-teal-400/20 text-teal-200 border border-teal-300/30">
                      Guardrail
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated 3-Minute Reminder Logic Diagram & Clinical Safety Boundary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left 8 Cols: Reminder Logic Diagram */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                Dedicated 3-Minute Escalation State Logic
              </span>
              <span className="text-[10px] text-slate-400 font-mono">OS Permission Gated</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex-1 bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-center w-full">
                <span className="text-[10px] text-slate-500 block font-mono">T = 00:00</span>
                <strong className="text-slate-900 block text-xs">Push Notification</strong>
                <span className="text-[10px] text-slate-600">Silent / Heads-up display</span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />

              <div className="flex-1 bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-center w-full">
                <span className="text-[10px] text-amber-700 block font-mono">T = 03:00 (180s)</span>
                <strong className="text-amber-900 block text-xs">Check State</strong>
                <span className="text-[10px] text-amber-700">Is notification unopened?</span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />

              <div className="flex-1 bg-indigo-50 border border-indigo-200 p-2.5 rounded-xl text-center w-full">
                <span className="text-[10px] text-indigo-600 block font-mono">T &gt; 03:00</span>
                <strong className="text-indigo-950 block text-xs">Acoustic Escalation</strong>
                <span className="text-[10px] text-indigo-700">Tanglish/Tamil TTS Voice</span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />

              <div className="flex-1 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-center w-full">
                <span className="text-[10px] text-emerald-700 block font-mono">Acknowledgment</span>
                <strong className="text-emerald-950 block text-xs">User Resolution</strong>
                <span className="text-[10px] text-emerald-700">Taken / Snooze / Help</span>
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Explicit Safety Boundaries */}
          <div className="lg:col-span-4 bg-rose-50/60 border border-rose-200 rounded-2xl p-3.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-rose-800 text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                Strict Clinical Safety Boundaries
              </div>
              <ul className="text-[11px] text-rose-950 space-y-1.5 leading-snug list-disc pl-4">
                <li>
                  <strong>Opening != Ingestion:</strong> Unlocking an alert does not prove the medication was swallowed.
                </li>
                <li>
                  <strong>No Autonomous Adjustments:</strong> The app never alters dosage intervals or recommends doubling up a missed dose.
                </li>
                <li>
                  <strong>Physician Escalation:</strong> Persistent unresponsiveness or severe side-effects prompt direct clinic contact.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Team NEURALNOVA · Monisha S., Mohanasankari .S, Ramya.K</span>
        <span className="font-mono text-slate-400">Slide 4 of 10</span>
      </div>
    </div>
  );
};
