import React from 'react';
import Graphin, { Utils, GraphinData } from '@antv/graphin';

const data: GraphinData = Utils.mock(8).circle().graphin();

Graphin.registerNode(
  'custom-node',

  {
    options: {
      style: {},
      stateStyles: {
        hover: {},
        selected: {},
      },
    },
    draw(cfg, group) {
      console.log(cfg);
      const keyshape = group.addShape('rect', {
        attrs: {
          id: 'circle-floor',
          x: 0,
          y: 0,
          width: 20,
          height: 20,
          fill: 'red',
        },
        draggable: true,
        name: 'circle-floor',
      });
      group.addShape('text', {
        attrs: {
          fontSize: 12,
          x: 0,
          y: 0,
          text: cfg.id,
          fill: '#ddd',
        },
        draggable: true,
        name: 'text',
      });
      return keyshape;
    },
  },
  'single-node',
);

data.nodes.forEach(node => {
  node.type = 'custom-node';
});

console.log(data);

export default () => {
  return <Graphin data={data} layout={{ type: 'concentric' }} defaultNode={{ type: 'custom-node' }} />;
};
