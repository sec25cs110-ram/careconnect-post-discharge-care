import React from 'react';
import { 
  Settings, 
  Languages, 
  Volume2, 
  Clock, 
  ShieldCheck, 
  Download, 
  RotateCcw, 
  LogOut,
  Sparkles,
  Check
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';

export const SettingsPage: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    voiceAlertsEnabled, 
    setVoiceAlertsEnabled, 
    demoFastForwardMode, 
    setDemoFastForwardMode,
    logout,
    showToast,
    medications,
    recoveryLogs,
    currentUser
  } = useCareConnect();

  const handleExportData = () => {
    const exportPayload = {
      patient: currentUser,
      medications,
      recoveryLogs,
      exportedAt: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `CareConnect_PatientData_${currentUser.mrn}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast("Exported complete clinical adherence data file.");
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Application Settings & Preferences
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure vernacular dialects, escalation timing, audio synthesis, and local demo parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Language & Dialect Preferences */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Languages className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Vernacular Interface & Voice Dialect
            </h3>
          </div>

          <div className="space-y-2.5">
            {[
              { id: 'tanglish', title: 'Tanglish (Tamil in English Script) 🇮🇳', sample: '“Vanakkam! Time aayiduchu, tablet podunga!”' },
              { id: 'ta', title: 'Tamil (தமிழ் வடிவம்) 🇮🇳', sample: '“வணக்கம்! மருந்து நேரம் வந்துவிட்டது.”' },
              { id: 'en', title: 'Indian English 🇮🇳', sample: '“Good morning. Time for your scheduled medicine.”' }
            ].map((opt) => (
              <label 
                key={opt.id}
                onClick={() => setLanguage(opt.id as any)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  language === opt.id 
                    ? 'bg-indigo-50/70 border-indigo-400 ring-1 ring-indigo-400' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{opt.title}</span>
                  <span className="text-[11px] text-indigo-700 italic mt-0.5 block">{opt.sample}</span>
                </div>
                {language === opt.id && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
              </label>
            ))}
          </div>
        </div>

        {/* Audio Escalation & Jury Demo Controls */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Volume2 className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Escalation Engine Settings
            </h3>
          </div>

          <div className="space-y-4">
            {/* Toggle 1: Voice alerts */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-900 block">On-Device Text-To-Speech (TTS)</span>
                <span className="text-[11px] text-slate-500">Synthesize spoken voice reminder if alert unopened</span>
              </div>
              <input
                type="checkbox"
                checked={voiceAlertsEnabled}
                onChange={(e) => setVoiceAlertsEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
              />
            </div>

            {/* Toggle 2: Fast-forward mode */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-teal-50/50 border border-teal-200">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-teal-950">10-Second Demo Fast-Forward</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-teal-600 text-white">Judge Mode</span>
                </div>
                <span className="text-[11px] text-teal-800">Shortens 3-minute waiting timer to 10 seconds for live jury demonstration</span>
              </div>
              <input
                type="checkbox"
                checked={demoFastForwardMode}
                onChange={(e) => setDemoFastForwardMode(e.target.checked)}
                className="w-4 h-4 rounded text-teal-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Clinical Data Export & Portability */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Download className="w-4 h-4 text-purple-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Patient Data Portability
            </h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Download your complete adherence history, vital check-in logs, and discharge medication schedules in standard JSON format for hospital review.
          </p>

          <button
            onClick={handleExportData}
            className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Recovery Records (JSON)</span>
          </button>
        </div>

        {/* Security & Session */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Account Session & Security
            </h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            End the current recovery session on this terminal. All medication schedules and offline data remain safely cached in your local encrypted browser storage.
          </p>

          <button
            onClick={logout}
            className="w-full py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of CareConnect</span>
          </button>
        </div>

      </div>

    </div>
  );
};
