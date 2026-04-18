import React, { useState } from 'react';
import { useHoverLock } from './hooks/useHoverLock.js';
import sortieDoc from './data/sortie_schedule.json';
import { DoctrineHeader, DoctrineSectionHeader } from './components/Doctrine.jsx';

const sortieScheduleData = sortieDoc.sortieSchedule;
const sequenceLegend = sortieDoc.sequenceLegend;

// --- SHEET-LOCAL UI COMPONENTS ---
const SectionHeader = ({ subtitle, title }) => (
  <DoctrineSectionHeader eyebrow={subtitle} title={title} />
);

const NodeBadge = ({ num, isActive, isLocked, onMouseEnter, onMouseLeave, onClick }) => (
  <button
    type="button"
    aria-pressed={isLocked}
    aria-label={`Sequence node 0${num}. Toggle highlight.`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onFocus={onMouseEnter}
    onBlur={onMouseLeave}
    onClick={onClick}
    className={`absolute w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all duration-300 z-20 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A1A1A]
      ${isActive ? 'scale-125 ring-4 ring-blue-100 text-blue-600 border-blue-600' : 'border-[#1A1A1A] text-[#1A1A1A] hover:scale-110 hover:border-blue-400 hover:text-blue-500'}`}
  >
    {num}
  </button>
);

// --- GANTT CHART COMPONENT ---
const SortieTimeline = ({ activeAction, setActiveAction }) => {
  const columns = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];

  const getStyle = (type, isActive, anyActive) => {
    const isFaded = anyActive && !isActive;
    const base = isFaded ? 'opacity-30 scale-95' : 'opacity-100 hover:scale-[1.02] cursor-pointer shadow-sm z-20';

    switch(type) {
      case 'svc': return `${base} bg-[#EDEDE6] border-[#1A1A1A] text-[#1A1A1A] ${isActive ? 'ring-2 ring-slate-400' : ''}`;
      case 'que': return `${base} bg-white border-[#1A1A1A] text-[#1A1A1A] border-dashed ${isActive ? 'ring-2 ring-slate-400' : ''}`;
      case 'lnc': return `${base} bg-blue-50 border-blue-600 text-blue-700 font-bold ${isActive ? 'ring-2 ring-blue-400' : ''}`;
      case 'rec': return `${base} bg-red-50 border-red-500 text-red-700 font-bold ${isActive ? 'ring-2 ring-red-400' : ''}`;
      case 'sta': return `${base} bg-white border-[#C7C3BC] text-[#6B6660] ${isActive ? 'ring-2 ring-slate-300' : ''}`;
      case 'hld': return `${base} bg-[#F4F4EE] border-[#B0ADA6] text-[#6B6660] border-dotted ${isActive ? 'ring-2 ring-slate-300' : ''}`;
      default: return `${base} bg-white border-[#1A1A1A]`;
    }
  };

  return (
    <div className="w-full overflow-x-auto p-6 bg-white">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-[60px_repeat(12,1fr)] gap-0 border-b border-[#1A1A1A] pb-2 mb-4">
          <div></div>
          {columns.map(col => (
            <div key={col} className="text-[10px] font-bold text-[#8F8A82] text-center border-l-[1px] border-[#D5D2CC]">{col}</div>
          ))}
        </div>

        {sortieScheduleData.map(row => (
          <div key={row.id} className="grid grid-cols-[60px_repeat(12,1fr)] gap-0 mb-3 relative h-8 items-center group">
            <div className="absolute inset-0 grid grid-cols-[60px_repeat(12,1fr)] pointer-events-none z-0" aria-hidden="true">
               <div></div>
               {columns.map((_, i) => <div key={i} className="border-l-[1px] border-[#E6E4DE] h-full"></div>)}
            </div>
            <div className="text-xs font-bold text-[#1A1A1A] z-10">{row.id}</div>

            <div className="col-span-12 relative h-full z-10 grid grid-cols-12 gap-1">
              {row.blocks.map((block, i) => (
                <button
                  type="button"
                  key={i}
                  aria-label={`${row.id} ${block.label}, minute ${block.start - 1} to ${block.start - 1 + block.span}. Highlight ${block.type}.`}
                  onMouseEnter={() => setActiveAction(block.type)}
                  onMouseLeave={() => setActiveAction(null)}
                  onFocus={() => setActiveAction(block.type)}
                  onBlur={() => setActiveAction(null)}
                  className={`h-full border flex items-center justify-center text-[9px] tracking-wider uppercase overflow-hidden whitespace-nowrap px-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#1A1A1A] ${getStyle(block.type, activeAction === block.type, activeAction !== null)}`}
                  style={{ gridColumn: `${block.start} / span ${block.span}` }}
                >
                  {block.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-[#1A1A1A] flex justify-between items-center">
        <p className="text-[10px] font-bold text-[#6B6660] uppercase">Logic: No more than 2 deck conflicts at once; windows alternate every 2-4 min.</p>
        <div className="text-[10px] font-bold text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1 bg-white">
          ACTIVE WAVE DECK = 132.0 UNITS
        </div>
      </div>
    </div>
  );
};

// --- MAIN SHEET 04 ---
export default function Sheet04({ lockedNode, setLockedNode }) {
  const { current: activeNode, handleEnter, handleLeave, handleClick } =
    useHoverLock({ locked: lockedNode, setLocked: setLockedNode });
  const [activeAction, setActiveAction] = useState(null);

  // A node is active if (a) it is the currently hovered/locked node OR
  // (b) the currently-hovered Gantt action type maps to it.
  const isNodeActive = (nodeNum) => {
    if (activeNode === nodeNum) return true;
    if (!activeAction) return false;
    switch (nodeNum) {
      case 1: return activeAction === 'lnc';
      case 2: return activeAction === 'que';
      case 3: return activeAction === 'que';
      case 4: return activeAction === 'svc';
      case 5: return activeAction === 'hld' || activeAction === 'sta';
      case 6: return activeAction === 'rec';
      default: return false;
    }
  };

  const isAnyActive = activeNode !== null || activeAction !== null;

  const getPathClass = (nodeNum) => {
    const isActive = isNodeActive(nodeNum);
    return `transition-all duration-500 ${isAnyActive && !isActive ? 'opacity-20' : 'opacity-100'} ${isActive ? 'animate-dash stroke-[3px]' : ''}`;
  };

  const getRectClass = (nodeNum) => {
    const isActive = isNodeActive(nodeNum);
    return `transition-all duration-500 ${isAnyActive && !isActive ? 'opacity-20' : 'opacity-100'} ${isActive ? 'fill-slate-200 stroke-blue-500' : 'fill-none stroke-[#1A1A1A]'}`;
  };

  return (
    <div className="w-full bg-[#F4F4EE]">
      <DoctrineHeader
        title="TR-001 Sea Carrier · Sheet 04"
        subtitle="Fleet scenario + sortie choreography · speculative vector study"
        chipLeft="SHEET 04 · SORTIE"
        chipRight="REV A · NOT TO SCALE"
      />

      {/* TOP SECTION: DIAGRAM & LEGEND */}
      <div className="flex flex-col xl:flex-row border-b border-[#1A1A1A] bg-white">

        {/* Left: Carrier Deck Diagram */}
        <div className="flex-[2] border-b xl:border-b-0 xl:border-r border-[#1A1A1A] relative min-h-[400px]">
          <SectionHeader subtitle="Top-Down Plan" title="Staggered Launch + Recovery Wave" />

          <div className="relative w-full max-w-[800px] mx-auto h-[350px] mt-4 flex justify-center items-center">

            <svg viewBox="0 0 800 350" className="absolute w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <defs>
                <marker id="s04-arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#2B5E9D" />
                </marker>
                <marker id="s04-arrow-black" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#1A1A1A" />
                </marker>
                <marker id="s04-arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#C0392B" />
                </marker>
              </defs>

              {/* Hull outline */}
              <path d="M 100 175 C 200 50, 400 50, 700 175 C 400 300, 200 300, 100 175 Z" fill="none" stroke="#1A1A1A" strokeWidth="3" className={`transition-opacity duration-500 ${isAnyActive ? 'opacity-40' : 'opacity-100'}`} />
              <line x1="150" y1="175" x2="650" y2="175" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,8" className={`transition-opacity duration-500 ${isAnyActive ? 'opacity-40' : 'opacity-100'}`} />
              <line x1="200" y1="200" x2="550" y2="130" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8,8" className={`transition-opacity duration-500 ${isAnyActive ? 'opacity-40' : 'opacity-100'}`} />

              {/* Deck Storage / Service Bays */}
              <rect x="400" y="165" width="40" height="20" strokeWidth="2" className={getRectClass(2)} />
              <rect x="450" y="165" width="40" height="20" strokeWidth="2" className={getRectClass(2)} />
              <rect x="300" y="185" width="40" height="20" strokeWidth="2" className={getRectClass(4)} />
              <rect x="250" y="185" width="40" height="20" strokeWidth="2" className={getRectClass(4)} />

              {/* 01: Launch Corridor */}
              <path d="M 660 175 L 750 175" stroke="#2B5E9D" strokeWidth="2" fill="none" markerEnd="url(#s04-arrow-blue)" className={getPathClass(1)} />

              {/* 06: Recovery Arc */}
              <path d="M 750 100 C 650 100, 600 130, 550 130" stroke="#C0392B" strokeWidth="2" fill="none" markerEnd="url(#s04-arrow-red)" className={getPathClass(6)} />

              {/* 05: Off-deck holding patterns */}
              <path d="M 500 120 C 450 60, 300 60, 250 100" stroke="#94a3b8" strokeWidth="2" fill="none" strokeDasharray="5,5" markerEnd="url(#s04-arrow-black)" className={`animate-dash-slow ${getPathClass(5)}`} />
              <path d="M 700 100 C 600 50, 450 60, 400 100" stroke="#94a3b8" strokeWidth="2" fill="none" strokeDasharray="5,5" markerEnd="url(#s04-arrow-black)" className={`animate-dash-slow ${getPathClass(5)}`} />

              {/* Dimension Line */}
              <line x1="200" y1="320" x2="600" y2="320" stroke="#C0392B" strokeWidth="2" markerStart="url(#s04-arrow-red)" markerEnd="url(#s04-arrow-red)" className={`transition-opacity duration-500 ${isAnyActive ? 'opacity-20' : 'opacity-100'}`} />
            </svg>

            {/* Node Badges positioned relative to the capped-width container */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <div style={{ left: '85%', top: '48%' }} className="absolute pointer-events-auto">
                <NodeBadge num="1" isActive={isNodeActive(1)} isLocked={lockedNode === 1} onMouseEnter={handleEnter(1)} onMouseLeave={handleLeave} onClick={handleClick(1)} />
              </div>
              <div style={{ left: '60%', top: '45%' }} className="absolute pointer-events-auto">
                <NodeBadge num="2" isActive={isNodeActive(2)} isLocked={lockedNode === 2} onMouseEnter={handleEnter(2)} onMouseLeave={handleLeave} onClick={handleClick(2)} />
              </div>
              <div style={{ left: '50%', top: '38%' }} className="absolute pointer-events-auto">
                <NodeBadge num="3" isActive={isNodeActive(3)} isLocked={lockedNode === 3} onMouseEnter={handleEnter(3)} onMouseLeave={handleLeave} onClick={handleClick(3)} />
              </div>
              <div style={{ left: '38%', top: '55%' }} className="absolute pointer-events-auto">
                <NodeBadge num="4" isActive={isNodeActive(4)} isLocked={lockedNode === 4} onMouseEnter={handleEnter(4)} onMouseLeave={handleLeave} onClick={handleClick(4)} />
              </div>
              <div style={{ left: '80%', top: '22%' }} className="absolute pointer-events-auto">
                <NodeBadge num="5" isActive={isNodeActive(5)} isLocked={lockedNode === 5} onMouseEnter={handleEnter(5)} onMouseLeave={handleLeave} onClick={handleClick(5)} />
              </div>
              <div style={{ left: '88%', top: '25%' }} className="absolute pointer-events-auto">
                <NodeBadge num="6" isActive={isNodeActive(6)} isLocked={lockedNode === 6} onMouseEnter={handleEnter(6)} onMouseLeave={handleLeave} onClick={handleClick(6)} />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Legend Sequence */}
        <div className="flex-1 bg-[#F4F4EE] flex flex-col">
          <SectionHeader subtitle="Sequence Map" title="Deck Operations" />
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center gap-4 text-sm font-semibold text-[#2A2A24]">
            {sequenceLegend.map(item => (
              <button
                type="button"
                key={item.n}
                aria-pressed={lockedNode === item.n}
                aria-label={`Node 0${item.n}: ${item.text}. Toggle highlight.`}
                onMouseEnter={handleEnter(item.n)}
                onMouseLeave={handleLeave}
                onFocus={handleEnter(item.n)}
                onBlur={handleLeave}
                onClick={handleClick(item.n)}
                className={`flex items-center gap-4 p-3 border transition-all cursor-pointer bg-white text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1A1A1A]
                  ${isNodeActive(item.n) ? 'border-blue-500 shadow-md scale-105 z-10 text-blue-800' : 'border-[#1A1A1A] hover:bg-[#EDEDE6] opacity-60 hover:opacity-100'}`}
              >
                <div className={`w-8 h-8 flex items-center justify-center rounded-full border font-bold shrink-0 transition-colors
                  ${isNodeActive(item.n) ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-[#1A1A1A] text-[#1A1A1A]'}`} aria-hidden="true">
                  0{item.n}
                </div>
                <span className="tracking-wide">{item.text}</span>
              </button>
            ))}
            <p className="text-[10px] font-bold text-[#6B6660] mt-4 italic leading-relaxed">
              * carrier shown at peak overlap condition: 2 on-deck active / 1 in service / 1 exiting
              <br/>
              * hover to preview, click to lock — or hover the timeline below to trace flow
            </p>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: RING DIAGRAM & RULES */}
      <div className="flex flex-col lg:flex-row border-b border-[#1A1A1A] bg-white">

        {/* Left: Airspace Ring */}
        <div className="flex-[1] border-b lg:border-b-0 lg:border-r border-[#1A1A1A]">
          <SectionHeader subtitle="Approach Management" title="Airspace Ring" />
          <div className="p-6 h-[250px] flex items-center justify-center relative">
            <svg viewBox="0 0 300 200" className="w-full h-full max-w-[400px]" aria-hidden="true">
              <defs>
                 <marker id="s04-arrow-sm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#1A1A1A" />
                </marker>
              </defs>
              <rect x="140" y="90" width="20" height="8" fill="#1A1A1A" />
              <circle cx="150" cy="94" r="25" fill="none" stroke="#1A1A1A" strokeWidth="2" />
              <line x1="150" y1="69" x2="150" y2="40" stroke="#1A1A1A" strokeWidth="2" />
              <circle cx="150" cy="40" r="4" fill="#1A1A1A" />

              <path d="M 50 50 C 80 150, 100 100, 130 100" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#s04-arrow-sm)" className={isNodeActive(5) || isNodeActive(6) ? 'animate-dash stroke-blue-500' : ''} />
              <path d="M 250 50 C 220 150, 200 100, 170 100" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#s04-arrow-sm)" className={isNodeActive(1) ? 'animate-dash stroke-blue-500' : ''} />

              <rect x="155" y="32" width="50" height="16" fill="#fff" />
              <text x="160" y="44" fontSize="10" fontWeight="bold" fill="#64748b">UPLINK</text>

              <rect x="55" y="55" width="70" height="16" fill="#fff" />
              <text x="60" y="67" fontSize="10" fontWeight="bold" fill="#1A1A1A">PORT HOLD</text>

              <rect x="205" y="55" width="70" height="16" fill="#fff" />
              <text x="210" y="67" fontSize="10" fontWeight="bold" fill="#1A1A1A">STBD HOLD</text>

              <text x="100" y="160" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="middle">RECOVERY SLOT</text>
              <text x="200" y="160" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="middle">LAUNCH EGRESS</text>
            </svg>
          </div>
          <div className="bg-[#F4F4EE] border-t border-[#1A1A1A] p-3 text-center">
            <p className="text-[10px] font-bold text-[#6B6660] uppercase tracking-widest">
              Holding stack keeps deck from becoming the timing buffer
            </p>
          </div>
        </div>

        {/* Right: Rules */}
        <div className="flex-[1.5] flex flex-col">
          <SectionHeader subtitle="Doctrine" title="Deck Saturation Rules" />
          <div className="p-6 md:p-8 flex-1 flex flex-col justify-center gap-4 text-sm font-semibold text-[#1A1A1A]">
            <p className={`transition-opacity ${isNodeActive(6) ? 'text-red-600' : ''}`}>R1 // NEVER BLOCK RECOVERY ARC WITH COLD-STORED AIRFRAMES</p>
            <p className={`transition-opacity ${isNodeActive(4) ? 'text-blue-600' : ''}`}>R2 // SERVICE CELL ONLY HOLDS ONE HARD-DOWN VEHICLE</p>
            <p className={`transition-opacity ${isNodeActive(2) || isNodeActive(3) ? 'text-blue-600' : ''}`}>R3 // HOT STAGING MAX = TWO MISSION-READY AIRFRAMES</p>
            <p className={`transition-opacity ${isNodeActive(1) ? 'text-blue-600' : ''}`}>R4 // LAUNCH WINDOW OPENS ONLY AFTER DECK CLEAR OF INBOUND</p>
            <p className={`transition-opacity ${isNodeActive(5) ? 'text-blue-600' : ''}`}>R5 // OFF-DECK HOLD STACK ABSORBS TIMING VARIANCE</p>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: GANTT CHART */}
      <div className="flex flex-col bg-white">
        <SectionHeader subtitle="12-Minute Staggered Wave" title="Timed Sortie Choreography" />
        <SortieTimeline activeAction={activeAction} setActiveAction={setActiveAction} />
      </div>

      {/* FOOTER */}
      <div className="bg-[#1A1A1A] text-white p-4 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
        <span>Off-Deck Hold Geometry // Port / STBD Stack + Recovery Slot</span>
        <span className="text-[#8F8A82]">Note // This sheet shifts the concept from object design to wave management</span>
      </div>
    </div>
  );
}
