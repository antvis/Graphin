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

console.log('data', data);

const defaultNode = {
  type: 'graphin-circle',
  style: {
    keyshape: {
      fill: '#000',
      stroke: '#000',
      fillOpacity: 0.1,
      size: 30,
    },
    label: {
      visible: false,
    },
  },
};

const nodeStateStyles = {
  status: {
    hover: {
      label: {
        visible: false,
      },
    },
  },
};

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout} defaultNode={defaultNode} nodeStateStyles={nodeStateStyles} />
    </div>
  );
};
