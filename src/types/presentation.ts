export interface SlideItem {
  id: number;
  number: string;
  officialHeading: string;
  title: string;
  subtitle: string;
  category: string;
  speakerNotes: string[];
  keyTakeaway: string;
}

export interface HerbDrugInteraction {
  herb: string;
  tamilName: string;
  drug: string;
  severity: 'Severe' | 'Moderate' | 'Caution';
  mechanism: string;
  clinicalAdvice: string;
}

export interface ExtractionSample {
  medication: string;
  dosage: string;
  timing: string;
  vernacularTamil: string;
  vernacularTanglish: string;
  instructions: string;
  status: 'Verified' | 'Pending Review';
  pillColor: string;
}
