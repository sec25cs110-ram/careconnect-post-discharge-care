import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Mic, 
  FileText, 
  Pill, 
  Activity, 
  Award,
  Clock,
  ArrowRight
} from 'lucide-react';
import { TEAM_INFO } from '../../data/slidesData';

export const Slide1Intro: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      {/* Top Banner / Template Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200/60">
            SLIDE 01 · OFFICIAL QUANTEX’26 TEMPLATE
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Category: Healthcare AI & Clinical Informatics
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Award className="w-4 h-4 text-amber-500" />
          <span>QUANTEX’26 NATIONAL SYMPOSIUM</span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-12 gap-8 my-auto items-center">
        {/* Left 7 Columns: Titles, Tagline, Problem Context & Team Cards */}
        <div className="col-span-12 lg:col-span-7 space-y-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Team {TEAM_INFO.teamName} · Project Submission</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.12]">
              {TEAM_INFO.projectTitle}
            </h1>
            
            <h2 className="text-base sm:text-lg font-medium text-indigo-900/90 leading-snug">
              {TEAM_INFO.projectSubtitle}
            </h2>

            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold tracking-wide shadow-sm">
                <span>Tagline: “{TEAM_INFO.tagline}”</span>
              </div>
            </div>
          </div>

          {/* Team Details Grid */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                {TEAM_INFO.institution}
              </span>
              <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                Team: {TEAM_INFO.teamName}
              </span>
            </div>

            {/* Team Lead Highlight */}
            <div className="bg-white border border-indigo-100 rounded-xl p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  MS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{TEAM_INFO.teamLead.name}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                      Team Lead
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{TEAM_INFO.teamLead.role}</p>
                </div>
              </div>

              <div className="flex flex-col text-[11px] text-slate-600 sm:text-right font-medium">
                <span className="flex items-center sm:justify-end gap-1 text-indigo-700">
                  <Mail className="w-3 h-3" />
                  {TEAM_INFO.teamLead.email}
                </span>
                <span className="flex items-center sm:justify-end gap-1 text-slate-700">
                  <Phone className="w-3 h-3" />
                  +91 {TEAM_INFO.teamLead.phone}
                </span>
              </div>
            </div>

            {/* Team Members */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {TEAM_INFO.members.map((member, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{member.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Hero Visual Showcase */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
            {/* Real Smartphone Mockup Image */}
            <img 
              src="/src/assets/images/mobile_vernacular_reminder_1792312875794.jpg" 
              alt="Healthcare Companion Smartphone with Vernacular Reminder" 
              className="w-full h-72 sm:h-80 object-cover object-top"
            />
            
            {/* Visual Overlay Card with 4 Key Pillars */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-4 text-white">
              <div className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Post-Discharge Care Architecture
              </div>

              {/* 4 Iconic badges */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2 py-1.5 rounded-lg border border-white/10">
                  <FileText className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
                  <span className="truncate">Discharge Summary OCR</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2 py-1.5 rounded-lg border border-white/10">
                  <Mic className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                  <span className="truncate">3-Min Tanglish Voice</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2 py-1.5 rounded-lg border border-white/10">
                  <Pill className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span className="truncate">Verified Pill Photo</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2 py-1.5 rounded-lg border border-white/10">
                  <Activity className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                  <span className="truncate">Herb–Drug Safety</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Sri Sairam Engineering College · Autonomous</span>
            <span className="font-semibold text-indigo-600">Chennai, Tamil Nadu</span>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Team NEURALNOVA · Monisha S., Mohanasankari .S, Ramya.K</span>
        <span className="font-mono text-slate-400">Slide 1 of 10</span>
      </div>
    </div>
  );
};
