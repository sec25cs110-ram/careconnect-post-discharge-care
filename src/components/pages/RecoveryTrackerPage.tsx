import React, { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  Plus, 
  Sparkles,
  PhoneCall,
  Info
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';

export const RecoveryTrackerPage: React.FC = () => {
  const { recoveryLogs, addRecoveryCheckIn, showToast } = useCareConnect();

  // Form state
  const [painScore, setPainScore] = useState<number>(2);
  const [temperature, setTemperature] = useState<number>(98.4);
  const [systolicBP, setSystolicBP] = useState<number>(122);
  const [diastolicBP, setDiastolicBP] = useState<number>(78);
  const [heartRate, setHeartRate] = useState<number>(72);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('Groin catheter insertion site feels normal. No shortness of breath.');
  const [mobility, setMobility] = useState<'Independent Walking' | 'Assisted Walking' | 'Bedbound'>('Independent Walking');

  const symptomOptions = [
    'Groin site soreness',
    'Mild fatigue',
    'Dizziness on standing',
    'Shortness of breath',
    'Swelling in legs',
    'Chest pressure or discomfort',
    'Nausea',
    'Fever or chills'
  ];

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
    );
  };

  const isSevere = painScore >= 7 || temperature >= 101 || selectedSymptoms.includes('Chest pressure or discomfort');

  const handleSaveCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    addRecoveryCheckIn({
      date: dateStr,
      time: timeStr,
      painScore,
      temperature,
      systolicBP,
      diastolicBP,
      heartRate,
      symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : ['No adverse symptoms reported'],
      mobilityLevel: mobility,
      notes,
      adherencePercentage: 100
    });

    // Reset notes
    setNotes('');
    setSelectedSymptoms([]);
    showToast("Today's check-in saved! Recorded on timeline.");
  };

  const getPainDescription = (val: number) => {
    if (val === 0) return { label: 'No Pain', color: 'text-emerald-700 bg-emerald-50' };
    if (val <= 3) return { label: 'Mild Pain', color: 'text-teal-700 bg-teal-50' };
    if (val <= 6) return { label: 'Moderate Pain', color: 'text-amber-700 bg-amber-50' };
    return { label: 'Severe Pain', color: 'text-rose-700 bg-rose-50' };
  };

  const painInfo = getPainDescription(painScore);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Post-Discharge Recovery Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log daily symptoms, vital signs, and pain levels to monitor recovery trajectory.
          </p>
        </div>
        <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          Last Check-in: <strong className="text-slate-800">{recoveryLogs[recoveryLogs.length - 1]?.date || 'Today'}</strong>
        </div>
      </div>

      {/* High Alert Warning Banner if severe symptoms */}
      {isSevere && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-5 text-rose-950 space-y-2 shadow-sm animate-pulse">
          <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>Cautious Medical Warning: Elevated Pain / Temperature Detected</span>
          </div>
          <p className="text-xs leading-relaxed">
            You reported pain level {painScore}/10 or concerning symptoms. If you experience persistent chest pressure, shortness of breath, or fever over 101°F, please reach out to your attending physician at Apollo Hospitals or contact the emergency ambulance hotline immediately.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <a 
              href="tel:108"
              className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-xs inline-flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Emergency (108)</span>
            </a>
            <span className="text-xs text-rose-800 font-semibold">Hospital Hotline: 044 2829 0200</span>
          </div>
        </div>
      )}

      {/* Main Grid: Form on Left, Charts & Timeline on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 6 Cols: Daily Symptom Check-in Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-600" />
              <span>Daily Recovery Check-In Form</span>
            </h3>
            <span className="text-[10px] text-slate-400">Day 4 Post-Discharge</span>
          </div>

          <form onSubmit={handleSaveCheckIn} className="space-y-4">
            
            {/* 1. Pain Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">Pain Level (0 to 10 scale)</label>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${painInfo.color}`}>
                  {painScore}/10 · {painInfo.label}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={painScore}
                onChange={(e) => setPainScore(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>0 (No Pain)</span>
                <span>5 (Moderate)</span>
                <span>10 (Worst Pain)</span>
              </div>
            </div>

            {/* 2. Vitals Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Temp (°F)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full font-mono font-bold text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  BP (mmHg)
                </label>
                <div className="flex items-center gap-1 font-mono text-xs">
                  <input
                    type="number"
                    value={systolicBP}
                    onChange={(e) => setSystolicBP(parseInt(e.target.value))}
                    className="w-12 font-bold bg-white px-1.5 py-1.5 rounded-lg border border-slate-200 text-center"
                  />
                  <span>/</span>
                  <input
                    type="number"
                    value={diastolicBP}
                    onChange={(e) => setDiastolicBP(parseInt(e.target.value))}
                    className="w-12 font-bold bg-white px-1.5 py-1.5 rounded-lg border border-slate-200 text-center"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  Heart Rate (BPM)
                </label>
                <input
                  type="number"
                  value={heartRate}
                  onChange={(e) => setHeartRate(parseInt(e.target.value))}
                  className="w-full font-mono font-bold text-xs bg-white px-2.5 py-1.5 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            {/* 3. Symptoms Checklist */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">
                Check Any Present Symptoms:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {symptomOptions.map((sym, idx) => {
                  const isChecked = selectedSymptoms.includes(sym);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleSymptom(sym)}
                      className={`text-[11px] px-3 py-1.5 rounded-xl border transition-all ${
                        isChecked 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Mobility Radio */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Current Mobility Status:
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {['Independent Walking', 'Assisted Walking', 'Bedbound'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setMobility(lvl as any)}
                    className={`py-2 px-1 text-center rounded-xl border text-[11px] font-semibold transition-all ${
                      mobility === lvl 
                        ? 'bg-teal-50 border-teal-500 text-teal-800' 
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Notes */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">
                Patient Observations / Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How are you feeling today? Any dizziness, wound changes, or appetite issues?"
                className="w-full p-3 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Today’s Check-in</span>
            </button>
          </form>
        </div>

        {/* Right 6 Cols: Charts & Recovery Timeline */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Recovery Trajectory Chart Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Pain Level & Vitals Trajectory
                </h3>
                <p className="text-[11px] text-slate-500">Day-by-day healing trajectory post-PCI</p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Improving Trend
              </span>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="h-44 w-full bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between relative">
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Pain Scale (0-10)</span>
                <span>Target: &lt; 3</span>
              </div>

              {/* Chart SVG */}
              <div className="relative h-28 w-full flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="300" y2="20" stroke="#E2E8F0" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="300" y2="50" stroke="#E2E8F0" strokeDasharray="3 3" />
                  
                  {/* Trend Path */}
                  <path
                    d="M 20,25 Q 100,50 180,60 T 280,68"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  
                  {/* Data Points */}
                  <circle cx="20" cy="25" r="4" fill="#4F46E5" />
                  <circle cx="150" cy="55" r="4" fill="#4F46E5" />
                  <circle cx="280" cy="68" r="5" fill="#14B8A6" />

                  {/* Labels */}
                  <text x="10" y="16" fill="#64748B" fontSize="9" fontWeight="bold">Day 1: 5/10</text>
                  <text x="135" y="46" fill="#64748B" fontSize="9" fontWeight="bold">Day 2: 3/10</text>
                  <text x="245" y="60" fill="#0D9488" fontSize="9" fontWeight="bold">Day 4: 2/10</text>
                </svg>
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 font-medium pt-1 border-t border-slate-200">
                <span>Oct 16 (Discharge)</span>
                <span>Oct 17</span>
                <span>Today (Oct 18)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold">Average Rest BP</span>
                <span className="font-bold text-slate-800">124 / 78 mmHg</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold">Med Adherence Rate</span>
                <span className="font-bold text-emerald-700">100% On-Time</span>
              </div>
            </div>
          </div>

          {/* Recovery History Timeline */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Recovery Check-in History
            </h3>

            <div className="space-y-3">
              {recoveryLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{log.date} at {log.time}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      Pain: {log.painScore}/10 · Temp: {log.temperature}°F
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Vitals: BP {log.systolicBP}/{log.diastolicBP} mmHg · HR: {log.heartRate} bpm · Mobility: {log.mobilityLevel}
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    "{log.notes}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
