import React from 'react';
import { useHoverLock } from './hooks/useHoverLock.js';

/**
 * Sheet 05 — Procedural Doctrine Architecture
 *
 * Applies the "Tactical Schematics" art direction:
 *   - Doctrine Bone background (#F4F4EE)
 *   - 1px Terminal Ink borders (#1A1A1A) creating a flush structural matrix
 *   - Inter 600 tracked-out caps for display headers
 *   - Helvetica micro-type for data lists
 *   - Space Mono for raw telemetry
 *   - Conditional accents only for state changes
 *
 * Layout: one 4-column grid where the state matrix lives in the top row
 * and the plan-view doctrine overlay spans the entire bottom row.
 *
 * Interactivity: hover or click a state cell to lock it. When locked,
 * non-matching cells dim and plan-view layers tagged with that state
 * stay at full opacity while other layers fade.
 */

const SCORE_STREAMS = [
  // Each stream is a row of colored pixels representing a data rhythm measurement.
  [
    { color: 'var(--degraded-red)' },
    { color: 'var(--degraded-red)' },
    { color: 'var(--link-blue)' },
    { color: 'var(--link-blue)' },
    { color: 'var(--degraded-red)' },
    { color: 'var(--link-blue)' },
    { color: 'var(--surge-orange)' },
    { color: 'var(--surge-orange)' },
  ],
  [
    { color: 'var(--surge-orange)' },
    { color: 'var(--surge-orange)', width: 20 },
    { color: 'var(--radar-green)' },
    { color: 'var(--radar-green)' },
    { color: 'var(--terminal-ink)' },
  ],
  [
    { color: 'var(--terminal-ink)' },
    { color: 'transparent', border: true },
    { color: 'var(--terminal-ink)' },
    { color: 'transparent', border: true },
    { color: 'var(--link-blue)' },
    { color: 'var(--link-blue)' },
  ],
];

const StateCell = ({ state, labelTop, labelMain, geoClass, geoStyle, locked, active, onEnter, onLeave, onClick, children }) => {
  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <button
      type="button"
      className="s05-cell"
      data-state={state}
      data-locked={locked ? 'true' : undefined}
      aria-pressed={locked}
      aria-label={`${labelTop} — ${labelMain}. Toggle highlight.`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div className="s05-cell-header">
        <div className="s05-cell-label">
          <span className="s05-cell-label-top">{labelTop}</span>
          <span className="s05-cell-label-main">{labelMain}</span>
        </div>
        <div className={`s05-geo-icon ${geoClass || ''}`} style={geoStyle} aria-hidden="true" />
      </div>
      <div className="s05-cell-body">{children}</div>
    </button>
  );
};

