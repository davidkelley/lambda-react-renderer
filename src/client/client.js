import React from 'react';
import Root from './views/Root';

const DISPLAY_NAME = 'RootComponent';

const component = () => (
  <Root />
);

component.displayName = DISPLAY_NAME;

export default component;
