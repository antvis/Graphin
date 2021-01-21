import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';
import IconLoader from '@antv/graphin-icons';

const icons = Graphin.registerFontFamily(IconLoader);

const { ZoomCanvas, Hoverable } = Behaviors;

const data = Utils.mock(5)
  .circle()
  .graphin();

data.edges = [];

data.nodes[0].style = {
  keyshape: {
    size: [20, 20],
  },
};

console.log(data);

const layout = {
  type: 'concentric',
};

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ZoomCanvas disabled />
        <Hoverable bindType="node" />
      </Graphin>
    </div>
  );
};
