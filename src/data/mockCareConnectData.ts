import { 
  UserProfile, 
  MedicationItem, 
  MedicationReminder, 
  DischargeDocument, 
  RecoveryCheckIn, 
  HerbDrugCheck, 
  CaregiverItem, 
  NotificationItem 
} from '../types/careConnect';

export const INITIAL_USER: UserProfile = {
  id: 'usr_apollo_7829',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phone: '+91 98402 78910',
  age: 58,
  gender: 'Female',
  mrn: 'AP-CH-2026-90412',
  hospital: 'Apollo Hospitals, Greams Road, Chennai',
  dischargeDate: '2026-10-15',
  attendingPhysician: 'Dr. K. Ramanathan, MD, DM (Cardiology)',
  primaryDiagnosis: 'Post-Percutaneous Coronary Intervention (PCI / Stent) & Type 2 Diabetes Mellitus',
  bloodGroup: 'B Positive (B+)',
  allergies: ['Penicillin (Moderate Rash)', 'Sulfa Drugs (Facial Edema)'],
  preferredLanguage: 'tanglish',
  isDemoUser: true
};

export const INITIAL_MEDICATIONS: MedicationItem[] = [
  {
    id: 'med_metformin',
    name: 'Metformin Hydrochloride',
    genericName: 'Metformin HCl 500mg (Extended Release)',
    dosage: '500 mg · 1 tablet',
    frequency: 'Twice daily (BD)',
    times: ['08:00 AM', '08:00 PM'],
    instructions: 'Take immediately after food with plenty of water. Do not crush.',
    foodRelation: 'after_food',
    startDate: '2026-10-15',
    duration: 'Ongoing / 90 days',
    photoUrl: '/src/assets/images/mobile_vernacular_reminder_1792312875794.jpg',
    status: 'active',
    verified: true,
    notes: 'Prescribed for post-discharge glycemic control. Monitor for GI intolerance.',
    refillsRemaining: 2
  },
  {
    id: 'med_atorvastatin',
    name: 'Atorvastatin Calcium',
    genericName: 'Atorvastatin 40mg Film-Coated Tablet',
    dosage: '40 mg · 1 tablet',
    frequency: 'Once daily at bedtime (QHS)',
    times: ['09:30 PM'],
    instructions: 'Take at night before bed. Avoid drinking grapefruit juice.',
    foodRelation: 'bedtime',
    startDate: '2026-10-15',
    duration: 'Ongoing / 180 days',
    photoUrl: '/src/assets/images/herb_drug_safety_matrix_1792312875384.jpg',
    status: 'active',
    verified: true,
    notes: 'Lipid-lowering therapy post-angioplasty. Report unexplained muscle soreness.',
    refillsRemaining: 3
  },
  {
    id: 'med_aspirin',
    name: 'Ecosprin (Aspirin Gastro-resistant)',
    genericName: 'Aspirin 75mg Enteric Coated',
    dosage: '75 mg · 1 tablet',
    frequency: 'Once daily after lunch (OD PC)',
    times: ['01:30 PM'],
    instructions: 'Take after a full meal. Do not take on an empty stomach.',
    foodRelation: 'after_food',
    startDate: '2026-10-15',
    duration: '365 days (Antiplatelet coverage)',
    photoUrl: '/src/assets/images/herb_drug_safety_matrix_1792312875384.jpg',
    status: 'active',
    verified: true,
    notes: 'Antiplatelet protection for coronary drug-eluting stent. Caution with herbal blood-thinners.',
    refillsRemaining: 4
  },
  {
    id: 'med_lisinopril',
    name: 'Lisinopril Dihydrate',
    genericName: 'Lisinopril 10mg ACE Inhibitor',
    dosage: '10 mg · 1 tablet',
    frequency: 'Once daily in the morning (OD)',
    times: ['08:00 AM'],
    instructions: 'Take with or without food. Stand up slowly to avoid postural dizziness.',
    foodRelation: 'after_food',
    startDate: '2026-10-15',
    duration: '90 days',
    photoUrl: '/src/assets/images/mobile_vernacular_reminder_1792312875794.jpg',
    status: 'active',
    verified: true,
    notes: 'Prescribed for myocardial remodeling and blood pressure control. BP target < 130/80.',
    refillsRemaining: 2
  },
  {
    id: 'med_pantoprazole',
    name: 'Pantoprazole Gastro-Resistant',
    genericName: 'Pantoprazole 40mg',
    dosage: '40 mg · 1 tablet',
    frequency: 'Once daily morning (OD AC)',
    times: ['07:30 AM'],
    instructions: 'Take 30 minutes before breakfast with a glass of water.',
    foodRelation: 'before_food',
    startDate: '2026-10-15',
    duration: '30 days',
    photoUrl: '/src/assets/images/ocr_nlp_reconciliation_1792312876132.jpg',
    status: 'active',
    verified: true,
    notes: 'Gastroprotection while on dual antiplatelet therapy.',
    refillsRemaining: 1
  }
];

