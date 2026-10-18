import React from 'react';
import { 
  ScanText, 
  Clock, 
  Volume2, 
  Camera, 
  Languages, 
  Activity, 
  ShieldAlert, 
  CalendarClock, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Smartphone
} from 'lucide-react';

export const Slide3Solution: React.FC = () => {
  const modules = [
    {
      num: "01",
      icon: ScanText,
      title: "OCR & NLP Summarization",
      desc: "Extracts drug names, doses, frequencies & follow-up dates from hospital discharge summaries with high fidelity."
    },
    {
      num: "02",
      icon: Clock,
      title: "Smart Medication Scheduling",
      desc: "Automatically maps medical shorthand (TDS, BD, QHS) into accurate, personalized local reminder schedules."
    },
    {
      num: "03",
      icon: Volume2,
      title: "3-Minute Voice Escalation",
      desc: "If push notification stays unopened for 180 seconds, the device triggers spoken voice alert in the patient's dialect."
    },
    {
      num: "04",
      icon: Camera,
      title: "Patient-Uploaded Pill Photos",
      desc: "Patient/caregiver photographs actual dispensed tablet packets, linking verified real visuals with reminder alerts."
    },
    {
      num: "05",
      icon: Languages,
      title: "Vernacular Multilingual Engine",
      desc: "Native Tamil, Tanglish ('Time aaiduchu, tablet podunga!'), and English conversational prompting."
    },
    {
      num: "06",
      icon: Activity,
      title: "Symptom & Recovery Monitor",
      desc: "Simple daily check-ins for pain, temperature, vitals, and surgical site healing with red-flag alert escalation."
    },
    {
      num: "07",
      icon: ShieldAlert,
      title: "Herb–Drug Safety Matrix",
      desc: "Evidence-based screening cross-referencing traditional remedies (Giloy, Kabasura Kudineer) with allopathic prescriptions."
    },
    {
      num: "08",
      icon: CalendarClock,
      title: "Discharge Precautions & Follow-up",
      desc: "Automated countdown to clinic visits, dietary restrictions, wound care steps, and physician contact links."
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Official Template Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200/60">
            SLIDE 03 · OFFICIAL QUANTEX’26 HEADING: PROPOSED SOLUTION
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Unified AI-Powered Post-Discharge Care Architecture
          </span>
        </div>
        <span className="text-xs font-bold text-slate-600">TEAM NEURALNOVA</span>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-12 gap-6 my-auto items-center">
        {/* Left 7 Columns: 8 Core Modules */}
        <div className="col-span-12 lg:col-span-7 space-y-3.5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              An Integrated 8-Module Patient Companion
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Engineered specifically for the vulnerable 30-day post-discharge window, combining cognitive simplicity with clinical safety guardrails.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 flex items-start gap-2.5 hover:bg-white hover:border-indigo-200 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-indigo-600">{mod.num}.</span>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">{mod.title}</h3>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-snug mt-0.5">{mod.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clinical Guardrail Disclaimer */}
          <div className="p-2.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Clinical Guardrail:</strong> Tablet photographs are snapped by the patient/caregiver and bound to a verified prescription item. The system deliberately does not perform unverified pill classification from arbitrary photos.
            </p>
          </div>
        </div>

        {/* Right 5 Columns: Realistic Mobile Phone Mockup */}
        <div className="col-span-12 lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[340px] bg-slate-950 rounded-[32px] p-3 border-4 border-slate-800 shadow-xl text-white">
            {/* Phone Top Notch */}
            <div className="flex items-center justify-between px-3 py-1 text-[10px] text-slate-400">
              <span>9:41 AM</span>
              <div className="w-16 h-3 bg-slate-800 rounded-full"></div>
              <span>100%</span>
            </div>

            {/* Dashboard Tabs Preview */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-900 rounded-xl my-2 text-center text-[9px] font-bold">
              <div className="py-1 px-0.5 bg-indigo-600 rounded text-white truncate">Summary</div>
              <div className="py-1 px-0.5 text-slate-400 hover:text-white truncate">Medicines</div>
              <div className="py-1 px-0.5 text-slate-400 hover:text-white truncate">Progress</div>
              <div className="py-1 px-0.5 text-slate-400 hover:text-white truncate">Safety</div>
            </div>

            {/* Active Escalated Reminder Card */}
            <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-teal-400 flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-teal-400 animate-pulse" />
                  3-MIN VOICE ESCALATION ACTIVE
                </span>
                <span className="text-[9px] text-slate-400">8:03 AM</span>
              </div>

              {/* Tanglish Callout Header */}
              <div className="bg-indigo-950/80 border border-indigo-500/50 rounded-xl p-2 text-center">
                <span className="text-xs font-black text-indigo-300 block">
                  “Time aaiduchu, tablet podunga!”
                </span>
                <span className="text-[10px] text-slate-300">
                  காலை உணவு முடித்ததும் மாத்திரை சாப்பிடவும்
                </span>
              </div>

              {/* Pill Photo & Prescription Association */}
              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <div className="w-14 h-14 rounded-lg bg-indigo-950 border border-indigo-400/40 overflow-hidden shrink-0">
                  <img 
                    src="/src/assets/images/mobile_vernacular_reminder_1792312875794.jpg" 
                    alt="Prescribed Tablet" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">Metformin 500mg</div>
                  <div className="text-[10px] text-slate-400">1 tablet oral · After breakfast</div>
                  <div className="text-[9px] text-teal-400 font-medium">Verified from Discharge Paper</div>
                </div>
              </div>

              {/* 3 Explicit Action Buttons */}
              <div className="space-y-1.5 pt-1">
                <div className="w-full py-1.5 bg-emerald-600 text-white rounded-lg text-center text-xs font-bold shadow-xs">
                  ✓ Taken (எடுத்துக்கொண்டேன்)
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="py-1 bg-slate-800 text-slate-300 rounded-lg text-center font-medium">
                    Snooze (10 mins)
                  </div>
                  <div className="py-1 bg-rose-950 text-rose-300 border border-rose-500/40 rounded-lg text-center font-medium">
                    Need Help?
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-[9px] text-slate-500 pt-2">
              NEURALNOVA Android Prototype Interface
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Team NEURALNOVA · Monisha S., Mohanasankari .S, Ramya.K</span>
        <span className="font-mono text-slate-400">Slide 3 of 10</span>
      </div>
    </div>
  );
};
