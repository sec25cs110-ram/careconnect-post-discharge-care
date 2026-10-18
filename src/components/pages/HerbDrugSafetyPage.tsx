import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  BookOpen, 
  HelpCircle,
  Pill,
  Leaf,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';
import { HERB_DATABASE } from '../../data/mockCareConnectData';
import { HerbDrugCheck } from '../../types/careConnect';

export const HerbDrugSafetyPage: React.FC = () => {
  const { medications, showToast } = useCareConnect();

  const [selectedDrug, setSelectedDrug] = useState<string>('Metformin');
  const [selectedHerb, setSelectedHerb] = useState<string>('Giloy / Guduchi (Tinospora cordifolia)');
  const [activeResult, setActiveResult] = useState<HerbDrugCheck | null>(HERB_DATABASE[0]);
  const [hasSearched, setHasSearched] = useState(true);

  const herbalOptions = [
    'Giloy / Guduchi (Tinospora cordifolia)',
    'Garlic Extract / Concentrated Poondu (Allium sativum)',
    'Kabasura Kudineer (Polyherbal Siddha Decoction)',
    'Ashwagandha / Indian Ginseng (Withania somnifera)',
    'Tulsi / Holy Basil (Ocimum sanctum)',
    'Nilavembu Kudineer (Andrographis paniculata)',
    'Triphala Churna',
    'Ginger / Inji Concentrate'
  ];

  const handleCheck = () => {
    setHasSearched(true);
    // Find matching interaction
    const match = HERB_DATABASE.find(item => 
      item.herbName.toLowerCase().includes(selectedHerb.toLowerCase().slice(0, 5)) &&
      (selectedDrug.toLowerCase().includes('metformin') && item.allopathicDrug.toLowerCase().includes('metformin') ||
       selectedDrug.toLowerCase().includes('aspirin') && item.allopathicDrug.toLowerCase().includes('aspirin') ||
       selectedDrug.toLowerCase().includes('lisinopril') && item.allopathicDrug.toLowerCase().includes('lisinopril') ||
       selectedDrug.toLowerCase().includes('atorvastatin') && item.allopathicDrug.toLowerCase().includes('atorvastatin'))
    );

    if (match) {
      setActiveResult(match);
      showToast(`Analyzed ${selectedHerb.split('/')[0]} with ${selectedDrug}.`);
    } else {
      // Unindexed or no interaction found
      setActiveResult({
        herbName: selectedHerb,
        tamilName: 'நாட்டு மருந்து',
        allopathicDrug: selectedDrug,
        severity: 'Not Found',
        mechanism: 'No known pharmacological interaction documented between this exact botanical extract and prescribed allopathic agent in our indexed AYUSH / Indian Pharmacopoeia database.',
        clinicalAdvice: 'Absence of reported adverse data does NOT guarantee clinical safety. Herbal supplements contain bioactive phytochemicals that may affect drug absorption. Disclose all traditional supplements to your attending physician.',
        evidenceSource: 'Indexed AYUSH & Clinical Pharmacopeia Database',
        lastReviewed: 'October 2026'
      });
      showToast("No documented adverse interaction found. Reviewing with doctor recommended.");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Herb–Drug Safety Checker
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              Pharmacology Shield
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify potential interactions between prescribed allopathic discharge medications and traditional Indian herbal products.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
          Knowledge Base: <strong className="text-slate-900">AYUSH & PubMed Monographs</strong>
        </div>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-amber-950">
          <p className="font-bold">
            Mandatory Patient Advisory:
          </p>
          <p className="text-[11px] leading-relaxed">
            “Please consult your doctor or pharmacist before combining herbal products with prescribed medicines. Do not stop or change prescribed treatment based on this result alone.”
          </p>
        </div>
      </div>

      {/* Interaction Checker Input Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Select Prescribed Drug & Traditional Remedy to Check
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Prescribed Drug Selector */}
          <div>
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
              <Pill className="w-4 h-4 text-indigo-600" />
              <span>Select Prescribed Medication</span>
            </label>
            <select
              value={selectedDrug}
              onChange={(e) => setSelectedDrug(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {medications.map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name} ({m.dosage}) — Current Prescription
                </option>
              ))}
              <option value="Warfarin 5mg">Warfarin 5mg (Anticoagulant)</option>
              <option value="Aspirin / Ecosprin">Aspirin 75mg (Antiplatelet)</option>
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Auto-populated from your verified discharge summary.
            </span>
          </div>

          {/* Herbal Remedy Selector */}
          <div>
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
              <Leaf className="w-4 h-4 text-teal-600" />
              <span>Select or Search Herbal / Ayurvedic Remedy</span>
            </label>
            <select
              value={selectedHerb}
              onChange={(e) => setSelectedHerb(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {herbalOptions.map((herb, idx) => (
                <option key={idx} value={herb}>
                  {herb}
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Common South Indian traditional preparations and decoctions.
            </span>
          </div>

        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleCheck}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Check Interaction Safety</span>
          </button>
        </div>
      </div>

      {/* Results Panel */}
      {activeResult && (
        <div className={`rounded-3xl p-6 border shadow-sm space-y-5 transition-all ${
          activeResult.severity === 'Severe'
            ? 'bg-rose-50/50 border-rose-200'
            : activeResult.severity === 'Moderate'
            ? 'bg-amber-50/50 border-amber-200'
            : activeResult.severity === 'Caution'
            ? 'bg-blue-50/50 border-blue-200'
            : 'bg-slate-50 border-slate-200'
        }`}>
          
          {/* Severity Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/5 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">{activeResult.herbName}</h3>
                <span className="text-xs font-bold text-teal-700">({activeResult.tamilName})</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Prescribed Partner: <strong className="text-slate-900">{activeResult.allopathicDrug}</strong>
              </p>
            </div>

            <div className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide self-start sm:self-auto flex items-center gap-1.5 ${
              activeResult.severity === 'Severe'
                ? 'bg-rose-600 text-white shadow-sm'
                : activeResult.severity === 'Moderate'
                ? 'bg-amber-600 text-white shadow-sm'
                : activeResult.severity === 'Caution'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-600 text-white'
            }`}>
              {activeResult.severity === 'Severe' && <AlertTriangle className="w-3.5 h-3.5" />}
              <span>{activeResult.severity.toUpperCase()} RISK CLASSIFICATION</span>
            </div>
          </div>

          {/* Pharmacological Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block">
                Pharmacological Mechanism
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeResult.mechanism}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block">
                Recommended Clinical Action
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeResult.clinicalAdvice}
              </p>
            </div>

          </div>

          {/* Reference & Evidence Tag */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              Source: <strong>{activeResult.evidenceSource}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Evidence Last Audited: <strong>{activeResult.lastReviewed}</strong>
            </span>
          </div>

        </div>
      )}

      {/* Common Verified Interactions Quick Grid */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Frequently Monitored Post-Discharge Herb–Drug Interactions:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {HERB_DATABASE.slice(0, 3).map((item, idx) => (
            <div 
              key={idx}
              onClick={() => {
                setActiveResult(item);
                setSelectedHerb(item.herbName);
              }}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 truncate">{item.herbName.split('/')[0]}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                    item.severity === 'Severe' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-[11px] text-indigo-700 font-medium mt-1">Interacts with: {item.allopathicDrug}</p>
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">Click to view clinical mechanism →</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
