import Graphin, { Utils } from '@antv/graphin';
import React from 'react';

const data = Utils.mock(10).circle().graphin();

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
