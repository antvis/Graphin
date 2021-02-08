/* eslint-disable no-undef */
import React from 'react';

import Graphin, { Utils } from '@antv/graphin';
import LayoutSelector from './LayoutSelector';
import layouts from './tree-layouts';

const data = Utils.mock(10).tree().graphinTree();

export default () => {
  const [state, setState] = React.useState({
    type: 'compactBox',
    options: {},
  });

  const handleChange = value => {
    console.log('value', value);
    setState(value);
  };
  const { type, options } = state;

  return (
    <div>
      <Graphin data={data} layout={{ type, ...options }} fitView>
        <LayoutSelector type={type} layouts={layouts} onChange={handleChange} />
      </Graphin>
    </div>
  );
};
