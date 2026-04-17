import React from 'react';
import { useHoverLock } from './hooks/useHoverLock.js';
import sheet01Doc from './data/sheet01_components.json';

const componentLegend = sheet01Doc.componentLegend;
const missionLogic = sheet01Doc.missionLogic;

export default function Sheet01({ lockedZone, setLockedZone }) {
  const { current: activeZone, handleEnter, handleLeave, handleClick } =
    useHoverLock({ locked: lockedZone, setLocked: setLockedZone });

  return (
    <div className="w-full bg-white flex flex-col">

      {/* HEADER */}
      <header className="border-b-[2px] border-slate-800 p-6 md:p-8 relative z-10 bg-white">
        <h1 className="text-3xl md:text-4xl tracking-wide text-slate-800 uppercase font-semibold">
          TR-001 SEA CARRIER // SHEET 01
        </h1>
        <p className="text-xs md:text-sm tracking-[0.2em] font-bold text-slate-400 mt-2 uppercase">
          Orthographic Vector Study // Drone-First Maritime Node // No Brand Affiliation
        </p>
      </header>

      {/* MAIN CANVAS AREA */}
      <div className="flex flex-col flex-1 cad-grid relative">

        {/* TOP HALF: PLAN VIEW & LEGEND */}
        <div className="flex flex-col lg:flex-row border-b-[2px] border-slate-800 w-full">

          {/* PLAN VIEW SVG */}
          <div className="flex-[2] p-8 relative flex flex-col items-center justify-center min-h-[450px]">
            <svg viewBox="0 0 600 400" className="w-full h-full max-h-[400px] overflow-visible" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <defs>
                <marker id="s01-arrow-red-start" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 10 0 L 0 5 L 10 10 z" fill="#ef4444" />
                </marker>
                <marker id="s01-arrow-red-end" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                </marker>
              </defs>

              {/* Centerlines */}
              <line x1="300" y1="20" x2="300" y2="380" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,8" />
              <line x1="50" y1="200" x2="550" y2="200" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,8" />

              {/* Interactive Zone Highlights */}
              <g className="transition-opacity duration-300">
                <circle cx="180" cy="140" r="35" fill="#3b82f6" className={`transition-opacity duration-300 ${activeZone === 1 ? 'opacity-20' : 'opacity-0'}`} />
                <circle cx="180" cy="260" r="35" fill="#3b82f6" className={`transition-opacity duration-300 ${activeZone === 1 ? 'opacity-20' : 'opacity-0'}`} />

                <polygon points="350,110 470,110 510,200 470,290 350,290" fill="#3b82f6" className={`transition-opacity duration-300 ${activeZone === 2 ? 'opacity-20' : 'opacity-0'}`} />

                <rect x="220" y="195" width="260" height="10" fill="#3b82f6" className={`transition-opacity duration-300 ${activeZone === 3 ? 'opacity-30' : 'opacity-0'}`} />

                <polygon points="270,200 290,160 330,160 350,200 330,240 290,240" fill="#3b82f6" className={`transition-opacity duration-300 ${activeZone === 4 ? 'opacity-30' : 'opacity-0'}`} />

                <polygon points="100,240 130,240 130,280 180,280 180,310 100,310" fill="#3b82f6" className={`transition-opacity duration-300 ${activeZone === 5 ? 'opacity-30' : 'opacity-0'}`} />
              </g>

              {/* Hull Outlines */}
              <path d="M 80 200 L 250 40 L 450 40 L 530 200 L 450 360 L 250 360 Z" stroke="#1e293b" strokeWidth="3" fill="none" />
              <path d="M 120 200 L 270 70 L 430 70 L 490 200 L 430 330 L 270 330 Z" stroke="#1e293b" strokeWidth="2" fill="none" />
              <path d="M 160 200 L 290 100 L 410 100 L 450 200 L 410 300 L 290 300 Z" stroke="#1e293b" strokeWidth="2" fill="none" />

              {/* Components */}
              <circle cx="180" cy="140" r="30" stroke="#1e293b" strokeWidth="2" fill="none" />
              <line x1="160" y1="140" x2="200" y2="140" stroke="#1e293b" strokeWidth="2" />
              <line x1="180" y1="120" x2="180" y2="160" stroke="#1e293b" strokeWidth="2" />

              <circle cx="180" cy="260" r="30" stroke="#1e293b" strokeWidth="2" fill="none" />
              <line x1="160" y1="260" x2="200" y2="260" stroke="#1e293b" strokeWidth="2" />
              <line x1="180" y1="240" x2="180" y2="280" stroke="#1e293b" strokeWidth="2" />

              <polygon points="280,200 295,165 325,165 340,200 325,235 295,235" stroke="#1e293b" strokeWidth="2" fill="none" />

              <path d="M 90 240 L 140 240 L 140 280 L 190 280" stroke="#1e293b" strokeWidth="2" fill="none" />

              {/* Component Leader Lines */}
              <g stroke="#1e293b" strokeWidth="1.5" className="opacity-60">
                <line x1="180" y1="110" x2="550" y2="50" className={activeZone === 1 ? 'stroke-blue-600 stroke-[2px] opacity-100' : ''} />
                <line x1="450" y1="110" x2="550" y2="80" className={activeZone === 2 ? 'stroke-blue-600 stroke-[2px] opacity-100' : ''} />
                <line x1="280" y1="200" x2="550" y2="120" className={activeZone === 3 ? 'stroke-blue-600 stroke-[2px] opacity-100' : ''} />
                <line x1="325" y1="165" x2="550" y2="160" className={activeZone === 4 ? 'stroke-blue-600 stroke-[2px] opacity-100' : ''} />
                <line x1="140" y1="260" x2="550" y2="240" className={activeZone === 5 ? 'stroke-blue-600 stroke-[2px] opacity-100' : ''} />
              </g>

              {/* Dimensions */}
              <line x1="80" y1="390" x2="530" y2="390" stroke="#ef4444" strokeWidth="2" markerStart="url(#s01-arrow-red-start)" markerEnd="url(#s01-arrow-red-end)" />
              <line x1="80" y1="370" x2="80" y2="400" stroke="#ef4444" strokeWidth="1" />
              <line x1="530" y1="370" x2="530" y2="400" stroke="#ef4444" strokeWidth="1" />
              <rect x="250" y="380" width="100" height="20" fill="#ffffff" />
              <text x="300" y="394" fontSize="14" fontWeight="bold" fill="#ef4444" textAnchor="middle" letterSpacing="1">L = 120.0</text>

              <line x1="30" y1="40" x2="30" y2="360" stroke="#ef4444" strokeWidth="2" markerStart="url(#s01-arrow-red-start)" markerEnd="url(#s01-arrow-red-end)" />
              <line x1="20" y1="40" x2="40" y2="40" stroke="#ef4444" strokeWidth="1" />
              <line x1="20" y1="360" x2="40" y2="360" stroke="#ef4444" strokeWidth="1" />
              <rect x="20" y="160" width="20" height="80" fill="#ffffff" />
              <text x="25" y="200" fontSize="14" fontWeight="bold" fill="#ef4444" textAnchor="middle" letterSpacing="1" transform="rotate(-90 25,200)">B = 52.0</text>
            </svg>

            <div className="absolute bottom-4 bg-white px-4 py-2 border-[2px] border-slate-800 text-xs font-bold tracking-widest text-slate-800">
              PLAN VIEW
            </div>
          </div>

          {/* LEGEND ARRAY */}
          <div className="flex-[1] flex flex-col justify-start p-8 relative z-10 border-t-[2px] lg:border-t-0 lg:border-l-[2px] border-slate-800 bg-white/90 backdrop-blur-sm">
            <div className="flex flex-col gap-4 text-xs font-semibold text-slate-700 mt-12">
              {componentLegend.map(item => (
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
                  className={`flex items-center gap-3 p-3 border-[2px] transition-all cursor-pointer bg-white text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-800
                    ${activeZone === item.id ? 'border-blue-500 shadow-md scale-105 z-10 text-blue-800 ring-2 ring-blue-100' : 'border-transparent hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  <span className="tracking-widest uppercase">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM HALF: PROFILE & FRONT VIEWS */}
        <div className="flex flex-col lg:flex-row w-full">

          {/* PROFILE VIEW (SIDE) */}
          <div className="flex-[1.5] p-8 border-b-[2px] lg:border-b-0 lg:border-r-[2px] border-slate-800 relative flex flex-col items-center justify-center min-h-[300px]">
            <svg viewBox="0 0 500 250" className="w-full h-full max-h-[250px] overflow-visible" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <defs>
                <marker id="s01-arrow-red-start-prof" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 10 0 L 0 5 L 10 10 z" fill="#ef4444" />
                </marker>
                <marker id="s01-arrow-red-end-prof" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                </marker>
              </defs>

              <line x1="30" y1="180" x2="480" y2="180" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,8" />

              <circle cx="80" cy="170" r="12" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" fill="none" />
              <circle cx="280" cy="140" r="16" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" fill="none" />
              <circle cx="340" cy="175" r="12" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" fill="none" />

              <path d="M 60 180 L 280 140 L 380 140 L 400 80 L 430 80 L 430 140 L 460 140 L 470 180 Z" stroke="#1e293b" strokeWidth="3" fill="none" />
              <path d="M 380 140 L 400 180" stroke="#1e293b" strokeWidth="2" fill="none" />

              <line x1="60" y1="220" x2="470" y2="220" stroke="#ef4444" strokeWidth="2" markerStart="url(#s01-arrow-red-start-prof)" markerEnd="url(#s01-arrow-red-end-prof)" />
              <line x1="60" y1="190" x2="60" y2="230" stroke="#ef4444" strokeWidth="1" />
              <line x1="470" y1="190" x2="470" y2="230" stroke="#ef4444" strokeWidth="1" />
              <rect x="220" y="210" width="100" height="20" fill="#ffffff" />
              <text x="270" y="224" fontSize="14" fontWeight="bold" fill="#ef4444" textAnchor="middle" letterSpacing="1">LOA = 120.0</text>

              <line x1="200" y1="140" x2="200" y2="180" stroke="#ef4444" strokeWidth="2" markerStart="url(#s01-arrow-red-start-prof)" markerEnd="url(#s01-arrow-red-end-prof)" />
              <rect x="110" y="150" width="180" height="20" fill="#ffffff" />
              <text x="200" y="164" fontSize="12" fontWeight="bold" fill="#ef4444" textAnchor="middle" letterSpacing="1">DECK + FREEBOARD = 11.0</text>

              <line x1="440" y1="80" x2="440" y2="180" stroke="#ef4444" strokeWidth="2" markerStart="url(#s01-arrow-red-start-prof)" markerEnd="url(#s01-arrow-red-end-prof)" />
              <rect x="445" y="120" width="55" height="20" fill="#ffffff" />
              <text x="470" y="134" fontSize="12" fontWeight="bold" fill="#ef4444" textAnchor="middle" letterSpacing="1">MAST = 26.0</text>

            </svg>

            <div className="absolute bottom-4 bg-white px-4 py-2 border-[2px] border-slate-800 text-xs font-bold tracking-widest text-slate-800">
              PROFILE VIEW (SIDE)
            </div>
          </div>

          {/* FRONT VIEW & MISSION LOGIC */}
          <div className="flex-[1] flex flex-col">

            {/* FRONT VIEW SVG */}
            <div className="flex-1 p-8 relative flex flex-col items-center justify-center min-h-[250px]">
              <svg viewBox="0 0 400 250" className="w-full h-full max-h-[250px] overflow-visible" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <line x1="200" y1="20" x2="200" y2="190" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,8" />
                <line x1="40" y1="180" x2="360" y2="180" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,8" />

                <circle cx="200" cy="140" r="16" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                <circle cx="200" cy="180" r="20" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                <circle cx="310" cy="90" r="16" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" fill="none" />

                <path d="M 80 180 L 100 130 L 160 130 A 40 40 0 0 1 240 130 L 300 130 L 320 180 Z" stroke="#1e293b" strokeWidth="3" fill="none" />

                <path d="M 100 130 L 70 80 L 100 80 L 120 110" stroke="#1e293b" strokeWidth="3" fill="none" />
                <path d="M 300 130 L 330 80 L 300 80 L 280 110" stroke="#1e293b" strokeWidth="3" fill="none" />

                <line x1="80" y1="220" x2="320" y2="220" stroke="#ef4444" strokeWidth="2" markerStart="url(#s01-arrow-red-start-prof)" markerEnd="url(#s01-arrow-red-end-prof)" />
                <line x1="80" y1="190" x2="80" y2="230" stroke="#ef4444" strokeWidth="1" />
                <line x1="320" y1="190" x2="320" y2="230" stroke="#ef4444" strokeWidth="1" />
                <rect x="150" y="210" width="100" height="20" fill="#ffffff" />
                <text x="200" y="224" fontSize="14" fontWeight="bold" fill="#ef4444" textAnchor="middle" letterSpacing="1">BEAM = 52.0</text>

                <line x1="330" y1="80" x2="330" y2="140" stroke="#ef4444" strokeWidth="1" />
                <path d="M 330 110 A 30 30 0 0 0 315 100" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#s01-arrow-red-end-prof)" />
                <rect x="335" y="100" width="120" height="20" fill="#ffffff" />
                <text x="390" y="114" fontSize="12" fontWeight="bold" fill="#ef4444" textAnchor="middle" letterSpacing="1">FIN CANT = 35°</text>

              </svg>

              <div className="absolute bottom-4 bg-white px-4 py-2 border-[2px] border-slate-800 text-xs font-bold tracking-widest text-slate-800">
                FRONT VIEW
              </div>
            </div>

            {/* MISSION LOGIC BOX */}
            <div className="p-6 md:p-8 bg-white/90 backdrop-blur-sm border-t-[2px] border-slate-800">
              <div className="border-[2px] border-slate-800 p-6 bg-white">
                <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">Mission Logic</h4>
                <ul className="flex flex-col gap-3 text-xs font-semibold text-slate-800 tracking-wide leading-relaxed">
                  {missionLogic.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="bg-white p-6 flex justify-start items-end text-[10px] font-bold tracking-widest uppercase relative z-10 border-t-[2px] border-slate-800">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-end gap-0" aria-hidden="true">
            <div className="h-3 border-l-[2px] border-slate-800"></div>
            <div className="w-16 border-b-[2px] border-slate-800"></div>
            <div className="h-3 border-l-[2px] border-slate-800"></div>
          </div>
          <span className="text-slate-500 mt-1">10 UNITS</span>
        </div>
      </div>

    </div>
  );
}
