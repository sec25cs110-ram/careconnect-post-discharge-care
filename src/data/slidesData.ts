import { SlideItem, HerbDrugInteraction, ExtractionSample } from '../types/presentation';

export const TEAM_INFO = {
  teamName: "NEURALNOVA",
  projectTitle: "Zero-Friction Post-Discharge Care",
  projectSubtitle: "AI-Powered Vernacular Medication Reconciliation and Herb–Drug Safety Engine",
  tagline: "Right Medicine. Right Time. Safer Recovery.",
  institution: "Sri Sairam Engineering College",
  department: "Department of Computer Science and Engineering",
  competition: "Quantex’26",
  teamLead: {
    name: "Monisha S.",
    role: "Team Lead & Architecture Engineer",
    email: "sec25cs140@sairamtap.edu.in",
    phone: "7904035028"
  },
  members: [
    {
      name: "Mohanasankari .S",
      role: "AI & Vernacular NLP Pipeline",
      email: "mohanasankari.s@sairamtap.edu.in"
    },
    {
      name: "Ramya.K",
      role: "Pharmacology & Safety Logic",
      email: "ramya.k@sairamtap.edu.in"
    }
  ],
  githubRepo: "https://github.com/monishas-sairam/neuralnova-post-discharge-care"
};

export const SLIDES: SlideItem[] = [
  {
    id: 1,
    number: "01",
    officialHeading: "Team Details and Project Introduction",
    title: "Zero-Friction Post-Discharge Care",
    subtitle: "AI-Powered Vernacular Medication Reconciliation and Herb–Drug Safety Engine",
    category: "Introduction & Team",
    speakerNotes: [
      "Good morning respected judges. We are Team NEURALNOVA from Sri Sairam Engineering College, led by Monisha S., with team members Mohanasankari and Ramya.",
      "The critical first 30 days after hospital discharge are the most vulnerable window in patient healthcare. Over 19% of patients experience an adverse drug event at home due to misunderstood discharge papers, forgotten timings, and unvetted herbal mixtures.",
      "Today we introduce Zero-Friction Post-Discharge Care: an intelligent, vernacular-first companion delivering acoustic 3-minute voice escalation, patient-verified pill grounding, and an evidence-based herb–drug safety engine."
    ],
    keyTakeaway: "Bridging the critical gap between hospital discharge and safe home recovery with vernacular intelligence."
  },
  {
    id: 2,
    number: "02",
    officialHeading: "Problem Statement",
    title: "The Post-Discharge Failure Cascade",
    subtitle: "Why 1 in 5 Patients Suffer Preventable Complications After Leaving the Hospital",
    category: "Problem Definition",
    speakerNotes: [
      "Hospital discharge is traditionally a transactional paper handoff. Complex discharge summaries contain latin abbreviations like TDS or QHS that patients cannot decipher.",
      "Conventional smartphone push notifications fail: they are swiped away or silenced. In Indian households, language barriers amplify this crisis—most discharge summaries are strictly in English.",
      "Crucially, 68% of post-discharge patients in South India consume traditional preparations like Kabasura Kudineer, Giloy, or garlic concoctions alongside blood thinners and antidiabetics, unaware of catastrophic drug interactions.",
      "Our central problem: Patients lack a unified, vernacular, and proactive companion to simplify instructions, ensure adherence acknowledgment, and guard against herbal toxicity."
    ],
    keyTakeaway: "Jargon, notification blindness, language barriers, and unvetted herbal remedies create a dangerous post-discharge gap."
  },
  {
    id: 3,
    number: "03",
    officialHeading: "Proposed Solution",
    title: "A Unified Vernacular Post-Discharge Platform",
    subtitle: "Eight Cohesive Modules Designed for Zero-Friction Adherence and Clinical Safety",
    category: "Solution Architecture",
    speakerNotes: [
      "Our solution is an integrated, human-centric post-discharge engine built on eight core modules.",
      "First, OCR and NLP parse messy discharge documents into a structured regimen. Next, a patient or caregiver verifies each line item before any alarm is armed.",
      "The patient photographs their actual prescribed pill package, associating real visual cues with dosage alerts.",
      "If a notification sits unopened for 3 minutes, our system escalates acoustically with local spoken Tamil or Tanglish: 'Time aaiduchu, tablet podunga!'.",
      "Finally, our built-in Herb–Drug Safety Engine screens traditional home remedies against verified clinical databases before adverse events occur."
    ],
    keyTakeaway: "Unifying OCR parsing, Tanglish acoustic escalation, patient-verified pill photos, and herb-drug safety."
  },
  {
    id: 4,
    number: "04",
    officialHeading: "Methodology / Working Model",
    title: "10-Step Clinical & Operational Pipeline",
    subtitle: "Deterministic State Machine with Guardrailed Human-in-the-Loop Verification",
    category: "Methodology",
    speakerNotes: [
      "Walk the judges through the 10-step pipeline: from document upload to safety screening.",
      "Highlight Step 4: Human Verification is non-negotiable. The AI proposes, but the patient/caregiver must confirm extracted drug names and doses against the discharge sheet before schedules activate.",
      "Detail Step 7: The 3-Minute Escalation logic. A scheduled notification fires. If unacknowledged after 180 seconds, the on-device engine attempts a vernacular voice alert.",
      "Strict safety boundary: Opening an app does not equal swallowing a pill. The app never alters dosages or suggests double dosing under any circumstance."
    ],
    keyTakeaway: "Human-in-the-loop verification guarantees clinical accuracy; 3-minute escalation prevents notification neglect."
  },
  {
    id: 5,
    number: "05",
    officialHeading: "Technology Stack",
    title: "Production-Grade Layered Architecture",
    subtitle: "Cross-Platform Mobile, Offline-First Local Services, and Evidence-Based Safety Microservices",
    category: "Engineering Architecture",
    speakerNotes: [
      "Our technology stack is built for resilience on low-spec Android devices and intermittent connectivity.",
      "Frontend: Flutter and Dart for cross-platform responsiveness with native Android AlarmManager and TTS bindings.",
      "Backend: High-performance Python FastAPI handling document OCR pipelines and structured JSON schema validation.",
      "AI Engine: PaddleOCR/Tesseract for robust optical character recognition paired with clinical prompt templates for named entity recognition.",
      "Pharmacology Engine: Curated AYUSH and US-FDA pharmacopeial matrix cross-referencing allopathic drugs with Ayurvedic and Siddha herbs."
    ],
    keyTakeaway: "Modular, offline-capable architecture combining Flutter, FastAPI, PaddleOCR, and local TTS engines."
  },
  {
    id: 6,
    number: "06",
    officialHeading: "Innovation and Unique Features",
    title: "Distinctive Clinical & Technical Novelty",
    subtitle: "How NEURALNOVA Outperforms Conventional Generic Pill Reminders",
    category: "Innovation",
    speakerNotes: [
      "Why is NEURALNOVA competition-winning? Most pill reminder apps treat medication as generic calendar alarms.",
      "Innovation 1: 3-Minute Voice Escalation. Eliminates notification blindness without requiring wearable hardware.",
      "Innovation 2: Natural Tanglish & Tamil Phonetics. Older South Indian adults resonate with conversational phrasing rather than rigid literal translations.",
      "Innovation 3: Patient-Verified Pill Visual Grounding. No risky black-box computer vision guessing pills; the user binds the exact dispensed tablet package.",
      "Innovation 4: The Herb–Drug Safety Matrix. Bridges the critical gap between indigenous home remedies and modern allopathy."
    ],
    keyTakeaway: "Acoustic escalation, vernacular intimacy, verified visual grounding, and herb-drug contraindication screening."
  },
  {
    id: 7,
    number: "07",
    officialHeading: "Feasibility, Viability and Impact",
    title: "Operational Feasibility & Clinical Impact",
    subtitle: "Scalable Deployment Blueprint for Hospitals, Caregivers, and Diverse Demographics",
    category: "Impact & Feasibility",
    speakerNotes: [
      "Feasibility: Runs on standard Android APIs without specialized hardware. Local reminder notifications function even without active cellular data.",
      "Viability: B2B2C integration with hospital chains. Hospital quality boards (NABH/JCI) are penalized for 30-day preventable readmissions. Our platform provides auditable post-discharge compliance.",
      "Clinical Impact: Directly addresses the estimated 19-23% adverse drug event rate. Safeguards vulnerable senior citizens living alone or with busy family members."
    ],
    keyTakeaway: "Zero hardware overhead, offline-resilient local execution, and measurable reduction in preventable readmissions."
  },
  {
    id: 8,
    number: "08",
    officialHeading: "Expected Outcomes and Conclusion",
    title: "Measurable Deliverables & Strategic Roadmap",
    subtitle: "Clear Delineation of Tested Prototype Capabilities vs. Proposed Phase 2 Rollout",
    category: "Outcomes & Conclusion",
    speakerNotes: [
      "In strict adherence to competition integrity, we clearly distinguish our tested prototype from proposed enhancements.",
      "Tested Today: End-to-end OCR parsing of discharge summaries, interactive human confirmation, 3-minute escalation timer with real speech synthesis, and 50+ herb-drug contraindication pairs.",
      "Proposed for Phase 2: Direct hospital EHR sync via HL7/FHIR APIs and automated fallback SMS to family members if a dose remains unacknowledged for 30 minutes.",
      "Conclusion: Zero-Friction Post-Discharge Care is not just an alarm—it is a clinically responsible, vernacular lifeline for safer recovery."
    ],
    keyTakeaway: "Tested working prototype with clear clinical boundaries, primed for hospital EHR ecosystem integration."
  },
  {
    id: 9,
    number: "09",
    officialHeading: "Project GitHub Link",
    title: "Open Source Codebase & Live Artifacts",
    subtitle: "Verifiable Repository, Clean Directory Structure, and Interactive Sandbox",
    category: "Repository & Artifacts",
    speakerNotes: [
      "Our full codebase is structured transparently on GitHub at github.com/monishas-sairam/neuralnova-post-discharge-care.",
      "The repository contains five clean modules: Flutter mobile client, FastAPI backend, OCR-NLP extraction pipelines, curated herb-drug dataset, and architecture documentation.",
      "All dependencies, reproducible Docker setups, and test discharge datasets are fully documented for jury audit."
    ],
    keyTakeaway: "Modular open-source architecture with reproducible pipelines and verified data models."
  },
  {
    id: 10,
    number: "10",
    officialHeading: "Expected Outcomes and Conclusion",
    title: "Quantex’26 Evaluation & Project Summary",
    subtitle: "3-Minute Executive Pitch Summary & Team NEURALNOVA Contact Credentials",
    category: "Executive Summary",
    speakerNotes: [
      "To summarize our Quantex'26 pitch in 30 seconds: 1 in 5 discharged patients suffer complications. Team NEURALNOVA delivers a zero-friction, vernacular post-discharge companion.",
      "We replace notification blindness with 3-minute voice escalation in Tamil and Tanglish, replace medication confusion with verified pill photography, and eliminate hidden toxicity with herb-drug screening.",
      "Thank you judges for your time. Monisha, Mohanasankari, and Ramya are now open for technical and clinical questions."
    ],
    keyTakeaway: "Zero-friction, culturally grounded, clinically safe healthcare innovation by Team NEURALNOVA."
  }
];

