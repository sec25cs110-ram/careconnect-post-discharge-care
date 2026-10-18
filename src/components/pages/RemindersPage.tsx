import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertTriangle, 
  Languages, 
  Play, 
  Pause, 
  RotateCcw, 
  HelpCircle, 
  Sparkles, 
  History, 
  Smartphone, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Radio
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';
import { unlockAudio, playAlertChime, speakVernacularText } from '../../utils/audioService';

export const RemindersPage: React.FC = () => {
  const { 
    reminders, 
    markReminderTaken, 
    snoozeReminder, 
    requestReminderHelp,
    language,
    setLanguage,
    demoFastForwardMode,
    setDemoFastForwardMode,
    voiceAlertsEnabled,
    setVoiceAlertsEnabled,
    showToast,
    resetRemindersForDemo
  } = useCareConnect();

  // Active reminder being escalated
  const activeReminder = reminders.find(r => r.status === 'pending') || reminders[0];

  // Timer state for active escalation
  const defaultDuration = demoFastForwardMode ? 10 : 180;
  const [countdown, setCountdown] = useState<number>(defaultDuration);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isEscalated, setIsEscalated] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speechStatusText, setSpeechStatusText] = useState<string>('');

  // Update timer on demo mode change
  useEffect(() => {
    setCountdown(demoFastForwardMode ? 10 : 180);
    setIsEscalated(false);
  }, [demoFastForwardMode]);

  // Countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && countdown > 0 && activeReminder?.status === 'pending') {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && !isEscalated && activeReminder?.status === 'pending') {
      setIsEscalated(true);
      if (voiceAlertsEnabled) {
        triggerSpeech(language);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, countdown, isEscalated, voiceAlertsEnabled, language, activeReminder]);

  const triggerSpeech = async (targetLang: 'en' | 'ta' | 'tanglish') => {
    unlockAudio();
    showToast(`Playing audible chime and ${targetLang.toUpperCase()} voice alert...`);
    await speakVernacularText(targetLang, undefined, (speaking, msg) => {
      setIsSpeaking(speaking);
      if (msg) setSpeechStatusText(msg);
    });
  };

  const handleTakeDose = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsEscalated(false);
    setIsSpeaking(false);
    markReminderTaken(activeReminder.id);
  };

  const handleSnooze = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsEscalated(false);
    setIsSpeaking(false);
    snoozeReminder(activeReminder.id, 10);
    setCountdown(demoFastForwardMode ? 10 : 180);
  };

  const handleHelp = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    requestReminderHelp(activeReminder.id);
  };

  const resetTimer = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setCountdown(demoFastForwardMode ? 10 : 180);
    setIsEscalated(false);
    setIsSpeaking(false);
    setIsRunning(true);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title & Dialect Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Multilingual Medicine Reminder System
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              3-Min Escalation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Proactive on-device acoustic escalation in English, Tamil, and Tanglish dialect.
          </p>
        </div>

        {/* Demo Fast-Forward Mode Control */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs self-start sm:self-auto">
          <span className="text-[11px] font-bold text-slate-700 pl-2">Escalation Timer:</span>
          <button
            onClick={() => setDemoFastForwardMode(true)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              demoFastForwardMode ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ 10s Demo
          </button>
          <button
            onClick={() => setDemoFastForwardMode(false)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              !demoFastForwardMode ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3m Standard
          </button>
        </div>
      </div>

      {/* Main Grid: Live Interactive Reminder Box & Escalation Machine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 7 Cols: The Escalation State Machine & Audio Previews */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Countdown to Acoustic Voice Escalation</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Monitors unopened alerts to eliminate notification blindness in senior citizens.
              </p>
            </div>
            <button
              onClick={resetRemindersForDemo}
              className="text-xs font-bold text-indigo-600 hover:underline"
            >
              Reset Schedule
            </button>
          </div>

          {/* Big Countdown Timer Card */}
          <div className={`p-6 rounded-3xl border transition-all text-center space-y-3 ${
            isEscalated
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : countdown <= 5
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-indigo-50/60 border-indigo-200 text-indigo-950'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider block">
              {isEscalated ? "⚠️ Notification Unopened: Voice Alert Active" : "Unacknowledged Window Remaining"}
            </span>

            <div className="font-mono text-4xl sm:text-5xl font-black tracking-tight">
              {formatSeconds(countdown)}
            </div>

            <p className="text-xs text-slate-600 max-w-md mx-auto">
              {isEscalated
                ? "Speech engine has engaged with vernacular reminder. User must choose an action below."
                : `If unopened after ${demoFastForwardMode ? '10 seconds (demo mode)' : '180 seconds'}, CareConnect attempts spoken vernacular alert.`}
            </p>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                {isRunning ? "Pause Timer" : "Resume Timer"}
              </button>
              <button
                onClick={resetTimer}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Reset ({demoFastForwardMode ? '10s' : '3m'})
              </button>
              <button
                onClick={() => {
                  setCountdown(0);
                  setIsEscalated(true);
                  triggerSpeech(language);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-600/30 hover:bg-indigo-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Test Audio Now (Chime + Voice)</span>
              </button>
            </div>

            {/* Audio engine live status bar */}
            <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isSpeaking ? 'bg-emerald-500 animate-ping' : 'bg-indigo-400'}`}></span>
                <span className="font-semibold text-slate-700">
                  {isSpeaking ? (speechStatusText || "Playing alert audio & vernacular voice...") : "Audio Engine Ready"}
                </span>
              </div>
              <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200/60 font-medium">
                Dual Audio: 880Hz Medical Chime + Tanglish Speech
              </span>
            </div>
          </div>

          {/* Voice Preview Controls (3 Dialects) */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Test Spoken Dialect Previews:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { 
                  id: 'tanglish', 
                  label: 'Tanglish Phrasing', 
                  quote: '“Time aaiduchu, tablet podunga!”',
                  desc: 'Natural Tamil in English letters' 
                },
                { 
                  id: 'ta', 
                  label: 'Tamil Dialect', 
                  quote: '“மருந்து எடுத்துக்கொள்ளும் நேரம் வந்துவிட்டது.”',
                  desc: 'Pure Tamil speech synthesis' 
                },
                { 
                  id: 'en', 
                  label: 'English Dialect', 
                  quote: '“Time for your scheduled medicine.”',
                  desc: 'Standard clinical notification' 
                }
              ].map((item) => (
                <div 
                  key={item.id}
                  className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    language === item.id 
                      ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20' 
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{item.label}</span>
                    <p className="text-[11px] text-indigo-700 font-semibold my-1">{item.quote}</p>
                    <p className="text-[10px] text-slate-500">{item.desc}</p>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      onClick={() => setLanguage(item.id as any)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        language === item.id ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:underline'
                      }`}
                    >
                      {language === item.id ? 'Active' : 'Select'}
                    </button>

                    <button
                      onClick={() => triggerSpeech(item.id as any)}
                      className="p-1.5 rounded-lg bg-teal-100 text-teal-800 hover:bg-teal-200 transition-colors"
                      title="Play Audio Sample"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browser Speech API Warning / Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-[11px] text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p>
              <strong>Audio Engine:</strong> Powered by the browser's native Web Speech API. Speech playback may require user interaction permissions on initial page load depending on browser autoplay policies.
            </p>
          </div>

        </div>

        {/* Right 5 Cols: Smartphone Screen Mockup with Real Action Buttons */}
        <div className="lg:col-span-5 bg-slate-950 rounded-[36px] p-4 border-4 border-slate-800 shadow-2xl text-white space-y-4">
          
          {/* Top Speaker Notch */}
          <div className="flex items-center justify-between px-3 text-[10px] text-slate-400">
            <span>CareConnect Mobile</span>
            <div className="w-16 h-3.5 bg-slate-800 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-900"></div>
            </div>
            <span>8:00 AM</span>
          </div>

          {/* Phone Display Card */}
          <div className="bg-slate-900 rounded-3xl p-4 border border-slate-800 space-y-3">
            
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-teal-400 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                {isEscalated ? "VOICE ESCALATED" : "SCHEDULED REMINDER"}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {activeReminder ? activeReminder.scheduledTime : "8:00 AM"}
              </span>
            </div>

            {/* Vernacular Speech Card */}
            <div className="bg-indigo-950/80 border border-indigo-500/40 rounded-2xl p-3 text-center">
              <p className="text-xs font-black text-indigo-300">
                “{activeReminder?.vernacularPrompt[language] || "Time aaiduchu, tablet podunga!"}”
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                {activeReminder?.foodInstructions}
              </p>
            </div>

            {/* Patient Pill Photo & Medicine Details */}
            <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                <img 
                  src={activeReminder?.photoUrl} 
                  alt="" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{activeReminder?.medicationName}</div>
                <div className="text-[11px] text-slate-400">{activeReminder?.dosage}</div>
                <div className="text-[9px] text-emerald-400 font-semibold mt-0.5">
                  Verified Patient Pill Box Photo
                </div>
              </div>
            </div>

            {/* 3 User Actions */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleTakeDose}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Taken (எடுத்துக்கொண்டேன்)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSnooze}
                  className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                >
                  Snooze (10 mins)
                </button>
                <button
                  onClick={handleHelp}
                  className="py-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-medium transition-colors"
                >
                  Need Help
                </button>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[9px] text-slate-500 text-center leading-snug pt-1">
              Opening notification or clicking taken is a user-reported status. CareConnect does not independently verify ingestion.
            </p>
          </div>

        </div>

      </div>

      {/* Reminder History Log */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Reminder History & Event Log
            </h3>
          </div>
          <span className="text-[10px] text-slate-500">Auditable adherence trail</span>
        </div>

        <div className="divide-y divide-slate-100">
          {reminders.map((rem) => (
            <div key={rem.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  rem.status === 'taken' ? 'bg-emerald-500' : rem.status === 'snoozed' ? 'bg-amber-500' : 'bg-slate-300'
                }`}></div>
                <div>
                  <span className="font-bold text-slate-900">{rem.medicationName}</span>
                  <span className="text-slate-400 text-[10px] ml-2">Scheduled: {rem.scheduledTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  rem.status === 'taken' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : rem.status === 'snoozed' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {rem.status === 'taken' ? `Taken at ${rem.takenAt}` : rem.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
