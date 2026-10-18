import React, { useState } from 'react';
import { 
  Pill, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Trash2, 
  Camera, 
  ShieldCheck, 
  AlertCircle,
  X,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';
import { MedicationItem } from '../../types/careConnect';

export const MyMedicinesPage: React.FC = () => {
  const { medications, addMedication, updateMedication, deleteMedication, showToast } = useCareConnect();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedMedToEdit, setSelectedMedToEdit] = useState<MedicationItem | null>(null);
  const [medToDelete, setMedToDelete] = useState<MedicationItem | null>(null);

  // Add Form state
  const [name, setName] = useState('');
  const [genericName, setGenericName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Twice daily (BD)');
  const [scheduledTimes, setScheduledTimes] = useState('08:00 AM, 08:00 PM');
  const [instructions, setInstructions] = useState('Take with food and water');
  const [foodRelation, setFoodRelation] = useState<'before_food' | 'after_food' | 'bedtime'>('after_food');
  const [duration, setDuration] = useState('90 days');
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState('/src/assets/images/mobile_vernacular_reminder_1792312875794.jpg');

  const filteredMeds = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          med.genericName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || med.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dosage) {
      alert("Please provide medication name and dosage.");
      return;
    }

    const timesArray = scheduledTimes.split(',').map(s => s.trim());

    addMedication({
      name,
      genericName: genericName || name,
      dosage,
      frequency,
      times: timesArray,
      instructions,
      foodRelation,
      startDate: new Date().toISOString().split('T')[0],
      duration,
      photoUrl,
      status: 'active',
      verified: true,
      notes,
      refillsRemaining: 2
    });

    // Reset & close
    setName('');
    setGenericName('');
    setDosage('');
    setIsAddOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedToEdit) return;
    updateMedication(selectedMedToEdit.id, selectedMedToEdit);
    setSelectedMedToEdit(null);
  };

  const handleConfirmDelete = () => {
    if (!medToDelete) return;
    deleteMedication(medToDelete.id);
    setMedToDelete(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Prescribed Medications
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified post-discharge prescriptions linked with patient-uploaded tablet blister photos.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Prescribed Medicine</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by drug name, brand, or condition..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'all' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              All ({medications.length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'active' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Active ({medications.filter(m => m.status === 'active').length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterStatus === 'completed' ? 'bg-white text-indigo-700 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Completed ({medications.filter(m => m.status === 'completed').length})
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded-lg font-semibold ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'}`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-lg font-semibold ${viewMode === 'table' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'}`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMeds.map((med) => (
            <div 
              key={med.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Image and Pill Status Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative group">
                    <img 
                      src={med.photoUrl} 
                      alt={med.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                      <Camera className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-slate-900 truncate">{med.name}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {med.dosage}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{med.genericName}</p>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      ✓ Verified from Discharge
                    </span>
                  </div>
                </div>

                {/* Timings and Instructions */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-slate-800">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      Frequency:
                    </span>
                    <span className="font-mono">{med.frequency}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span className="font-semibold text-slate-800">Times:</span>
                    <span className="font-mono text-indigo-600 font-bold">{med.times.join(' · ')}</span>
                  </div>

                  <div className="pt-1 border-t border-slate-200 text-[11px] text-slate-600">
                    <strong>Instructions:</strong> {med.instructions}
                  </div>
                </div>

                {med.notes && (
                  <p className="text-[11px] text-slate-500 italic bg-amber-50/50 p-2 rounded-xl border border-amber-100">
                    “{med.notes}”
                  </p>
                )}
              </div>

              {/* Card Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Duration: {med.duration}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedMedToEdit(med)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                    title="Edit medication"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setMedToDelete(med)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete medication"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Medicine</th>
                  <th className="px-4 py-3">Dosage</th>
                  <th className="px-4 py-3">Frequency & Times</th>
                  <th className="px-4 py-3">Instructions</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMeds.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={med.photoUrl} 
                          alt="" 
                          className="w-8 h-8 rounded-lg object-cover border border-slate-200" 
                        />
                        <div>
                          <div className="font-bold text-slate-900">{med.name}</div>
                          <div className="text-[10px] text-slate-500">{med.genericName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-indigo-700">{med.dosage}</td>
                    <td className="px-4 py-3">
                      <div>{med.frequency}</div>
                      <div className="text-[10px] font-mono text-slate-500">{med.times.join(', ')}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-xs">{med.instructions}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {med.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedMedToEdit(med)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setMedToDelete(med)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Medicine Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add Prescribed Medication</h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Medication Trade Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Metformin 500mg"
                  required
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Dosage Form *</label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g. 500 mg · 1 tablet"
                    required
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Frequency *</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-xs bg-white"
                  >
                    <option value="Once daily in the morning (OD)">Once daily morning</option>
                    <option value="Twice daily (BD)">Twice daily (BD)</option>
                    <option value="Thrice daily (TDS)">Thrice daily (TDS)</option>
                    <option value="Once daily at bedtime (QHS)">Once daily at bedtime</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Scheduled Times (comma-separated)</label>
                <input
                  type="text"
                  value={scheduledTimes}
                  onChange={(e) => setScheduledTimes(e.target.value)}
                  placeholder="08:00 AM, 08:00 PM"
                  className="w-full px-3 py-2 border rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Food Relation</label>
                <select
                  value={foodRelation}
                  onChange={(e) => setFoodRelation(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-xl text-xs bg-white"
                >
                  <option value="after_food">After food (உணவுக்குப் பின்)</option>
                  <option value="before_food">Before food (உணவுக்கு முன்)</option>
                  <option value="bedtime">At bedtime (படுக்கைக்கு முன்)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Clinical Instructions</label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Take with full glass of water. Do not crush."
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
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
                  Save Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {medToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Delete {medToDelete.name}?</h3>
            <p className="text-xs text-slate-600">
              This will also remove all scheduled reminders for this medicine. Make sure your doctor has discontinued this prescription.
            </p>
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setMedToDelete(null)}
                className="px-4 py-2 border rounded-xl text-xs text-slate-700"
              >
                Keep Medicine
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
