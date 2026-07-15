import React from 'react';
import * as StarbucksUI from '@sbux/starbucks-design-react';
import * as StarbucksIcon from '@sbux/starbucks-design-react/icon';

const ReactLiveScope = {
  React,
  ...React,
  // Arco Design / Starbucks components
  ...StarbucksUI,
  // Icons
  ...StarbucksIcon,
};

export default ReactLiveScope;
