import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

const nodes = [
  {
    id: 'node-0',
    x: 100,
    y: 200,
  },
  {
    id: 'node-1',
    x: 600,
    y: 200,
  },
];

const layout = {
  type: 'preset',
};

const edges1 = Array.from({ length: 5 }).map(() => {
  return {
    source: 'node-0',
    target: 'node-1',
  };
});

const edges2 = Array.from({ length: 6 }).map(() => {
  return {
    source: 'node-1',
    target: 'node-0',
  };
});

const edgesLoop1 = Array.from({ length: 2 }).map(() => {
  return {
    source: 'node-0',
    target: 'node-0',
  };
});
const edgesLoop2 = Array.from({ length: 3 }).map(() => {
  return {
    source: 'node-1',
    target: 'node-1',
  };
});

const edges = Utils.processEdges([...edges1, ...edges2, ...edgesLoop1, ...edgesLoop2], { poly: 50, loop: 10 });
edges.forEach((edge, index) => {
  const { source, target } = edge;
  edge.style.label = {
    value: `${index}th:${source}-${target}`,
  };
});

const data = { nodes, edges };

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout} fitView />
    </div>
  );
};
