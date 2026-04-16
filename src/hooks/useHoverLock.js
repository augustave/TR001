import { useState, useCallback } from 'react';

/**
 * Hover + click-to-lock interaction pattern.
 *
 * `active` tracks the currently-hovered key. `locked` persists across leave.
 * `current` is the effective selection (hover wins over lock while hovering).
 *
 * Optionally accepts externally-controlled lock state so multiple consumers
 * (e.g. Sheet06 and Sheet07) can share the same lock via props from a parent.
 */
export function useHoverLock({ locked: externalLocked, setLocked: externalSetLocked } = {}) {
  const [activeInternal, setActiveInternal] = useState(null);
  const [lockedInternal, setLockedInternal] = useState(null);

  const locked = externalLocked !== undefined ? externalLocked : lockedInternal;
  const setLocked = externalSetLocked ?? setLockedInternal;

  const current = activeInternal ?? locked;

  const handleEnter = useCallback((key) => () => setActiveInternal(key), []);
  const handleLeave = useCallback(() => setActiveInternal(null), []);
  const handleClick = useCallback(
    (key) => () => setLocked((prev) => (prev === key ? null : key)),
    [setLocked]
  );

  return { current, active: activeInternal, locked, handleEnter, handleLeave, handleClick };
}
