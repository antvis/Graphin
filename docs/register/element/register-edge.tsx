import React from 'react';
import Graphin, { Utils, GraphinData } from '@antv/graphin';

const data: GraphinData = Utils.mock(5).tree().graphin();

Graphin.registerEdge('custom-edge', {
  draw(cfg, group) {
    const { startPoint, endPoint } = cfg;
    const shape = group.addShape('path', {
      attrs: {
        stroke: '#333',
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y], // 三分之一处
          ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y], // 三分之二处
          ['L', endPoint.x, endPoint.y],
        ],
      },
      name: 'path-shape',
    });
    return shape;
  },
});

console.log(data);

data.edges.forEach(edge => {
  edge.type = 'custom-edge';
});

export default () => {
  return <Graphin data={data} layout={{ type: 'dagre', rankdir: 'LR', align: 'UL' }} />;
};
