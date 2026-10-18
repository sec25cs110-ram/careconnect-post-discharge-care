import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  MedicationItem, 
  MedicationReminder, 
  DischargeDocument, 
  RecoveryCheckIn, 
  CaregiverItem, 
  NotificationItem,
  HerbDrugCheck
} from '../types/careConnect';
import { 
  INITIAL_USER, 
  INITIAL_MEDICATIONS, 
  INITIAL_REMINDERS, 
  INITIAL_DISCHARGE_DOC, 
  INITIAL_RECOVERY_LOGS, 
  INITIAL_CAREGIVERS, 
  INITIAL_NOTIFICATIONS,
  HERB_DATABASE
} from '../data/mockCareConnectData';

interface CareConnectContextType {
  // Auth state
  isAuthenticated: boolean;
  currentUser: UserProfile;
  login: (email?: string, password?: string) => void;
  loginAsDemo: () => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;

  // Active navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Medications
  medications: MedicationItem[];
  addMedication: (med: Omit<MedicationItem, 'id'>) => void;
  updateMedication: (id: string, med: Partial<MedicationItem>) => void;
  deleteMedication: (id: string) => void;

  // Reminders
  reminders: MedicationReminder[];
  markReminderTaken: (reminderId: string) => void;
  snoozeReminder: (reminderId: string, minutes?: number) => void;
  requestReminderHelp: (reminderId: string) => void;
  resetRemindersForDemo: () => void;

  // Discharge Document
  dischargeDoc: DischargeDocument;
  updateDischargeDoc: (doc: Partial<DischargeDocument>) => void;
  confirmExtractedMedications: () => void;

  // Recovery Tracker
  recoveryLogs: RecoveryCheckIn[];
  addRecoveryCheckIn: (checkIn: Omit<RecoveryCheckIn, 'id'>) => void;

