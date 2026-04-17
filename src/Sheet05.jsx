import React from 'react';
import { useHoverLock } from './hooks/useHoverLock.js';

// Interactive state card wrapper — keyboard + mouse + click-to-lock.
const StateCard = ({ state, locked, onEnter, onLeave, onClick, label, children }) => {
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <g
      className="state-card state-card-hit"
      data-state={state}
      data-locked={locked ? 'true' : undefined}
      tabIndex={0}
      role="button"
      aria-pressed={locked}
      aria-label={label}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </g>
  );
};

export default function Sheet05({ lockedState05, setLockedState05 }) {
  const { current: activeState, handleEnter, handleLeave, handleClick } =
    useHoverLock({ locked: lockedState05, setLocked: setLockedState05 });

  return (
    <div className="w-full bg-[#f3f1ec]">
      <svg
        viewBox="0 0 1600 1100"
        className="s05-svg w-full h-auto"
        data-active-state={activeState || undefined}
        role="img"
        aria-labelledby="s05-title s05-desc"
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="s05-title">TR-001 Sea Carrier — Sheet 05 — Contested Launch / Recovery Doctrine</title>
        <desc id="s05-desc">
          Procedural doctrine sheet showing contested launch and recovery logic across four operating states.
        </desc>

        <defs>
          <marker id="s05-arrow-blue" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#2f6da3" />
          </marker>
          <marker id="s05-arrow-red" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#bf4a3f" />
          </marker>
          <marker id="s05-arrow-amber" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b9822e" />
          </marker>

          <g id="s05-uav-top">
            <path className="uav" d="M -28 0 L -10 -8 L 18 -8 L 28 0 L 18 8 L -10 8 Z" />
          </g>
          <g id="s05-continuity-icon">
            <rect x="-9" y="-6" width="18" height="12" rx="2" ry="2" className="charcoal secondary-stroke" />
            <line x1="-5" y1="-2.5" x2="5" y2="-2.5" className="charcoal secondary-stroke" />
            <line x1="-5" y1="0" x2="5" y2="0" className="charcoal secondary-stroke" />
            <line x1="-5" y1="2.5" x2="5" y2="2.5" className="charcoal secondary-stroke" />
          </g>
          <g id="s05-hold-icon">
            <circle cx="0" cy="0" r="10" className="charcoal secondary-stroke" />
            <circle cx="0" cy="0" r="3" className="charcoal" />
          </g>
        </defs>

        {/* Background + sheet frame */}
        <rect x="0" y="0" width="1600" height="1100" className="bg" />
        <rect x="60" y="60" width="1480" height="980" className="frame" />

        {/* Header */}
        <g>
          <text x="60" y="78" className="title">TR-001 SEA CARRIER</text>
          <text x="60" y="100" className="subtitle">SHEET 05 — CONTESTED LAUNCH / RECOVERY DOCTRINE</text>
          <text x="1315" y="72" className="meta">REV A</text>
          <text x="1315" y="86" className="meta">ORTHO / PROCEDURAL STUDY</text>
          <text x="1315" y="100" className="meta">NOT TO SCALE</text>
        </g>

        {/* ===== PANEL A: OPERATING STATE MATRIX ===== */}
        <g>
          <rect x="60" y="120" width="1480" height="160" className="panel" />
          <text x="76" y="140" className="panel-title">OPERATING STATE MATRIX</text>

          {/* State A — Normal Linked Ops */}
          <StateCard
            state="A"
            locked={lockedState05 === 'A'}
            onEnter={handleEnter('A')}
            onLeave={handleLeave}
            onClick={handleClick('A')}
            label="State A — Normal Linked Ops. Toggle highlight."
          >
            <rect x="60" y="120" width="358" height="160" className="panel state-frame" />
            <text x="76" y="142" className="state-tag">STATE A</text>
            <text x="76" y="164" className="card-title">NORMAL LINKED OPS</text>
            <circle cx="86" cy="188" r="3" className="blue-fill" />
            <line x1="89" y1="188" x2="106" y2="188" className="blue arrow-stroke" />
            <circle cx="109" cy="188" r="3" className="blue-fill" />
            <line x1="112" y1="188" x2="129" y2="188" className="blue arrow-stroke" />
            <circle cx="132" cy="188" r="3" className="blue-fill" />
            <text x="76" y="214" className="small">• full mission link continuity</text>
            <text x="76" y="230" className="small">• balanced launch / recovery rhythm</text>
            <text x="76" y="246" className="small">• full servicing available</text>
            <rect x="76" y="252" width="150" height="18" className="priority-badge" />
            <text x="84" y="265" className="small">PRIMARY // TEMPO</text>
          </StateCard>

          {/* State B — Degraded Comms */}
          <StateCard
            state="B"
            locked={lockedState05 === 'B'}
            onEnter={handleEnter('B')}
            onLeave={handleLeave}
            onClick={handleClick('B')}
            label="State B — Degraded Comms. Toggle highlight."
          >
            <rect x="434" y="120" width="358" height="160" className="panel state-frame" />
            <text x="450" y="142" className="state-tag">STATE B</text>
            <text x="450" y="164" className="card-title">DEGRADED COMMS</text>
            <circle cx="460" cy="188" r="3" className="blue-fill" />
            <line x1="463" y1="188" x2="480" y2="188" className="blue arrow-stroke" />
            <line x1="488" y1="188" x2="505" y2="188" className="dashed-blue" />
            <circle cx="508" cy="188" r="3" className="blue-fill" />
            <path d="M 530 182 L 538 196 L 522 196 Z" className="red-fill" />
            <text x="450" y="214" className="small">• partial autonomy on return</text>
            <text x="450" y="230" className="small">• recovery prioritized over launch</text>
            <text x="450" y="246" className="small">• positive ID required before requeue</text>
            <rect x="450" y="252" width="150" height="18" className="priority-badge" />
            <text x="458" y="265" className="small">PRIMARY // SAFE INTAKE</text>
          </StateCard>

          {/* State C — Cyber / Telecom Disruption */}
          <StateCard
            state="C"
            locked={lockedState05 === 'C'}
            onEnter={handleEnter('C')}
            onLeave={handleLeave}
            onClick={handleClick('C')}
            label="State C — Cyber/Telecom Disruption. Toggle highlight."
          >
            <rect x="808" y="120" width="358" height="160" className="panel state-frame" />
            <text x="824" y="142" className="state-tag">STATE C</text>
            <text x="824" y="164" className="card-title">CYBER / TELECOM DISRUPTION</text>
            <line x1="834" y1="188" x2="862" y2="188" className="blue arrow-stroke" />
            <line x1="870" y1="188" x2="900" y2="188" className="dashed-red" />
            <rect x="906" y="180" width="32" height="16" className="red-soft" />
            <text x="824" y="214" className="small">• shore retasking delayed</text>
            <text x="824" y="230" className="small">• onboard continuity cell takes over</text>
            <text x="824" y="246" className="small">• relay / ISR sorties prioritized</text>
            <rect x="824" y="252" width="150" height="18" className="priority-badge" />
            <text x="832" y="265" className="small">PRIMARY // CONTINUITY</text>
          </StateCard>

          {/* State D — Surge Under Stand-off Pressure */}
          <StateCard
            state="D"
            locked={lockedState05 === 'D'}
            onEnter={handleEnter('D')}
            onLeave={handleLeave}
            onClick={handleClick('D')}
            label="State D — Surge under stand-off pressure. Toggle highlight."
          >
            <rect x="1182" y="120" width="358" height="160" className="panel state-frame" />
            <text x="1198" y="142" className="state-tag">STATE D</text>
            <text x="1198" y="164" className="card-title">SURGE UNDER STAND-OFF PRESSURE</text>
            <rect x="1202" y="182" width="12" height="12" className="amber-fill" />
            <rect x="1218" y="182" width="12" height="12" className="amber-fill" />
            <rect x="1234" y="182" width="12" height="12" className="amber-fill" />
            <rect x="1250" y="182" width="12" height="12" className="amber-fill" />
            <line x1="1268" y1="188" x2="1294" y2="188" className="red arrow-stroke" />
            <text x="1198" y="214" className="small">• deck saturation risk rises</text>
            <text x="1198" y="230" className="small">• turnaround depth reduced</text>
            <text x="1198" y="246" className="small">• rapid relaunch overrides full service</text>
            <rect x="1198" y="252" width="168" height="18" className="priority-badge" />
            <text x="1206" y="265" className="small">PRIMARY // CLEAR + RELAUNCH</text>
          </StateCard>
        </g>

        {/* ===== PANEL B: PLAN VIEW DOCTRINE OVERLAY ===== */}
        <g>
          <rect x="60" y="308" width="980" height="456" className="panel" />
          <text x="76" y="328" className="panel-title">PLAN VIEW DOCTRINE OVERLAY</text>

          {/* Hull outlines */}
          <path className="charcoal primary-stroke" d="M 186 488 Q 328 420 560 402 L 736 402 L 782 470 L 926 536 L 782 602 L 736 670 L 560 670 Q 328 652 186 584 L 154 560 L 154 512 Z" />
          <path className="charcoal secondary-stroke" d="M 438 480 L 624 480 L 696 536 L 624 592 L 438 592 Z" />
          <rect x="498" y="504" width="104" height="64" className="blue-soft" />
          <use href="#s05-continuity-icon" transform="translate(550,536)" />
          <text x="490" y="460" className="small">MISSION CONTINUITY CELL</text>

          <line x1="90" y1="536" x2="236" y2="536" className="blue arrow-stroke" markerEnd="url(#s05-arrow-blue)" />
          <text x="94" y="514" className="small">APPROACH LANE</text>

          <rect x="238" y="498" width="140" height="76" className="blue-soft" />
          <text x="242" y="490" className="small">SAFE INTAKE BAND</text>

          <circle cx="416" cy="536" r="30" className="red-soft" />
          <use href="#s05-hold-icon" transform="translate(416,536)" />
          <text x="380" y="490" className="small">HOLD / VERIFY POSITION</text>

          <line x1="450" y1="536" x2="554" y2="536" className="amber arrow-stroke" markerEnd="url(#s05-arrow-amber)" />
          <text x="452" y="514" className="small">HOT CLEAR LANE</text>

          <rect x="566" y="472" width="122" height="96" className="amber-soft" />
          <text x="568" y="462" className="small">SERVICE POCKET</text>

          <rect x="686" y="458" width="148" height="118" className="soft-fill" style={{ stroke: '#222222', strokeWidth: 1.2 }} />
          <text x="688" y="448" className="small">READY RACK</text>

          <line x1="706" y1="586" x2="870" y2="586" className="amber arrow-stroke" markerEnd="url(#s05-arrow-amber)" />
          <text x="708" y="610" className="small">CONDITIONAL RELAUNCH QUEUE</text>

          <line x1="762" y1="536" x2="926" y2="536" className="blue arrow-stroke" markerEnd="url(#s05-arrow-blue)" />
          <text x="754" y="514" className="small">RELAY PRIORITY LAUNCH LINE</text>

          <path d="M 894 400 L 894 480 L 816 480" className="dashed-red" />
          <text x="736" y="392" className="small muted">EXTERNAL NETWORK INSTABILITY</text>

          <use href="#s05-uav-top" transform="translate(190,536)" />
          <use href="#s05-uav-top" transform="translate(416,536)" />
          <use href="#s05-uav-top" transform="translate(626,520)" />
          <use href="#s05-uav-top" transform="translate(800,586)" />

          <line x1="550" y1="536" x2="760" y2="536" className="blue arrow-stroke" markerEnd="url(#s05-arrow-blue)" />
          <line x1="550" y1="536" x2="626" y2="520" className="blue arrow-stroke" markerEnd="url(#s05-arrow-blue)" />

          <line x1="416" y1="536" x2="416" y2="586" className="dashed-red" markerEnd="url(#s05-arrow-red)" />
          <line x1="416" y1="586" x2="314" y2="586" className="dashed-red" />

          <line x1="626" y1="520" x2="704" y2="586" className="amber arrow-stroke" markerEnd="url(#s05-arrow-amber)" />

          <line x1="454" y1="568" x2="360" y2="616" className="red secondary-stroke" />
          <text x="288" y="626" className="small">LINK-LOSS RECOVERY PRIORITY</text>

          <line x1="294" y1="498" x2="294" y2="450" className="guide" />
          <text x="248" y="442" className="small">LINKED APPROACH / STANDARD INTAKE</text>

          <line x1="626" y1="472" x2="626" y2="430" className="guide" />
          <text x="566" y="422" className="small">SERVICE DEPTH REDUCED IN SURGE MODE</text>

          <line x1="800" y1="586" x2="800" y2="642" className="guide" />
          <text x="742" y="658" className="small">QUEUE COMPRESSES AS STAND-OFF PRESSURE RISES</text>

          <line x1="238" y1="574" x2="238" y2="634" className="guide" />
          <text x="196" y="650" className="small">DECK CLEAR IN &lt; 01 CYCLE</text>

          <line x1="498" y1="504" x2="498" y2="436" className="guide" />
          <text x="438" y="426" className="small">RELAY SORTIES PRIORITIZED UNDER NETWORK LOSS</text>
        </g>

        {/* ===== PANEL D: AUTONOMY / HUMAN OVERSIGHT LADDER ===== */}
        <g>
          <rect x="1068" y="308" width="472" height="208" className="panel" />
          <text x="1084" y="328" className="panel-title">AUTONOMY / HUMAN OVERSIGHT LADDER</text>

          <line x1="1118" y1="344" x2="1118" y2="478" className="charcoal secondary-stroke" />

          <rect x="1140" y="338" width="188" height="20" className="soft-fill" style={{ stroke: '#222222', strokeWidth: 1 }} />
          <rect x="1140" y="370" width="188" height="20" className="soft-fill" style={{ stroke: '#222222', strokeWidth: 1 }} />
          <rect x="1140" y="402" width="188" height="20" className="soft-fill" style={{ stroke: '#222222', strokeWidth: 1 }} />
          <rect x="1140" y="434" width="188" height="20" className="soft-fill" style={{ stroke: '#222222', strokeWidth: 1 }} />
          <rect x="1140" y="466" width="188" height="20" className="red-soft" />

          <text x="1150" y="352" className="small">HUMAN-DIRECTED</text>
          <text x="1150" y="384" className="small">HUMAN-SUPERVISED</text>
          <text x="1150" y="416" className="small">EXCEPTION-BASED AUTONOMY</text>
          <text x="1150" y="448" className="small">SAFE-RETURN AUTONOMY</text>
          <text x="1150" y="480" className="small">HOLD / QUARANTINE STATE</text>

          <rect x="1122" y="334" width="8" height="96" className="blue-fill" />
          <rect x="1122" y="438" width="8" height="16" className="amber-fill" />

          <text x="1350" y="352" className="small">launch authority highest in 1–2</text>
          <text x="1350" y="418" className="small">recovery safety preserved in 3–4</text>
          <text x="1350" y="480" className="small">relaunch suppressed in 5</text>
        </g>

        {/* ===== PANEL E: DECK PRIORITIES BY CONDITION ===== */}
        <g>
          <rect x="1068" y="532" width="472" height="232" className="panel" />
          <text x="1084" y="552" className="panel-title">DECK PRIORITIES BY CONDITION</text>

          <line x1="1086" y1="580" x2="1522" y2="580" className="table-line" />
          <line x1="1086" y1="618" x2="1522" y2="618" className="table-line" />
          <line x1="1086" y1="656" x2="1522" y2="656" className="table-line" />
          <line x1="1086" y1="694" x2="1522" y2="694" className="table-line" />
          <line x1="1086" y1="732" x2="1522" y2="732" className="table-line" />

          <text x="1086" y="572" className="small">CONDITION</text>
          <text x="1196" y="572" className="small">FIRST PRIORITY</text>
          <text x="1311" y="572" className="small">SECOND PRIORITY</text>
          <text x="1426" y="572" className="small">SUPPRESS</text>

          <g className="priorities-row" data-state="A">
            <rect x="1086" y="586" width="6" height="20" className="blue-fill" />
            <text x="1100" y="600" className="small">NORMAL</text>
            <text x="1196" y="600" className="small">launch tempo</text>
            <text x="1311" y="600" className="small">payload turn</text>
            <text x="1426" y="600" className="small">none</text>
          </g>

          <g className="priorities-row" data-state="B">
            <rect x="1086" y="624" width="6" height="20" className="red-fill" />
            <text x="1100" y="638" className="small">DEGRADED COMMS</text>
            <text x="1196" y="638" className="small">safe recovery</text>
            <text x="1311" y="638" className="small">ID confirmation</text>
            <text x="1426" y="638" className="small">nonessential launch</text>
          </g>

          <g className="priorities-row" data-state="C">
            <rect x="1086" y="662" width="3" height="20" className="blue-fill" />
            <rect x="1089" y="662" width="3" height="20" className="red-fill" />
            <text x="1100" y="676" className="small">TELECOM DISRUPTION</text>
            <text x="1196" y="676" className="small">continuity relay</text>
            <text x="1311" y="676" className="small">ISR relaunch</text>
            <text x="1426" y="676" className="small">deep re-role</text>
          </g>

          <g className="priorities-row" data-state="D">
            <rect x="1086" y="700" width="6" height="20" className="amber-fill" />
            <text x="1100" y="714" className="small">SURGE / STAND-OFF</text>
            <text x="1196" y="714" className="small">deck clearance</text>
            <text x="1311" y="714" className="small">fast relaunch</text>
            <text x="1426" y="714" className="small">full maintenance</text>
          </g>
        </g>

        {/* ===== PANEL C: STATE TRANSITION LOGIC ===== */}
        <g>
          <rect x="60" y="792" width="1480" height="220" className="panel" />
          <text x="76" y="812" className="panel-title">STATE TRANSITION LOGIC</text>

          <line x1="212" y1="878" x2="444" y2="878" className="charcoal arrow-stroke" markerEnd="url(#s05-arrow-blue)" />
          <line x1="496" y1="878" x2="728" y2="878" className="charcoal arrow-stroke" markerEnd="url(#s05-arrow-red)" />
          <line x1="780" y1="878" x2="1012" y2="878" className="charcoal arrow-stroke" markerEnd="url(#s05-arrow-amber)" />
          <line x1="1064" y1="878" x2="1296" y2="878" className="charcoal arrow-stroke" markerEnd="url(#s05-arrow-blue)" />

          <g className="transition-node" data-state="A">
            <circle cx="186" cy="878" r="26" className="node" />
            <text x="146" y="836" className="small">LINKED OPS</text>
            <text x="134" y="924" className="small">normal queue discipline</text>
          </g>
          <g className="transition-node" data-state="B">
            <circle cx="470" cy="878" r="26" className="node" />
            <text x="418" y="836" className="small">DEGRADED COMMS</text>
            <text x="404" y="924" className="small">safe intake overrides tempo</text>
          </g>
          <g className="transition-node" data-state="C">
            <circle cx="754" cy="878" r="26" className="node" />
            <text x="706" y="836" className="small">NETWORK STRESS</text>
            <text x="654" y="924" className="small">continuity cell assumes routing role</text>
          </g>
          <g className="transition-node" data-state="D">
            <circle cx="1038" cy="878" r="26" className="node" />
            <text x="998" y="836" className="small">SURGE MODE</text>
            <text x="970" y="924" className="small">clear / service / relaunch compresses</text>
          </g>
          <g className="transition-node" data-state="A">
            <circle cx="1322" cy="878" r="26" className="node" />
            <text x="1260" y="836" className="small">STABILIZED RELAUNCH</text>
            <text x="1262" y="924" className="small">controlled sortie rhythm restored</text>
          </g>

          <line x1="150" y1="968" x2="1358" y2="968" className="guide" />
          <line x1="186" y1="962" x2="186" y2="974" className="guide" />
          <line x1="470" y1="962" x2="470" y2="974" className="guide" />
          <line x1="754" y1="962" x2="754" y2="974" className="guide" />
          <line x1="1038" y1="962" x2="1038" y2="974" className="guide" />
          <line x1="1322" y1="962" x2="1322" y2="974" className="guide" />
        </g>

        {/* ===== LEGEND FOOTER ===== */}
        <g>
          <text x="92" y="986" className="small">LEGEND</text>
          <line x1="92" y1="998" x2="118" y2="998" className="blue arrow-stroke" />
          <text x="126" y="1002" className="small">control / comms / sensing</text>

          <line x1="92" y1="1014" x2="118" y2="1014" className="red arrow-stroke" />
          <text x="126" y="1018" className="small">degraded / disrupted condition</text>

          <line x1="92" y1="1030" x2="118" y2="1030" className="amber arrow-stroke" />
          <text x="126" y="1034" className="small">turnaround / service / relaunch flow</text>

          <text x="1035" y="1030" className="small">Doctrine study for distributed maritime UAV reset, relay, and relaunch operations under contested conditions.</text>
        </g>
      </svg>
    </div>
  );
}
