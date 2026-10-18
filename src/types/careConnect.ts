export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  mrn: string;
  hospital: string;
  dischargeDate: string;
  attendingPhysician: string;
  primaryDiagnosis: string;
  bloodGroup: string;
  allergies: string[];
  preferredLanguage: 'en' | 'ta' | 'tanglish';
  avatarUrl?: string;
  isDemoUser: boolean;
}

export interface MedicationItem {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  times: string[];
  instructions: string;
  foodRelation: 'before_food' | 'after_food' | 'with_food' | 'bedtime' | 'anytime';
  startDate: string;
  duration: string;
  photoUrl: string;
  status: 'active' | 'completed' | 'paused';
  verified: boolean;
  notes: string;
  refillsRemaining: number;
}

export interface MedicationReminder {
  id: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  scheduledTime: string; // e.g. "08:00 AM"
  actualDate: string; // YYYY-MM-DD
  status: 'pending' | 'taken' | 'snoozed' | 'missed';
  takenAt?: string;
  snoozedUntil?: string;
  userReported: boolean;
  photoUrl: string;
  foodInstructions: string;
  vernacularPrompt: {
    en: string;
    ta: string;
    tanglish: string;
  };
}

export interface DischargeDocument {
  id: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  hospitalName: string;
  status: 'uploaded' | 'processing' | 'review_required' | 'confirmed';
  extractedMedications: ExtractedMedication[];
  doctorNotes?: string;
  followUpDate?: string;
  fileUrl?: string;
}

export interface ExtractedMedication {
  id: string;
  rawText: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  foodRelation: string;
  duration: string;
  confidence: number;
  confirmed: boolean;
}

export interface RecoveryCheckIn {
  id: string;
  date: string;
  time: string;
  painScore: number; // 0-10
  temperature: number; // in Fahrenheit
  systolicBP: number;
  diastolicBP: number;
  heartRate: number;
  symptoms: string[];
  mobilityLevel: 'Bedbound' | 'Assisted Walking' | 'Independent Walking' | 'Normal';
  notes: string;
  adherencePercentage: number;
}

export interface HerbDrugCheck {
  herbName: string;
  tamilName: string;
  allopathicDrug: string;
  severity: 'Severe' | 'Moderate' | 'Caution' | 'Not Found';
  mechanism: string;
  clinicalAdvice: string;
  evidenceSource: string;
  lastReviewed: string;
}

export interface CaregiverItem {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  permissions: {
    smsEscalation: boolean;
    viewMedicines: boolean;
    viewRecoveryLogs: boolean;
    receiveCriticalAlerts: boolean;
  };
  status: 'active' | 'pending';
  lastActive: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'reminder' | 'checkin' | 'safety' | 'appointment' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