export default function Sheet05({ lockedState05, setLockedState05 }) {
  const { current: activeState, handleEnter, handleLeave, handleClick } =
    useHoverLock({ locked: lockedState05, setLocked: setLockedState05 });

  const hintText = lockedState05
    ? `STATE ${lockedState05} LOCKED · CLICK AGAIN TO UNLOCK`
    : 'HOVER A STATE CELL TO PREVIEW · CLICK TO LOCK';

  return (
    <div className="sheet05-doctrine">
      {/* Header */}
      <div className="s05-sheet-header">
        <h1 className="s05-sheet-title">TR-001 DOMAIN OVERVIEW</h1>
        <div className="s05-sheet-subtitle">SHEET 05 — CONTESTED DATA / RECOVERY DOCTRINE</div>
        <div className="s05-sheet-hint">&gt; {hintText}</div>
      </div>

      {/* Strict 1px-bordered matrix */}
      <div className="s05-matrix-grid" data-active-state={activeState || undefined}>

        {/* State A — Normal Linked Ops */}
        <StateCell
          state="A"
          labelTop="OPERATING STATE MATRIX"
          labelMain="STATE A · NORMAL LINKED OPS"
          geoClass="s05-geo-blue"
          locked={lockedState05 === 'A'}
          active={activeState === 'A'}
          onEnter={handleEnter('A')}
          onLeave={handleLeave}
          onClick={handleClick('A')}
        >
          <ul className="s05-tech-list">
            <li>full mission link continuity</li>
            <li>balanced launch / recovery rhythm</li>
            <li>full servicing available</li>
          </ul>
          <span className="s05-state-badge">PRIMARY // TEMPO</span>
        </StateCell>

        {/* State B — Degraded Comms */}
        <StateCell
          state="B"
          labelTop="STATE B"
          labelMain="DEGRADED COMMS"
          geoClass="s05-geo-red"
          locked={lockedState05 === 'B'}
          active={activeState === 'B'}
          onEnter={handleEnter('B')}
          onLeave={handleLeave}
          onClick={handleClick('B')}
        >
          <ul className="s05-tech-list">
            <li>partial autonomy on return</li>
            <li>recovery prioritized over launch</li>
            <li>positive ID required before requeue</li>
          </ul>
          <span className="s05-state-badge">PRIMARY // SAFE INTAKE</span>
        </StateCell>

        {/* State C — Automata Sweep */}
        <StateCell
          state="C"
          labelTop="STATE C"
          labelMain="AUTOMATA SWEEP"
          geoClass="s05-geo-green"
          locked={lockedState05 === 'C'}
          active={activeState === 'C'}
          onEnter={handleEnter('C')}
          onLeave={handleLeave}
          onClick={handleClick('C')}
        >
          <div className="s05-terminal" aria-label="Automata sweep telemetry">
            {`> SCANNING GRID...
> MIN SCORE: 75
> PROXIMITY: 16
> [10110] [00010]
> [01010] [11100]
> [11001] [10010]
> LOCK: PARTIAL`}
          </div>
        </StateCell>

        {/* State D — Data Rhythm Metrics */}
        <StateCell
          state="D"
          labelTop="STATE D"
          labelMain="DATA RHYTHM METRICS"
          geoClass="s05-geo-orange"
          locked={lockedState05 === 'D'}
          active={activeState === 'D'}
          onEnter={handleEnter('D')}
          onLeave={handleLeave}
          onClick={handleClick('D')}
        >
          {SCORE_STREAMS.map((stream, streamIdx) => (
            <div key={streamIdx} className="s05-score-stream">
              {stream.map((px, pxIdx) => (
                <div
                  key={pxIdx}
                  className="s05-score-px"
                  style={{
                    background: px.color,
                    width: px.width ? `${px.width}px` : undefined,
                    border: px.border ? '1px solid var(--terminal-ink)' : undefined,
                  }}
                />
              ))}
            </div>
          ))}
          <span className="s05-state-badge">STREAM // ACTIVE</span>
        </StateCell>

        {/* Plan View Doctrine Overlay — spans all 4 columns */}
        <div className="s05-cell s05-plan-cell" data-state="plan" aria-label="Plan view doctrine overlay">
          <div className="s05-cell-header">
            <div className="s05-cell-label">
              <span className="s05-cell-label-top">OVERLAY</span>
              <span className="s05-cell-label-main">PLAN VIEW DOCTRINE</span>
            </div>
            <span className="s05-state-badge" style={{ fontSize: '0.58rem' }}>REV A · NOT TO SCALE</span>
          </div>
          <div className="s05-cell-body">
            <svg className="s05-plan-svg" viewBox="0 0 1000 260" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              {/* Safe intake band (blue zone) — State A */}
              <polygon className="path-zone" data-layer="A" points="150,125 300,50 700,50 850,125 700,200 300,200" />
              <text x="316" y="65" className="plan-label-mono" data-layer="A">SAFE INTAKE BAND</text>

              {/* Primary blue lane — State A */}
              <path className="path-main" data-layer="A" d="M 50,125 L 350,125 L 400,90 L 600,90 L 650,125 L 950,125" />

              {/* Surge orange route — State D */}
              <path className="path-surge" data-layer="D" d="M 400,160 L 600,160 L 650,125" />
              <path className="path-surge" data-layer="D" strokeDasharray="4,4" d="M 600,90 L 600,160" />

              {/* Surge markers — State D */}
              <rect x="550" y="85" width="10" height="10" className="surge-marker" data-layer="D" />
              <rect x="580" y="155" width="10" height="10" className="surge-marker" data-layer="D" />
              <rect x="700" y="125" width="10" height="10" className="surge-marker" data-layer="D" transform="rotate(45 705 130)" />

              {/* Approach chevron + label — State A */}
              <polygon points="120,120 150,125 120,130" fill="#1A1A1A" data-layer="A" />
              <text x="50" y="115" className="plan-label" data-layer="A">APPROACH LANE</text>

              {/* HOLD / VERIFY — State B */}
              <circle cx="400" cy="125" r="25" className="hold-circle" data-layer="B" />
              <line x1="370" y1="125" x2="430" y2="125" className="hold-cross" data-layer="B" />
              <line x1="400" y1="95" x2="400" y2="155" className="hold-cross" data-layer="B" />
              <text x="358" y="95" className="plan-label-red" data-layer="B">HOLD / VERIFY</text>

              {/* Automata sweep lattice — State C */}
              <g data-layer="C">
                <path className="path-telemetry" d="M 70,215 L 930,215" />
                <path className="path-telemetry" d="M 70,235 L 930,235" />
                {Array.from({ length: 22 }).map((_, i) => (
                  <rect
                    key={i}
                    x={70 + i * 40}
                    y={212}
                    width={3}
                    height={3}
                    fill="var(--radar-green)"
                    opacity={(i % 3 === 0) ? 1 : 0.5}
                  />
                ))}
                {Array.from({ length: 22 }).map((_, i) => (
                  <rect
                    key={`r${i}`}
                    x={70 + i * 40}
                    y={232}
                    width={3}
                    height={3}
                    fill="var(--radar-green)"
                    opacity={(i % 4 === 0) ? 1 : 0.35}
                  />
                ))}
                <text x="70" y="206" className="plan-label-mono" fill="#5CDB5C" style={{ fill: '#3a8a3a', letterSpacing: '1px' }}>
                  &gt; AUTOMATA SWEEP · 22 × 02 NODES
                </text>
              </g>

              {/* Centerline reference — persistent */}
              <line x1="0" y1="125" x2="1000" y2="125" stroke="#1A1A1A" strokeWidth="0.5" strokeDasharray="2,4" opacity="0.3" />

              {/* Scale bar / dimension — persistent */}
              <g data-layer="all">
                <line x1="50" y1="252" x2="150" y2="252" stroke="#1A1A1A" strokeWidth="1" />
                <line x1="50" y1="248" x2="50" y2="256" stroke="#1A1A1A" strokeWidth="1" />
                <line x1="150" y1="248" x2="150" y2="256" stroke="#1A1A1A" strokeWidth="1" />
                <text x="160" y="256" className="plan-label-mono">20 UNITS</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
