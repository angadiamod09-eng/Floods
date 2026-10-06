import React from 'react';
import { useFloodSafe } from '../../context/FloodSafeContext';
import {
  AlertTriangle,
  Volume2,
  VolumeX,
  ShieldAlert,
  CheckSquare,
  Square,
  Package,
  Users,
  MapPin,
  PhoneCall,
  ZapOff,
  Flame,
  ArrowRight,
  LifeBuoy,
  XCircle,
  CheckCircle2,
} from 'lucide-react';

export const AlertModeView: React.FC = () => {
  const {
    alertModeActive,
    setAlertModeActive,
    isAudioAlertPlaying,
    toggleAlertSound,
    stopAudioAlert,
    evacChecklist,
    toggleEvacItem,
    kitItems,
    toggleKitItem,
    familyPlan,
    contacts,
    setActiveTab,
  } = useFloodSafe();

  const packedKitItems = kitItems.filter((i) => i.selected);
  const unpackedKitItems = kitItems.filter((i) => !i.selected);

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Top Controls & Activation Toggle */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                alertModeActive ? 'bg-red-500 animate-ping' : 'bg-slate-600'
              }`}
            />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              System Emergency State: {alertModeActive ? 'ACTIVE ALERT' : 'STANDBY'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Emergency Alert &amp; Rapid Response Mode
          </h1>
          <p className="text-xs text-slate-400">
            High-contrast emergency console consolidating evacuation checks, kit supplies, and family rendezvous.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {alertModeActive ? (
            <button
              onClick={() => setAlertModeActive(false)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition"
            >
              <XCircle className="w-4 h-4 text-slate-400" />
              <span>DEACTIVATE ALERT MODE</span>
            </button>
          ) : (
            <button
              onClick={() => setAlertModeActive(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-red-600/30 transition active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>ACTIVATE ALERT MODE</span>
            </button>
          )}
        </div>
      </div>

      {/* Audio Test Box with Safety Notice */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400">
              <Volume2 className="w-4 h-4" />
              <span>Audible Emergency Alert Simulator</span>
            </div>
            <p className="text-xs text-slate-300">
              Test your device speaker output using synthesized in-browser audio (Web Audio API).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAlertSound}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                isAudioAlertPlaying
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{isAudioAlertPlaying ? 'TEST SOUND ACTIVE' : 'TEST ALERT SOUND'}</span>
            </button>

            {isAudioAlertPlaying && (
              <button
                onClick={stopAudioAlert}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950 border border-red-700 text-red-200 text-xs font-bold hover:bg-red-900 transition"
              >
                <VolumeX className="w-4 h-4" />
                <span>STOP SOUND</span>
              </button>
            )}
          </div>
        </div>

        {/* Explicit Sound Disclaimer */}
        <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-amber-400">Notice:</strong> This sound is an application alert/test feature. It does not claim that a real flood is occurring, nor is it an official government emergency siren.
        </div>
      </div>

      {/* When Alert Mode is Active: Emergency Banner */}
      {alertModeActive ? (
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-2 border-2 border-red-400 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-black/30 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-xs font-mono font-black tracking-widest text-red-200 uppercase">
                CRITICAL PROTOCOL ENGAGED
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                🚨 FLOOD EMERGENCY MODE
              </h2>
            </div>
          </div>
          <p className="text-sm sm:text-base font-semibold text-red-100 pl-1">
            &ldquo;Follow official emergency instructions.&rdquo;
          </p>
          <p className="text-xs text-red-100/90 leading-relaxed pl-1 pt-1">
            Prioritize immediate physical safety. Grab your emergency kit, secure all dependents, stay clear of moving water, and move promptly to high ground or designated shelters.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Alert Mode is Currently Standby</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click &ldquo;ACTIVATE ALERT MODE&rdquo; above to switch into full high-stress emergency response mode.
          </p>
          <button
            onClick={() => setAlertModeActive(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition"
          >
            Activate Alert Mode Now
          </button>
        </div>
      )}

      {/* Grid of Emergency Action Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Quick Evacuation Checklist */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase">
              <CheckSquare className="w-4 h-4" />
              <span>Evacuation Checklist</span>
            </div>
            <button
              onClick={() => setActiveTab('evacuation')}
              className="text-xs text-teal-400 hover:underline flex items-center gap-1"
            >
              Full Guide <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {evacChecklist.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleEvacItem(item.id)}
                className={`p-3 rounded-xl border text-xs flex items-center gap-3 cursor-pointer select-none transition ${
                  item.completed
                    ? 'bg-slate-950/80 border-amber-800/80 text-amber-200'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                {item.completed ? (
                  <CheckSquare className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className={item.completed ? 'line-through opacity-85' : 'font-medium text-white'}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Emergency Kit Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase">
              <Package className="w-4 h-4" />
              <span>Emergency Kit ({packedKitItems.length}/12 Packed)</span>
            </div>
            <button
              onClick={() => setActiveTab('kit')}
              className="text-xs text-teal-400 hover:underline flex items-center gap-1"
            >
              Edit Kit <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Packed Supplies:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {packedKitItems.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">No supplies packed yet</span>
                ) : (
                  packedKitItems.map((item) => (
                    <span
                      key={item.id}
                      className="px-2 py-1 rounded bg-teal-950 border border-teal-800 text-teal-300 text-[11px] font-medium"
                    >
                      ✓ {item.name}
                    </span>
                  ))
                )}
              </div>
            </div>

            {unpackedKitItems.length > 0 && (
              <div>
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5">
                  Missing Supplies ({unpackedKitItems.length}):
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {unpackedKitItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleKitItem(item.id)}
                      className="px-2 py-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 text-[11px] hover:text-white transition"
                      title="Click to mark as packed"
                    >
                      + {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Family Safety Plan Glance */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase">
              <Users className="w-4 h-4" />
              <span>Family Rendezvous &amp; Contact</span>
            </div>
            <button
              onClick={() => setActiveTab('family')}
              className="text-xs text-teal-400 hover:underline flex items-center gap-1"
            >
              Edit Plan <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {familyPlan.isSaved && familyPlan.groupName ? (
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-slate-400 font-bold">PRIMARY MEETING POINT:</div>
                  <div className="font-bold text-white text-sm">{familyPlan.primaryLocation}</div>
                </div>
              </div>

              {familyPlan.backupLocation && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[11px] text-slate-400 font-bold">BACKUP MEETING POINT:</div>
                    <div className="font-medium text-slate-200">{familyPlan.backupLocation}</div>
                  </div>
                </div>
              )}

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] text-slate-400 font-bold">EMERGENCY CONTACT:</div>
                  <div className="font-medium text-white">{familyPlan.emergencyContact}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
              <p>No family safety plan registered.</p>
              <button
                onClick={() => setActiveTab('family')}
                className="text-teal-400 font-bold underline"
              >
                Set meeting locations now &rarr;
              </button>
            </div>
          )}
        </div>

        {/* 4. Critical Safety Directives */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase border-b border-slate-800 pb-3">
            <ZapOff className="w-4 h-4" />
            <span>Immediate Safety Directives</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
              <strong className="text-rose-400">DO NOT DRIVE:</strong> Never drive across roads covered with floodwater. Six inches to 1 foot will disable or sweep away vehicles.
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
              <strong className="text-amber-400">ELECTRICAL HAZARD:</strong> If standing in water, do NOT touch electrical panels or appliances. Evacuate immediately.
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
              <strong className="text-teal-400">VERTICAL SHELTER:</strong> If trapped in rising water, move to top floors with your phone and flashlight. Signal from roof or window.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