export const HERB_DRUG_DATABASE: HerbDrugInteraction[] = [
  {
    herb: "Giloy / Guduchi (Tinospora cordifolia)",
    tamilName: "சீந்தில் கொடி (Seenthil Kodi)",
    drug: "Metformin / Glimepiride (Antidiabetics)",
    severity: "Severe",
    mechanism: "Synergistic hypoglycemic effect: Giloy stimulates insulin secretion and enhances glucose uptake, precipitating acute hypoglycemic shock.",
    clinicalAdvice: "Avoid concurrent unmonitored use. Frequent capillary blood glucose checks required if co-prescribed."
  },
  {
    herb: "Garlic Extract / Poondu (Allium sativum)",
    tamilName: "பூண்டு லேகியம் (Poondu Lehyam)",
    drug: "Warfarin / Aspirin / Clopidogrel (Antiplatelets)",
    severity: "Severe",
    mechanism: "Irreversible inhibition of platelet aggregation and thromboxane synthesis; elevates INR and causes spontaneous internal hemorrhaging.",
    clinicalAdvice: "Discontinue high-dose garlic supplements at least 7-10 days before surgery or when on therapeutic anticoagulation."
  },
  {
    herb: "Kabasura Kudineer (Polyherbal Decoction)",
    tamilName: "கபசுரக் குடிநீர்",
    drug: "Lisinopril / Enalapril (ACE Inhibitors & Antihypertensives)",
    severity: "Moderate",
    mechanism: "Active ginger and pepper alkaloids alter renal potassium clearance and interfere with renin-angiotensin hemodynamics.",
    clinicalAdvice: "Space intake at least 3 hours apart from allopathic blood pressure medication; monitor blood pressure."
  },
  {
    herb: "Ashwagandha / Indian Ginseng (Withania somnifera)",
    tamilName: "அமுக்கராங்கிழங்கு (Amukkarang Kilangu)",
    drug: "Levothyroxine / Thyroid Preparations",
    severity: "Moderate",
    mechanism: "Significantly stimulates thyroid hormone synthesis (elevates serum T3 and T4 levels), risking subclinical thyrotoxicosis.",
    clinicalAdvice: "Consult prescribing physician for thyroid panel titration if consuming herbal supplements."
  },
  {
    herb: "Tulsi / Holy Basil (Ocimum sanctum)",
    tamilName: "துளசி (Thulasi)",
    drug: "Atorvastatin / Rosuvastatin (Statins)",
    severity: "Caution",
    mechanism: "Mild competitive inhibition of CYP3A4 hepatic enzyme pathway; may modestly elevate circulating statin plasma concentrations.",
    clinicalAdvice: "Safe in moderate culinary amounts; avoid concentrated commercial herbal extracts alongside high-dose statins."
  }
];

