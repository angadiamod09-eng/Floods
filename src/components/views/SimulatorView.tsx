import React from 'react';
import { useFloodSafe } from '../../context/FloodSafeContext';
import { SIMULATOR_SCENARIOS } from '../../data/simulatorScenarios';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  X,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export const SimulatorView: React.FC = () => {
  const {
    simulatorState,
    submitSimulatorAnswer,
    nextSimulatorScenario,
    previousSimulatorScenario,
    jumpToSimulatorScenario,
    resetSimulator,
    setActiveTab,
  } = useFloodSafe();

  const safeIndex =
    typeof simulatorState?.currentScenarioIndex === 'number' &&
    simulatorState.currentScenarioIndex >= 0 &&
    simulatorState.currentScenarioIndex < SIMULATOR_SCENARIOS.length
      ? simulatorState.currentScenarioIndex
      : 0;

  const currentScenario = SIMULATOR_SCENARIOS[safeIndex] || SIMULATOR_SCENARIOS[0];
  const userChoice = simulatorState?.userAnswers?.[currentScenario.id];
  const isAnswered = Boolean(userChoice);

  // Stats calculation
  const totalScenarios = SIMULATOR_SCENARIOS.length;
  let correctCount = 0;
  let incorrectCount = 0;
  let answeredCount = 0;

  SIMULATOR_SCENARIOS.forEach((scenario) => {
    const ans = simulatorState?.userAnswers?.[scenario.id];
    if (ans) {
      answeredCount += 1;
      const opt = scenario.options?.find((o) => o.id === ans);
      if (opt?.isSafe) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }
    }
  });

  const selectedOption = isAnswered
    ? currentScenario.options?.find((opt) => opt.id === userChoice)
    : null;

  const isSafeAction = selectedOption?.isSafe ?? false;

  const getKnowledgeAssessment = () => {
    if (answeredCount === 0) return 'Begin the simulation to test your emergency instincts.';
    const ratio = correctCount / answeredCount;
    if (ratio >= 0.9) return 'Excellent flood safety knowledge and critical decision instincts.';
    if (ratio >= 0.7) return 'Good preparedness knowledge. Review unsafe responses for key hazards.';
    return 'Preparation needed. Review floodwater dynamics and follow evacuation guidelines closely.';
  };

  const isLastScenario = simulatorState.currentScenarioIndex === totalScenarios - 1;

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Decision Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Flood Emergency Simulator
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          In sudden floods, seconds dictate survival. Test and sharpen your real-world reactions to 10 high-stakes situations without endangering your safety.
        </p>
      </div>

      {/* Score and Scenario Trackers */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Flood Safety Score
            </div>
            <div className="text-3xl font-black text-white mt-0.5 flex items-baseline gap-2">
              <span className="text-blue-400">{correctCount}</span>
              <span className="text-slate-500 text-xl font-normal">/ {totalScenarios}</span>
              <span className="text-xs text-slate-400 font-mono ml-2">
                ({answeredCount} completed)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{getKnowledgeAssessment()}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetSimulator}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET SIMULATOR</span>
            </button>
          </div>
        </div>

        {/* Progress indicator pips for each scenario */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Scenario {simulatorState.currentScenarioIndex + 1} of {totalScenarios}
            </span>
            <span>
              Safe: <strong className="text-emerald-400">{correctCount}</strong> | Unsafe:{' '}
              <strong className="text-rose-400">{incorrectCount}</strong>
            </span>
          </div>

          <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
            {SIMULATOR_SCENARIOS.map((scenario, index) => {
              const ans = simulatorState.userAnswers[scenario.id];
              const isCurrent = index === simulatorState.currentScenarioIndex;
              let pipStyle = 'bg-slate-800 text-slate-500 border-slate-700';

              if (ans) {
                const opt = scenario.options.find((o) => o.id === ans);
                if (opt?.isSafe) {
                  pipStyle = 'bg-emerald-950 border-emerald-600 text-emerald-300';
                } else {
                  pipStyle = 'bg-rose-950 border-rose-700 text-rose-300';
                }
              }

              if (isCurrent) {
                pipStyle += ' ring-2 ring-blue-400';
              }

              return (
                <button
                  key={scenario.id}
                  onClick={() => jumpToSimulatorScenario(index)}
                  className={`h-9 rounded-lg border text-xs font-bold transition flex items-center justify-center cursor-pointer ${pipStyle}`}
                  title={`Jump to scenario ${index + 1}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Scenario Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        {/* Scenario Header */}
        <div className="space-y-2 border-b border-slate-800 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Scenario #{currentScenario.id}
            </span>
            <span className="text-xs text-slate-500">Select the safest emergency response</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
            &ldquo;{currentScenario.situation}&rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {currentScenario.context}
          </p>
        </div>

        {/* 3 Choices (A, B, C) */}
        <div className="space-y-3">
          {currentScenario.options.map((option) => {
            const isSelected = userChoice === option.id;
            let containerClass =
              'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-200';

            if (isAnswered) {
              if (isSelected) {
                if (option.isSafe) {
                  containerClass = 'bg-emerald-950/60 border-emerald-500 text-white shadow-lg shadow-emerald-950/30';
                } else {
                  containerClass = 'bg-rose-950/60 border-rose-500 text-white shadow-lg shadow-rose-950/30';
                }
              } else if (option.isSafe) {
                // Highlight the safe choice in subtle green so user learns
                containerClass = 'bg-emerald-950/20 border-emerald-800/60 text-emerald-200/80';
              } else {
                containerClass = 'opacity-40 border-slate-800 bg-slate-950/40 text-slate-500';
              }
            }

            return (
              <div
                key={option.id}
                onClick={() => submitSimulatorAnswer(option.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-4 ${containerClass}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border mt-0.5 ${
                    isSelected
                      ? option.isSafe
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                        : 'bg-rose-600 border-rose-400 text-white'
                      : isAnswered && option.isSafe
                      ? 'bg-emerald-900 border-emerald-700 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {isAnswered && isSelected ? (
                    option.isSafe ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <X className="w-4 h-4 stroke-[3]" />
                    )
                  ) : (
                    option.id
                  )}
                </div>

                <div className="flex-1 text-sm sm:text-base leading-relaxed">
                  {option.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Immediate Feedback Box */}
        {isAnswered && selectedOption && (
          <div
            className={`rounded-xl p-5 border animate-fadeIn space-y-2 ${
              isSafeAction
                ? 'bg-emerald-950/80 border-emerald-600 text-emerald-100'
                : 'bg-rose-950/80 border-rose-600 text-rose-100'
            }`}
          >
            <div className="flex items-center gap-2 text-base font-black tracking-wide">
              {isSafeAction ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-emerald-300">✓ SAFE ACTION</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span className="text-rose-300">⚠️ UNSAFE ACTION</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
              {selectedOption.explanation}
            </p>

            {!isSafeAction && (
              <div className="pt-2 text-xs text-amber-200 border-t border-rose-900/60 mt-2">
                <strong>Recommended safe procedure:</strong>{' '}
                {currentScenario.options.find((o) => o.isSafe)?.text}
              </div>
            )}
          </div>
        )}

        {/* Controls Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={previousSimulatorScenario}
            disabled={simulatorState.currentScenarioIndex === 0}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-slate-300 text-xs font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {isLastScenario ? (
            <button
              onClick={() => {
                setActiveTab('score');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide transition shadow-lg shadow-blue-600/20"
            >
              <span>VIEW PREPAREDNESS SCORE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={nextSimulatorScenario}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide transition shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              <span>NEXT SITUATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Completion Summary Card if all answered */}
      {answeredCount === totalScenarios && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Simulator Assessment Completed
              </h3>
              <p className="text-xs text-slate-400">
                Final Score: {correctCount} / {totalScenarios} Safe Decisions
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You have evaluated all 10 emergency scenarios. In real flood disasters, continuous situational awareness and obeying official evacuation warnings are paramount.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                setActiveTab('evacuation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition"
            >
              <span>REVIEW EVACUATION GUIDE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={resetSimulator}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Simulator</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
