import React from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';

const data = Utils.mock(100).random().graphin();
const layout = {
  type: 'graphin-force',
  preset: {
    type: 'concentric',
  },
};

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors;

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ZoomCanvas enableOptimize />
        <DragNode />
        <ActivateRelations trigger="click" />
      </Graphin>
    </div>
  );
};
