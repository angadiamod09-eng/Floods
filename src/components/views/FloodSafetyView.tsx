import React from 'react';
import { useFloodSafe } from '../../context/FloodSafeContext';
import {
  Droplet,
  AlertOctagon,
  Ban,
  ZapOff,
  Car,
  Footprints,
  Baby,
  Skull,
  ShieldAlert,
  ArrowRight,
  Waves,
} from 'lucide-react';

export const FloodSafetyView: React.FC = () => {
  const { setActiveTab } = useFloodSafe();

  const prohibitions = [
    {
      title: 'Walk through fast-moving floodwater.',
      detail: 'Just 6 inches of moving water can sweep a strong adult off their feet. Strong undercurrents drag victims into debris grids or drains.',
      icon: <Footprints className="w-5 h-5 text-rose-400" />,
    },
    {
      title: 'Drive through flooded roads.',
      detail: '12 inches of water will float a small car; 2 feet will carry away SUVs and trucks. Roadbeds wash away unseen beneath murky water.',
      icon: <Car className="w-5 h-5 text-rose-400" />,
    },
    {
      title: 'Touch electrical equipment while standing in water.',
      detail: 'Water conducts electrical current instantly. Touching switches, cords, or submerged appliances can cause fatal electrocution.',
      icon: <ZapOff className="w-5 h-5 text-rose-400" />,
    },
    {
      title: 'Drink potentially contaminated floodwater.',
      detail: 'Floodwater contains untreated sewage, chemical waste, petroleum runoff, and lethal pathogens (leptospirosis, cholera, E. coli).',
      icon: <Skull className="w-5 h-5 text-rose-400" />,
    },
    {
      title: 'Allow children to play in floodwater.',
      detail: 'Children are at high risk of rapid drowning, contact with submerged sharp debris, toxic skin infections, and displaced hazardous wildlife.',
      icon: <Baby className="w-5 h-5 text-rose-400" />,
    },
    {
      title: 'Approach damaged electrical infrastructure.',
      detail: 'Downed power poles and severed lines can energize surrounding standing water, mud, fences, and metal railings for dozens of yards.',
      icon: <AlertOctagon className="w-5 h-5 text-rose-400" />,
    },
  ];

  return (
    <div className="space-y-10 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950 border border-rose-800 text-rose-300 text-xs font-semibold">
          <Droplet className="w-3.5 h-3.5" />
          <span>Hazard Awareness &amp; Lethal Risks</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Floodwater Safety
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Floodwater is not simply rainwater. It is a powerful, contaminated hydraulic hazard that carries catastrophic hidden threats.
        </p>
      </div>

      {/* Prominent Warning Callout */}
      <div className="bg-gradient-to-br from-rose-950/80 via-slate-900 to-slate-950 border-2 border-rose-600 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-600/30">
            <AlertOctagon className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
              PHYSICAL HYDRODYNAMIC DANGER
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              &ldquo;Even shallow moving water can be dangerous.&rdquo;
            </h2>
          </div>
        </div>

        {/* Depth & Force Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="text-lg font-black text-rose-400">6 INCHES (15 cm)</div>
            <div className="text-xs font-semibold text-white">Knocks an Adult Down</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Fast-moving water pushes with hundreds of pounds of lateral force against legs.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="text-lg font-black text-amber-400">12 INCHES (30 cm)</div>
            <div className="text-xs font-semibold text-white">Floats Passenger Cars</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Tires act as flotation devices, lifting the chassis and causing tires to lose all road grip.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-1">
            <div className="text-lg font-black text-teal-400">24 INCHES (60 cm)</div>
            <div className="text-xs font-semibold text-white">Sweeps Trucks &amp; SUVs</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Even heavy commercial 4x4 trucks lose traction and are rolled or swept off bridges.
            </p>
          </div>
        </div>
      </div>

      {/* DO NOT SECTION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-black text-lg tracking-wide uppercase">
          <Ban className="w-6 h-6 stroke-[2.5]" />
          <span>DO NOT UNDER ANY CIRCUMSTANCES:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prohibitions.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:border-rose-900/60 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/80 flex items-center justify-center shrink-0">
                {item.icon}
              </div>

              <div className="space-y-1 flex-1">
                <h3 className="text-base font-bold text-white leading-snug">
                  DO NOT: {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed pt-0.5">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden Contamination Risks */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Waves className="w-5 h-5 text-teal-400" />
          <span>Biological &amp; Chemical Contamination Hazards</span>
        </h3>

        <div className="text-xs text-slate-300 leading-relaxed space-y-2">
          <p>
            Floodwaters inundate sewer lines, agricultural fields, gas stations, and industrial storage. What appears to be clean water is usually saturated with biological pathogens, animal feces, pesticides, and hydrocarbons.
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
            <li>Wash thoroughly with soap and clean bottled water immediately if exposed.</li>
            <li>Cover open wounds with sterile waterproof dressings.</li>
            <li>Consult a medical doctor if you develop fever, vomiting, diarrhea, or open sores.</li>
          </ul>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">Next: Create Your Family Safety Plan</div>
          <div className="text-xs text-slate-400">
            Designate primary meeting points, emergency roles, and medical requirements.
          </div>
        </div>

        <button
          onClick={() => {
            setActiveTab('family');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide transition shadow-md shrink-0 cursor-pointer"
        >
          <span>CREATE FAMILY PLAN</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
