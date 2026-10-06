import React, { useRef } from 'react';
import { useFloodSafe } from '../../context/FloodSafeContext';
import {
  MoveRight,
  CheckSquare,
  Square,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  MapPin,
  LifeBuoy,
} from 'lucide-react';

export const EvacuationView: React.FC = () => {
  const {
    evacChecklist,
    toggleEvacItem,
    resetEvacChecklist,
    evacProgress,
    setActiveTab,
  } = useFloodSafe();

  const checklistRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: 1,
      title: 'Stay calm.',
      detail: 'Panic leads to poor judgment. Take steady breaths and coordinate calmly with everyone in your home or vicinity.',
    },
    {
      num: 2,
      title: 'Follow official evacuation instructions.',
      detail: 'Tune to official emergency alerts, civil defense radios, or local authority directives. Evacuate immediately when ordered.',
    },
    {
      num: 3,
      title: 'Take essential medicines and emergency supplies.',
      detail: 'Grab your pre-packed go-bag, daily prescriptions, essential insulin/inhalers, phone chargers, and vital identification.',
    },
    {
      num: 4,
      title: 'Switch off electricity/gas only if it is safe and authorities advise it.',
      detail: 'If main switches are dry and accessible, shut down electrical breakers and the main gas shutoff valve. Never step in standing water to reach switches.',
    },
    {
      num: 5,
      title: 'Move toward the designated safer/high-ground area.',
      detail: 'Take officially designated evacuation corridors. Avoid floodplains, low underpasses, river banks, and wash zones.',
    },
    {
      num: 6,
      title: 'Stay away from flowing floodwater.',
      detail: 'Never walk or drive through moving water. Just 6 inches can sweep an adult off their feet; 12 inches can float a vehicle.',
    },
    {
      num: 7,
      title: 'Do not return until authorities say it is safe.',
      detail: 'Flash flooding can crest multiple times. Floodwater may undermine roadbeds, bridges, and building foundations long after rain stops.',
    },
  ];

  const scrollToChecklist = () => {
    checklistRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isCompleted = evacProgress === 100;
  const completedCount = evacChecklist.filter((i) => i.completed).length;

  return (
    <div className="space-y-10 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-300 text-xs font-semibold">
          <MoveRight className="w-3.5 h-3.5" />
          <span>Evacuation Action Protocol</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Evacuation Guide
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          When emergency orders are announced or waters begin rising, follow these 7 chronological steps to evacuate smoothly, safely, and without delay.
        </p>

        <div className="pt-2">
          <button
            onClick={scrollToChecklist}
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider transition shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            <span>START EVACUATION CHECKLIST</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7 Sequence Steps */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          The 7 Life-Saving Evacuation Steps
        </h2>

        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-start gap-4 hover:border-slate-700 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400 font-black text-base shrink-0">
                {step.num}
              </div>

              <div className="space-y-1 flex-1">
                <div className="text-xs uppercase font-mono font-bold text-amber-400">
                  STEP {step.num}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-0.5">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Evacuation Checklist Card */}
      <div
        ref={checklistRef}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Immediate Departure Verification
            </div>
            <h3 className="text-2xl font-black text-white mt-0.5">
              Evacuation Checklist
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {completedCount} of {evacChecklist.length} departure checks cleared ({evacProgress}%)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetEvacChecklist}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Checklist</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
            style={{ width: `${evacProgress}%` }}
          />
        </div>

        {isCompleted && (
          <div className="bg-emerald-950/80 border border-emerald-700/80 rounded-xl p-4 flex items-center gap-3 text-emerald-200">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-sm text-emerald-300">
                Evacuation readiness confirmed.
              </div>
              <div className="text-xs text-emerald-200/80">
                All critical survival gear and family accountability steps are completed. Proceed toward designated high ground immediately.
              </div>
            </div>
          </div>
        )}

        {/* 7 Checklist items */}
        <div className="space-y-2.5 pt-2">
          {evacChecklist.map((item, idx) => {
            const isChecked = item.completed;
            return (
              <div
                key={item.id}
                onClick={() => toggleEvacItem(item.id)}
                className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'bg-slate-900/60 border-amber-700/60 text-slate-200'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-amber-400 focus:outline-none shrink-0"
                  aria-label={`Toggle ${item.label}`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                  )}
                </button>

                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                    <span
                      className={`text-sm sm:text-base font-semibold leading-tight ${
                        isChecked ? 'text-amber-200 line-through opacity-85' : 'text-white'
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

                {isChecked && (
                  <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 border border-amber-800 text-amber-400">
                    VERIFIED
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety Highlight */}
      <div className="bg-red-950/40 border border-red-800/60 rounded-2xl p-6 flex items-start gap-4 text-red-200">
        <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-sm font-bold text-red-300 uppercase tracking-wide">
            Turn Around, Don't Drown — Severe Road Hazard
          </div>
          <p className="text-xs sm:text-sm text-red-200/90 leading-relaxed">
            Over 50% of all flood-related drownings occur when a vehicle is driven into hazardous floodwater. Roads beneath floodwaters frequently collapse or wash out unseen. If you encounter water on a road, turn around and find an alternate high route.
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">Next: Floodwater Safety Rules</div>
          <div className="text-xs text-slate-400">
            Learn the physical forces, contamination risks, and electrical hazards of moving water.
          </div>
        </div>

        <button
          onClick={() => {
            setActiveTab('safety');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition shadow-md shrink-0 cursor-pointer"
        >
          <span>VIEW FLOODWATER SAFETY</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
