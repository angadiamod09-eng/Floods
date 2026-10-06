import React, { useState } from 'react';
import { useFloodSafe } from '../context/FloodSafeContext';
import { NavigationTab } from '../types';
import {
  ShieldAlert,
  Home,
  CheckSquare,
  Package,
  Compass,
  AlertTriangle,
  MoveRight,
  Droplet,
  Users,
  PhoneCall,
  RotateCcw,
  BarChart3,
  Menu,
  X,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    alertModeActive,
    setAlertModeActive,
    isAudioAlertPlaying,
    stopAudioAlert,
    preparednessScore,
  } = useFloodSafe();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'prepare', label: 'Prepare', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'kit', label: 'Emergency Kit', icon: <Package className="w-4 h-4" /> },
    { id: 'simulator', label: 'Simulator', icon: <Compass className="w-4 h-4" /> },
    { id: 'evacuation', label: 'Evacuation', icon: <MoveRight className="w-4 h-4" /> },
    { id: 'safety', label: 'Flood Safety', icon: <Droplet className="w-4 h-4" /> },
    { id: 'family', label: 'Family Plan', icon: <Users className="w-4 h-4" /> },
    { id: 'contacts', label: 'Contacts', icon: <PhoneCall className="w-4 h-4" /> },
    { id: 'recovery', label: 'Recovery', icon: <RotateCcw className="w-4 h-4" /> },
    { id: 'score', label: 'Score', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      {/* Top Banner if Alert Mode is active */}
      {alertModeActive && (
        <div className="bg-red-600 text-white px-4 py-2 text-xs sm:text-sm font-semibold flex items-center justify-between tracking-wide animate-pulse">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>🚨 FLOOD EMERGENCY MODE IS ACTIVATED — Follow official emergency instructions</span>
          </div>
          <div className="flex items-center gap-2">
            {isAudioAlertPlaying && (
              <button
                onClick={stopAudioAlert}
                className="bg-black/40 hover:bg-black/60 px-2 py-0.5 rounded text-xs flex items-center gap-1 transition"
                title="Stop Test Audio Sound"
              >
                <VolumeX className="w-3.5 h-3.5 text-red-200" />
                <span>Stop Sound</span>
              </button>
            )}
            <button
              onClick={() => handleTabClick('alert')}
              className="underline text-xs hover:text-red-100 font-bold ml-2"
            >
              View Emergency Screen
            </button>
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Subtitle */}
          <div
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white font-mono">
                  FLOOD<span className="text-teal-400">SAFE</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-teal-950 text-teal-300 border border-teal-800 rounded">
                  System v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xs">
                Emergency Response &amp; Preparedness
              </p>
            </div>
          </div>

          {/* Preparedness Score Pill & Emergency Mode Toggle button */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Preparedness Score Widget */}
            <button
              onClick={() => handleTabClick('score')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                preparednessScore >= 80
                  ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60'
                  : preparednessScore >= 50
                  ? 'bg-amber-950/60 border-amber-700/60 text-amber-300 hover:bg-amber-900/60'
                  : 'bg-rose-950/60 border-rose-800/60 text-rose-300 hover:bg-rose-900/60'
              }`}
            >
              <span className="text-slate-400 font-normal">Preparedness:</span>
              <span className="font-bold">{preparednessScore}%</span>
            </button>

            {/* Test sound indicator */}
            {isAudioAlertPlaying && (
              <button
                onClick={stopAudioAlert}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-950/80 border border-red-700 text-red-300 rounded-lg text-xs font-medium hover:bg-red-900"
              >
                <Volume2 className="w-3.5 h-3.5 animate-bounce text-red-400" />
                <span>Stop Test Tone</span>
              </button>
            )}

            {/* Emergency Mode Button */}
            <button
              onClick={() => {
                if (alertModeActive) {
                  handleTabClick('alert');
                } else {
                  setAlertModeActive(true);
                  handleTabClick('alert');
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider transition shadow-sm ${
                alertModeActive
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30 ring-2 ring-red-400'
                  : 'bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/80'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-red-300" />
              <span>{alertModeActive ? 'Active Alert' : 'Emergency Alert'}</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => {
                if (!alertModeActive) setAlertModeActive(true);
                handleTabClick('alert');
              }}
              className="px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded flex items-center gap-1"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Alert</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Nav Tabs */}
        <nav className="hidden lg:flex items-center gap-1 pb-2 border-t border-slate-800/60 pt-2 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => handleTabClick('alert')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap ml-auto transition-colors ${
              activeTab === 'alert'
                ? 'bg-red-600 text-white'
                : 'text-red-300 hover:bg-red-950/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Emergency Mode</span>
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
            <span className="text-xs text-slate-400">FloodSafe Preparedness Navigation</span>
            <div className="text-xs font-bold text-teal-400">Score: {preparednessScore}%</div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left transition ${
                    isActive
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 mt-3">
            <button
              onClick={() => handleTabClick('alert')}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                activeTab === 'alert'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-900/60 text-red-200 border border-red-800'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>🚨 Emergency Alert Mode</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
