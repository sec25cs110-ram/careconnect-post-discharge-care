import React from 'react';
import { 
  AlertOctagon, 
  FileWarning, 
  BellOff, 
  Languages, 
  ActivitySquare, 
  ShieldAlert, 
  Layers, 
  ArrowRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';

export const Slide2Problem: React.FC = () => {
  const problems = [
    {
      icon: FileWarning,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      title: "Cryptic Discharge Jargon",
      desc: "Discharge papers are filled with dense clinical shorthand (e.g., 'Tab TDS PC x 5/7'). Elderly patients cannot interpret dosage timing."
    },
    {
      icon: BellOff,
      color: "text-rose-600 bg-rose-50 border-rose-200",
      title: "Notification Blindness",
      desc: "Standard smartphone alerts are swiped away or silenced. 64% of silent push reminders fail to prompt actual pill ingestion."
    },
    {
      icon: Languages,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      title: "Severe Language Divide",
      desc: "Medical instructions are overwhelmingly drafted in English, creating high cognitive friction for vernacular Tamil and Tanglish speakers."
    },
    {
      icon: ShieldAlert,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      title: "Hidden Herb–Drug Clashes",
      desc: "Patients routinely take traditional home remedies (Giloy, Kabasura Kudineer, Garlic) alongside blood thinners or antidiabetics, risking severe toxicity."
    },
    {
      icon: ActivitySquare,
      color: "text-teal-600 bg-teal-50 border-teal-200",
      title: "Untracked Warning Signs",
      desc: "No intuitive mechanism to record vitals or red-flag recovery signs, allowing minor surgical or post-illness symptoms to escalate."
    },
    {
      icon: Layers,
      color: "text-slate-600 bg-slate-100 border-slate-200",
      title: "Fragmented Point Tools",
      desc: "Disparate apps for alarms, notes, and records fail to deliver an effortless, unified post-discharge continuum of care."
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Official Template Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200/60">
            SLIDE 02 · OFFICIAL QUANTEX’26 HEADING: PROBLEM STATEMENT
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Clinical Vulnerability in the First 30 Days Post-Discharge
          </span>
        </div>
        <span className="text-xs font-bold text-slate-600">TEAM NEURALNOVA</span>
      </div>

      {/* Main Content Area */}
      <div className="my-auto space-y-5">
        {/* Central Problem Statement Quote Box */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-5 border border-indigo-700/50 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-300 block mb-1">
              Central Problem Statement
            </span>
            <p className="text-base sm:text-lg lg:text-xl font-semibold leading-relaxed text-indigo-50">
              “Patients need an accessible, multilingual and intelligent post-discharge companion that simplifies medical instructions, improves medication reminder acknowledgment, supports recovery monitoring, and flags potential medication safety risks.”
            </p>
          </div>
        </div>

        {/* 6 Key Failure Drivers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg border ${prob.color} shrink-0 mt-0.5`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {prob.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {prob.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Problem-to-Impact Cascade Diagram */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
            <span>Problem-to-Impact Cascade: The Post-Discharge Breakdown</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-800 block text-[11px]">Confusing Paper Summary</span>
              <span className="text-[10px] text-slate-500">Unreadable dosages & timings</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-200 relative">
              <span className="font-bold text-rose-700 block text-[11px]">Unopened Mobile Alerts</span>
              <span className="text-[10px] text-slate-500">Silent push notifications ignored</span>
            </div>

            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <span className="font-bold text-purple-700 block text-[11px]">Unvetted Herbal Mixture</span>
              <span className="text-[10px] text-slate-500">Giloy / Kudineer toxicity clash</span>
            </div>

            <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-200">
              <span className="font-bold text-rose-900 block text-[11px]">Preventable Readmission</span>
              <span className="text-[10px] text-rose-600">Acute Adverse Drug Event (ADE)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Team NEURALNOVA · Sri Sairam Engineering College</span>
        <span className="font-mono text-slate-400">Slide 2 of 10</span>
      </div>
    </div>
  );
};
