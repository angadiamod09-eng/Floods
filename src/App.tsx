/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FloodSafeProvider, useFloodSafe } from './context/FloodSafeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/views/HomeView';
import { PrepareView } from './components/views/PrepareView';
import { EmergencyKitView } from './components/views/EmergencyKitView';
import { SimulatorView } from './components/views/SimulatorView';
import { EvacuationView } from './components/views/EvacuationView';
import { FloodSafetyView } from './components/views/FloodSafetyView';
import { FamilyPlanView } from './components/views/FamilyPlanView';
import { EmergencyContactsView } from './components/views/EmergencyContactsView';
import { RecoveryView } from './components/views/RecoveryView';
import { PreparednessScoreView } from './components/views/PreparednessScoreView';
import { AlertModeView } from './components/views/AlertModeView';
import { ErrorBoundary } from './components/ErrorBoundary';

const MainContent: React.FC = () => {
  const { activeTab } = useFloodSafe();

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'prepare':
        return <PrepareView />;
      case 'kit':
        return <EmergencyKitView />;
      case 'simulator':
        return <SimulatorView />;
      case 'evacuation':
        return <EvacuationView />;
      case 'safety':
        return <FloodSafetyView />;
      case 'family':
        return <FamilyPlanView />;
      case 'contacts':
        return <EmergencyContactsView />;
      case 'recovery':
        return <RecoveryView />;
      case 'score':
        return <PreparednessScoreView />;
      case 'alert':
        return <AlertModeView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderView()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <FloodSafeProvider>
        <MainContent />
      </FloodSafeProvider>
    </ErrorBoundary>
  );
}
