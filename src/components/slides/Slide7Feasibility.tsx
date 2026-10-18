import React from 'react';
import { 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Cpu, 
  Building2, 
  HeartHandshake, 
  Users, 
  AlertCircle,
  FileCheck2
} from 'lucide-react';

export const Slide7Feasibility: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      {/* Official Template Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200/60">
            SLIDE 07 · OFFICIAL QUANTEX’26 HEADING: FEASIBILITY, VIABILITY AND IMPACT
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Real-World Deployability, Healthcare Alignment & Societal Returns
          </span>
        </div>
        <span className="text-xs font-bold text-slate-600">TEAM NEURALNOVA</span>
      </div>

      {/* Main Content Area */}
      <div className="my-auto space-y-4">
        {/* Title */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Triad of Real-World Success: Feasibility, Viability & Clinical Impact
          </h2>
          <p className="text-xs text-slate-600">
            Engineered to overcome implementation roadblocks: operates with zero specialized hardware, low operating cost, and strict clinical compliance.
          </p>
        </div>

        {/* 3 Core Pillars: Feasibility, Viability, Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Pillar 1: Feasibility */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  Technical Feasibility
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  Ready APIs
                </span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-snug">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Native OS Primitives:</strong> Leverages standard Android AlarmManager and WorkManager without custom firmware.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Offline-First Resilience:</strong> Medication schedules and voice alerts trigger on-device without continuous internet access.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Low Hardware Footprint:</strong> Runs smoothly on entry-level Android devices commonly used across rural and semi-urban households.</span>
                </li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-medium">
              Technical Readiness: Android 8.0+ / Standard Web & Mobile SDKs
            </div>
          </div>

          {/* Pillar 2: Viability */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-teal-600" />
                  Economic & Hospital Viability
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-900">
                  B2B2C Model
                </span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-snug">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>NABH Quality Metric Alignment:</strong> Hospitals are incentivized to curb 30-day readmissions to retain premier accreditation and insurer ratings.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Minimal Operational Overhead:</strong> On-device processing eliminates expensive continuous server streaming; lightweight cloud sync.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Hardware Expense:</strong> Unlike IoT pillboxes costing ₹3,000–₹5,000, our software companion utilizes the patient's existing smartphone.</span>
                </li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-medium">
              Target Stakeholders: Hospital Quality Boards, Insurers & Caregivers
            </div>
          </div>

          {/* Pillar 3: Impact */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-rose-600" />
                  Clinical & Societal Impact
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-900">
                  Life-Saving
                </span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 leading-snug">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Tackles Preventable Readmissions:</strong> Intercepts adverse drug events (ADEs), which cause up to 23% of post-discharge hospital visits.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Vernacular & Literacy Inclusion:</strong> Spoken Tanglish and verified photos empower non-English literate and elderly patients.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                  <span><strong>Elderly Independence:</strong> Enables senior citizens living alone or with busy family members to safely manage multi-drug regimens.</span>
                </li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-500 font-medium">
              Societal Goal: Democratizing patient safety across all demographics
            </div>
          </div>

        </div>

        {/* Ethical Safety Notice Banner */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-start gap-3 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-700 leading-relaxed">
            <strong>Ethical & Regulatory Integrity:</strong> NEURALNOVA is positioned strictly as a medication adherence and safety verification companion. It does not replace clinical consultation, modify physician doses, or formulate autonomous medical diagnoses.
          </p>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Team NEURALNOVA · Monisha S., Mohanasankari .S, Ramya.K</span>
        <span className="font-mono text-slate-400">Slide 7 of 10</span>
      </div>
    </div>
  );
};
