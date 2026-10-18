import React from 'react';
import { 
  Github, 
  ExternalLink, 
  FolderTree, 
  FileCode, 
  Terminal, 
  ShieldCheck, 
  CheckCircle2, 
  QrCode,
  BookOpen,
  Award
} from 'lucide-react';
import { TEAM_INFO } from '../../data/slidesData';

export const Slide9GitHub: React.FC = () => {
  const repoFolders = [
    {
      name: "/frontend-flutter",
      desc: "Cross-platform Flutter application with Android AlarmManager & on-device speech synthesis.",
      badge: "Mobile Client"
    },
    {
      name: "/backend-fastapi",
      desc: "High-performance Python FastAPI service with Pydantic clinical models and JWT auth.",
      badge: "REST APIs"
    },
    {
      name: "/ocr-nlp-engine",
      desc: "PaddleOCR & Tesseract document processing pipelines with structured medication parsers.",
      badge: "AI Extraction"
    },
    {
      name: "/herb-drug-kb",
      desc: "Evidence-based knowledge graph mapping 50+ Ayurvedic/Siddha herbs with allopathic classes.",
      badge: "Pharmacology"
    },
    {
      name: "/docs-architecture",
      desc: "HL7/FHIR compatibility schemas, threat model audits, and official Quantex’26 project docs.",
      badge: "Docs & Specs"
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Official Template Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200/60">
            SLIDE 09 · OFFICIAL QUANTEX’26 HEADING: PROJECT GITHUB LINK
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Verifiable Open-Source Artifacts & Engineering Transparency
          </span>
        </div>
        <span className="text-xs font-bold text-slate-600">TEAM NEURALNOVA</span>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-12 gap-6 my-auto items-center">
        {/* Left 8 Cols: Repository Breakdown & Open Source Integrity */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Github className="w-6 h-6 text-slate-900" />
              <span>Official GitHub Repository & Project Structure</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Complete open-source implementation with reproducible Docker configurations, unit test suites, and sample discharge summaries for jury evaluation.
            </p>
          </div>

          {/* Prominent URL Card */}
          <div className="bg-slate-950 text-white rounded-2xl p-4 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Github className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider block">
                  Public GitHub Repository URL
                </span>
                <a 
                  href={TEAM_INFO.githubRepo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-xs sm:text-sm text-indigo-200 hover:text-white underline truncate block"
                >
                  {TEAM_INFO.githubRepo}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                MIT License
              </span>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Open Source
              </span>
            </div>
          </div>

          {/* Directory Breakdown List */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
              Repository Architecture & Module Layout:
            </span>

            <div className="grid grid-cols-1 gap-2">
              {repoFolders.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-50 border border-slate-200/90 rounded-xl p-2.5 flex items-center justify-between gap-3 hover:bg-white hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FolderTree className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="font-mono font-bold text-xs text-slate-900 shrink-0">{item.name}</span>
                    <span className="text-[11px] text-slate-600 truncate hidden sm:inline">— {item.desc}</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 shrink-0">
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Quick Verification & QR Visual */}
        <div className="col-span-12 lg:col-span-4 space-y-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-center space-y-3">
            <div className="w-32 h-32 mx-auto bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-2 relative group">
              <QrCode className="w-20 h-20 text-slate-800" />
              <div className="text-[9px] font-mono text-slate-500 mt-1">Scan for GitHub Repo</div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900">Jury Verification Package</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Scan or visit the GitHub repository for full source code, commit history, setup scripts, and clinical references.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Full Codebase Transparency</span>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs text-indigo-950 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-indigo-900">
              <Terminal className="w-3.5 h-3.5 text-indigo-600" />
              Quick Clone & Run:
            </p>
            <code className="font-mono text-[10px] block bg-white p-1.5 rounded border border-indigo-200 text-slate-800 overflow-x-auto">
              git clone {TEAM_INFO.githubRepo}.git
            </code>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Team NEURALNOVA · Monisha S., Mohanasankari .S, Ramya.K</span>
        <span className="font-mono text-slate-400">Slide 9 of 10</span>
      </div>
    </div>
  );
};
