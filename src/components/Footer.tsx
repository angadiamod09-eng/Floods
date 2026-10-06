import React from 'react';
import { useFloodSafe } from '../context/FloodSafeContext';
import { ShieldAlert, AlertTriangle, LifeBuoy, HeartPulse, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useFloodSafe();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Main Disclaimer Banner */}
        <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-4 sm:p-5 flex items-start gap-3 text-amber-200/90">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-300 text-sm tracking-wide uppercase">
              Emergency Safety Disclaimer
            </h4>
            <p className="text-xs leading-relaxed text-amber-200/80">
              This application is an educational preparedness and decision-support tool. It is not an official emergency warning system. During an actual emergency, follow instructions from local authorities and official emergency services.
            </p>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="font-black text-lg text-white font-mono tracking-tight">
                FLOOD<span className="text-teal-400">SAFE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Flood Emergency Response &amp; Preparedness System. Practical decision support for before, during, and after severe flooding.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-teal-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              <span>Offline-First • No Tracking • Local Storage</span>
            </div>
          </div>

          {/* Core Response Steps */}
          <div className="space-y-2">
            <h5 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Emergency Action Steps
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => { setActiveTab('prepare'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition"
                >
                  1. Prepare Before Flood
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('kit'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition"
                >
                  2. Assemble Emergency Kit
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('simulator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition"
                >
                  3. Response Decision Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('evacuation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition"
                >
                  4. Safe Evacuation Protocol
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('recovery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition"
                >
                  5. Safe Post-Flood Recovery
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Tools */}
          <div className="space-y-2">
            <h5 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Family &amp; Response Tools
            </h5>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => { setActiveTab('family'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition"
                >
                  Family Safety Plan
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('contacts'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition"
                >
                  Emergency Contacts Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('safety'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition"
                >
                  Floodwater Hazard Rules
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('score'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-teal-400 transition"
                >
                  Preparedness Completion Score
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('alert'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-red-400 font-medium transition"
                >
                  🚨 Emergency Mode Console
                </button>
              </li>
            </ul>
          </div>

          {/* Golden Rules */}
          <div className="space-y-2">
            <h5 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Critical Life-Saving Rules
            </h5>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg space-y-2 text-[11px] leading-relaxed text-slate-300">
              <div className="flex items-start gap-1.5">
                <LifeBuoy className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span><strong>Turn Around, Don't Drown:</strong> 12 inches of water can sweep away a car.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Stay Out of Moving Water:</strong> 6 inches of fast flow will knock you down.</span>
              </div>
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                Always prioritize human life over property preservation.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Status */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            FLOODSAFE System • Built for practical flood emergency response and preparedness.
          </div>
          <div className="text-slate-400">
            No accounts required • Clean client-side operation
          </div>
        </div>
      </div>
    </footer>
  );
};
