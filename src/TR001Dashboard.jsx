import React, { useState } from 'react';
import { useHoverLock } from './hooks/useHoverLock.js';
import tradeSweepDoc from './data/trade_sweep_v05.json';
import Sheet02 from './Sheet02.jsx';
import Sheet03 from './Sheet03.jsx';
import Sheet04 from './Sheet04.jsx';

const tradeSweepData = tradeSweepDoc.tradeSweep;
const crossSectionData = tradeSweepDoc.crossSection;

// --- SHARED COMPONENTS ---

/** Small uppercase label — used for section eyebrows, state tags, axis labels. */
const Eyebrow = ({ as: As = 'p', className = '', children }) => (
  <As className={`text-[10px] font-bold tracking-widest text-slate-400 uppercase ${className}`}>
    {children}
  </As>
);

const ArrowPath = ({ d, color, dashed = false, isFaded = false, isFlowing = false, onMouseEnter, onMouseLeave, onClick }) => (
  <path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={isFaded ? "1" : "2.5"}
    strokeDasharray={isFlowing ? "10,10" : (dashed ? "5,5" : "none")}
    markerEnd={`url(#arrow-${color.replace('#', '')})`}
    className={`transition-all duration-300 cursor-pointer ${isFlowing ? 'animate-flow' : ''}`}
    opacity={isFaded ? 0.2 : 1}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    style={{ pointerEvents: 'stroke' }}
  />
);

const StraightArrowPath = ({ color }) => (
  <svg width="100%" height="20" preserveAspectRatio="none" aria-hidden="true">
    <line
      x1="0"
      y1="10"
      x2="100%"
      y2="10"
      stroke={color}
      strokeWidth="2.5"
      markerEnd={`url(#arrowhead-${color.replace('#', '')})`}
    />
  </svg>
);

