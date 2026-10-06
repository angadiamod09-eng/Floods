export type NavigationTab =
  | 'home'
  | 'prepare'
  | 'kit'
  | 'simulator'
  | 'evacuation'
  | 'safety'
  | 'family'
  | 'contacts'
  | 'recovery'
  | 'score'
  | 'alert';

export interface ChecklistItem {
  id: string;
  label: string;
  category?: string;
  details?: string;
  completed: boolean;
}

export interface KitItem {
  id: string;
  name: string;
  category: 'water_food' | 'medical' | 'tools' | 'documents_personal';
  recommendedQuantity: string;
  whyNeeded: string;
  selected: boolean;
}

export interface SimulatorOption {
  id: 'A' | 'B' | 'C';
  text: string;
  isSafe: boolean;
  explanation: string;
}

export interface SimulatorScenario {
  id: number;
  situation: string;
  context: string;
  options: [SimulatorOption, SimulatorOption, SimulatorOption];
}

export interface FamilySafetyPlan {
  groupName: string;
  peopleCount: number | string;
  primaryLocation: string;
  backupLocation: string;
  emergencyContact: string;
  medicalNeeds: string;
  isSaved: boolean;
}

export interface EmergencyContacts {
  localEmergency: string;
  familyContactName: string;
  familyContactPhone: string;
  localAuthority: string;
  medicalContactName: string;
  medicalContactPhone: string;
  isSaved: boolean;
}
