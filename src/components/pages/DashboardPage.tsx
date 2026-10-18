import React from 'react';
import { 
  FileText, 
  Pill, 
  Clock, 
  Activity, 
  ShieldAlert, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Heart, 
  Sparkles,
  Volume2,
  TrendingDown,
  ChevronRight,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';

export const DashboardPage: React.FC = () => {
  const { 
    currentUser, 
    setActiveTab, 
    medications, 
    reminders, 
    recoveryLogs,
    markReminderTaken,
    snoozeReminder,
    requestReminderHelp,
    language
  } = useCareConnect();

  const activeMeds = medications.filter(m => m.status === 'active');
  const todayReminders = reminders;
  const takenCount = todayReminders.filter(r => r.status === 'taken').length;
  const pendingCount = todayReminders.filter(r => r.status === 'pending').length;
  const nextPendingReminder = todayReminders.find(r => r.status === 'pending');
  const latestRecovery = recoveryLogs[recoveryLogs.length - 1];

  return (
    <div className="space-y-6">
      
      {/* 1. Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-indigo-800/40">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-teal-300 text-xs font-semibold border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Post-Discharge Day 4 · {currentUser.hospital.split(',')[0]}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Welcome to CareConnect
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
            Your medicines, reminders, and recovery progress—all in one place. We’re here to ensure a safe, frictionless transition from hospital to home.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('discharge')}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Upload Discharge Summary</span>
            </button>

            <button
              onClick={() => setActiveTab('medicines')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Pill className="w-4 h-4 text-indigo-300" />
              <span>View Today’s Medicines</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* 2. Four Interactive Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Medicines */}
        <div 
          onClick={() => setActiveTab('medicines')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Medicines</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {activeMeds.length} Active
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
              <span className="text-emerald-700 font-semibold">{takenCount} taken</span>
              <span>·</span>
              <span className="text-amber-700 font-semibold">{pendingCount} remaining</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-indigo-600">
            <span>Manage prescriptions</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Card 2: Upcoming Reminders */}
        <div 
          onClick={() => setActiveTab('reminders')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Reminder</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {nextPendingReminder ? nextPendingReminder.scheduledTime : "All Completed"}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 truncate">
              {nextPendingReminder ? nextPendingReminder.medicationName : "Great job! All doses taken."}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-teal-700">
            <span>Acoustic escalation active</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Card 3: Recovery Check-ins */}
        <div 
          onClick={() => setActiveTab('recovery')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recovery Check-in</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Pain: {latestRecovery ? `${latestRecovery.painScore}/10` : '2/10'}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                Mild
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              BP: {latestRecovery ? `${latestRecovery.systolicBP}/${latestRecovery.diastolicBP}` : '124/78'} mmHg · Stable
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-purple-600">
            <span>Log daily symptoms</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Card 4: Next Follow-up */}
        <div 
          onClick={() => setActiveTab('profile')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Next Follow-up</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 tracking-tight">
              Sat, Oct 25
            </div>
            <div className="text-[11px] text-slate-500 mt-1 truncate">
              {currentUser.attendingPhysician.split(',')[0]}
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-amber-700">
            <span>Cardiology Clinic OPD</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* 3. Quick Action Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Quick Actions:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('medicines')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-indigo-600" />
            <span>Add Medicine</span>
          </button>
          <button
            onClick={() => setActiveTab('recovery')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-purple-600" />
            <span>Log Symptoms</span>
          </button>
          <button
            onClick={() => setActiveTab('discharge')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            <span>Upload Document</span>
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Check Herb–Drug</span>
          </button>
        </div>
      </div>

      {/* 4. Active Reminder Spotlight & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 5 Cols: Active Vernacular Reminder Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                <Volume2 className="w-4 h-4 animate-pulse text-teal-600" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Live Vernacular Reminder
                </h3>
                <span className="text-[10px] text-slate-400">Escalation active if unacknowledged</span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
              {language.toUpperCase()} MODE
            </span>
          </div>

          {nextPendingReminder ? (
            <div className="space-y-3.5">
              {/* Tanglish / Vernacular Banner */}
              <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-4 text-center space-y-1">
                <span className="text-xs font-black text-indigo-300 block">
                  “{nextPendingReminder.vernacularPrompt.tanglish}”
                </span>
                <span className="text-[10px] text-slate-300 block">
                  {nextPendingReminder.vernacularPrompt.ta}
                </span>
              </div>

              {/* Patient Photo and Prescription */}
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                  <img 
                    src={nextPendingReminder.photoUrl} 
                    alt={nextPendingReminder.medicationName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{nextPendingReminder.medicationName}</h4>
                  <p className="text-[11px] text-slate-600">{nextPendingReminder.dosage}</p>
                  <p className="text-[10px] text-teal-700 font-medium mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-teal-600" />
                    <span>{nextPendingReminder.foodInstructions}</span>
                  </p>
                </div>
              </div>

              {/* 3 Explicit Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => markReminderTaken(nextPendingReminder.id)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark as Taken (எடுத்துக்கொண்டேன்)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => snoozeReminder(nextPendingReminder.id, 10)}
                    className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    Snooze 10 mins
                  </button>
                  <button
                    onClick={() => requestReminderHelp(nextPendingReminder.id)}
                    className="py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-xs transition-colors"
                  >
                    Need Help?
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 text-center leading-snug">
                *User-reported status. Opening this notification or marking it does not replace physician oversight.
              </p>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-xs font-bold text-slate-800">All Scheduled Doses Completed!</p>
              <p className="text-[11px] text-slate-500">Next scheduled dose begins tomorrow morning.</p>
            </div>
          )}
        </div>

        {/* Right 7 Cols: Today's Full Schedule List */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Today’s Medication Schedule
              </h3>
              <span className="text-[10px] text-slate-500">Chronological daily adherence tracking</span>
            </div>
            <button
              onClick={() => setActiveTab('medicines')}
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {todayReminders.map((rem) => {
              const isTaken = rem.status === 'taken';
              return (
                <div 
                  key={rem.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isTaken 
                      ? 'bg-emerald-50/40 border-emerald-200/80 text-slate-700' 
                      : 'bg-slate-50 border-slate-200/90 text-slate-900 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                      <img 
                        src={rem.photoUrl} 
                        alt={rem.medicationName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">{rem.medicationName}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                          isTaken ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {rem.scheduledTime}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">{rem.dosage} · {rem.foodInstructions}</p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isTaken ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-xl">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Taken ({rem.takenAt})</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => markReminderTaken(rem.id)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        Mark Taken
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. Clinical Safety & Recovery Trend Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Herb-Drug Advisory Banner */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-900">
              Active Medication Safety Check
            </h4>
            <p className="text-[11px] text-amber-800 leading-snug">
              Patient is prescribed <strong>Aspirin 75mg</strong> and <strong>Metformin 500mg</strong>. Avoid concentrated garlic lehyam and Giloy decoctions without physician review to prevent spontaneous bleeding and acute hypoglycemia.
            </p>
            <button
              onClick={() => setActiveTab('safety')}
              className="text-xs font-bold text-amber-900 hover:underline pt-1 inline-flex items-center gap-1"
            >
              <span>Open Herb–Drug Safety Checker</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 7-Day Adherence & Healing Note */}
        <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-4 flex items-start gap-3">
          <Activity className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-indigo-950">
              Recovery Trajectory: Day 4 Post-PCI
            </h4>
            <p className="text-[11px] text-indigo-800 leading-snug">
              Groin site pain has dropped from <strong>5/10 to 2/10</strong>. 100% medication adherence recorded over the last 72 hours.
            </p>
            <button
              onClick={() => setActiveTab('recovery')}
              className="text-xs font-bold text-indigo-700 hover:underline pt-1 inline-flex items-center gap-1"
            >
              <span>View Recovery Charts & Vitals</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
