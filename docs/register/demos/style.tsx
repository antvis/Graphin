import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

const data = Utils.mock(10)
  .circle()
  .graphin();
const layout = {
  type: 'grid',
};

const defaultNodeStyle = {
  keyshape: {
    fill: 'red',
  },
  label: {
    position: 'bottom',
  },
};

const defaultEdgeStyle = {
  label: {
    position: 'right',
    text: 'label',
  },
};

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}></Graphin>
    </div>
  );
};
