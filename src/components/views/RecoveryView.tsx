import React from 'react';
import { useFloodSafe } from '../../context/FloodSafeContext';
import {
  RotateCcw,
  CheckSquare,
  Square,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Flame,
  Camera,
  HeartHandshake,
} from 'lucide-react';

export const RecoveryView: React.FC = () => {
  const {
    recoveryChecklist,
    toggleRecoveryItem,
    resetRecoveryChecklist,
    recoveryProgress,
    setActiveTab,
  } = useFloodSafe();

  const isCompleted = recoveryProgress === 100;
  const completedCount = recoveryChecklist.filter((i) => i.completed).length;

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Post-Disaster Phase</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          After the Flood
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          The danger is not over when rain stops. In fact, many fatalities occur during recovery from electrocution, building collapses, and toxic exposure.
        </p>
      </div>

      {/* Prominent Safety Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 border-2 border-emerald-600/80 rounded-2xl p-6 sm:p-7 shadow-xl space-y-2">
        <div className="flex items-center gap-2.5 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Fundamental Principle</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          &ldquo;Safety comes before property recovery.&rdquo;
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          Possessions and structures can be rebuilt; lost human life cannot. Never rush into a flooded or damaged structure until certified by official authorities.
        </p>
      </div>

      {/* Progress & Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recovery Safety Protocol
            </div>
            <div className="text-2xl font-black text-white mt-0.5">
              Recovery Protocol: <span className="text-emerald-400">{recoveryProgress}%</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {completedCount} of {recoveryChecklist.length} recovery stages cleared
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetRecoveryChecklist}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Checklist</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
            style={{ width: `${recoveryProgress}%` }}
          />
        </div>

        {isCompleted && (
          <div className="bg-emerald-950/80 border border-emerald-700/80 rounded-xl p-4 flex items-center gap-3 text-emerald-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-sm text-emerald-300">
                Post-flood recovery protocol verified.
              </div>
              <div className="text-xs text-emerald-200/80">
                You have reviewed all safety precautions. Continue to monitor official updates and prioritize thorough sanitization before reoccupying.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">
          Recovery Checklist Steps
        </h2>

        <div className="space-y-2.5">
          {recoveryChecklist.map((item, idx) => {
            const checked = item.completed;
            return (
              <div
                key={item.id}
                onClick={() => toggleRecoveryItem(item.id)}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                  checked
                    ? 'bg-slate-900/60 border-emerald-800/80 text-slate-200'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-emerald-400 focus:outline-none shrink-0"
                  aria-label={`Toggle ${item.label}`}
                >
                  {checked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-500 hover:text-slate-400" />
                  )}
                </button>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                    <span
                      className={`text-sm sm:text-base font-semibold leading-tight ${
                        checked ? 'text-emerald-200 line-through opacity-85' : 'text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  {item.details && (
                    <p className="text-xs text-slate-400 leading-relaxed pr-2">
                      {item.details}
                    </p>
                  )}
                </div>

                {checked && (
                  <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 border border-emerald-800 text-emerald-400">
                    SAFE
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Post-flood Hazards Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Insurance &amp; Aid Documentation</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Photograph and video all watermarks, structural damage, ruined appliances, and discarded items before throwing them out. Keep purchase receipts for recovery materials and hotel stays.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center gap-2 font-bold text-rose-300 text-sm">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>Mold Bloom Prevention</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Toxic black mold can proliferate within 24 to 48 hours in damp drywall and carpets. Open doors and windows, run dehumidifiers, and safely remove porous water-soaked insulation.
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">Next: View Preparedness Score</div>
          <div className="text-xs text-slate-400">
            Check your total household readiness completion score.
          </div>
        </div>

        <button
          onClick={() => {
            setActiveTab('score');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition shadow-md shrink-0 cursor-pointer"
        >
          <span>CHECK PREPAREDNESS SCORE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
