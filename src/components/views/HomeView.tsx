import React from 'react';
import { useFloodSafe } from '../../context/FloodSafeContext';
import {
  ShieldAlert,
  ArrowRight,
  Package,
  Compass,
  MoveRight,
  RotateCcw,
  AlertTriangle,
  Users,
  CheckCircle2,
  Droplets,
  PhoneCall,
  Flame,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    setActiveTab,
    prepareProgress,
    kitReadiness,
    simulatorState,
    familyPlan,
    preparednessScore,
    setAlertModeActive,
  } = useFloodSafe();

  const handleStartGuide = () => {
    setActiveTab('prepare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-semibold tracking-wide">
            <Droplets className="w-3.5 h-3.5 text-teal-400" />
            <span>Emergency Decision-Support &amp; Preparedness Platform</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              FLOOD<span className="text-teal-400">SAFE</span>
            </h1>
            <p className="text-lg sm:text-2xl text-slate-300 font-medium">
              Flood Emergency Response &amp; Preparedness System
            </p>
          </div>

          <blockquote className="text-slate-300 text-base sm:text-xl font-normal border-l-4 border-teal-500 pl-4 italic">
            &ldquo;Prepare early. Stay informed. Act safely.&rdquo;
          </blockquote>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            A practical, actionable emergency management tool. Master life-saving decisions before water arrives, respond correctly when conditions deteriorate, evacuate safely, and protect your family during and after the flood.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={handleStartGuide}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm sm:text-base tracking-wide transition shadow-lg shadow-teal-500/20 active:scale-95 cursor-pointer"
            >
              <span>START FLOOD SAFETY GUIDE</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                setAlertModeActive(true);
                setActiveTab('alert');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200 font-bold text-sm tracking-wide transition active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>ACTIVE FLOOD EMERGENCY</span>
            </button>
          </div>
        </div>
      </section>

      {/* Four Primary Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase font-bold tracking-widest text-slate-400">
            Core Response Phases
          </h2>
          <span className="text-xs text-teal-400 font-medium">Click any card to start</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. PREPARE */}
          <div
            onClick={() => {
              setActiveTab('prepare');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-6 transition-all duration-200 shadow-md hover:shadow-teal-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-950 border border-teal-800/80 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-400">Phase 1</div>
                <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition">
                  PREPARE
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Prepare your home and emergency kit.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Checklist: <strong className="text-teal-400">{prepareProgress}%</strong>
              </span>
              <span className="inline-flex items-center gap-1 text-teal-400 font-semibold group-hover:translate-x-1 transition-transform">
                Open <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 2. RESPOND */}
          <div
            onClick={() => {
              setActiveTab('simulator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-200 shadow-md hover:shadow-blue-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800/80 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-400">Phase 2</div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition">
                  RESPOND
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Know what to do when flooding begins.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Simulator: <strong className="text-blue-400">{simulatorState.score}/10 safe</strong>
              </span>
              <span className="inline-flex items-center gap-1 text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                Simulate <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 3. EVACUATE */}
          <div
            onClick={() => {
              setActiveTab('evacuation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-200 shadow-md hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-800/80 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <MoveRight className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Phase 3</div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                  EVACUATE
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Follow safe evacuation steps.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Protocol: <strong className="text-amber-400">7 Life Steps</strong>
              </span>
              <span className="inline-flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                Guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 4. RECOVER */}
          <div
            onClick={() => {
              setActiveTab('recovery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-200 shadow-md hover:shadow-emerald-500/10 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Phase 4</div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition">
                  RECOVER
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Take safe steps after floodwater recedes.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Safety First: <strong className="text-emerald-400">Post-Flood</strong>
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                Inspect <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Preparedness Status Dashboard Snapshot */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-teal-400" />
              Your Preparedness Snapshot
            </h3>
            <p className="text-xs text-slate-400">
              Tracks your family plan, emergency kit readiness, pre-flood checklist, and response knowledge.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('score');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold border border-slate-700 transition"
          >
            <span>View Score Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress Bar & Badges */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Overall Preparedness Completion</span>
            <span className="font-bold text-white font-mono text-sm">{preparednessScore}%</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
            <div
              className={`h-full transition-all duration-500 ${
                preparednessScore >= 80
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-400'
                  : preparednessScore >= 50
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                  : 'bg-gradient-to-r from-rose-500 to-red-400'
              }`}
              style={{ width: `${preparednessScore}%` }}
            />
          </div>
        </div>

        {/* 4 Mini Cards Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div
            onClick={() => setActiveTab('prepare')}
            className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 cursor-pointer hover:border-slate-700 transition"
          >
            <div className="text-[11px] text-slate-400">Pre-Flood Checklist</div>
            <div className="text-sm font-bold text-white mt-1 flex items-center justify-between">
              <span>{prepareProgress}%</span>
              {prepareProgress === 100 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <span className="text-[10px] text-slate-500">Incomplete</span>
              )}
            </div>
          </div>

          <div
            onClick={() => setActiveTab('kit')}
            className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 cursor-pointer hover:border-slate-700 transition"
          >
            <div className="text-[11px] text-slate-400">Emergency Kit</div>
            <div className="text-sm font-bold text-white mt-1 flex items-center justify-between">
              <span>{kitReadiness}%</span>
              {kitReadiness === 100 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <span className="text-[10px] text-slate-500">12 Items</span>
              )}
            </div>
          </div>

          <div
            onClick={() => setActiveTab('simulator')}
            className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 cursor-pointer hover:border-slate-700 transition"
          >
            <div className="text-[11px] text-slate-400">Response Simulator</div>
            <div className="text-sm font-bold text-white mt-1 flex items-center justify-between">
              <span>{simulatorState.score}/10 Safe</span>
              <span className="text-[10px] text-blue-400">10 Scenarios</span>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('family')}
            className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 cursor-pointer hover:border-slate-700 transition"
          >
            <div className="text-[11px] text-slate-400">Family Safety Plan</div>
            <div className="text-sm font-bold text-white mt-1 flex items-center justify-between">
              <span>{familyPlan.isSaved ? 'Configured' : 'Not Saved'}</span>
              {familyPlan.isSaved ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Users className="w-4 h-4 text-amber-400" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Critical Rules Quick Bar */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400" />
          The Golden Rules of Flood Safety
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="font-bold text-amber-300">Turn Around, Don't Drown</div>
            <p className="text-slate-400 leading-relaxed">
              Never drive into water across a roadway. Most flood fatalities occur when cars are stalled or swept away in what looks like shallow water.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="font-bold text-rose-300">Keep Clear of Swift Water</div>
            <p className="text-slate-400 leading-relaxed">
              6 inches of fast-flowing water can knock you off your feet. Murky water conceals missing manhole covers, live power lines, and debris.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="font-bold text-teal-300">Vertical Evacuation</div>
            <p className="text-slate-400 leading-relaxed">
              If trapped in a structure with rapid inflow, immediately climb to upper floors with your phone, whistle, and flashlight. Avoid closed attics without roof exits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
