/* eslint-disable no-undef */
import React from 'react';

import Graphin, { Utils } from '@antv/graphin';
import LayoutSelector from './LayoutSelector';
import networkLayouts from './network-layouts';

const data = Utils.mock(10).tree().graphin();

export default () => {
  const [state, setState] = React.useState({
    type: 'dagre',
    options: {},
  });

  const handleChange = value => {
    console.log('value', value);
    setState(value);
  };
  const { type, options } = state;

  return (
    <div>
      <Graphin data={data} layout={{ type, ...options }}>
        <LayoutSelector type={type} layouts={networkLayouts} onChange={handleChange} />
      </Graphin>
    </div>
  );
};
