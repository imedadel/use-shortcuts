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
