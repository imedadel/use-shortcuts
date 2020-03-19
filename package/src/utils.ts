export function getActiveModifierKeys(event: KeyboardEvent): string[] {
  let modifiers = [];
  if (event.ctrlKey) modifiers.push('ctrlKey');
  if (event.shiftKey) modifiers.push('shiftKey');
  if (event.altKey) modifiers.push('altKey');
  if (event.metaKey) modifiers.push('metaKey');

  return modifiers;
}

export const modiferKeyMap: { [key: string]: string } = {
  ctrlKey: 'Control',
  shiftKey: 'Shift',
  altKey: 'Alt',
  metaKey: 'Meta',
};

export const mapModifierKeys = (keys: string[]) =>
  keys.map(k => modiferKeyMap[k]);

export const modifierKeyPressed = (event: KeyboardEvent) =>
  event.altKey || event.ctrlKey || event.shiftKey || event.metaKey;

export type Options = {
  KEY_SEQUENCE_TIMEOUT: number;
  SINGLE_KEY_TIMEOUT: number;
};

export type Shortcuts = {
  [shortcut: string]: (event: KeyboardEvent) => void;
};

export const find = (keys: string[], el: string) => {
  let r: string | null = null;

  for (let index = 0; index < keys.length; index++) {
    if (keys[index] === el) {
      r = keys[index];
      break;
    }
  }

  return r;
};

export const handleKeyDown = ({
  shortcuts,
  shortcutsKeys,
  options,
}: {
  shortcuts: Shortcuts;
  shortcutsKeys: string[];
  options: Options;
}) => {
  let keySequence: string[] = [];
  let sequenceTimer: number | undefined;

  const clearSequenceTimer = () => sequenceTimer && clearTimeout(sequenceTimer);

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
    const callbackIndex = find(keys, joinedKeySeq);
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
    const callbackIndex = find(keys, joinedKeys);

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
};
