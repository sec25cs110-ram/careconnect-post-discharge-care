import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  Plus, 
  Cpu, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Eye,
  RefreshCw,
  Clock
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';
import { ExtractedMedication } from '../../types/careConnect';

export const DischargeSummaryPage: React.FC = () => {
  const { 
    dischargeDoc, 
    updateDischargeDoc, 
    confirmExtractedMedications, 
    showToast,
    setActiveTab 
  } = useCareConnect();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(100);
  const [status, setStatus] = useState<'uploaded' | 'processing' | 'review_required' | 'confirmed'>(dischargeDoc.status);
  const [extractedList, setExtractedList] = useState<ExtractedMedication[]>(dischargeDoc.extractedMedications);
  const [selectedMedForEdit, setSelectedMedForEdit] = useState<ExtractedMedication | null>(null);

  // Upload simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    setIsUploading(true);
    setUploadProgress(15);
    setStatus('uploaded');

    // Simulate OCR progress
    setTimeout(() => setUploadProgress(45), 500);
    setTimeout(() => {
      setUploadProgress(85);
      setStatus('processing');
    }, 1100);
    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
      setStatus('review_required');
      showToast("OCR Text extraction complete! Please review and verify each line.");
    }, 1800);
  };

  const handleConfirmRow = (id: string) => {
    setExtractedList(prev => prev.map(m => m.id === id ? { ...m, confirmed: !m.confirmed } : m));
  };

  const handleDeleteRow = (id: string) => {
    setExtractedList(prev => prev.filter(m => m.id !== id));
    showToast("Extracted item removed from review list.");
  };

  const handleSaveEdit = () => {
    if (!selectedMedForEdit) return;
    setExtractedList(prev => prev.map(m => m.id === selectedMedForEdit.id ? selectedMedForEdit : m));
    setSelectedMedForEdit(null);
    showToast("Medication details adjusted.");
  };

  const handleFinalConfirm = () => {
    updateDischargeDoc({
      status: 'confirmed',
      extractedMedications: extractedList
    });
    setStatus('confirmed');
    confirmExtractedMedications();
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Discharge Summary & Medication Reconciliation
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              PaddleOCR + NLP
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Convert complex paper hospital discharge papers into verified, structured digital reminder schedules.
          </p>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Reconciliation Status:</span>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5 ${
            status === 'confirmed' 
              ? 'bg-emerald-100 text-emerald-800' 
              : status === 'review_required'
              ? 'bg-amber-100 text-amber-800 animate-pulse'
              : 'bg-indigo-100 text-indigo-800'
          }`}>
            {status === 'confirmed' && <CheckCircle2 className="w-3.5 h-3.5" />}
            {status === 'review_required' && <AlertCircle className="w-3.5 h-3.5" />}
            {status === 'processing' && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
            {status === 'confirmed' ? 'Verified & Activated' : status === 'review_required' ? 'Review Required' : 'Processing OCR'}
          </span>
        </div>
      </div>

      {/* Upload Zone & Document Visual Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5 Cols: File Upload & Status Area */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Upload Hospital Discharge Document
            </h3>

            {/* Drag and Drop Box */}
            <label className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/40 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
              <input 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-800">
                Drag & drop your discharge summary here
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports PDF, JPG, and PNG files up to 25 MB
              </p>
              <span className="mt-3 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-indigo-600 shadow-xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                Browse Files
              </span>
            </label>

            {/* Current Active File Info */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{dischargeDoc.fileName}</p>
                    <p className="text-[10px] text-slate-500">{dischargeDoc.fileSize} · {dischargeDoc.hospitalName}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Demo Document
                </span>
              </div>

              {isUploading && (
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] text-slate-600 font-medium">
                    <span>Extracting entities via OCR...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Attending Physician Advice */}
            <div className="bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100 space-y-1.5 text-xs text-indigo-950">
              <span className="font-bold flex items-center gap-1.5 text-indigo-900">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Hospital Discharge Instructions:
              </span>
              <p className="text-[11px] leading-relaxed text-slate-700">
                {dischargeDoc.doctorNotes}
              </p>
              <div className="pt-1 text-[10px] text-indigo-700 font-semibold">
                Follow-up Date: {dischargeDoc.followUpDate}
              </div>
            </div>
          </div>

          {/* Clinical Guardrail Box */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Human-in-the-Loop Requirement:</strong> To prevent medication errors, OCR-extracted rows do not arm reminder alarms until you verify and click "Confirm & Activate Schedule".
            </p>
          </div>
        </div>

        {/* Right 7 Cols: Extracted Medication Review Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Extracted Medication Regimen ({extractedList.length} Items)
                </h3>
                <span className="text-[11px] text-slate-500">Cross-reference with your printed discharge paper</span>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
                OCR Confidence: 96%
              </span>
            </div>

            {/* Extracted Rows */}
            <div className="space-y-3">
              {extractedList.map((med) => (
                <div 
                  key={med.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    med.confirmed 
                      ? 'bg-emerald-50/30 border-emerald-200' 
                      : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{med.medicineName}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                          {med.dosage}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {med.frequency}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        Relation: <strong>{med.foodRelation}</strong> · Duration: <strong>{med.duration}</strong>
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-md">
                        Raw OCR: "{med.rawText}"
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                      <button
                        onClick={() => setSelectedMedForEdit(med)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                        title="Edit extracted details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteRow(med.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove medication"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleConfirmRow(med.id)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all ${
                          med.confirmed 
                            ? 'bg-emerald-600 text-white shadow-xs' 
                            : 'bg-white border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{med.confirmed ? 'Verified' : 'Verify'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confirmation Action */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              {extractedList.filter(m => m.confirmed).length} of {extractedList.length} items verified by user
            </span>

            <button
              onClick={handleFinalConfirm}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Activate Schedule</span>
            </button>
          </div>
        </div>

      </div>

      {/* Edit Medication Modal */}
      {selectedMedForEdit && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Edit Extracted Medication</h3>
              <button 
                onClick={() => setSelectedMedForEdit(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Medicine Name</label>
                <input
                  type="text"
                  value={selectedMedForEdit.medicineName}
                  onChange={(e) => setSelectedMedForEdit({ ...selectedMedForEdit, medicineName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Dosage</label>
                  <input
                    type="text"
                    value={selectedMedForEdit.dosage}
                    onChange={(e) => setSelectedMedForEdit({ ...selectedMedForEdit, dosage: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Frequency</label>
                  <input
                    type="text"
                    value={selectedMedForEdit.frequency}
                    onChange={(e) => setSelectedMedForEdit({ ...selectedMedForEdit, frequency: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Food Relation / Timing</label>
                <input
                  type="text"
                  value={selectedMedForEdit.foodRelation}
                  onChange={(e) => setSelectedMedForEdit({ ...selectedMedForEdit, foodRelation: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedMedForEdit(null)}
                className="px-4 py-2 border rounded-xl text-xs text-slate-700"
              >
                Close
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