  // Caregivers
  caregivers: CaregiverItem[];
  addCaregiver: (cg: Omit<CaregiverItem, 'id' | 'status' | 'lastActive'>) => void;
  removeCaregiver: (id: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearAllNotifications: () => void;

  // Settings & Preferences
  language: 'en' | 'ta' | 'tanglish';
  setLanguage: (lang: 'en' | 'ta' | 'tanglish') => void;
  voiceAlertsEnabled: boolean;
  setVoiceAlertsEnabled: (enabled: boolean) => void;
  demoFastForwardMode: boolean; // 10-second countdown for judges vs 3-min real countdown
  setDemoFastForwardMode: (val: boolean) => void;

  // Presentation Mode Toggle (Quantex'26 Deck)
  showQuantexDeck: boolean;
  setShowQuantexDeck: (show: boolean) => void;

  // Toast / Status Message helper
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CareConnectContext = createContext<CareConnectContextType | undefined>(undefined);

export const CareConnectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // start logged in by default or allow switching
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Core entities
  const [medications, setMedications] = useState<MedicationItem[]>(INITIAL_MEDICATIONS);
  const [reminders, setReminders] = useState<MedicationReminder[]>(INITIAL_REMINDERS);
  const [dischargeDoc, setDischargeDoc] = useState<DischargeDocument>(INITIAL_DISCHARGE_DOC);
  const [recoveryLogs, setRecoveryLogs] = useState<RecoveryCheckIn[]>(INITIAL_RECOVERY_LOGS);
  const [caregivers, setCaregivers] = useState<CaregiverItem[]>(INITIAL_CAREGIVERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Settings
  const [language, setLanguage] = useState<'en' | 'ta' | 'tanglish'>('tanglish');
  const [voiceAlertsEnabled, setVoiceAlertsEnabled] = useState<boolean>(true);
  const [demoFastForwardMode, setDemoFastForwardMode] = useState<boolean>(true); // default true for snappy judge demos!
  const [showQuantexDeck, setShowQuantexDeck] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const login = (email?: string, password?: string) => {
    setIsAuthenticated(true);
    showToast(`Welcome back, ${currentUser.name}!`);
  };

  const loginAsDemo = () => {
    setIsAuthenticated(true);
    setCurrentUser(INITIAL_USER);
    showToast("Logged in as Demo Patient (Priya Sharma · Apollo Hospitals)");
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast("Logged out successfully.");
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...profile }));
    showToast("Profile information updated successfully.");
  };

  // Medication handlers
  const addMedication = (med: Omit<MedicationItem, 'id'>) => {
    const newMed: MedicationItem = {
      ...med,
      id: `med_${Date.now()}`
    };
    setMedications(prev => [newMed, ...prev]);

    // Also create corresponding reminders for today
    const newReminders: MedicationReminder[] = med.times.map((time, idx) => ({
      id: `rem_${Date.now()}_${idx}`,
      medicationId: newMed.id,
      medicationName: newMed.name,
      dosage: newMed.dosage,
      scheduledTime: time,
      actualDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      userReported: false,
      photoUrl: newMed.photoUrl || '/src/assets/images/mobile_vernacular_reminder_1792312875794.jpg',
      foodInstructions: newMed.instructions,
      vernacularPrompt: {
        en: `Please take ${newMed.name} (${newMed.dosage}).`,
        ta: `${newMed.name} மருந்தை எடுத்துக் கொள்ளவும்.`,
        tanglish: `Time aaiduchu, ${newMed.name} tablet podunga!`
      }
    }));

    setReminders(prev => [...newReminders, ...prev]);
    showToast(`Added ${med.name} to medication regimen.`);
  };

  const updateMedication = (id: string, updated: Partial<MedicationItem>) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
    showToast("Medication details updated.");
  };

  const deleteMedication = (id: string) => {
    setMedications(prev => prev.filter(m => m.id !== id));
    setReminders(prev => prev.filter(r => r.medicationId !== id));
    showToast("Medication removed from active schedule.");
  };

  // Reminder actions
  const markReminderTaken = (reminderId: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setReminders(prev => prev.map(r => r.id === reminderId ? {
      ...r,
      status: 'taken',
      takenAt: timeStr,
      userReported: true
    } : r));
    showToast("Marked as taken! Recorded in recovery log.");
  };

  const snoozeReminder = (reminderId: string, minutes: number = 10) => {
    setReminders(prev => prev.map(r => r.id === reminderId ? {
      ...r,
      status: 'snoozed',
      snoozedUntil: `${minutes} minutes`
    } : r));
    showToast(`Reminder snoozed for ${minutes} minutes.`);
  };

  const requestReminderHelp = (reminderId: string) => {
    showToast("Assistance alert triggered! Primary caregiver notified.");
  };

  const resetRemindersForDemo = () => {
    setReminders(INITIAL_REMINDERS);
    showToast("Reminders reset to initial demo schedule.");
  };

  // Discharge doc actions
  const updateDischargeDoc = (doc: Partial<DischargeDocument>) => {
    setDischargeDoc(prev => ({ ...prev, ...doc }));
  };

  const confirmExtractedMedications = () => {
    setDischargeDoc(prev => ({ ...prev, status: 'confirmed' }));
    showToast("Discharge summary verified! All schedules activated.");
  };

  // Recovery Tracker
  const addRecoveryCheckIn = (checkIn: Omit<RecoveryCheckIn, 'id'>) => {
    const newEntry: RecoveryCheckIn = {
      ...checkIn,
      id: `chk_${Date.now()}`
    };
    setRecoveryLogs(prev => [newEntry, ...prev]);
    showToast("Recovery check-in recorded successfully!");
  };

  // Caregivers
  const addCaregiver = (cg: Omit<CaregiverItem, 'id' | 'status' | 'lastActive'>) => {
    const newCg: CaregiverItem = {
      ...cg,
      id: `cg_${Date.now()}`,
      status: 'active',
      lastActive: 'Just now'
    };
    setCaregivers(prev => [...prev, newCg]);
    showToast(`Added ${cg.name} as authorized caregiver.`);
  };

  const removeCaregiver = (id: string) => {
    setCaregivers(prev => prev.filter(c => c.id !== id));
    showToast("Caregiver access revoked.");
  };

  // Notifications
  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast("All notifications marked as read.");
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    showToast("Notifications cleared.");
  };

  return (
    <CareConnectContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        loginAsDemo,
        logout,
        updateProfile,

        activeTab,
        setActiveTab,

        medications,
        addMedication,
        updateMedication,
        deleteMedication,

        reminders,
        markReminderTaken,
        snoozeReminder,
        requestReminderHelp,
        resetRemindersForDemo,

        dischargeDoc,
        updateDischargeDoc,
        confirmExtractedMedications,

        recoveryLogs,
        addRecoveryCheckIn,

        caregivers,
        addCaregiver,
        removeCaregiver,

        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearAllNotifications,

        language,
        setLanguage,
        voiceAlertsEnabled,
        setVoiceAlertsEnabled,
        demoFastForwardMode,
        setDemoFastForwardMode,

        showQuantexDeck,
        setShowQuantexDeck,

        toastMessage,
        showToast
      }}
    >
      {children}
    </CareConnectContext.Provider>
  );
};

export const useCareConnect = () => {
  const context = useContext(CareConnectContext);
  if (!context) {
    throw new Error('useCareConnect must be used within a CareConnectProvider');
  }
  return context;
};
