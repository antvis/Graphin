import React, { useState } from 'react';
import { LayoutSelector } from '@antv/graphin-components';
import Graphin, { Utils } from '@antv/graphin';
import DemoLayoutSelector from './LayoutSelectorDemo';

const defaultLayout = {
  type: 'graphin-force',
  preset: {
    type: 'concentric',
  },
  animation: true,
};

const LayoutSelectorDemo = () => {
  const data = Utils.mock(5).circle().graphin();

  const [state, setState] = useState({
    layout: { ...defaultLayout, animation: false },
    data,
  });

  const updateLayout = (previousType, type) => {
    setState({
      layout: { ...defaultLayout, type },
      data,
    });
  };

  return (
    <Graphin data={state.data} layout={state.layout}>
      <LayoutSelector>
        <DemoLayoutSelector updateLayout={updateLayout} />
      </LayoutSelector>
    </Graphin>
  );
};

export default LayoutSelectorDemo;