export const INITIAL_REMINDERS: MedicationReminder[] = [
  {
    id: 'rem_01',
    medicationId: 'med_pantoprazole',
    medicationName: 'Pantoprazole 40mg',
    dosage: '1 tablet (Empty Stomach)',
    scheduledTime: '07:30 AM',
    actualDate: '2026-10-18',
    status: 'taken',
    takenAt: '07:34 AM',
    userReported: true,
    photoUrl: '/src/assets/images/ocr_nlp_reconciliation_1792312876132.jpg',
    foodInstructions: '30 mins before breakfast',
    vernacularPrompt: {
      en: 'Good morning. Please take Pantoprazole 40mg before breakfast.',
      ta: 'வணக்கம்! காலை உணவுக்கு 30 நிமிடம் முன் பான்டோப்ராசோல் மாத்திரை எடுக்கவும்.',
      tanglish: 'Vanakkam! Kaalai tiffin saapdradhukku 30 mins munnadi Pantoprazole podunga.'
    }
  },
  {
    id: 'rem_02',
    medicationId: 'med_metformin',
    medicationName: 'Metformin HCl 500mg',
    dosage: '1 tablet after breakfast',
    scheduledTime: '08:00 AM',
    actualDate: '2026-10-18',
    status: 'pending',
    userReported: false,
    photoUrl: '/src/assets/images/mobile_vernacular_reminder_1792312875794.jpg',
    foodInstructions: 'Immediately after food',
    vernacularPrompt: {
      en: 'Good morning Priya. Time for your Metformin 500mg dose after breakfast.',
      ta: 'வணக்கம்! காலை உணவுக்குப் பின் மெட்ஃபார்மின் 500mg மாத்திரை எடுக்கவும்.',
      tanglish: 'Vanakkam! Time aayiduchu, breakfast mudinjathum Metformin tablet podunga!'
    }
  },
  {
    id: 'rem_03',
    medicationId: 'med_lisinopril',
    medicationName: 'Lisinopril 10mg',
    dosage: '1 tablet oral',
    scheduledTime: '08:00 AM',
    actualDate: '2026-10-18',
    status: 'pending',
    userReported: false,
    photoUrl: '/src/assets/images/mobile_vernacular_reminder_1792312875794.jpg',
    foodInstructions: 'After breakfast with water',
    vernacularPrompt: {
      en: 'Good morning. Please take your Lisinopril 10mg blood pressure tablet.',
      ta: 'வணக்கம்! காலை ரத்த அழுத்த மாத்திரை லிசினோப்ரில் 10mg எடுக்கவும்.',
      tanglish: 'Vanakkam! Kaalai blood pressure tablet Lisinopril 10mg podunga.'
    }
  },
  {
    id: 'rem_04',
    medicationId: 'med_aspirin',
    medicationName: 'Ecosprin 75mg',
    dosage: '1 tablet after lunch',
    scheduledTime: '01:30 PM',
    actualDate: '2026-10-18',
    status: 'pending',
    userReported: false,
    photoUrl: '/src/assets/images/herb_drug_safety_matrix_1792312875384.jpg',
    foodInstructions: 'After heavy lunch',
    vernacularPrompt: {
      en: 'Afternoon reminder: Time for Ecosprin 75mg after lunch. Take with water.',
      ta: 'மதிய உணவுக்குப் பின் எகோஸ்ப்ரின் 75mg மாத்திரை எடுக்கவும்.',
      tanglish: 'Vanakkam! Lunch mudinjathum Ecosprin 75mg tablet podunga.'
    }
  },
  {
    id: 'rem_05',
    medicationId: 'med_atorvastatin',
    medicationName: 'Atorvastatin 40mg',
    dosage: '1 tablet at bedtime',
    scheduledTime: '09:30 PM',
    actualDate: '2026-10-18',
    status: 'pending',
    userReported: false,
    photoUrl: '/src/assets/images/herb_drug_safety_matrix_1792312875384.jpg',
    foodInstructions: 'At bedtime with water',
    vernacularPrompt: {
      en: 'Bedtime dose: Please take Atorvastatin 40mg before sleep.',
      ta: 'வணக்கம்! தூங்குவதற்கு முன் அடோர்வாஸ்டாடின் 40mg மாத்திரை எடுக்கவும்.',
      tanglish: 'Vanakkam! Night thoongum munnadi Atorvastatin 40mg tablet podunga.'
    }
  }
];

