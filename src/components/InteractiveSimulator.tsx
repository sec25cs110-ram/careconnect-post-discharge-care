import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Smartphone, 
  FileCheck, 
  Info,
  Play,
  RotateCcw
} from 'lucide-react';
import { HERB_DRUG_DATABASE, SAMPLE_EXTRACTIONS } from '../data/slidesData';
import { unlockAudio, speakVernacularText } from '../utils/audioService';

interface InteractiveSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveSimulator: React.FC<InteractiveSimulatorProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'herb-drug' | 'ocr'>('voice');
  
  // Voice Simulation State
  const [selectedLanguage, setSelectedLanguage] = useState<'tanglish' | 'tamil' | 'english'>('tanglish');
  const [simulatedTimeLeft, setSimulatedTimeLeft] = useState(180);
  const [isEscalated, setIsEscalated] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [doseStatus, setDoseStatus] = useState<'Pending' | 'Taken' | 'Snoozed' | 'Assistance Requested'>('Pending');

  // Herb Drug State
  const [selectedHerbIndex, setSelectedHerbIndex] = useState(0);

  if (!isOpen) return null;

  const triggerVoiceSynthesis = async (lang: 'tanglish' | 'tamil' | 'english') => {
    unlockAudio();
    const mappedLang = lang === 'tamil' ? 'ta' : lang === 'english' ? 'en' : 'tanglish';
    await speakVernacularText(mappedLang, undefined, (speaking) => {
      setIsSpeaking(speaking);
    });
  };

  const simulateFastForward = () => {
    setSimulatedTimeLeft(0);
    setIsEscalated(true);
    triggerVoiceSynthesis(selectedLanguage);
  };

  const resetVoiceSim = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSimulatedTimeLeft(180);
    setIsEscalated(false);
    setIsSpeaking(false);
    setDoseStatus('Pending');
  };

  const currentHerb = HERB_DRUG_DATABASE[selectedHerbIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">NEURALNOVA Prototype Validation Sandbox</h3>
              <p className="text-xs text-slate-400">Live Evaluation Sandbox for Quantex’26 Jury Review</p>
            </div>
          </div>
          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6 gap-2">
          <button
            onClick={() => setActiveTab('voice')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'voice'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>3-Min Vernacular Voice Escalation</span>
          </button>

          <button
            onClick={() => setActiveTab('herb-drug')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'herb-drug'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Herb–Drug Safety Matrix Checker</span>
          </button>

          <button
            onClick={() => setActiveTab('ocr')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'ocr'
                ? 'border-indigo-500 text-indigo-400 bg-slate-800/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>OCR & Human Verification Pipeline</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: VOICE ESCALATION */}
          {activeTab === 'voice' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left Controls */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Acoustic Escalation Engine</span>
                  <h4 className="text-lg font-bold text-white mt-1">Simulate Unopened Notification State</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Standard push alerts are easily ignored by elderly or resting post-discharge patients. If unacknowledged for 180 seconds, NEURALNOVA synthesizes spoken voice guidance in the patient’s vernacular dialect.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-400" />
                      Timer to Escalation:
                    </span>
                    <span className="font-mono font-bold text-sm text-white">
                      {isEscalated ? "00:00 (Escalated!)" : `${simulatedTimeLeft} seconds`}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={simulateFastForward}
                      disabled={isEscalated}
                      className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Simulate 3-Min Expiry & Play Voice
                    </button>
                    <button
                      onClick={resetVoiceSim}
                      className="py-2 px-3 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Reset simulation"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Dialect Selector */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Select Vernacular Language:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'tanglish', label: 'Tanglish', sample: 'Time aaiduchu, tablet podunga!' },
                      { id: 'tamil', label: 'Tamil', sample: 'மருந்து நேரம் வந்துவிட்டது' },
                      { id: 'english', label: 'English', sample: 'Medication time due' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedLanguage(item.id as any);
                          triggerVoiceSynthesis(item.id as any);
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          selectedLanguage === item.id
                            ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <div className="font-bold text-xs">{item.label}</div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">{item.sample}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {isSpeaking && (
                  <div className="p-3 bg-teal-950/50 border border-teal-500/40 rounded-xl flex items-center gap-3 text-teal-300 text-xs">
                    <Volume2 className="w-5 h-5 animate-pulse text-teal-400 shrink-0" />
                    <div>
                      <p className="font-semibold">Synthesizing audio on local speech engine...</p>
                      <p className="text-[11px] text-teal-400/80">Using on-device speech synthesis to prevent latency.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Mobile Phone Interface Mockup */}
              <div className="flex justify-center">
                <div className="w-[300px] bg-slate-950 border-4 border-slate-800 rounded-[32px] p-3 shadow-2xl relative">
                  {/* Speaker Notch */}
                  <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
                  </div>

                  {/* Screen Content */}
                  <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>8:00 AM • MORNING DOSE</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isEscalated ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {isEscalated ? "VOICE ESCALATED" : "PUSH SENT"}
                      </span>
                    </div>

                    {/* Patient Uploaded Pill Photo */}
                    <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 text-center">
                      <div className="w-16 h-16 mx-auto rounded-lg bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center mb-1.5 overflow-hidden">
                        <img 
                          src="/src/assets/images/mobile_vernacular_reminder_1792312875794.jpg" 
                          alt="Patient verified tablet" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-[11px] font-bold text-white">Metformin HCl 500mg</p>
                      <p className="text-[10px] text-indigo-400">Patient-uploaded photo of actual blister</p>
                    </div>

                    {/* Vernacular Prompt Card */}
                    <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-2.5 text-center">
                      <p className="text-xs font-bold text-indigo-300">
                        {selectedLanguage === 'tanglish' 
                          ? "“Time aaiduchu, tablet podunga!”" 
                          : selectedLanguage === 'tamil' 
                          ? "“மருந்து நேரம் வந்துவிட்டது. உணவுக்குப் பின் எடுக்கவும்!”"
                          : "“Time for your 8:00 AM dose with food.”"}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">1 tablet after breakfast with water</p>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="space-y-1.5 pt-1">
                      <button
                        onClick={() => setDoseStatus('Taken')}
                        className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          doseStatus === 'Taken'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/30'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {doseStatus === 'Taken' ? "Dose Marked Taken" : "Mark as Taken"}
                      </button>

                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => setDoseStatus('Snoozed')}
                          className="py-1.5 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          Snooze (10m)
                        </button>
                        <button
                          onClick={() => setDoseStatus('Assistance Requested')}
                          className="py-1.5 rounded-lg text-[11px] font-medium bg-rose-950/40 text-rose-300 border border-rose-500/30 hover:bg-rose-900/40"
                        >
                          Need Help
                        </button>
                      </div>
                    </div>

                    {doseStatus !== 'Pending' && (
                      <div className="text-[10px] text-center text-slate-400 pt-1 border-t border-slate-800">
                        Current Status: <span className="font-semibold text-white">{doseStatus}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERB-DRUG CHECKER */}
          {activeTab === 'herb-drug' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Clinical Pharmacology Engine</span>
                  <h4 className="text-lg font-bold text-white mt-0.5">Evidence-Based Herb–Drug Interaction Matrix</h4>
                  <p className="text-xs text-slate-300">
                    Indian households frequently mix traditional herbal remedies with allopathic discharge prescriptions. Select an herbal substance below:
                  </p>
                </div>
                <div className="px-3 py-1 bg-slate-800 rounded-lg text-xs text-slate-400 font-mono">
                  Database: 50+ Curated AYUSH & Pharmacopeia Pairs
                </div>
              </div>

              {/* Herb Selector Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {HERB_DRUG_DATABASE.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedHerbIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedHerbIndex === idx
                        ? 'bg-teal-950/60 border-teal-500 text-white shadow-md shadow-teal-950'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs truncate">{item.herb.split('(')[0]}</div>
                    <div className="text-[10px] text-teal-400/90 font-medium truncate mt-0.5">{item.tamilName}</div>
                    <div className={`mt-2 text-[10px] font-bold px-1.5 py-0.5 rounded inline-block ${
                      item.severity === 'Severe' 
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                        : item.severity === 'Moderate'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {item.severity} Risk
                    </div>
                  </button>
                ))}
              </div>

              {/* Interaction Analysis Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-white text-base">{currentHerb.herb}</h5>
                      <span className="text-xs text-teal-400 font-medium">({currentHerb.tamilName})</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Interacting Prescribed Allopathic Class: <strong className="text-white">{currentHerb.drug}</strong>
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto ${
                    currentHerb.severity === 'Severe'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : currentHerb.severity === 'Moderate'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  }`}>
                    {currentHerb.severity.toUpperCase()} CONTRAINDICATION
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                      Pharmacological Mechanism
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentHerb.mechanism}
                    </p>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80">
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">
                      Evidence-Based Clinical Guidance
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentHerb.clinicalAdvice}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5 text-xs text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Clinical Safety Boundary:</strong> NEURALNOVA does not alter prescriptions autonomously. When an interaction is detected, the engine advises the patient to seek attending physician clearance before combining therapies.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OCR EXTRACTION */}
          {activeTab === 'ocr' && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Human-In-The-Loop Validation</span>
                <h4 className="text-lg font-bold text-white mt-0.5">Discharge Summary OCR & Verification Workflow</h4>
                <p className="text-xs text-slate-300">
                  To eliminate clinical hallucination risk, all medications parsed from hospital discharge summaries must be reviewed by the patient or caregiver before notification scheduling is armed.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {SAMPLE_EXTRACTIONS.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white">{item.medication}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-300 font-mono font-medium">{item.dosage}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.timing}</p>
                      
                      <div className="mt-3 p-2 bg-slate-900 rounded-lg border border-slate-800/80 text-[11px] text-slate-300">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Tanglish Prompt:</span>
                        “{item.vernacularTanglish}”
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Visual: {item.pillColor}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>NEURALNOVA Research Architecture • Quantex’26</span>
          </div>
          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Sandbox
          </button>
        </div>

      </div>
    </div>
  );
};