export const SAMPLE_EXTRACTIONS: ExtractionSample[] = [
  {
    medication: "Metformin Hydrochloride",
    dosage: "500 mg · 1 tablet oral",
    timing: "08:00 AM & 08:00 PM (Twice daily after food)",
    vernacularTamil: "காலை 8:00 & இரவு 8:00 மணிக்கு உணவுக்குப் பின் 1 மாத்திரை எடுக்கவும்.",
    vernacularTanglish: "Kaalai & Iravu saapaatuku appram 1 tablet podunga.",
    instructions: "Take with food to reduce gastrointestinal irritation. Do not crush.",
    status: "Verified",
    pillColor: "White oblong score-line tablet"
  },
  {
    medication: "Atorvastatin Calcium",
    dosage: "40 mg · 1 tablet oral",
    timing: "09:00 PM (Once daily at bedtime)",
    vernacularTamil: "இரவு 9:00 மணிக்கு படுக்கைக்கு முன் 1 மாத்திரை எடுத்துக் கொள்ளவும்.",
    vernacularTanglish: "Night thoongurathukku munnadi Atorvastatin 40mg podunga.",
    instructions: "Avoid grape fruit juice. Report any unexplained muscle pain or weakness.",
    status: "Verified",
    pillColor: "White round film-coated tablet"
  },
  {
    medication: "Lisinopril",
    dosage: "10 mg · 1 tablet oral",
    timing: "08:00 AM (Once daily in the morning)",
    vernacularTamil: "காலை 8:00 மணிக்கு ரத்த அழுத்த மாத்திரை 1 எடுக்கவும்.",
    vernacularTanglish: "Kaalai 8:00 manikku blood pressure tablet podunga.",
    instructions: "Monitor blood pressure regularly. Stand up slowly from sitting or lying down.",
    status: "Verified",
    pillColor: "Yellow round biconvex tablet"
  }
];