// Shared SVG defs rendered once per dashboard — prevents duplicate marker IDs
// when multiple StraightArrowPaths of the same color render on screen.
const SHARED_ARROW_COLORS = ['#3b82f6', '#ef4444', '#eab308'];
const SvgDefs = () => (
  <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
    <defs>
      {SHARED_ARROW_COLORS.map((color) => (
        <marker
          key={color}
          id={`arrowhead-${color.replace('#', '')}`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
        </marker>
      ))}
    </defs>
  </svg>
);

// --- SHEET 06 COMPONENT ---
const Sheet06 = ({ lockedPath, setLockedPath }) => {
  const { current: currentPath, handleEnter, handleLeave, handleClick } =
    useHoverLock({ locked: lockedPath, setLocked: setLockedPath });

  const getBoxStyle = (pathGroup, baseBorder) => {
    const base = `absolute w-[170px] border-[2px] ${baseBorder} bg-white p-3 z-20 transition-all duration-300 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-800 `;
    if (!currentPath) return base + "opacity-100 scale-100";
    return currentPath === pathGroup
      ? base + `opacity-100 scale-105 ring-4 ring-opacity-20 ${lockedPath === pathGroup ? 'ring-8' : ''}`
      : base + "opacity-40 scale-95";
  };

  const getAlertStyle = (pathGroup) => {
    const base = "absolute border-[2px] border-slate-800 bg-white p-3 z-20 w-56 transition-all duration-300 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-800 ";
    if (!currentPath) return base + "opacity-100 scale-100";
    return currentPath === pathGroup
      ? base + `opacity-100 scale-105 z-30 ring-2 ring-slate-300 ${lockedPath === pathGroup ? 'ring-4' : ''}`
      : base + "opacity-40 scale-95 z-10";
  };

  return (
    <div className="w-full bg-white">
      {/* HEADER */}
      <header className="border-b-[2px] border-slate-800 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl tracking-wide text-slate-800 uppercase">
          TR-001 V0.5 Trade Architecture
        </h1>
        <p className="text-xs md:text-sm tracking-[0.2em] font-semibold text-slate-400 mt-2 uppercase">
          Sheet 06 — Propulsion / Geometry / Climb Rate Doctrine
        </p>
      </header>

      {/* SECTION 1: OPERATING TRADE MATRIX */}
      <section className="border-b-[2px] border-slate-800">
        <div className="p-4 md:p-6 border-b-[2px] border-slate-800 bg-white">
          <Eyebrow>Mission Reframe</Eyebrow>
          <h2 className="text-xl md:text-2xl tracking-wider text-slate-800 uppercase mt-1">Operating Trade Matrix</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-[2px] divide-slate-800 bg-white">
          <div className="p-6 flex flex-col gap-3">
            <div>
              <Eyebrow>STATE A</Eyebrow>
              <h3 className="text-lg tracking-wide text-slate-800 uppercase mt-1">Installed Power Uplift</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Test whether more shaft power closes loaded climb and loaded cruise deficits.
            </p>
            <div className="mt-auto pt-6">
              <div className="border-[2px] border-slate-800 px-3 py-2 inline-block text-sm text-slate-800 bg-white mb-2">
                • baseline cap: 11.2 kW total
              </div>
              <p className="text-sm font-semibold text-slate-500">• trade band: 12.0 / 12.5 / 13.0 kW</p>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-3">
            <div>
              <Eyebrow>STATE B</Eyebrow>
              <h3 className="text-lg tracking-wide text-slate-800 uppercase mt-1">Geometry / Drag Reduction</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Apply cleaner airframe assumptions to the imported OpenVSP drag polar.
            </p>
            <div className="mt-auto pt-6">
              <div className="border-[2px] border-slate-800 px-3 py-2 inline-block text-sm text-slate-800 bg-white mb-2">
                • baseline polar from imported CdA surface
              </div>
              <p className="text-sm font-semibold text-slate-500">• trade band: -5% / -10% / -15% CdA</p>
            </div>
          </div>

          <div className="p-6 flex flex-col gap-3">
            <div>
              <Eyebrow>STATE C</Eyebrow>
              <h3 className="text-lg tracking-wide text-slate-800 uppercase mt-1">Climb-Rate Relief</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Relax vertical segment aggression before changing more hardware than necessary.
            </p>
            <div className="mt-auto pt-6">
              <div className="border-[2px] border-slate-800 px-3 py-2 inline-block text-sm text-slate-800 bg-white mb-2">
                • baseline mission profile held constant elsewhere
              </div>
              <p className="text-sm font-semibold text-slate-500">• trade band: slower departure / lower climb power demand</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PLAN VIEW TRADE DOCTRINE OVERLAY */}
      <section className="border-b-[2px] border-slate-800 flex flex-col lg:flex-row relative bg-white">
        <div className="flex-1 p-6 md:p-8 relative min-h-[550px] lg:border-r-[2px] lg:border-slate-800 overflow-hidden">
          <div className="absolute top-8 right-8 text-[10px] text-slate-400 font-semibold tracking-widest uppercase z-30 pointer-events-none">
            {lockedPath ? '🔒 Path Locked (Click to unlock)' : 'Hover to preview, Click to lock'}
          </div>
          <h3 className="text-2xl tracking-wide text-slate-800 uppercase mb-8 relative z-10">
            Plan View Trade Doctrine Overlay
          </h3>

          <div className="relative w-full h-[450px] max-w-[1000px] mx-auto mt-8">
            <svg viewBox="0 0 1000 450" className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="xMidYMid meet">
              <defs>
                <marker id="arrow-3b82f6" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                </marker>
                <marker id="arrow-ef4444" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                </marker>
                <marker id="arrow-eab308" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#eab308" />
                </marker>
              </defs>

              <line x1="80" y1="300" x2="920" y2="300" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,8" className={`transition-opacity duration-300 ${currentPath ? 'opacity-20' : 'opacity-100'}`} />

              <ArrowPath d="M 80 270 L 160 270" color="#3b82f6" isFaded={currentPath && currentPath !== 'core'} isFlowing={currentPath === 'core'} onMouseEnter={handleEnter('core')} onMouseLeave={handleLeave} onClick={handleClick('core')} />
              <ArrowPath d="M 330 270 L 460 270" color="#3b82f6" isFaded={currentPath && currentPath !== 'core'} isFlowing={currentPath === 'core'} onMouseEnter={handleEnter('core')} onMouseLeave={handleLeave} onClick={handleClick('core')} />
              <ArrowPath d="M 630 270 L 730 270" color="#3b82f6" isFaded={currentPath && currentPath !== 'core'} isFlowing={currentPath === 'core'} onMouseEnter={handleEnter('core')} onMouseLeave={handleLeave} onClick={handleClick('core')} />
              <ArrowPath d="M 900 270 L 980 270" color="#3b82f6" isFaded={currentPath && currentPath !== 'core'} isFlowing={currentPath === 'core'} onMouseEnter={handleEnter('core')} onMouseLeave={handleLeave} onClick={handleClick('core')} />

              <ArrowPath d="M 545 200 C 545 40, 245 40, 245 200" color="#ef4444" dashed={true} isFaded={currentPath && currentPath !== 'drag'} isFlowing={currentPath === 'drag'} onMouseEnter={handleEnter('drag')} onMouseLeave={handleLeave} onClick={handleClick('drag')} />
              <ArrowPath d="M 545 130 L 545 80 L 800 80 L 800 130" color="#ef4444" isFaded={currentPath && currentPath !== 'drag'} isFlowing={currentPath === 'drag'} onMouseEnter={handleEnter('drag')} onMouseLeave={handleLeave} onClick={handleClick('drag')} />

              <ArrowPath d="M 815 350 C 815 450, 545 450, 545 350" color="#eab308" dashed={true} isFaded={currentPath && currentPath !== 'climb'} isFlowing={currentPath === 'climb'} onMouseEnter={handleEnter('climb')} onMouseLeave={handleLeave} onClick={handleClick('climb')} />
              <ArrowPath d="M 815 350 L 815 400 L 245 400 L 245 350" color="#eab308" isFaded={currentPath && currentPath !== 'climb'} isFlowing={currentPath === 'climb'} onMouseEnter={handleEnter('climb')} onMouseLeave={handleLeave} onClick={handleClick('climb')} />
            </svg>

            <div className={`absolute top-[255px] left-0 text-[11px] font-semibold text-slate-500 bg-white pr-2 z-10 transition-opacity ${currentPath && currentPath !== 'core' ? 'opacity-30' : 'opacity-100'}`}>
              baseline rotor...
            </div>
            <div className={`absolute top-[255px] right-0 text-[11px] font-semibold text-slate-500 bg-white pl-2 z-10 transition-opacity ${currentPath && currentPath !== 'core' ? 'opacity-30' : 'opacity-100'}`}>
              report candidate...
            </div>

            <button type="button" aria-pressed={lockedPath === 'core'} aria-label="Sweep A — powertrain cap / core flow path. Toggle highlight." className={getBoxStyle('core', 'border-[#3b82f6] ring-[#3b82f6]') + " left-[16%] top-[200px]"} onMouseEnter={handleEnter('core')} onMouseLeave={handleLeave} onClick={handleClick('core')}>
              <p className="text-[9px] font-bold text-slate-400 tracking-wider">SWEEP A / POWERTRAIN CAP</p>
              <h4 className="font-bold text-sm text-slate-800 leading-tight mt-1">engine power ceiling</h4>
              <div className="mt-8 border-[2px] border-slate-300 p-2 text-[10px] text-center font-semibold text-slate-600 bg-white">FRONT ROTOR<br/>54 in disk</div>
              <div className="absolute -right-6 top-[60px] w-12 h-12 rounded-full border-[2px] border-slate-800 bg-white flex items-center justify-center text-[9px] font-bold text-center leading-tight">mission-<br/>sim</div>
            </button>

            <div className={`absolute left-[34%] top-[260px] w-24 text-center z-10 bg-white p-1 transition-opacity ${currentPath ? 'opacity-30' : 'opacity-100'}`}>
              <p className="text-[9px] font-bold text-slate-400">LOAD / CG BAY</p>
              <p className="text-[10px] mt-1 font-bold text-slate-800">shared mass centerline</p>
            </div>

            <button type="button" aria-pressed={lockedPath === 'drag'} aria-label="Sweep B — airframe drag / CdA reduction path. Toggle highlight." className={getBoxStyle('drag', 'border-[#ef4444] ring-[#ef4444]') + " left-[46%] top-[200px]"} onMouseEnter={handleEnter('drag')} onMouseLeave={handleLeave} onClick={handleClick('drag')}>
              <p className="text-[9px] font-bold text-slate-400 tracking-wider">SWEEP B / AIRFRAME DRAG</p>
              <h4 className="font-bold text-sm text-slate-800 leading-tight mt-1">CdA reduction cases</h4>
              <p className="text-[9px] mt-2 leading-tight font-semibold text-slate-600">geometry cleanup applied to cruise model</p>
              <div className="absolute -right-6 top-[100px] w-12 h-12 rounded-sm border-[2px] border-slate-800 bg-white flex items-center justify-center text-[9px] font-bold text-center leading-tight">mission-<br/>optimize</div>
            </button>

            <button type="button" aria-pressed={lockedPath === 'climb'} aria-label="Sweep C — climb demand / departure severity path. Toggle highlight." className={getBoxStyle('climb', 'border-[#eab308] ring-[#eab308]') + " left-[73%] top-[200px]"} onMouseEnter={handleEnter('climb')} onMouseLeave={handleLeave} onClick={handleClick('climb')}>
              <p className="text-[9px] font-bold text-slate-400 tracking-wider">SWEEP C / CLIMB DEMAND</p>
              <h4 className="font-bold text-sm text-slate-800 leading-tight mt-1">departure severity</h4>
              <div className="mt-6 border-[2px] border-slate-300 p-2 text-[10px] text-center font-semibold text-slate-600 bg-white">REAR ROTOR<br/>54 in disk</div>
            </button>

            <button type="button" aria-pressed={lockedPath === 'drag'} aria-label="Cruise drag adjustment path. Toggle drag highlight." className={`absolute left-[45%] top-[105px] text-[10px] font-bold text-[#ef4444] bg-white px-2 py-1 z-10 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-800 ${currentPath === 'drag' ? 'opacity-100 scale-105 z-30' : currentPath ? 'opacity-30' : 'opacity-100'}`} onMouseEnter={handleEnter('drag')} onMouseLeave={handleLeave} onClick={handleClick('drag')}>
              cruise drag adjustment path
            </button>

            <button type="button" aria-pressed={lockedPath === 'drag'} aria-label="Current cruise deficit: 12.241 kW peak vs 11.2 kW cap. Toggle drag highlight." className={getAlertStyle('drag') + " right-[10%] top-[30px]"} onMouseEnter={handleEnter('drag')} onMouseLeave={handleLeave} onClick={handleClick('drag')}>
              <p className="text-[9px] uppercase font-bold text-slate-400">Current Deficit</p>
              <p className="text-xs font-bold text-slate-800 mt-1">loaded cruise peak: 12.241 kW</p>
              <p className="text-[10px] font-semibold text-slate-500 mt-1">vs 11.2 kW installed cap</p>
            </button>

            <button type="button" aria-pressed={lockedPath === 'climb'} aria-label="Current climb deficit: 11.300 kW peak. Toggle climb highlight." className={getAlertStyle('climb') + " right-[10%] bottom-[30px]"} onMouseEnter={handleEnter('climb')} onMouseLeave={handleLeave} onClick={handleClick('climb')}>
              <p className="text-[9px] uppercase font-bold text-slate-400">Current Deficit</p>
              <p className="text-xs font-bold text-slate-800 mt-1">loaded climb peak: 11.300 kW</p>
              <p className="text-[10px] font-semibold text-slate-500 mt-1">first failure before cruise relief helps</p>
            </button>

          </div>
        </div>

        <div className="w-full lg:w-72 bg-white p-6 flex flex-col gap-6 border-t-[2px] lg:border-t-0 border-slate-800">
          <div className="border-[2px] border-slate-800 bg-white p-4">
            <Eyebrow as="h4" className="mb-4">Machine Architecture</Eyebrow>
            <ul className="flex flex-col gap-2">
              {['BEMT rotor map artifact', 'OpenVSP drag import', 'mission-sim evaluator', 'mission-optimize search'].map((item, i) => (
                <li key={i} className="border-[2px] border-slate-200 p-2 text-[10px] font-semibold text-slate-700 text-center">{item}</li>
              ))}
            </ul>
          </div>

          <div className="border-[2px] border-slate-800 bg-white p-4 mt-auto relative z-20">
            <Eyebrow as="h4" className="mb-4">Legend / Gates</Eyebrow>
            <div className="flex flex-col gap-3 text-[11px] font-semibold text-slate-600" role="group" aria-label="Path highlight toggles">
              <button type="button" aria-pressed={lockedPath === 'core'} className={`flex items-center gap-3 cursor-pointer p-2 -ml-2 transition-colors text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 ${currentPath === 'core' ? 'bg-slate-100 text-slate-900 border-[2px] border-slate-800' : 'hover:bg-slate-50 border-[2px] border-transparent'}`} onMouseEnter={handleEnter('core')} onMouseLeave={handleLeave} onClick={handleClick('core')}>
                <div className="w-8 h-[2px] bg-[#3b82f6]" aria-hidden="true"></div><span>core flow</span>
              </button>
              <button type="button" aria-pressed={lockedPath === 'drag'} className={`flex items-center gap-3 cursor-pointer p-2 -ml-2 transition-colors text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 ${currentPath === 'drag' ? 'bg-slate-100 text-slate-900 border-[2px] border-slate-800' : 'hover:bg-slate-50 border-[2px] border-transparent'}`} onMouseEnter={handleEnter('drag')} onMouseLeave={handleLeave} onClick={handleClick('drag')}>
                <div className="w-8 h-[2px] bg-[#ef4444]" aria-hidden="true"></div><span>drag</span>
              </button>
              <button type="button" aria-pressed={lockedPath === 'climb'} className={`flex items-center gap-3 cursor-pointer p-2 -ml-2 transition-colors text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 ${currentPath === 'climb' ? 'bg-slate-100 text-slate-900 border-[2px] border-slate-800' : 'hover:bg-slate-50 border-[2px] border-transparent'}`} onMouseEnter={handleEnter('climb')} onMouseLeave={handleLeave} onClick={handleClick('climb')}>
                <div className="w-8 h-[2px] bg-[#eab308]" aria-hidden="true"></div><span>climb gate</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STATE TRANSITION LOGIC */}
      <section className="p-6 md:p-8 bg-white relative border-t-[2px] border-slate-800">
        <h3 className="text-2xl tracking-wide text-slate-800 uppercase mb-12">State Transition Logic</h3>
        <div className="relative w-full flex items-center justify-between px-4 md:px-12 mb-8">
          <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 z-0 flex">
             <div className="h-full bg-[#3b82f6] w-[25%] relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-[#3b82f6] border-b-4 border-b-transparent"></div></div>
             <div className="h-full bg-[#ef4444] w-[25%] relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-[#ef4444] border-b-4 border-b-transparent"></div></div>
             <div className="h-full bg-[#eab308] w-[25%] relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-[#eab308] border-b-4 border-b-transparent"></div></div>
             <div className="h-full bg-[#3b82f6] w-[25%] relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-[#3b82f6] border-b-4 border-b-transparent"></div></div>
          </div>
          {[{ top: 'BASELINE', btm: 'current evidence package' }, { top: 'POWER SWEEP', btm: 'can installed cap clear loaded peaks' }, { top: 'DRAG SWEEP', btm: 'can CdA cleanup rescue cruise' }, { top: 'CLIMB SWEEP', btm: 'can departure relief clear takeoff' }, { top: 'TR-001 v0.5', btm: 'publish only if all decision gates pass' }].map((node, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center group cursor-default bg-white px-2">
              <Eyebrow as="div" className="absolute -top-8 whitespace-nowrap">{node.top}</Eyebrow>
              <div className="w-8 h-8 rounded-full border-[2px] border-slate-800 bg-white"></div>
              <div className="absolute -bottom-10 text-[10px] font-semibold text-slate-600 text-center w-32 leading-tight">{node.btm}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- SHEET 07 COMPONENT ---
const Sheet07 = ({ lockedState, setLockedState }) => {
  const { current: currentState, handleEnter, handleLeave, handleClick } =
    useHoverLock({ locked: lockedState, setLocked: setLockedState });

  return (
    <div className="w-full bg-white">
      {/* HEADER */}
      <header className="border-b-[2px] border-slate-800 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl tracking-wide text-slate-800 uppercase">
          TR-001 V0.5 Trade Feasibility Surface
        </h1>
        <p className="text-xs md:text-sm tracking-[0.2em] font-semibold text-slate-400 mt-2 uppercase">
          Sheet 07 — Combined Sweep of Power Cap / Drag Reduction / Climb Rate Relief
        </p>
      </header>

      {/* MATRIX SUMMARIES */}
      <section className="border-b-[2px] border-slate-800">
        <div className="p-4 md:p-6 border-b-[2px] border-slate-800 bg-white">
          <Eyebrow>Generated from outputs/trade_sweep_v05.json</Eyebrow>
          <h2 className="text-xl md:text-2xl tracking-wider text-slate-800 uppercase mt-1">Operating Result Matrix</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-[2px] divide-slate-800 bg-white">
          <div className="p-6 flex flex-col gap-2">
            <Eyebrow>Summary A</Eyebrow>
            <h3 className="text-lg text-slate-800 leading-tight">64 combined trade cases evaluated</h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">Each case optimized over cruise speed and initial fuel load.</p>
          </div>
          <div className="p-6 flex flex-col gap-2">
            <Eyebrow>Summary B</Eyebrow>
            <h3 className="text-lg text-slate-800 leading-tight">60 of 64 cases have at least one feasible optimized mission</h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">The infeasible corner is concentrated in the untouched baseline climb scale.</p>
          </div>
          <div className="p-6 flex flex-col gap-2">
            <Eyebrow>Summary C</Eyebrow>
            <h3 className="text-lg text-slate-800 leading-tight">Best tested case does not require more power</h3>
            <p className="text-sm font-semibold text-slate-500 mt-1">At 11.2 kW, geometry plus climb relief can already close the mission.</p>
          </div>
        </div>
      </section>

      {/* GRID DATA & SIDEBAR */}
      <section className="flex flex-col xl:flex-row border-b-[2px] border-slate-800 bg-white">
        {/* LEFT: Main Matrix Grid */}
        <div className="flex-[1.5] p-6 md:p-8 border-b-[2px] xl:border-b-0 xl:border-r-[2px] border-slate-800 relative">
          <h3 className="text-2xl tracking-wide text-slate-800 uppercase mb-1">Baseline Power Cap Matrix — 11.2 kW Installed</h3>
          <Eyebrow className="mb-8 mt-2">Cell Value = Number of feasible optimized missions out of 70 searched</Eyebrow>

          <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-x-2 gap-y-4 max-w-4xl relative">
            <Eyebrow as="div" className="col-start-2 col-span-4 text-center mb-2">Climb Scale</Eyebrow>
            <Eyebrow as="div" className="col-start-1 text-right pr-4 pt-4">Drag Scale</Eyebrow>
            {tradeSweepData.columns.map(col => (
              <div key={col} className="text-center font-bold text-slate-800">{col}</div>
            ))}
            <div></div>

            {tradeSweepData.rows.map((row) => (
              <React.Fragment key={row.dragScale}>
                <div className="flex items-center justify-end pr-4 font-bold text-slate-800">{row.dragScale}</div>
                {row.cells.map((cell, j) => {
                  const isBlocked = cell.status === 'blocked';
                  const isFaded = currentState && currentState !== cell.status;
                  const climbScale = tradeSweepData.columns[j];
                  return (
                    <button
                      type="button"
                      key={j}
                      aria-pressed={lockedState === cell.status}
                      aria-label={`Drag scale ${row.dragScale}, climb scale ${climbScale}: ${cell.count} feasible missions of 70, peak ${cell.peak} kW, status ${cell.status}. Toggle ${cell.status} highlight.`}
                      className={`p-4 border-[2px] flex flex-col items-center justify-center transition-all duration-300 bg-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-800
                        ${isBlocked ? 'border-[#ef4444]' : 'border-[#3b82f6]'}
                        ${isFaded ? 'opacity-30 scale-95' : 'opacity-100 hover:scale-105 hover:shadow-lg'}`}
                      onMouseEnter={handleEnter(cell.status)}
                      onMouseLeave={handleLeave}
                      onClick={handleClick(cell.status)}
                    >
                      <div className={`text-3xl font-light ${isBlocked ? 'text-slate-800' : 'text-slate-900'}`}>{cell.count}</div>
                      <div className="text-[10px] font-bold text-slate-500 mt-1 whitespace-nowrap">peak {cell.peak} kW</div>
                    </button>
                  );
                })}
                <div className={`flex items-end ${row.annotation?.type === 'best' ? 'pb-4 pl-4' : 'pl-4 items-center'} relative w-48 xl:w-64`}>
                   {row.annotation && (
                     <div className={`text-xs leading-tight transition-all duration-300 ${currentState && currentState !== row.annotation.type ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`} style={{ color: row.annotation.color }}>
                        <span className="font-bold block text-[10px] uppercase mb-1">{row.annotation.title}</span>
                        <div className="flex items-center gap-2">
                           <div className="w-8 shrink-0"><StraightArrowPath color={row.annotation.color} /></div>
                           <span className="font-semibold text-slate-600">{row.annotation.text}</span>
                        </div>
                     </div>
                   )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* RIGHT: Insights Sidebar */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-6 md:p-8">
            <h3 className="text-xl tracking-wide text-slate-800 uppercase">Power Cap Cross-Section</h3>
            <Eyebrow className="mb-8 mt-2">Count of feasible drag/climb cells out of 16 total</Eyebrow>
            <div className="flex justify-between max-w-sm mx-auto px-4">
              {crossSectionData.map((data, i) => {
                const isBlocked = data.status === 'blocked';
                const isFaded = currentState && currentState !== data.status;
                return (
                  <button
                    type="button"
                    key={i}
                    aria-pressed={lockedState === data.status}
                    aria-label={`${data.kw} kW installed power: ${data.fraction} cells feasible. Toggle ${data.status} highlight.`}
                    className={`flex flex-col items-center transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-800 ${isFaded ? 'opacity-30 scale-95' : 'opacity-100'}`}
                    onMouseEnter={handleEnter(data.status)}
                    onMouseLeave={handleLeave}
                    onClick={handleClick(data.status)}
                  >
                    <div className={`w-16 h-24 border-[2px] flex items-end justify-center pb-2 relative overflow-hidden bg-white ${isBlocked ? 'border-[#ef4444]' : 'border-[#3b82f6]'}`}>
                       <div className={`absolute bottom-0 left-0 w-full transition-all duration-700 ${isBlocked ? 'bg-red-100' : 'bg-blue-100'}`} style={{ height: `${data.fillPercentage}%` }} aria-hidden="true"></div>
                    </div>
                    <div className="mt-2 text-sm font-bold text-slate-800">{data.fraction}</div>
                    <div className="text-[10px] font-semibold text-slate-500">{data.kw} kW</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STATE TRANSITION FOOTER */}
      <section className="p-6 md:p-8 bg-white relative overflow-hidden">
        <h3 className="text-2xl tracking-wide text-slate-800 uppercase mb-12">State Transition Logic</h3>
        <div className="relative max-w-5xl mx-auto flex items-center justify-between pb-12 pt-4 px-4 md:px-12">
           <div className="absolute top-8 left-[10%] w-[25%] -z-10 px-6">
              <div className="relative text-center mb-2 text-[10px] font-bold text-slate-500">first unlock</div>
              <StraightArrowPath color="#ef4444" />
           </div>
           <div className="absolute top-8 left-[38%] w-[25%] -z-10 px-6">
              <div className="relative text-center mb-2 text-[10px] font-bold text-slate-500">expands margin</div>
              <StraightArrowPath color="#eab308" />
           </div>
           <div className="absolute top-8 right-[10%] w-[25%] -z-10 px-6">
              <div className="relative text-center mb-2 text-[10px] font-bold text-slate-500">clears all tested cells</div>
              <StraightArrowPath color="#3b82f6" />
           </div>

           <button type="button" aria-pressed={lockedState === 'blocked'} aria-label="Baseline — blocked corner. Toggle blocked highlight." className={`flex flex-col items-center z-10 w-24 cursor-pointer transition-all bg-white px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-800 ${currentState === 'blocked' ? 'scale-110 font-bold' : 'hover:scale-105'}`} onMouseEnter={handleEnter('blocked')} onMouseLeave={handleLeave} onClick={handleClick('blocked')}>
              <Eyebrow as="div" className="mb-2">Baseline</Eyebrow>
              <div className={`w-8 h-8 rounded-full border-[2px] border-slate-800 bg-white ${currentState === 'blocked' ? 'ring-4 ring-red-200' : ''}`} aria-hidden="true"></div>
              <div className="text-[10px] font-semibold text-slate-600 text-center mt-2 leading-tight">blocked corner</div>
           </button>

           <button type="button" aria-pressed={lockedState === 'feasible'} aria-label="Climb relief — first unlock. Toggle feasible highlight." className={`flex flex-col items-center z-10 w-24 cursor-pointer transition-all bg-white px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-800 ${currentState === 'feasible' ? 'scale-110 font-bold' : 'hover:scale-105'}`} onMouseEnter={handleEnter('feasible')} onMouseLeave={handleLeave} onClick={handleClick('feasible')}>
              <Eyebrow as="div" className="mb-2">Climb Relief</Eyebrow>
              <div className={`w-8 h-8 rounded-full border-[2px] border-slate-800 bg-white ${currentState === 'feasible' ? 'ring-4 ring-blue-200' : ''}`} aria-hidden="true"></div>
              <div className="text-[10px] font-semibold text-slate-600 text-center mt-2 leading-tight">first unlock</div>
           </button>

           <div className={`flex flex-col items-center z-10 w-24 bg-white px-2 transition-opacity ${currentState && currentState !== 'feasible' ? 'opacity-30' : 'opacity-100'}`}>
              <Eyebrow as="div" className="mb-2">Drag Cleanup</Eyebrow>
              <div className="w-8 h-8 rounded-full border-[2px] border-slate-800 bg-white"></div>
           </div>
           <div className="flex flex-col items-center z-10 w-24 bg-white px-2">
              <Eyebrow as="div" className="mb-2">Power Uplift</Eyebrow>
              <div className="w-8 h-8 rounded-full border-[2px] border-slate-800 bg-white"></div>
           </div>
        </div>
      </section>
    </div>
  );
};

// --- MAIN DASHBOARD ---
export default function TR001Dashboard() {
  const [activeSheet, setActiveSheet] = useState('02');
  const [lockedPath, setLockedPath] = useState(null);
  const [lockedState, setLockedState] = useState(null);
  const [lockedNode, setLockedNode] = useState(null);
  const [lockedZone02, setLockedZone02] = useState(null);
  const [lockedZone03, setLockedZone03] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      <SvgDefs />

      {/* DASHBOARD NAVIGATION */}
      <nav className="w-full max-w-[1400px] mb-6 flex justify-between items-center bg-white border-[2px] border-slate-800 shadow-sm">
        <div className="px-6 py-4 bg-slate-800 text-white font-bold tracking-wider uppercase text-sm">
          TR-001 Unified Dashboard
        </div>
        <div className="flex text-sm font-bold">
          <button
            onClick={() => setActiveSheet('02')}
            className={`px-8 py-4 transition-colors uppercase tracking-widest border-l-[2px] border-slate-800
              ${activeSheet === '02' ? 'bg-slate-100 text-slate-900 border-b-4 border-b-slate-800' : 'bg-white text-slate-400 hover:bg-slate-50 border-b-4 border-b-transparent'}
            `}
          >
            Sheet 02: Deck Ops
          </button>
          <button
            onClick={() => setActiveSheet('03')}
            className={`px-8 py-4 transition-colors uppercase tracking-widest border-l-[2px] border-slate-800
              ${activeSheet === '03' ? 'bg-slate-100 text-slate-900 border-b-4 border-b-slate-800' : 'bg-white text-slate-400 hover:bg-slate-50 border-b-4 border-b-transparent'}
            `}
          >
            Sheet 03: Below-Deck
          </button>
          <button
            onClick={() => setActiveSheet('04')}
            className={`px-8 py-4 transition-colors uppercase tracking-widest border-l-[2px] border-slate-800
              ${activeSheet === '04' ? 'bg-slate-100 text-slate-900 border-b-4 border-b-slate-800' : 'bg-white text-slate-400 hover:bg-slate-50 border-b-4 border-b-transparent'}
            `}
          >
            Sheet 04: Sortie
          </button>
          <button
            onClick={() => setActiveSheet('06')}
            className={`px-8 py-4 transition-colors uppercase tracking-widest border-l-[2px] border-slate-800
              ${activeSheet === '06' ? 'bg-slate-100 text-slate-900 border-b-4 border-b-slate-800' : 'bg-white text-slate-400 hover:bg-slate-50 border-b-4 border-b-transparent'}
            `}
          >
            Sheet 06: Architecture
          </button>
          <button
            onClick={() => setActiveSheet('07')}
            className={`px-8 py-4 transition-colors uppercase tracking-widest border-l-[2px] border-slate-800
              ${activeSheet === '07' ? 'bg-slate-100 text-slate-900 border-b-4 border-b-slate-800' : 'bg-white text-slate-400 hover:bg-slate-50 border-b-4 border-b-transparent'}
            `}
          >
            Sheet 07: Feasibility
          </button>
        </div>
      </nav>

      {/* RENDER ACTIVE SHEET */}
      <div className="w-full max-w-[1400px] border-[2px] border-slate-800 bg-white transition-all duration-500 shadow-md">
        {activeSheet === '02' && (
          <Sheet02 lockedZone={lockedZone02} setLockedZone={setLockedZone02} />
        )}
        {activeSheet === '03' && (
          <Sheet03 lockedZone={lockedZone03} setLockedZone={setLockedZone03} />
        )}
        {activeSheet === '04' && (
          <Sheet04 lockedNode={lockedNode} setLockedNode={setLockedNode} />
        )}
        {activeSheet === '06' && (
          <Sheet06 lockedPath={lockedPath} setLockedPath={setLockedPath} />
        )}
        {activeSheet === '07' && (
          <Sheet07 lockedState={lockedState} setLockedState={setLockedState} />
        )}
      </div>
    </div>
  );
}
