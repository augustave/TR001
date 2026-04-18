import React from 'react';
import { useHoverLock } from './hooks/useHoverLock.js';
import sheet02Doc from './data/sheet02_ops.json';
import { DoctrineHeader, DoctrineSectionHeader } from './components/Doctrine.jsx';

const deckOperations = sheet02Doc.deckOperations;
const turnaroundSteps = sheet02Doc.turnaroundSteps;

const SectionHeader = ({ subtitle, title }) => (
  <DoctrineSectionHeader eyebrow={subtitle} title={title} />
);

export default function Sheet02({ lockedZone, setLockedZone }) {
  const { current: activeZone, handleEnter, handleLeave, handleClick } =
    useHoverLock({ locked: lockedZone, setLocked: setLockedZone });

  return (
    <div className="w-full bg-[#F4F4EE] flex flex-col">
      <DoctrineHeader
        title="TR-001 Sea Carrier · Sheet 02"
        subtitle="Deck operations + service flow · drone-first maritime node"
        chipLeft="SHEET 02 · DECK OPS"
        chipRight="REV A · NOT TO SCALE"
      />

      {/* TOP SECTION: TOP-DOWN DECK PLAN & LEGEND */}
      <div className="flex flex-col lg:flex-row border-b border-[#1A1A1A] bg-white">

        {/* Left: Top-Down Diagram */}
        <div className="flex-[2.5] border-b lg:border-b-0 lg:border-r border-[#1A1A1A] relative min-h-[500px] flex flex-col">
          <SectionHeader subtitle="Zonal Architecture" title="Primary Deck Operations" />

          <div className="relative flex-1 w-full p-8 flex justify-center items-center">
            <svg viewBox="0 0 800 500" className="w-full h-full max-h-[450px]" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <defs>
                <marker id="s02-arrow-red-start" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 10 0 L 0 5 L 10 10 z" fill="#C0392B" />
                </marker>
                <marker id="s02-arrow-red-end" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#C0392B" />
                </marker>
              </defs>

              {/* Faceted Teardrop Hull Base */}
              <path d="M 100 250 L 300 80 L 600 80 L 700 200 L 700 300 L 600 420 L 300 420 Z" stroke="#1A1A1A" strokeWidth="3" fill="none" />
              <path d="M 150 250 L 320 120 L 570 120 L 640 210 L 640 290 L 570 380 L 320 380 Z" stroke="#1A1A1A" strokeWidth="2" fill="none" />
              <path d="M 200 250 L 350 160 L 530 160 L 580 230 L 580 270 L 530 340 L 350 340 Z" stroke="#1A1A1A" strokeWidth="2" fill="none" />

              {/* Centerline */}
              <line x1="80" y1="250" x2="720" y2="250" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,8" />

              {/* Interactive Highlight Regions */}
              <g className="transition-opacity duration-300">
                <circle cx="600" cy="250" r="90" fill="#2B5E9D" className={`transition-opacity duration-300 ${activeZone === 1 ? 'opacity-20' : 'opacity-0'}`} />
                <rect x="350" y="180" width="40" height="140" fill="#2B5E9D" className={`transition-opacity duration-300 ${activeZone === 2 ? 'opacity-30' : 'opacity-0'}`} />
                <rect x="420" y="210" width="70" height="80" fill="#2B5E9D" className={`transition-opacity duration-300 ${activeZone === 3 ? 'opacity-30' : 'opacity-0'}`} />
                <rect x="230" y="220" width="80" height="60" fill="#2B5E9D" className={`transition-opacity duration-300 ${activeZone === 4 ? 'opacity-30' : 'opacity-0'}`} />
                <circle cx="450" cy="250" r="100" fill="#2B5E9D" className={`transition-opacity duration-300 ${activeZone === 5 ? 'opacity-10' : 'opacity-0'}`} />
                <polygon points="430,190 470,190 490,250 470,310 430,310 410,250" fill="#2B5E9D" className={`transition-opacity duration-300 ${activeZone === 6 ? 'opacity-40' : 'opacity-0'}`} />
              </g>

              {/* Overlay Dashed Zones */}
              <circle cx="270" cy="250" r="70" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,6" fill="none" className={`transition-colors ${activeZone === 4 ? 'stroke-blue-500' : ''}`} />
              <circle cx="600" cy="250" r="90" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,6" fill="none" className={`transition-colors ${activeZone === 1 ? 'stroke-blue-500' : ''}`} />
              <circle cx="450" cy="250" r="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,6" fill="none" className={`transition-colors ${activeZone === 5 ? 'stroke-blue-500' : ''}`} />

              {/* Service/Launch Modules (Outlines) */}
              <rect x="250" y="230" width="40" height="40" stroke="#1A1A1A" strokeWidth="2" fill="none" />
              <rect x="330" y="190" width="40" height="120" stroke="#1A1A1A" strokeWidth="2" fill="none" />
              <polygon points="430,190 470,190 490,250 470,310 430,310 410,250" stroke="#1A1A1A" strokeWidth="2" fill="none" />

              {/* Dimensions */}
              <line x1="200" y1="40" x2="640" y2="40" stroke="#C0392B" strokeWidth="2" markerStart="url(#s02-arrow-red-start)" markerEnd="url(#s02-arrow-red-end)" />
              <rect x="350" y="30" width="140" height="20" fill="#ffffff" />
              <text x="420" y="44" fontSize="12" fontWeight="bold" fill="#C0392B" textAnchor="middle" letterSpacing="1">132.0 OP ZONE</text>

              <line x1="680" y1="180" x2="680" y2="320" stroke="#C0392B" strokeWidth="2" markerStart="url(#s02-arrow-red-start)" markerEnd="url(#s02-arrow-red-end)" />
              <rect x="630" y="240" width="100" height="20" fill="#ffffff" />
              <text x="680" y="254" fontSize="12" fontWeight="bold" fill="#C0392B" textAnchor="middle" letterSpacing="1">58.0 WIDTH</text>
            </svg>
          </div>
        </div>

        {/* Right: Legend Sequence */}
        <div className="flex-[1.5] bg-[#F4F4EE] flex flex-col relative z-10">
          <SectionHeader subtitle="Logic Array" title="Zone Mapping" />
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center gap-4 text-sm font-semibold text-[#2A2A24]">
            {deckOperations.map(item => (
              <button
                type="button"
                key={item.id}
                aria-pressed={lockedZone === item.id}
                aria-label={`${item.label}. Toggle zone highlight.`}
                onMouseEnter={handleEnter(item.id)}
                onMouseLeave={handleLeave}
                onFocus={handleEnter(item.id)}
                onBlur={handleLeave}
                onClick={handleClick(item.id)}
                className={`flex items-center gap-4 p-4 border transition-all cursor-pointer bg-white text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A1A1A]
                  ${activeZone === item.id ? 'border-blue-500 shadow-md scale-105 z-10 text-blue-800 ring-2 ring-blue-100' : 'border-[#1A1A1A] hover:bg-[#EDEDE6] hover:scale-[1.02]'}`}
              >
                <span className="tracking-wider uppercase">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: PROFILE & LOGIC */}
      <div className="flex flex-col lg:flex-row bg-white flex-1 border-b border-[#1A1A1A]">

        {/* Bottom Left: Profile View */}
        <div className="flex-[2] border-b lg:border-b-0 lg:border-r border-[#1A1A1A] flex flex-col min-h-[400px]">
          <SectionHeader subtitle="Sortie Geometry" title="Profile View" />

          <div className="p-8 flex-1 flex justify-center items-center">
            <svg viewBox="0 0 800 300" className="w-full h-full max-h-[250px]" aria-hidden="true">
              <defs>
                <marker id="s02-arrow-red-start-prof" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 10 0 L 0 5 L 10 10 z" fill="#C0392B" />
                </marker>
                <marker id="s02-arrow-red-end-prof" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#C0392B" />
                </marker>
              </defs>

              <line x1="50" y1="220" x2="750" y2="220" stroke="#2B5E9D" strokeWidth="2" strokeDasharray="4,4" />
              <text x="760" y="223" fontSize="10" fontWeight="bold" fill="#64748b">waterline</text>

              <path d="M 80 220 L 450 180 L 580 180 L 610 140 L 670 140 L 670 170 L 710 160 L 720 220 Z" stroke="#1A1A1A" strokeWidth="3" fill="none" />

              <path d="M 610 140 L 630 60 L 670 60 L 670 140" stroke="#1A1A1A" strokeWidth="3" fill="none" />

              <rect x="420" y="190" width="80" height="15" fill="none" stroke="#1A1A1A" strokeWidth="2" />

              <line x1="380" y1="260" x2="520" y2="260" stroke="#C0392B" strokeWidth="2" markerStart="url(#s02-arrow-red-start-prof)" markerEnd="url(#s02-arrow-red-end-prof)" />
              <rect x="400" y="250" width="100" height="20" fill="#ffffff" />
              <text x="450" y="264" fontSize="14" fontWeight="bold" fill="#C0392B" textAnchor="middle">100.0</text>
              <text x="450" y="278" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="middle">SERVICE RUN</text>

              <line x1="740" y1="160" x2="740" y2="220" stroke="#C0392B" strokeWidth="2" markerStart="url(#s02-arrow-red-start-prof)" markerEnd="url(#s02-arrow-red-end-prof)" />
              <rect x="715" y="180" width="50" height="20" fill="#ffffff" />
              <text x="740" y="194" fontSize="14" fontWeight="bold" fill="#C0392B" textAnchor="middle">8.0</text>
              <text x="740" y="240" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="middle">DECK HUMP</text>
            </svg>
          </div>
        </div>

        {/* Bottom Right: Turnaround Logic & Flow */}
        <div className="flex-[1.5] flex flex-col bg-[#F4F4EE]">

          {/* 6-Step Turnaround Block */}
          <div className="p-8 border-b border-[#1A1A1A] bg-white flex-1">
            <h3 className="text-xl tracking-wider text-[#1A1A1A] uppercase font-semibold mb-6">Operational Cycle // 6-Step Turnaround</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              {turnaroundSteps.map((step) => (
                <div key={step.num} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#1A1A1A] flex items-center justify-center font-bold text-[#1A1A1A] text-sm shrink-0">
                    {step.num}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#1A1A1A] tracking-wider">{step.title}</span>
                    <span className="text-[10px] text-[#6B6660] uppercase">{step.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deck Logic Flow Block */}
          <div className="p-8 bg-white flex-1">
            <h3 className="text-xl tracking-wider text-[#1A1A1A] uppercase font-semibold mb-6">Deck Logic Flow</h3>
            <div className="flex items-center justify-start gap-4">
              <div className="border border-[#1A1A1A] px-6 py-3 font-bold tracking-wider text-[#1A1A1A] bg-white hover:bg-[#EDEDE6] transition-colors">
                RECOVERY
              </div>
              <div className="flex-1 max-w-[40px] border-b-[3px] border-[#1A1A1A] relative" aria-hidden="true">
                <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-[#1A1A1A] border-b-[6px] border-b-transparent"></div>
              </div>
              <div className="border border-[#1A1A1A] px-6 py-3 font-bold tracking-wider text-[#1A1A1A] bg-white hover:bg-[#EDEDE6] transition-colors">
                SERVICE
              </div>
              <div className="flex-1 max-w-[40px] border-b-[3px] border-[#1A1A1A] relative" aria-hidden="true">
                <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-[#1A1A1A] border-b-[6px] border-b-transparent"></div>
              </div>
              <div className="border border-[#1A1A1A] px-6 py-3 font-bold tracking-wider text-[#1A1A1A] bg-white hover:bg-[#EDEDE6] transition-colors">
                LAUNCH
              </div>
            </div>
            <p className="text-[10px] font-bold text-[#8F8A82] mt-4 uppercase">Port Arc / Stbd Arc / Uplink</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-[#F4F4EE] p-6 flex justify-between items-end text-[10px] font-bold tracking-widest uppercase relative z-10">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-end gap-0" aria-hidden="true">
            <div className="h-3 border-l border-[#1A1A1A]"></div>
            <div className="w-20 border-b border-[#1A1A1A]"></div>
            <div className="h-3 border-l border-[#1A1A1A]"></div>
          </div>
          <span className="text-[#6B6660] mt-1">20 UNITS</span>
        </div>
      </div>

    </div>
  );
}
