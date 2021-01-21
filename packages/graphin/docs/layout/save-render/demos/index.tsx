import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

const data = Utils.mock(10)
  .circle()
  .graphin();

const layout = {
  type: 'render',
};

data.nodes.forEach(node => {
  node.x = Math.random() * 300 + 200;
  node.y = Math.random() * 300 + 200;
});
export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}></Graphin>
    </div>
  );
};
