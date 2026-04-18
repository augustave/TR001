import React from 'react';
import { useHoverLock } from './hooks/useHoverLock.js';
import sheet03Doc from './data/sheet03_zones.json';
import { DoctrineHeader, DoctrineSectionHeader } from './components/Doctrine.jsx';

const turnaroundLogic = sheet03Doc.turnaroundLogic;

const SectionHeader = ({ subtitle, title }) => (
  <DoctrineSectionHeader eyebrow={subtitle} title={title} />
);

export default function Sheet03({ lockedZone, setLockedZone }) {
  const { current: activeZone, handleEnter, handleLeave, handleClick } =
    useHoverLock({ locked: lockedZone, setLocked: setLockedZone });

  return (
    <div className="w-full bg-[#F4F4EE] flex flex-col">
      <DoctrineHeader
        title="TR-001 Sea Carrier · Sheet 03"
        subtitle="Below-deck architecture + turnaround logic · speculative vector study"
        chipLeft="SHEET 03 · BELOW-DECK"
        chipRight="REV A · NOT TO SCALE"
      />

      {/* TOP SECTION: LONGITUDINAL CUTAWAY & LEGEND */}
      <div className="flex flex-col lg:flex-row border-b border-[#1A1A1A] bg-white">

        {/* Left: Longitudinal Cutaway SVG */}
        <div className="flex-[3] border-b lg:border-b-0 lg:border-r border-[#1A1A1A] relative min-h-[400px] flex flex-col">
          <SectionHeader subtitle="Below-Deck Flow" title="Longitudinal Cutaway" />

          <div className="relative flex-1 w-full p-8 flex justify-center items-center">
            <svg viewBox="0 0 1000 300" className="w-full h-full max-h-[300px]" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <defs>
                <marker id="s03-arrow-red-start" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 10 0 L 0 5 L 10 10 z" fill="#C0392B" />
                </marker>
                <marker id="s03-arrow-red-end" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#C0392B" />
                </marker>
              </defs>

              {/* Crosshairs */}
              <line x1="500" y1="0" x2="500" y2="300" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,8" />
              <line x1="100" y1="120" x2="900" y2="120" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,8" />

              {/* Deck Line & Bridge */}
              <path d="M 150 80 L 850 80" stroke="#1A1A1A" strokeWidth="3" fill="none" />
              <path d="M 450 80 L 470 60 L 530 60 L 550 80" stroke="#1A1A1A" strokeWidth="3" fill="none" />

              {/* Hull Outline */}
              <path d="M 150 100 L 850 100 L 850 140 Q 500 160 150 140 Z" stroke="#1A1A1A" strokeWidth="3" fill="none" />

              {/* Interactive Highlight Zones (driven by legend hover/lock) */}
              <g className="transition-opacity duration-300">
                <rect x="150" y="100" width="140" height="48" fill="#2B5E9D" className={`transition-opacity duration-300 ${activeZone === 1 ? 'opacity-20' : 'opacity-0'}`} />
                <rect x="290" y="100" width="140" height="52" fill="#2B5E9D" className={`transition-opacity duration-300 ${activeZone === 2 ? 'opacity-20' : 'opacity-0'}`} />
                <rect x="430" y="100" width="140" height="55" fill="#2B5E9D" className={`transition-opacity duration-300 ${activeZone === 3 ? 'opacity-20' : 'opacity-0'}`} />
                <rect x="570" y="100" width="140" height="52" fill="#2B5E9D" className={`transition-opacity duration-300 ${activeZone === 4 ? 'opacity-20' : 'opacity-0'}`} />
                <rect x="710" y="100" width="140" height="48" fill="#2B5E9D" className={`transition-opacity duration-300 ${activeZone === 5 ? 'opacity-20' : 'opacity-0'}`} />
              </g>

              {/* Zone Numbers */}
              <text x="220" y="115" fontSize="10" fontWeight="bold" fill="#64748b" textAnchor="middle" className={`transition-colors ${activeZone === 1 ? 'fill-blue-600' : ''}`}>01</text>
              <text x="360" y="115" fontSize="10" fontWeight="bold" fill="#64748b" textAnchor="middle" className={`transition-colors ${activeZone === 2 ? 'fill-blue-600' : ''}`}>02</text>
              <text x="500" y="115" fontSize="10" fontWeight="bold" fill="#64748b" textAnchor="middle" className={`transition-colors ${activeZone === 3 ? 'fill-blue-600' : ''}`}>03</text>
              <text x="640" y="115" fontSize="10" fontWeight="bold" fill="#64748b" textAnchor="middle" className={`transition-colors ${activeZone === 4 ? 'fill-blue-600' : ''}`}>04</text>
              <text x="780" y="115" fontSize="10" fontWeight="bold" fill="#64748b" textAnchor="middle" className={`transition-colors ${activeZone === 5 ? 'fill-blue-600' : ''}`}>05</text>

              {/* Dimension Line */}
              <line x1="150" y1="200" x2="850" y2="200" stroke="#C0392B" strokeWidth="2" markerStart="url(#s03-arrow-red-start)" markerEnd="url(#s03-arrow-red-end)" />
              <rect x="380" y="190" width="240" height="20" fill="#ffffff" />
              <text x="500" y="204" fontSize="12" fontWeight="bold" fill="#C0392B" textAnchor="middle" letterSpacing="1">BELOW-DECK SERVICE LENGTH = 168.0</text>
            </svg>
          </div>
        </div>

        {/* Right: Legend Sequence */}
        <div className="flex-[1] bg-[#F4F4EE] flex flex-col relative z-10">
          <SectionHeader subtitle="Logic Array" title="Zone Mapping" />
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center gap-4 text-sm font-semibold text-[#2A2A24]">
            {turnaroundLogic.map(item => (
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
                  ${activeZone === item.id ? 'border-blue-500 shadow-md scale-105 z-10 text-blue-800' : 'border-[#1A1A1A] hover:bg-[#EDEDE6] hover:scale-[1.02]'}`}
              >
                <span className="tracking-widest uppercase">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: PLAN & SECTION VIEWS */}
      <div className="flex flex-col lg:flex-row bg-white flex-1">

        {/* Bottom Left: Lower Deck Plan */}
        <div className="flex-[1] border-b lg:border-b-0 lg:border-r border-[#1A1A1A] flex flex-col min-h-[400px]">
          <SectionHeader subtitle="Storage + Service Cells" title="Lower Deck Plan" />

          <div className="p-8 flex-1 flex justify-center items-center">
            <svg viewBox="0 0 600 400" className="w-full h-full max-h-[300px]" aria-hidden="true">
              <defs>
                <marker id="s03-arrow-red-start-plan" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 10 0 L 0 5 L 10 10 z" fill="#C0392B" />
                </marker>
                <marker id="s03-arrow-red-end-plan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#C0392B" />
                </marker>
              </defs>

              <path d="M 100 200 L 250 100 L 450 100 L 500 200 L 450 300 L 250 300 Z" stroke="#1A1A1A" strokeWidth="3" fill="none" />

              <line x1="100" y1="350" x2="500" y2="350" stroke="#C0392B" strokeWidth="2" markerStart="url(#s03-arrow-red-start-plan)" markerEnd="url(#s03-arrow-red-end-plan)" />
              <rect x="200" y="340" width="200" height="20" fill="#ffffff" />
              <text x="300" y="354" fontSize="12" fontWeight="bold" fill="#C0392B" textAnchor="middle" letterSpacing="1">LOWER PLAN ENVELOPE = 118.0</text>
            </svg>
          </div>
        </div>

        {/* Bottom Right: Transverse Section */}
        <div className="flex-[1] flex flex-col min-h-[400px]">
          <SectionHeader subtitle="Lift + Sensor Core" title="Transverse Section" />

          <div className="p-8 flex-1 flex justify-center items-center">
            <svg viewBox="0 0 600 400" className="w-full h-full max-h-[300px]" aria-hidden="true">
              <defs>
                <marker id="s03-arrow-red-start-trans" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 10 0 L 0 5 L 10 10 z" fill="#C0392B" />
                </marker>
                <marker id="s03-arrow-red-end-trans" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#C0392B" />
                </marker>
              </defs>

              <path d="M 200 250 L 200 180 L 250 180 L 270 120 L 330 120 L 350 180 L 400 180 L 400 250 Z" stroke="#1A1A1A" strokeWidth="3" fill="none" />

              <rect x="180" y="286" width="240" height="20" fill="#ffffff" />
              <text x="300" y="300" fontSize="12" fontWeight="bold" fill="#C0392B" textAnchor="middle" letterSpacing="1">TRANSVERSE SERVICE WIDTH = 42.0</text>
            </svg>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-[#F4F4EE] border-t border-[#1A1A1A] p-6 flex justify-between items-end text-[10px] font-bold tracking-widest uppercase relative z-10">
        <div className="flex flex-col items-start gap-2">
          <span className="text-[#1A1A1A]">20 UNITS</span>
          <div className="w-16 border-t-[3px] border-[#1A1A1A]" aria-hidden="true"></div>
        </div>
      </div>

    </div>
  );
}
