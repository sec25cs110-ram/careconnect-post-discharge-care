import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  GitBranch, 
  Building2, 
  Radio, 
  Smartphone,
  Quote
} from 'lucide-react';

export const Slide8Outcomes: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      {/* Official Template Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200/60">
            SLIDE 08 · OFFICIAL QUANTEX’26 HEADING: EXPECTED OUTCOMES AND CONCLUSION
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Honest Delineation of Tested Prototype vs. Proposed Roadmap
          </span>
        </div>
        <span className="text-xs font-bold text-slate-600">TEAM NEURALNOVA</span>
      </div>

      {/* Main Content Area */}
      <div className="my-auto space-y-4">
        {/* Title */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Scientific Rigor & Clinical Roadmap: Implemented vs. Proposed
          </h2>
          <p className="text-xs text-slate-600">
            Adhering strictly to competition integrity: distinguishing what has been engineered and tested from our forward-looking Phase 2 roadmap.
          </p>
        </div>

        {/* 2-Column Split: Tested Today vs Proposed Tomorrow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Column 1: Implemented & Tested in Prototype */}
          <div className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Tested & Validated in Working Prototype
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                  Live & Verifiable
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-800">
                <div className="p-2 bg-white rounded-lg border border-emerald-100 shadow-2xs">
                  <p className="font-bold text-slate-900 text-xs">1. Discharge Summary OCR Pipeline</p>
                  <p className="text-[11px] text-slate-600">Extraction of prescription medication lines, dose, and frequency from scanned test hospital summaries.</p>
                </div>

                <div className="p-2 bg-white rounded-lg border border-emerald-100 shadow-2xs">
                  <p className="font-bold text-slate-900 text-xs">2. Human-in-the-Loop Review Screen</p>
                  <p className="text-[11px] text-slate-600">Working interactive UI allowing patients/caregivers to verify and confirm dosage schedules before alarm arming.</p>
                </div>

                <div className="p-2 bg-white rounded-lg border border-emerald-100 shadow-2xs">
                  <p className="font-bold text-slate-900 text-xs">3. 3-Minute Voice Escalation Logic</p>
                  <p className="text-[11px] text-slate-600">State machine that monitors unopened alerts and triggers speech synthesis in Tamil, English, and Tanglish.</p>
                </div>

                <div className="p-2 bg-white rounded-lg border border-emerald-100 shadow-2xs">
                  <p className="font-bold text-slate-900 text-xs">4. Herb–Drug Safety Cross-Check</p>
                  <p className="text-[11px] text-slate-600">Curated lookup engine screening Giloy, Garlic, Kabasura Kudineer & Ashwagandha against major allopathic classes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Proposed for Phase 2 Rollout */}
          <div className="bg-indigo-50/40 border border-indigo-200 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-indigo-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  Proposed for Phase 2 & Hospital Deployment
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  Roadmap
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-800">
                <div className="p-2 bg-white rounded-lg border border-indigo-100 shadow-2xs">
                  <p className="font-bold text-slate-900 text-xs">1. Hospital EHR Integration (HL7 / FHIR)</p>
                  <p className="text-[11px] text-slate-600">Direct digital bridge receiving structured discharge orders automatically from hospital electronic health records.</p>
                </div>

                <div className="p-2 bg-white rounded-lg border border-indigo-100 shadow-2xs">
                  <p className="font-bold text-slate-900 text-xs">2. Automated Caregiver SMS Escalation</p>
                  <p className="text-[11px] text-slate-600">Secondary fallback dispatching SMS/WhatsApp alerts to designated family members if an alert is ignored for &gt;30 mins.</p>
                </div>

                <div className="p-2 bg-white rounded-lg border border-indigo-100 shadow-2xs">
                  <p className="font-bold text-slate-900 text-xs">3. Bluetooth Smart Pillbox Sensor Pairing</p>
                  <p className="text-[11px] text-slate-600">Optional physical IoT blister lid sensor integration to cross-validate physical box opening.</p>
                </div>

                <div className="p-2 bg-white rounded-lg border border-indigo-100 shadow-2xs">
                  <p className="font-bold text-slate-900 text-xs">4. Multi-Center Clinical Observational Study</p>
                  <p className="text-[11px] text-slate-600">Prospective cohort study measuring readmission reduction in geriatric cardiovascular cohorts.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Conclusion Synthesis Card */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-4 border border-indigo-800/50 shadow-md">
          <div className="flex items-start gap-3">
            <Quote className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-indigo-100">
                “Zero-Friction Post-Discharge Care transforms post-hospital transition from an anxious, confusing paper ritual into a safe, reassuring, and culturally attuned recovery continuum. By uniting 3-minute vernacular voice escalation, verified visual pill grounding, and indigenous herb–drug screening, Team NEURALNOVA delivers a compassionate, technically robust solution for post-discharge recovery.”
              </p>
              <div className="mt-2 text-[11px] text-teal-300 font-semibold">
                — Team NEURALNOVA, Sri Sairam Engineering College
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Team NEURALNOVA · Monisha S., Mohanasankari .S, Ramya.K</span>
        <span className="font-mono text-slate-400">Slide 8 of 10</span>
      </div>
    </div>
  );
};
