import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  ChecklistItem,
  EmergencyContacts,
  FamilySafetyPlan,
  KitItem,
  NavigationTab,
} from '../types';
import {
  INITIAL_EVACUATION_CHECKLIST,
  INITIAL_KIT_ITEMS,
  INITIAL_PREPARE_CHECKLIST,
  INITIAL_RECOVERY_CHECKLIST,
} from '../data/initialData';
import { SIMULATOR_SCENARIOS } from '../data/simulatorScenarios';
import { isAlertSoundPlaying, startAlertSound, stopAlertSound } from '../utils/audioAlert';

interface SimulatorState {
  currentScenarioIndex: number;
  userAnswers: Record<number, 'A' | 'B' | 'C'>;
  isAnswerSubmitted: boolean;
  score: number;
  completed: boolean;
}

interface FloodSafeContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  alertModeActive: boolean;
  setAlertModeActive: (active: boolean) => void;
  // Audio alert state
  isAudioAlertPlaying: boolean;
  toggleAlertSound: () => void;
  stopAudioAlert: () => void;

  // Prepare Checklist
  prepareChecklist: ChecklistItem[];
  togglePrepareItem: (id: string) => void;
  resetPrepareChecklist: () => void;
  prepareProgress: number;

  // Emergency Kit
  kitItems: KitItem[];
  toggleKitItem: (id: string) => void;
  resetKitItems: () => void;
  kitReadiness: number;
  missingKitItems: KitItem[];

  // Evacuation Checklist
  evacChecklist: ChecklistItem[];
  toggleEvacItem: (id: string) => void;
  resetEvacChecklist: () => void;
  evacProgress: number;

  // Recovery Checklist
  recoveryChecklist: ChecklistItem[];
  toggleRecoveryItem: (id: string) => void;
  resetRecoveryChecklist: () => void;
  recoveryProgress: number;

  // Simulator
  simulatorState: SimulatorState;
  submitSimulatorAnswer: (choice: 'A' | 'B' | 'C') => void;
  nextSimulatorScenario: () => void;
  previousSimulatorScenario: () => void;
  jumpToSimulatorScenario: (index: number) => void;
  resetSimulator: () => void;

  // Family Safety Plan
  familyPlan: FamilySafetyPlan;
  updateFamilyPlan: (plan: Partial<FamilySafetyPlan>) => void;
  saveFamilyPlan: () => void;
  resetFamilyPlan: () => void;

  // Emergency Contacts
  contacts: EmergencyContacts;
  updateContacts: (contacts: Partial<EmergencyContacts>) => void;
  saveContacts: () => void;
  resetContacts: () => void;

  // Preparedness Score calculation
  preparednessScore: number;
  preparednessRating: {
    status: 'READY' | 'MODERATE' | 'VULNERABLE';
    label: string;
    description: string;
  };
  preparednessSummary: {
    completedItems: string[];
    missingItems: string[];
  };
}

const STORAGE_KEYS = {
  PREPARE: 'floodsafe_prepare_v1',
  KIT: 'floodsafe_kit_v1',
  EVAC: 'floodsafe_evac_v1',
  RECOVERY: 'floodsafe_recovery_v1',
  SIMULATOR: 'floodsafe_simulator_v1',
  FAMILY_PLAN: 'floodsafe_family_plan_v1',
  CONTACTS: 'floodsafe_contacts_v1',
  ALERT_MODE: 'floodsafe_alert_mode_v1',
};

const DEFAULT_FAMILY_PLAN: FamilySafetyPlan = {
  groupName: '',
  peopleCount: '',
  primaryLocation: '',
  backupLocation: '',
  emergencyContact: '',
  medicalNeeds: '',
  isSaved: false,
};

const DEFAULT_CONTACTS: EmergencyContacts = {
  localEmergency: '',
  familyContactName: '',
  familyContactPhone: '',
  localAuthority: '',
  medicalContactName: '',
  medicalContactPhone: '',
  isSaved: false,
};

const DEFAULT_SIMULATOR_STATE: SimulatorState = {
  currentScenarioIndex: 0,
  userAnswers: {},
  isAnswerSubmitted: false,
  score: 0,
  completed: false,
};

function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return defaultValue;
    }
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed !== null && parsed !== undefined) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn(`Error reading localStorage for ${key}:`, err);
  }
  return defaultValue;
}

function setStorageItem<T>(key: string, value: T): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (err) {
    console.warn(`Error writing localStorage for ${key}:`, err);
  }
}

const FloodSafeContext = createContext<FloodSafeContextType | null>(null);

