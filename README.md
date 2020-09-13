# ⚠ Use [react-use-hotkeys](https://github.com/reecelucas/react-use-hotkeys) instead. I don't see any reason for maintaining this version.

----

# useShortcuts

> A zero-dependencies hotkeys/shortcuts React hook

> Follow me on [Twitter](https://twitter.com/imedadel_) :)

![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/use-shortcuts.svg)
![npm](https://img.shields.io/npm/v/use-shortcuts.svg)

useShortcuts allows you to easily add and attach your hotkeys to the window. It is based on [react-use-hotkeys](https://github.com/reecelucas/react-use-hotkeys) but with a different goal/logic.

```jsx
useShortcuts({
  'd g': () => console.log('You pressed d then g'),
  'b g': () => console.log('You pressed b then g'),
  'Control+Alt+z': () => console.log('You pressed Control and Alt then g'),
  b: () => console.log('You pressed b'),
});
```

## Install

```Bash
yarn add use-shortcuts

# or using npm
npm i use-shortcuts
```

## Usage

By default, useShortcuts uses `useEffect()` internally

```jsx
import React from 'react';
import useShortcuts from 'useShortcuts';

const Example = () => {
  useShortcuts({
    'd g': () => console.log('You pressed d then g'),
  });

  return <div>...</div>;
};
```

Alternatively, you can import `useLayoutShortcuts`, which uses `useLayoutEffect()`

```jsx
import React from 'react';
import { useLayoutShortcuts } from 'useShortcuts';

const Example = () => {
  useLayoutShortcuts({
    'd g': () => console.log('You pressed d then g'),
  });

  return <div>...</div>;
};
```

### IE Support

If you need to support IE (in my case, I didn't) you have to install `shim-keyboard-event-key`

```Bash
yarn add shim-keyboard-event-key
```

Then import it before useShortcuts :)

```jsx
import React from 'react';
import 'shim-keyboard-event-key';
import useShortcuts from 'useShortcuts';

const Example = () => {
  useShortcuts({
    'd g': () => console.log('You pressed d then g'),
  });

  return <div>...</div>;
};
```

## API

_(Am I doing this right?)_

```ts
type Shortcuts = {
  [shortcut: string]: (event: KeyboardEvent) => void;
}

type Options = {
  KEY_SEQUENCE_TIMEOUT: number = 1000;
    SINGLE_KEY_TIMEOUT: number = 100;
}

useShortcuts(shortcuts: Shortcuts, options: Options);
````

## Difference with `react-use-hotkeys`

The main difference is that `react-use-hotkeys` attaches multiple events to the window. UseShortcuts, on the other hand, attaches a single event, which is helpful in case of an app with a huge number of shortcuts.
