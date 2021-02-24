import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext, NodeStyle } from '@antv/graphin';
import IconLoader from '@antv/graphin-icons';
import { Row, Col, Card } from 'antd';

const icons = Graphin.registerFontFamily(IconLoader);

const { ZoomCanvas, Hoverable } = Behaviors;

const normalStyle: Partial<NodeStyle> = {
  keyshape: {
    size: 60,
    fillOpacity: 0.2,
  },
  icon: {
    type: 'font',
    fontFamily: 'graphin',
    value: icons.user,
    size: 30,
  },
  label: {
    value: '普通节点',
    offset: [0, 12],
  },
};

const clusterStyle = {
  label: {
    value: '聚合节点',
    offset: [0, 12],
  },
  keyshape: {
    size: 60,
    stroke: 'red',
    fill: 'red',
    fillOpacity: 0.2,
  },
  icon: {
    type: 'font',
    fontFamily: 'graphin',
    value: icons.user,
    fill: 'red',
    size: 30,
  },
  badges: [
    {
      position: 'RT',
      type: 'text',
      value: 8,
      size: [20, 20],
      color: '#fff',
      fill: 'red',
    },
  ],
};
const tagStyle = {
  label: {
    value: '标记节点',
    offset: [0, 12],
  },
  keyshape: {
    size: 60,
    stroke: 'black',
    fill: 'black',
    fillOpacity: 0.2,
  },
  icon: {
    type: 'font',
    fontFamily: 'graphin',
    value: icons.user,
    fill: 'black',
    size: 30,
  },
  badges: [
    {
      position: 'RT',
      type: 'text',
      value: 8,
      size: [20, 20],
      color: '#fff',
      fill: 'black',
    },
    {
      position: 'LB',
      type: 'font',
      fontFamily: 'graphin',
      value: icons.pushpin,
      size: [20, 20],
      color: '#fff',
      fill: 'black',
    },
  ],
};

const data = {
  nodes: [
    {
      id: 'node-0',
      type: 'star',
      size: [60, 30],
      label: 'star',
      labelCfg: {
        /* label's position, options: center, top, bottom, left, right */
        position: 'bottom',
        /* label's offset to the keyShape, 4 by default */
        offset: 20,
        /* label's style */
        style: {
          fontSize: 20,
          fill: '#ccc',
          fontWeight: 500,
        },
      },
    },
    {
      id: 'node-1',
      style: clusterStyle,
    },
  ],
  edges: [],
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