export const FloodSafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [alertModeActive, setAlertModeActiveState] = useState<boolean>(() =>
    getStorageItem<boolean>(STORAGE_KEYS.ALERT_MODE, false)
  );
  const [isAudioAlertPlaying, setIsAudioAlertPlaying] = useState<boolean>(false);

  // Checklists with array validation
  const [prepareChecklist, setPrepareChecklist] = useState<ChecklistItem[]>(() => {
    const saved = getStorageItem(STORAGE_KEYS.PREPARE, INITIAL_PREPARE_CHECKLIST);
    return Array.isArray(saved) && saved.length > 0 ? saved : INITIAL_PREPARE_CHECKLIST;
  });

  const [kitItems, setKitItems] = useState<KitItem[]>(() => {
    const saved = getStorageItem(STORAGE_KEYS.KIT, INITIAL_KIT_ITEMS);
    return Array.isArray(saved) && saved.length > 0 ? saved : INITIAL_KIT_ITEMS;
  });

  const [evacChecklist, setEvacChecklist] = useState<ChecklistItem[]>(() => {
    const saved = getStorageItem(STORAGE_KEYS.EVAC, INITIAL_EVACUATION_CHECKLIST);
    return Array.isArray(saved) && saved.length > 0 ? saved : INITIAL_EVACUATION_CHECKLIST;
  });

  const [recoveryChecklist, setRecoveryChecklist] = useState<ChecklistItem[]>(() => {
    const saved = getStorageItem(STORAGE_KEYS.RECOVERY, INITIAL_RECOVERY_CHECKLIST);
    return Array.isArray(saved) && saved.length > 0 ? saved : INITIAL_RECOVERY_CHECKLIST;
  });

  // Simulator with schema validation
  const [simulatorState, setSimulatorState] = useState<SimulatorState>(() => {
    const saved = getStorageItem(STORAGE_KEYS.SIMULATOR, DEFAULT_SIMULATOR_STATE);
    if (
      saved &&
      typeof saved.currentScenarioIndex === 'number' &&
      saved.currentScenarioIndex >= 0 &&
      saved.currentScenarioIndex < SIMULATOR_SCENARIOS.length &&
      saved.userAnswers &&
      typeof saved.userAnswers === 'object'
    ) {
      return saved;
    }
    return DEFAULT_SIMULATOR_STATE;
  });

  // Plans & Contacts with merged defaults
  const [familyPlan, setFamilyPlan] = useState<FamilySafetyPlan>(() => {
    const saved = getStorageItem(STORAGE_KEYS.FAMILY_PLAN, DEFAULT_FAMILY_PLAN);
    return { ...DEFAULT_FAMILY_PLAN, ...(saved || {}) };
  });

  const [contacts, setContacts] = useState<EmergencyContacts>(() => {
    const saved = getStorageItem(STORAGE_KEYS.CONTACTS, DEFAULT_CONTACTS);
    return { ...DEFAULT_CONTACTS, ...(saved || {}) };
  });

  // Save changes to storage
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.PREPARE, prepareChecklist);
  }, [prepareChecklist]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.KIT, kitItems);
  }, [kitItems]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.EVAC, evacChecklist);
  }, [evacChecklist]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.RECOVERY, recoveryChecklist);
  }, [recoveryChecklist]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.SIMULATOR, simulatorState);
  }, [simulatorState]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.FAMILY_PLAN, familyPlan);
  }, [familyPlan]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CONTACTS, contacts);
  }, [contacts]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.ALERT_MODE, alertModeActive);
  }, [alertModeActive]);

  // Audio alert handlers
  const toggleAlertSound = () => {
    if (isAlertSoundPlaying()) {
      stopAlertSound(setIsAudioAlertPlaying);
    } else {
      startAlertSound(setIsAudioAlertPlaying);
    }
  };

  const stopAudioAlert = () => {
    stopAlertSound(setIsAudioAlertPlaying);
  };

  // Prepare Checklist logic
  const togglePrepareItem = (id: string) => {
    setPrepareChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const resetPrepareChecklist = () => {
    setPrepareChecklist(INITIAL_PREPARE_CHECKLIST.map((item) => ({ ...item, completed: false })));
  };

  const completedPrepareCount = prepareChecklist.filter((i) => i.completed).length;
  const prepareProgress = Math.round((completedPrepareCount / prepareChecklist.length) * 100);

  // Kit logic
  const toggleKitItem = (id: string) => {
    setKitItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const resetKitItems = () => {
    setKitItems(INITIAL_KIT_ITEMS.map((item) => ({ ...item, selected: false })));
  };

  const selectedKitCount = kitItems.filter((i) => i.selected).length;
  const kitReadiness = Math.round((selectedKitCount / kitItems.length) * 100);
  const missingKitItems = kitItems.filter((i) => !i.selected);

  // Evac logic
  const toggleEvacItem = (id: string) => {
    setEvacChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const resetEvacChecklist = () => {
    setEvacChecklist(INITIAL_EVACUATION_CHECKLIST.map((item) => ({ ...item, completed: false })));
  };

  const completedEvacCount = evacChecklist.filter((i) => i.completed).length;
  const evacProgress = Math.round((completedEvacCount / evacChecklist.length) * 100);

  // Recovery logic
  const toggleRecoveryItem = (id: string) => {
    setRecoveryChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const resetRecoveryChecklist = () => {
    setRecoveryChecklist(INITIAL_RECOVERY_CHECKLIST.map((item) => ({ ...item, completed: false })));
  };

  const completedRecoveryCount = recoveryChecklist.filter((i) => i.completed).length;
  const recoveryProgress = Math.round((completedRecoveryCount / recoveryChecklist.length) * 100);

  // Simulator actions
  const submitSimulatorAnswer = (choice: 'A' | 'B' | 'C') => {
    const currentScenario = SIMULATOR_SCENARIOS[simulatorState.currentScenarioIndex];
    if (!currentScenario) return;

    const chosenOption = currentScenario.options.find((opt) => opt.id === choice);
    const isCorrect = chosenOption?.isSafe ?? false;

    // Calculate updated answers
    const updatedAnswers = {
      ...simulatorState.userAnswers,
      [currentScenario.id]: choice,
    };

    // Calculate score
    let totalCorrect = 0;
    SIMULATOR_SCENARIOS.forEach((scenario) => {
      const ans = updatedAnswers[scenario.id];
      if (ans) {
        const opt = scenario.options.find((o) => o.id === ans);
        if (opt?.isSafe) totalCorrect += 1;
      }
    });

    const isLastScenario = simulatorState.currentScenarioIndex === SIMULATOR_SCENARIOS.length - 1;

    setSimulatorState({
      ...simulatorState,
      userAnswers: updatedAnswers,
      isAnswerSubmitted: true,
      score: totalCorrect,
      completed: isLastScenario || simulatorState.completed,
    });
  };

  const nextSimulatorScenario = () => {
    if (simulatorState.currentScenarioIndex < SIMULATOR_SCENARIOS.length - 1) {
      const nextIndex = simulatorState.currentScenarioIndex + 1;
      const nextScenario = SIMULATOR_SCENARIOS[nextIndex];
      const hasAnswer = Boolean(simulatorState.userAnswers[nextScenario.id]);
      setSimulatorState((prev) => ({
        ...prev,
        currentScenarioIndex: nextIndex,
        isAnswerSubmitted: hasAnswer,
      }));
    }
  };

  const previousSimulatorScenario = () => {
    if (simulatorState.currentScenarioIndex > 0) {
      const prevIndex = simulatorState.currentScenarioIndex - 1;
      const prevScenario = SIMULATOR_SCENARIOS[prevIndex];
      const hasAnswer = Boolean(simulatorState.userAnswers[prevScenario.id]);
      setSimulatorState((prev) => ({
        ...prev,
        currentScenarioIndex: prevIndex,
        isAnswerSubmitted: hasAnswer,
      }));
    }
  };

  const jumpToSimulatorScenario = (index: number) => {
    if (index >= 0 && index < SIMULATOR_SCENARIOS.length) {
      const scenario = SIMULATOR_SCENARIOS[index];
      const hasAnswer = Boolean(simulatorState.userAnswers[scenario.id]);
      setSimulatorState((prev) => ({
        ...prev,
        currentScenarioIndex: index,
        isAnswerSubmitted: hasAnswer,
      }));
    }
  };

  const resetSimulator = () => {
    setSimulatorState(DEFAULT_SIMULATOR_STATE);
  };

  // Family plan actions
  const updateFamilyPlan = (plan: Partial<FamilySafetyPlan>) => {
    setFamilyPlan((prev) => ({ ...prev, ...plan, isSaved: false }));
  };

  const saveFamilyPlan = () => {
    setFamilyPlan((prev) => ({ ...prev, isSaved: true }));
  };

  const resetFamilyPlan = () => {
    setFamilyPlan(DEFAULT_FAMILY_PLAN);
  };

  // Contacts actions
  const updateContacts = (newContacts: Partial<EmergencyContacts>) => {
    setContacts((prev) => ({ ...prev, ...newContacts, isSaved: false }));
  };

  const saveContacts = () => {
    setContacts((prev) => ({ ...prev, isSaved: true }));
  };

  const resetContacts = () => {
    setContacts(DEFAULT_CONTACTS);
  };

  // Preparedness Score calculation (Completion based, NOT risk prediction)
  // Preparation checklist weight: 30%
  // Emergency kit weight: 30%
  // Family plan weight: 20%
  // Simulator safe answers: 20%
  const prepWeight = (prepareProgress / 100) * 30;
  const kitWeight = (kitReadiness / 100) * 30;
  const groupNameStr = typeof familyPlan?.groupName === 'string' ? familyPlan.groupName.trim() : '';
  const primaryLocStr = typeof familyPlan?.primaryLocation === 'string' ? familyPlan.primaryLocation.trim() : '';
  const familyPlanWeight =
    Boolean(familyPlan?.isSaved && groupNameStr.length > 0 && primaryLocStr.length > 0) ? 20 : 0;

  // Simulator score out of 10
  const simWeight = (simulatorState.score / SIMULATOR_SCENARIOS.length) * 20;

  const rawPreparedness = Math.round(prepWeight + kitWeight + familyPlanWeight + simWeight);
  const preparednessScore = Math.min(100, Math.max(0, rawPreparedness));

  let status: 'READY' | 'MODERATE' | 'VULNERABLE' = 'VULNERABLE';
  let label = 'Vulnerable – Needs Immediate Preparation';
  let description =
    'Crucial emergency steps are incomplete. Work through the preparation checklist, kit builder, and family safety plan.';

  if (preparednessScore >= 80) {
    status = 'READY';
    label = 'Ready – Well Prepared for Flood Emergencies';
    description =
      'Outstanding emergency readiness! Your kit is stocked, family plan is locked, and emergency response actions are well understood.';
  } else if (preparednessScore >= 50) {
    status = 'MODERATE';
    label = 'Moderate – Important Steps Remaining';
    description =
      'Good progress made, but critical gaps remain in your kit or family coordination plan. Finish remaining items to achieve full preparedness.';
  }

  const completedItems: string[] = [];
  const missingItems: string[] = [];

  if (kitReadiness >= 80) {
    completedItems.push('Emergency kit prepared');
  } else {
    missingItems.push('Complete emergency kit items (currently ' + kitReadiness + '%)');
  }

  if (familyPlan?.isSaved && groupNameStr.length > 0) {
    completedItems.push('Family safety plan created and saved');
  } else {
    missingItems.push('Create and save family safety plan');
  }

  if (simulatorState.score >= 7) {
    completedItems.push(`Good flood safety knowledge (${simulatorState.score}/10 in simulator)`);
  } else {
    missingItems.push('Complete flood emergency simulator practice');
  }

  if (prepareProgress >= 80) {
    completedItems.push('Preparation checklist completed');
  } else {
    missingItems.push('Complete pre-flood preparation checklist (currently ' + prepareProgress + '%)');
  }

  const setAlertModeActive = (active: boolean) => {
    setAlertModeActiveState(active);
    if (!active && isAlertSoundPlaying()) {
      stopAlertSound(setIsAudioAlertPlaying);
    }
  };

  return (
    <FloodSafeContext.Provider
      value={{
        activeTab,
        setActiveTab,
        alertModeActive,
        setAlertModeActive,
        isAudioAlertPlaying,
        toggleAlertSound,
        stopAudioAlert,
        prepareChecklist,
        togglePrepareItem,
        resetPrepareChecklist,
        prepareProgress,
        kitItems,
        toggleKitItem,
        resetKitItems,
        kitReadiness,
        missingKitItems,
        evacChecklist,
        toggleEvacItem,
        resetEvacChecklist,
        evacProgress,
        recoveryChecklist,
        toggleRecoveryItem,
        resetRecoveryChecklist,
        recoveryProgress,
        simulatorState,
        submitSimulatorAnswer,
        nextSimulatorScenario,
        previousSimulatorScenario,
        jumpToSimulatorScenario,
        resetSimulator,
        familyPlan,
        updateFamilyPlan,
        saveFamilyPlan,
        resetFamilyPlan,
        contacts,
        updateContacts,
        saveContacts,
        resetContacts,
        preparednessScore,
        preparednessRating: { status, label, description },
        preparednessSummary: { completedItems, missingItems },
      }}
    >
      {children}
    </FloodSafeContext.Provider>
  );
};

export const useFloodSafe = (): FloodSafeContextType => {
  const context = useContext(FloodSafeContext);
  if (!context) {
    throw new Error('useFloodSafe must be used within a FloodSafeProvider');
  }
  return context;
};
