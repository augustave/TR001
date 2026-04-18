import React from 'react';

/**
 * Shared building blocks for the Procedural Doctrine Architecture.
 *
 * These primitives enforce the core rules of the art direction:
 *   - Every panel sits inside a strict 1px Terminal Ink border matrix
 *   - Inter 600 uppercase + tracked-out for display headers
 *   - Helvetica micro-type for data bodies
 *   - Space Mono for telemetry / meta chips
 *   - Doctrine Bone (#F4F4EE) canvas
 *
 * Sheet authors should compose these rather than hand-rolling borders,
 * padding, or font treatments — that is how we keep a unified terminal
 * aesthetic across the whole carrier set.
 */

/** Sheet-level header. Tight scale matching Sheet 05's doctrine title. */
export const DoctrineHeader = ({ title, subtitle, chipLeft, chipRight }) => (
  <header className="px-6 md:px-8 pt-6 md:pt-7 pb-5 border-b border-[#1A1A1A] bg-[#F4F4EE] relative">
    {(chipLeft || chipRight) && (
      <div className="flex justify-between items-center mb-3 doctrine-chip text-[10px] tracking-[1.2px] uppercase text-[#6B6660]">
        <span>&gt; {chipLeft}</span>
        {chipRight && <span className="text-right">{chipRight}</span>}
      </div>
    )}
    <h1 className="text-[1.8rem] md:text-[2rem] leading-[1] tracking-[2px] font-bold text-[#1A1A1A] uppercase">
      {title}
    </h1>
    {subtitle && (
      <p className="mt-2 text-[0.78rem] font-semibold tracking-[1px] text-[#3A3A34] uppercase">
        {subtitle}
      </p>
    )}
  </header>
);

/** Panel / section header sitting flush with a 1px bottom border. */
export const DoctrineSectionHeader = ({ eyebrow, title, right }) => (
  <div className="px-4 md:px-5 py-3 border-b border-[#1A1A1A] bg-[#F4F4EE] flex justify-between items-center gap-4">
    <div className="flex flex-col leading-tight">
      {eyebrow && (
        <span className="text-[0.6rem] font-semibold tracking-[1.2px] uppercase text-[#6B6660]">
          {eyebrow}
        </span>
      )}
      <span className="text-[0.82rem] md:text-[0.9rem] font-bold tracking-[1.1px] uppercase text-[#1A1A1A]">
        {title}
      </span>
    </div>
    {right && <div className="flex items-center gap-2">{right}</div>}
  </div>
);

/** Space Mono chip used for badges, meta readouts, and scale indicators. */
export const DoctrineChip = ({ children, className = '' }) => (
  <span className={`doctrine-chip inline-block border border-[#1A1A1A] px-2 py-[2px] text-[0.6rem] tracking-[1px] uppercase text-[#1A1A1A] bg-[#F4F4EE] ${className}`}>
    {children}
  </span>
);

/** Dimensioned scale bar at the bottom of carrier sheets. */
export const DoctrineScaleBar = ({ units = '10 UNITS' }) => (
  <div className="flex items-end gap-3">
    <div className="flex items-end" aria-hidden="true">
      <div className="h-3 border-l border-[#1A1A1A]" />
      <div className="w-16 border-b border-[#1A1A1A]" />
      <div className="h-3 border-l border-[#1A1A1A]" />
    </div>
    <span className="doctrine-chip text-[0.6rem] tracking-[1.2px] uppercase text-[#6B6660]">
      {units}
    </span>
  </div>
);
