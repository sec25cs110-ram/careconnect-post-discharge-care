import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Bell, 
  X,
  Sparkles
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';

export const CaregiverSupportPage: React.FC = () => {
  const { caregivers, addCaregiver, removeCaregiver, showToast } = useCareConnect();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Son / Family Caregiver');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [smsEscalation, setSmsEscalation] = useState(true);
  const [viewMedicines, setViewMedicines] = useState(true);
  const [viewRecoveryLogs, setViewRecoveryLogs] = useState(true);
  const [receiveCriticalAlerts, setReceiveCriticalAlerts] = useState(true);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please provide caregiver name and phone number.");
      return;
    }

    addCaregiver({
      name,
      relationship,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      permissions: {
        smsEscalation,
        viewMedicines,
        viewRecoveryLogs,
        receiveCriticalAlerts
      }
    });

    setName('');
    setPhone('');
    setEmail('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Authorized Caregiver Network
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Designate trusted family members or visiting nurses to receive escalation alerts when medications remain unacknowledged.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Caregiver Contact</span>
        </button>
      </div>

      {/* Permission Consent Banner */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-indigo-950">
          <p className="font-bold">
            Consent & Privacy Protection
          </p>
          <p className="text-[11px] leading-relaxed text-indigo-900/80">
            CareConnect strictly shares medication and recovery data only with explicitly authorized contacts below. Caregivers receive SMS alerts only if a reminder sits unacknowledged past the 3-minute voice escalation grace window.
          </p>
        </div>
      </div>

      {/* Caregiver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {caregivers.map((cg) => (
          <div 
            key={cg.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-400 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {cg.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{cg.name}</h3>
                    <p className="text-xs text-indigo-600 font-medium">{cg.relationship}</p>
                    <span className="text-[10px] text-slate-400">Active {cg.lastActive}</span>
                  </div>
                </div>

                <button
                  onClick={() => removeCaregiver(cg.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Revoke access"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Contact Details */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono text-slate-800">{cg.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{cg.email}</span>
                </div>
              </div>

              {/* Active Permissions */}
              <div className="mt-4 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Granted Access Permissions:
                </span>
                <div className="flex flex-wrap gap-1.5 text-[10px]">
                  {cg.permissions.smsEscalation && (
                    <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-semibold border border-teal-200">
                      ✓ 30-Min SMS Fallback
                    </span>
                  )}
                  {cg.permissions.viewMedicines && (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 font-semibold border border-indigo-200">
                      ✓ View Medication Schedule
                    </span>
                  )}
                  {cg.permissions.viewRecoveryLogs && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                      ✓ View Daily Symptoms
                    </span>
                  )}
                  {cg.permissions.receiveCriticalAlerts && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 font-semibold border border-rose-200">
                      ✓ Severe Pain / Fever Alert
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Authorized Contact</span>
              </span>
              <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
                Manage Alerts
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Caregiver Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add Authorized Caregiver</h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Caregiver Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  required
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Relationship to Patient</label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Daughter / Visiting Nurse"
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98400 12345"
                    required
                    className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Permission Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-800 block text-xs">Permission Controls:</span>
                
                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={smsEscalation}
                    onChange={(e) => setSmsEscalation(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>Dispatch SMS if medicine unopened &gt; 30 mins</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={viewMedicines}
                    onChange={(e) => setViewMedicines(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>Allow viewing prescribed medications</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={receiveCriticalAlerts}
                    onChange={(e) => setReceiveCriticalAlerts(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>Emergency alerts for severe pain or fever</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
                >
                  Authorize Caregiver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