export const INITIAL_DISCHARGE_DOC: DischargeDocument = {
  id: 'doc_apollo_01',
  fileName: 'Apollo_Cardiology_Discharge_Summary_PriyaSharma.pdf',
  fileSize: '2.4 MB',
  uploadDate: '2026-10-15 14:30',
  hospitalName: 'Apollo Hospitals, Chennai',
  status: 'confirmed',
  doctorNotes: 'Patient discharged in stable hemodynamic condition post-PCI to LAD. Strict adherence to dual antiplatelets and diabetic regimen is critical. Follow up in Cardiology OPD after 10 days with repeat lipid profile and ECG.',
  followUpDate: '2026-10-25 10:00 AM',
  extractedMedications: [
    {
      id: 'ext_1',
      rawText: 'Tab. Metformin HCl 500mg - 1 tab PO BD PC x 90 days',
      medicineName: 'Metformin Hydrochloride',
      dosage: '500 mg',
      frequency: 'Twice daily (BD)',
      foodRelation: 'After food',
      duration: '90 days',
      confidence: 0.98,
      confirmed: true
    },
    {
      id: 'ext_2',
      rawText: 'Tab. Atorvastatin 40mg - 1 tab PO QHS x 180 days',
      medicineName: 'Atorvastatin Calcium',
      dosage: '40 mg',
      frequency: 'Once daily at bedtime (QHS)',
      foodRelation: 'Bedtime',
      duration: '180 days',
      confidence: 0.96,
      confirmed: true
    },
    {
      id: 'ext_3',
      rawText: 'Tab. Ecosprin 75mg - 1 tab PO OD PC x 365 days',
      medicineName: 'Aspirin (Ecosprin)',
      dosage: '75 mg',
      frequency: 'Once daily after lunch (OD PC)',
      foodRelation: 'After lunch',
      duration: '365 days',
      confidence: 0.95,
      confirmed: true
    },
    {
      id: 'ext_4',
      rawText: 'Tab. Lisinopril 10mg - 1 tab PO OD Mane x 90 days',
      medicineName: 'Lisinopril',
      dosage: '10 mg',
      frequency: 'Once daily morning (OD Mane)',
      foodRelation: 'Morning after food',
      duration: '90 days',
      confidence: 0.94,
      confirmed: true
    },
    {
      id: 'ext_5',
      rawText: 'Tab. Pantoprazole 40mg - 1 tab PO OD AC x 30 days',
      medicineName: 'Pantoprazole',
      dosage: '40 mg',
      frequency: 'Once daily morning (OD AC)',
      foodRelation: '30 mins before breakfast',
      duration: '30 days',
      confidence: 0.97,
      confirmed: true
    }
  ]
};

