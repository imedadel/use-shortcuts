import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useShortcuts from '../.';

const App = () => {
  useShortcuts({
    'd g': () => console.log('dg'),
    'b g': () => console.log('bg'),
    'Control+Alt+z': () => console.log('ctrlaltz'),
    b: () => console.log('b'),
  });

  return <div>Yo.</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
