import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';
import IconLoader from '@antv/graphin-icons';

const iconLoader = Graphin.registerFontFamily(IconLoader);

const data = Utils.mock(10)
  .circle()
  .graphin();
const layout = {
  type: 'concentric',
};

const defaultNode = {
  type: 'graphin-circle',
  style: {
    keyshape: {
      fill: '#ddd',
      stroke: '#000',
      size: 30,
    },
  },
};

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout} defaultNode={defaultNode} />
    </div>
  );
};
