import React from 'react';
import { 
  Layers, 
  Smartphone, 
  Server, 
  Cpu, 
  Database, 
  Volume2, 
  ShieldCheck, 
  ArrowRight,
  Code2,
  Workflow
} from 'lucide-react';

export const Slide5TechStack: React.FC = () => {
  const stackLayers = [
    {
      category: "1. Presentation Layer (Mobile App)",
      tech: "Flutter & Dart",
      role: "Cross-platform Android-first prototype (iOS extensible)",
      items: [
        "Responsive, high-contrast accessible UI with large touch targets",
        "Android AlarmManager & WorkManager for precise background alarms",
        "Camera integration for patient-uploaded pill blister photos",
        "Local notification scheduling with heads-up reminder actions"
      ],
      color: "border-indigo-200 bg-indigo-50/50 text-indigo-900"
    },
    {
      category: "2. Backend & API Services",
      tech: "Python FastAPI",
      role: "Asynchronous high-throughput microservices",
      items: [
        "RESTful API endpoints for secure discharge ingestion",
        "JWT token-based auth with encrypted patient health identifiers",
        "Pydantic data schemas enforcing clinical structure validation",
        "HL7 / FHIR data mapping readiness for hospital discharge sync"
      ],
      color: "border-teal-200 bg-teal-50/50 text-teal-900"
    },
    {
      category: "3. Document OCR & NLP Pipeline",
      tech: "PaddleOCR / Tesseract + Clinical LLM",
      role: "Optical extraction & structured entity recognition",
      items: [
        "Preprocessing: deskewing, noise reduction & contrast normalization",
        "Optical Character Recognition tuned for printed prescription text",
        "NLP parsing for Drug, Dose, Route, Frequency (TDS/BD), Duration",
        "Strict Human Verification Guardrail before committing records"
      ],
      color: "border-purple-200 bg-purple-50/50 text-purple-900"
    },
    {
      category: "4. Voice Services & Dialect Engine",
      tech: "On-Device Android TTS / Web Speech",
      role: "Offline acoustic vernacular synthesis",
      items: [
        "Tamil TTS (ta-IN) & Indian English phonetic Tanglish mapping",
        "Offline-capable voice synthesis (functions without cellular data)",
        "3-Minute unacknowledged timeout trigger via background worker",
        "Custom cadence and acoustic volume escalation algorithm"
      ],
      color: "border-amber-200 bg-amber-50/50 text-amber-900"
    },
    {
      category: "5. Data Persistence & Cache",
      tech: "SQLite (Local) + PostgreSQL (Cloud)",
      role: "Offline-first resilience & secure central backup",
      items: [
        "On-device SQLite database ensuring full offline adherence logging",
        "Encrypted local sandbox for patient pill photographs",
        "PostgreSQL for anonymized recovery tracking & clinical review",
        "Automatic background synchronization upon network recovery"
      ],
      color: "border-slate-300 bg-slate-50 text-slate-900"
    },
    {
      category: "6. Herb–Drug Safety Knowledge Engine",
      tech: "AYUSH / Pharmacopeia Knowledge Graph",
      role: "Evidence-based pharmacology contraindication screening",
      items: [
        "Cross-references Ayurvedic/Siddha herbs with allopathic drugs",
        "Categorized risk classifications: Severe, Moderate, Caution",
        "Deterministic rule-based matching (zero black-box guessing)",
        "Clinical warning generation with attending doctor referral"
      ],
      color: "border-rose-200 bg-rose-50/50 text-rose-900"
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      {/* Official Template Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200/60">
            SLIDE 05 · OFFICIAL QUANTEX’26 HEADING: TECHNOLOGY STACK
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Layered Production-Grade Architecture & Data Flow
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
              Modular, Offline-Resilient Architectural Blueprint
            </h2>
            <p className="text-xs text-slate-600">
              Cohesive data pipeline connecting cross-platform mobile clients, Python APIs, OCR models, and pharmacological rule engines.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <Workflow className="w-3.5 h-3.5 text-indigo-600" />
            <span>Full-Stack Verified Pipeline</span>
          </div>
        </div>

        {/* 6 Layered Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {stackLayers.map((layer, idx) => (
            <div 
              key={idx} 
              className={`border rounded-xl p-3 flex flex-col justify-between shadow-xs ${layer.color} transition-all hover:shadow-sm`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold pb-1.5 border-b border-black/5">
                  <span className="truncate">{layer.category}</span>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/70 border border-black/10">
                    {layer.tech}
                  </span>
                </div>
                <p className="text-[10px] font-semibold text-slate-600 my-1">{layer.role}</p>
                <ul className="text-[10px] text-slate-700 space-y-1 list-disc pl-3.5 leading-snug">
                  {layer.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Data Flow Ribbon */}
        <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] text-teal-300">
            <Code2 className="w-4 h-4 text-teal-400" />
            <span>Data Flow Direction:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-300">
            <span>Summary Upload</span>
            <span className="text-slate-500">→</span>
            <span>FastAPI & PaddleOCR</span>
            <span className="text-slate-500">→</span>
            <span className="text-amber-300 font-bold">Human Verification</span>
            <span className="text-slate-500">→</span>
            <span>SQLite Local Scheduler</span>
            <span className="text-slate-500">→</span>
            <span className="text-teal-300 font-bold">3-Min Voice Escalation</span>
            <span className="text-slate-500">→</span>
            <span>Herb–Drug Guardrail</span>
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Team NEURALNOVA · Monisha S., Mohanasankari .S, Ramya.K</span>
        <span className="font-mono text-slate-400">Slide 5 of 10</span>
      </div>
    </div>
  );
};
