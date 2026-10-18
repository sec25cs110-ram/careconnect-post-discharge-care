import React from 'react';
import { 
  Sparkles, 
  Volume2, 
  Languages, 
  Camera, 
  ShieldAlert, 
  UserCheck, 
  Check, 
  X,
  Zap
} from 'lucide-react';

export const Slide6Innovation: React.FC = () => {
  const differentiators = [
    {
      title: "3-Minute Acoustic Escalation",
      subtitle: "Active Intervention vs. Passive Notification",
      icon: Volume2,
      conventional: "Passive push alerts that get silenced, swiped away, or buried under social media notifications.",
      neuralnova: "Automated countdown timer (180s). If unopened, triggers spoken voice alert in chosen dialect directly on-device.",
      badge: "Zero Notification Blindness"
    },
    {
      title: "Conversational Tanglish Engine",
      subtitle: "Culturally Grounded Dialect Intimacy",
      icon: Languages,
      conventional: "Cold, robotic literal translations ('மருந்தை விழுங்கவும்') that sound alien to elderly patients.",
      neuralnova: "Natural, caring household phrasing: “Time aaiduchu, tablet podunga!” bridging emotional and cognitive comfort.",
      badge: "High Senior Adherence"
    },
    {
      title: "Patient-Verified Pill Grounding",
      subtitle: "Grounded Visual Safety vs. AI Hallucination",
      icon: Camera,
      conventional: "Unreliable AI computer vision models attempting to guess pills from arbitrary angles, risking dangerous errors.",
      neuralnova: "Patient/caregiver photographs the verified dispensed blister pack once, binding actual visual reality to alerts.",
      badge: "Zero AI Guesswork"
    },
    {
      title: "Indigenous Herb–Drug Matrix",
      subtitle: "First-of-its-Kind Indian Polypharmacy Safety",
      icon: ShieldAlert,
      conventional: "Global drug checkers only evaluate Western allopathic interactions, totally blind to Indian herbal preparations.",
      neuralnova: "Evidence-based matrix cross-referencing Giloy, Kabasura Kudineer, Tulsi & Garlic with Anticoagulants and Statins.",
      badge: "Indigenous Context"
    },
    {
      title: "Human-in-the-Loop Verification",
      subtitle: "Clinical Accountability by Design",
      icon: UserCheck,
      conventional: "Fully automated black-box bots making autonomous assumptions on clinical dosages without human sign-off.",
      neuralnova: "Mandatory human review gate: patient/caregiver reviews OCR extracted lines against discharge summary before activation.",
      badge: "Clinical Safety Standard"
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Official Template Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200/60">
            SLIDE 06 · OFFICIAL QUANTEX’26 HEADING: INNOVATION AND UNIQUE FEATURES
          </span>
          <span className="text-xs font-semibold text-slate-500">
            5 Distinct Pillars Separating NEURALNOVA from Generic Pill Reminders
          </span>
        </div>
        <span className="text-xs font-bold text-slate-600">TEAM NEURALNOVA</span>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-6 my-auto items-center">
        {/* Left 8 Cols: Comparative Innovation Table */}
        <div className="col-span-12 lg:col-span-8 space-y-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Why NEURALNOVA Wins: The Five Innovation Pillars</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">Novelty</span>
            </h2>
            <p className="text-xs text-slate-600">
              Comparative analysis demonstrating how our architecture solves the persistent real-world failure modes of existing healthcare apps.
            </p>
          </div>

          <div className="space-y-2">
            {differentiators.map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">{diff.title}</span>
                      <span className="text-[10px] text-slate-500 hidden sm:inline">({diff.subtitle})</span>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      {diff.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] leading-snug">
                    <div className="bg-rose-50/50 border border-rose-100 rounded-lg p-1.5 flex items-start gap-1.5 text-slate-700">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span><strong>Conventional:</strong> {diff.conventional}</span>
                    </div>
                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-1.5 flex items-start gap-1.5 text-slate-800">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>NEURALNOVA:</strong> {diff.neuralnova}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 4 Cols: Herb-Drug Visual & Feature Highlight */}
        <div className="col-span-12 lg:col-span-4 space-y-3">
          <div className="rounded-2xl border border-slate-200 shadow-md overflow-hidden bg-white">
            <div className="h-44 sm:h-48 overflow-hidden relative">
              <img 
                src="/src/assets/images/herb_drug_safety_matrix_1792312875384.jpg" 
                alt="Herb-Drug Safety Matrix" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                Pharmacology Shield
              </div>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">
                Indigenous Safety Breakthrough
              </span>
              <p className="text-xs font-bold text-slate-900">
                Screening Traditional Remedies with Allopathy
              </p>
              <p className="text-[10px] text-slate-600 leading-snug">
                Protects Indian patients from severe drug interactions like Giloy-induced hypoglycemia or garlic-induced bleeding when taken with prescribed discharge medications.
              </p>
            </div>
          </div>

          <div className="bg-indigo-900 text-white rounded-xl p-3 text-xs flex items-center gap-2.5 shadow-sm">
            <Zap className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-[11px]">Zero-Pill-Identification Risk</p>
              <p className="text-[10px] text-indigo-200">Patient-grounded photo links prevent disastrous computer vision misidentifications.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Team NEURALNOVA · Monisha S., Mohanasankari .S, Ramya.K</span>
        <span className="font-mono text-slate-400">Slide 6 of 10</span>
      </div>
    </div>
  );
};
