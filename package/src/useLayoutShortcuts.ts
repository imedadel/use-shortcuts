import { useLayoutEffect, useMemo } from 'react';
import { Shortcuts, Options, handleKeyDown } from './utils';

export const useLayoutShortcuts = (
  shortcuts: Shortcuts,
  options: Options = { KEY_SEQUENCE_TIMEOUT: 1000, SINGLE_KEY_TIMEOUT: 100 }
) => {
  const shortcutsKeys = useMemo(() => Object.keys(shortcuts), [shortcuts]);

  useLayoutEffect(() => handleKeyDown({ shortcuts, shortcutsKeys, options }), [
    shortcutsKeys,
    shortcuts,
    options,
  ]);
};
