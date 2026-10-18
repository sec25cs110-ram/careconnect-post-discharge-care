import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  Mail, 
  Phone, 
  Building2, 
  Star,
  Users
} from 'lucide-react';
import { TEAM_INFO } from '../../data/slidesData';

export const Slide10Summary: React.FC = () => {
  const evaluationRubrics = [
    {
      criteria: "1. Problem Depth & Identification",
      score: "Critical Need",
      desc: "Directly solves the dangerous 30-day post-discharge window where 1 in 5 patients suffer adverse medication events."
    },
    {
      criteria: "2. Technical Rigor & Architecture",
      score: "Production-Grade",
      desc: "Layered Flutter mobile client, FastAPI services, PaddleOCR, offline-capable TTS, and local SQLite data caching."
    },
    {
      criteria: "3. Genuine Innovation & Novelty",
      score: "Pioneering",
      desc: "3-minute acoustic voice escalation, conversational Tanglish phonetics, patient pill photo grounding, and herb–drug matrix."
    },
    {
      criteria: "4. Feasibility & Scalability",
      score: "Immediate Deployment",
      desc: "Zero custom hardware requirement; operates offline on standard budget Android phones with B2B2C hospital viability."
    },
    {
      criteria: "5. Clinical & Ethical Guardrails",
      score: "Safety-First",
      desc: "Strict human-in-the-loop validation; zero autonomous prescription dosing or unverified computer vision pill guessing."
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Official Template Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200/60">
            SLIDE 10 · QUANTEX’26 JURY EVALUATION & EXECUTIVE SUMMARY
          </span>
          <span className="text-xs font-semibold text-slate-500">
            3-Minute Pitch Synthesis & Team NEURALNOVA Conclusion
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
          <Award className="w-4 h-4 text-amber-600" />
          <span>QUANTEX’26 FINAL REVIEW</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-6 my-auto items-center">
        {/* Left 7 Cols: Evaluation Rubric Scorecard */}
        <div className="col-span-12 lg:col-span-7 space-y-3.5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Executive Evaluation Summary: Why NEURALNOVA Stands Out
            </h2>
            <p className="text-xs text-slate-600">
              Direct alignment with the official Quantex’26 judging criteria: problem clarity, engineering depth, true innovation, and societal impact.
            </p>
          </div>

          <div className="space-y-2">
            {evaluationRubrics.map((rubric, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-xs flex items-start justify-between gap-3 hover:border-indigo-300 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{rubric.criteria}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 shrink-0">
                      {rubric.score}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    {rubric.desc}
                  </p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Team Contact & Open Q&A Card */}
        <div className="col-span-12 lg:col-span-5 space-y-3">
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-5 border border-indigo-700/60 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-800/80 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
                  Project Presentation Concluded
                </span>
                <h3 className="text-lg font-bold text-white">Team {TEAM_INFO.teamName}</h3>
              </div>
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs text-indigo-300 border border-white/10">
                <MessageSquare className="w-5 h-5 text-teal-400" />
              </div>
            </div>

            {/* Team Lead Details */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] text-indigo-300 uppercase tracking-wider font-semibold block">
                Primary Contact:
              </span>
              <p className="font-bold text-sm text-white">{TEAM_INFO.teamLead.name} (Team Lead)</p>
              <div className="flex items-center gap-1.5 text-indigo-200 text-xs">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{TEAM_INFO.teamLead.email}</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-200 text-xs">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>+91 {TEAM_INFO.teamLead.phone}</span>
              </div>
            </div>

            {/* Members & Institution */}
            <div className="pt-2 border-t border-indigo-800/80 space-y-1.5 text-[11px] text-indigo-200">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span><strong>Members:</strong> Mohanasankari .S, Ramya.K</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{TEAM_INFO.institution}, Chennai</span>
              </div>
            </div>

            {/* Q&A Invite */}
            <div className="pt-2">
              <div className="bg-teal-500/20 border border-teal-400/40 rounded-xl p-2.5 text-center text-teal-300 text-xs font-bold">
                “Right Medicine. Right Time. Safer Recovery.”
                <span className="block text-[10px] text-slate-300 font-normal mt-0.5">
                  We look forward to your questions & technical evaluation!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Team NEURALNOVA · Monisha S., Mohanasankari .S, Ramya.K</span>
        <span className="font-mono text-slate-400">Slide 10 of 10</span>
      </div>
    </div>
  );
};
