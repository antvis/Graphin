import Graphin, { Behaviors, Utils } from '@antv/graphin';
import React from 'react';

const data = Utils.mock(100).random().graphin();
const layout = {
  type: 'graphin-force',
  preset: {
    type: 'concentric',
  },
};

const { Hoverable } = Behaviors;

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <Hoverable bindType="node" />
      </Graphin>
    </div>
  );
};