export const INITIAL_RECOVERY_LOGS: RecoveryCheckIn[] = [
  {
    id: 'chk_01',
    date: '2026-10-16',
    time: '08:30 AM',
    painScore: 5,
    temperature: 98.6,
    systolicBP: 134,
    diastolicBP: 84,
    heartRate: 78,
    symptoms: ['Mild surgical groin puncture site tenderness', 'Mild fatigue on stairs'],
    mobilityLevel: 'Assisted Walking',
    notes: 'First full morning at home. Puncture site clean, no active hematoma.',
    adherencePercentage: 100
  },
  {
    id: 'chk_02',
    date: '2026-10-17',
    time: '08:45 AM',
    painScore: 3,
    temperature: 98.4,
    systolicBP: 128,
    diastolicBP: 80,
    heartRate: 74,
    symptoms: ['Slight knee stiffness', 'Energy improving'],
    mobilityLevel: 'Independent Walking',
    notes: 'Walked in garden for 10 minutes without chest discomfort or shortness of breath.',
    adherencePercentage: 100
  },
  {
    id: 'chk_03',
    date: '2026-10-18',
    time: '08:15 AM',
    painScore: 2,
    temperature: 98.3,
    systolicBP: 124,
    diastolicBP: 78,
    heartRate: 72,
    symptoms: ['No active complaints'],
    mobilityLevel: 'Independent Walking',
    notes: 'Vitals stable. Groin puncture fully healing. Morning pantoprazole taken.',
    adherencePercentage: 100
  }
];

export const HERB_DATABASE: HerbDrugCheck[] = [
  {
    herbName: 'Giloy / Guduchi (Tinospora cordifolia)',
    tamilName: 'சீந்தில் கொடி (Seenthil Kodi)',
    allopathicDrug: 'Metformin / Glimepiride',
    severity: 'Severe',
    mechanism: 'Additive hypoglycemic mechanism. Giloy stimulates beta-cell insulin secretion and inhibits glycogenolysis, potentially causing rapid hypoglycemia when combined with Metformin.',
    clinicalAdvice: 'Avoid concurrent unmonitored consumption. High risk of dizziness, cold sweats, or hypoglycemic shock.',
    evidenceSource: 'Pharmacopoeia of India / PubMed PMID: 23625902',
    lastReviewed: 'August 2026'
  },
  {
    herbName: 'Garlic Extract / Concentrated Poondu (Allium sativum)',
    tamilName: 'பூண்டு லேகியம் (Poondu Lehyam)',
    allopathicDrug: 'Aspirin / Ecosprin / Clopidogrel',
    severity: 'Severe',
    mechanism: 'Inhibition of cyclooxygenase and thromboxane synthesis. When concentrated garlic extracts are combined with Aspirin, bleeding times escalate drastically.',
    clinicalAdvice: 'Discontinue high-potency garlic remedies. Minor culinary garlic in food is acceptable; medicinal capsules are contraindicated with dual antiplatelets.',
    evidenceSource: 'American Journal of Health-System Pharmacy & AYUSH Monograph',
    lastReviewed: 'July 2026'
  },
  {
    herbName: 'Kabasura Kudineer (Polyherbal Siddha Decoction)',
    tamilName: 'கபசுரக் குடிநீர்',
    allopathicDrug: 'Lisinopril / Enalapril (ACE Inhibitors)',
    severity: 'Moderate',
    mechanism: 'Contains active zingiber and piperine alkaloids that alter renal tubular electrolyte filtration and may interfere with ACE-inhibitor hemodynamics.',
    clinicalAdvice: 'Do not take at the exact same hour. Maintain at least 3 hours separation between allopathic blood pressure pills and herbal decoctions.',
    evidenceSource: 'Central Council for Research in Siddha (CCRS) Clinical Protocol',
    lastReviewed: 'September 2026'
  },
  {
    herbName: 'Ashwagandha / Indian Ginseng (Withania somnifera)',
    tamilName: 'அமுக்கராங்கிழங்கு (Amukkarang Kilangu)',
    allopathicDrug: 'Atorvastatin / Rosuvastatin',
    severity: 'Caution',
    mechanism: 'Mild substrate competition at CYP3A4 hepatic clearance pathway. May cause modest fluctuation in circulating statin metabolites.',
    clinicalAdvice: 'Monitor liver enzymes (LFT) if continuing daily herbal extracts alongside statins. Inform your cardiologist.',
    evidenceSource: 'Phytomedicine Clinical Trials Database',
    lastReviewed: 'June 2026'
  },
  {
    herbName: 'Tulsi / Holy Basil (Ocimum sanctum)',
    tamilName: 'துளசி (Thulasi)',
    allopathicDrug: 'Aspirin / Ecosprin',
    severity: 'Caution',
    mechanism: 'Eugenol constituents exhibit mild antiplatelet aggregation activity; when combined with Aspirin, slight additive coagulation delay may occur.',
    clinicalAdvice: 'Fresh leaves in hot water (1-2 leaves) is safe; avoid high-dose concentrated herbal extracts without clinician notification.',
    evidenceSource: 'AYUSH Central Clinical Database',
    lastReviewed: 'May 2026'
  },
  {
    herbName: 'Nilavembu Kudineer (Andrographis paniculata)',
    tamilName: 'நிலவேம்புக் குடிநீர்',
    allopathicDrug: 'Metformin & Antihypertensives',
    severity: 'Moderate',
    mechanism: 'Exerts hypotensive and hypoglycemic synergies. May cause sudden transient drops in blood pressure and fasting blood glucose.',
    clinicalAdvice: 'Check capillary blood sugar and BP within 2 hours of consumption. Do not self-administer prolonged courses without medical advice.',
    evidenceSource: 'Indian Journal of Traditional Knowledge',
    lastReviewed: 'September 2026'
  }
];

