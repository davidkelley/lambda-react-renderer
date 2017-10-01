import React from 'react';
import App from './views/App';

const DISPLAY_NAME = 'RootComponent';

const component = () => (
  <App />
);

component.displayName = DISPLAY_NAME;

export default component;
