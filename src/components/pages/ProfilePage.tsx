import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Heart, 
  Stethoscope, 
  Calendar, 
  ShieldAlert, 
  Mail, 
  Phone, 
  Edit3, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile, showToast } = useCareConnect();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);
  const [preferredLanguage, setPreferredLanguage] = useState(currentUser.preferredLanguage);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      email,
      preferredLanguage: preferredLanguage as any
    });
    setIsEditing(false);
    showToast("Profile details updated.");
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Patient Medical Profile
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified post-discharge patient identifiers and clinical records.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-50 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
          <span>{isEditing ? 'Cancel Editing' : 'Edit Contact Info'}</span>
        </button>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 4 Cols: ID Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 to-teal-400 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md shadow-indigo-600/30">
            {currentUser.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-900">{currentUser.name}</h2>
            <p className="text-xs text-slate-500">{currentUser.age} yrs · {currentUser.gender}</p>
            <span className="inline-block mt-2 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
              MRN: {currentUser.mrn}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs space-y-2 text-left text-slate-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="truncate">{currentUser.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span className="font-mono">{currentUser.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span className="truncate">{currentUser.hospital.split(',')[0]}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-2xl text-[11px] text-teal-900 font-medium">
              Blood Group: <strong className="font-bold">{currentUser.bloodGroup}</strong>
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Clinical Case Summary */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Edit Contact Details
              </h3>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-indigo-600" />
                  <span>Clinical Case Details (Apollo Cardiology)</span>
                </h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Post-PCI In Recovery
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Primary Diagnosis & Procedure:
                  </span>
                  <p className="text-slate-900 font-bold mt-0.5">
                    {currentUser.primaryDiagnosis}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Attending Cardiologist:
                    </span>
                    <p className="text-slate-900 font-semibold mt-0.5">
                      {currentUser.attendingPhysician}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Official Hospital Discharge Date:
                    </span>
                    <p className="text-slate-900 font-semibold mt-0.5">
                      {currentUser.dischargeDate} (Apollo Hospitals)
                    </p>
                  </div>
                </div>

                {/* Allergies Highlight */}
                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    Documented Drug Allergies:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.allergies.map((allergy, i) => (
                      <span key={i} className="px-3 py-1 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
                        ⚠️ {allergy}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Follow-up card */}
                <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-950 block">Next Cardiology Outpatient Visit</span>
                    <p className="text-[11px] text-indigo-800">Saturday, Oct 25, 2026 · 10:00 AM · Apollo OPD Block C</p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-xl border border-indigo-200 shadow-2xs">
                    In 7 Days
                  </span>
                </div>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
};
