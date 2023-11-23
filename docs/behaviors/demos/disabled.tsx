import React from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';

const data = Utils.mock(5).circle().graphin();
const layout = {
  type: 'concentric',
};

const { ZoomCanvas, DragNode } = Behaviors;
export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ZoomCanvas disabled />
        <DragNode disabled />
      </Graphin>
    </div>
  );
};
