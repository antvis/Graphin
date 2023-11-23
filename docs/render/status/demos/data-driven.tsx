import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';

const { ZoomCanvas } = Behaviors;

const data = Utils.mock(6).circle().graphin();

data.nodes[0].status = {
  // 默认也可以不设置
  normal: true,
};

data.nodes[1].status = {
  hover: true,
};
data.nodes[2].status = {
  selected: true,
};

data.nodes[3].status = {
  disabled: true,
};

data.nodes[4].status = {
  active: true,
};
data.nodes[5].status = {
  inactive: true,
};

data.edges = [];
export default () => {
  return (
    <div>
      <Graphin data={data} layout={{ type: 'grid' }}>
        <ZoomCanvas />
      </Graphin>
    </div>
  );
};
