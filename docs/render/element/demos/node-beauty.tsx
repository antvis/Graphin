import Graphin, { Behaviors, registerIconFonts } from '@antv/graphin';
import React from 'react';

const icons = registerIconFonts();

const { ZoomCanvas, Hoverable } = Behaviors;

const normalStyle = {
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
      style: normalStyle,
    },
    {
      id: 'node-1',
      style: clusterStyle,
    },
    {
      id: 'node-2',
      style: tagStyle,
    },
    {
      id: 'node-3',
      style: {
        ...normalStyle,
        label: {
          value: '悬停状态',
          offset: [0, 12],
        },
      },
      status: {
        hover: true,
      },
    },
    {
      id: 'node-4',
      style: {
        ...clusterStyle,
        label: {
          value: '选中状态',
          offset: [0, 12],
        },
      },
      status: {
        selected: true,
      },
    },
    {
      id: 'node-5',
      style: {
        ...tagStyle,
        label: {
          value: '自定义光晕',
          offset: [0, 17],
        },
        halo: {
          stroke: 'black',
          strokeWidth: 1,
        },
      },
      status: {
        selected: true,
      },
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
