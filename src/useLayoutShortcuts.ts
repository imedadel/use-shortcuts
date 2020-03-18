import { useLayoutEffect, useMemo } from 'react';
// import "shim-keyboard-event-key";
import {
  Shortcuts,
  Options,
  mapModifierKeys,
  getActiveModifierKeys,
  modifierKeyPressed,
} from './utils';

const useShortcuts = (
  shortcuts: Shortcuts,
  options: Options = { KEY_SEQUENCE_TIMEOUT: 1000, SINGLE_KEY_TIMEOUT: 100 }
) => {
  const shortcutsKeys = useMemo(() => Object.keys(shortcuts), [shortcuts]);

  useLayoutEffect(() => {
    let keySequence: string[] = [];
    let sequenceTimer: number | undefined;
    console.log({ keySequence, sequenceTimer });

    const clearSequenceTimer = () =>
      sequenceTimer && clearTimeout(sequenceTimer);

    const resetKeySequence = () => {
      clearSequenceTimer();
      keySequence = [];
    };

    const handleKeySequence = (event: KeyboardEvent, keys: string[]) => {
      clearSequenceTimer();

      sequenceTimer = window.setTimeout(() => {
        resetKeySequence();
      }, options.KEY_SEQUENCE_TIMEOUT);

      keySequence.push(event.key.toLowerCase());

      const joinedKeySeq = keySequence.join(' ');
      const callbackIndex = keys.find(k => k === joinedKeySeq);
      if (callbackIndex) {
        if (keySequence.length > 1) {
          resetKeySequence();
          shortcuts[callbackIndex](event);
        } else {
          sequenceTimer = window.setTimeout(() => {
            resetKeySequence();
            shortcuts[callbackIndex](event);
          }, options.SINGLE_KEY_TIMEOUT);
        }
      }
    };

    const handleModifierCombo = (event: KeyboardEvent, keys: string[]) => {
      const activeModKeys = mapModifierKeys(getActiveModifierKeys(event));
      const joinedKeys = [...activeModKeys, event.key.toLowerCase()].join('+');
      const callbackIndex = keys.find(k => k === joinedKeys);

      if (callbackIndex) {
        shortcuts[callbackIndex](event);
      }
    };

    const onKeydown = (event: KeyboardEvent) => {
      // chrome autocomplete triggers 'keydown' event but event.key will be
      // undefined. See https://bugs.chromium.org/p/chromium/issues/detail?id=581537
      if (event.key === undefined) {
        return;
      }

      // Handle modifier key combos
      if (modifierKeyPressed(event)) {
        handleModifierCombo(event, shortcutsKeys);
        return;
      }

      // Handle key sequences
      handleKeySequence(event, shortcutsKeys);
    };

    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [shortcutsKeys, shortcuts, options]);
};

export default useShortcuts;