export const INITIAL_CAREGIVERS: CaregiverItem[] = [
  {
    id: 'cg_01',
    name: 'Rajesh Sharma',
    relationship: 'Son / Primary Family Caregiver',
    phone: '+91 98401 23456',
    email: 'rajesh.sharma@example.com',
    permissions: {
      smsEscalation: true,
      viewMedicines: true,
      viewRecoveryLogs: true,
      receiveCriticalAlerts: true
    },
    status: 'active',
    lastActive: '10 minutes ago'
  },
  {
    id: 'cg_02',
    name: 'Dr. Ananya Swaminathan',
    relationship: 'Home Care Nurse / Coordinator',
    phone: '+91 94440 98765',
    email: 'ananya.care@apollohomehealth.in',
    permissions: {
      smsEscalation: false,
      viewMedicines: true,
      viewRecoveryLogs: true,
      receiveCriticalAlerts: true
    },
    status: 'active',
    lastActive: 'Yesterday, 17:40'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    title: 'Morning Medication Alert',
    message: 'Metformin 500mg and Lisinopril 10mg scheduled for 08:00 AM after breakfast.',
    category: 'reminder',
    timestamp: '15 mins ago',
    read: false,
    actionUrl: 'reminders'
  },
  {
    id: 'notif_02',
    title: 'Discharge Summary Processed',
    message: 'Apollo Hospitals discharge summary verified. 5 prescription schedules armed.',
    category: 'system',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: 'discharge'
  },
  {
    id: 'notif_03',
    title: 'Daily Recovery Check-in Due',
    message: 'Please log your morning pain score and temperature for day 4 post-discharge.',
    category: 'checkin',
    timestamp: '3 hours ago',
    read: true,
    actionUrl: 'recovery'
  },
  {
    id: 'notif_04',
    title: 'Upcoming Cardiology Follow-up',
    message: 'Appointment with Dr. K. Ramanathan on Saturday, Oct 25 at 10:00 AM.',
    category: 'appointment',
    timestamp: '1 day ago',
    read: true,
    actionUrl: 'profile'
  }
];
