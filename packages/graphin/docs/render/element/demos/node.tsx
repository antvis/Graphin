import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext, NodeStyle } from '@antv/graphin';
import IconLoader from '@antv/graphin-icons';
import { Row, Col, Card } from 'antd';

const icons = Graphin.registerFontFamily(IconLoader);

const { ZoomCanvas, Hoverable } = Behaviors;

const data = Utils.mock(5)
  .circle()
  .graphin();

data.edges = [];

data.nodes[0].style = {
  keyshape: {
    size: [80, 80],
    stroke: 'red',
    fill: 'red',
    fillOpacity: 0.2,
  },
  label: {
    value: '设置 keyshape',
  },
};

data.nodes[1].style = {
  label: {
    value: '设置 label',
    position: 'right',
    offset: [20, 5],
    fill: 'green',
  },
};

data.nodes[2].style = {
  icon: {
    type: 'image',
    value: `https://gw.alipayobjects.com/zos/antfincdn/0b4HzOcEJY/Graphin.svg`,
    size: [20, 20],
  },
  label: {
    value: '设置 icon',
  },
};

data.nodes[3].style = {
  label: {
    value: '设置 badges',
  },
  badges: [
    {
      position: 'RT',
      type: 'text',
      value: 8,
      size: [15, 15],
      fill: 'red',
      color: '#fff',
    },
  ],
};

data.nodes[4].style = {
  label: {
    value: '设置 halo',
  },
  halo: {
    visible: true,
    stroke: 'red',
  },
};

console.log(data);

const layout = {
  type: 'grid',
};

export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <ZoomCanvas disabled />
      </Graphin>
    </div>
  );
};
