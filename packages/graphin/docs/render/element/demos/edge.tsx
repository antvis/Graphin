import React, { useEffect } from 'react';
import Graphin, { Utils, Behaviors, GraphinContext } from '@antv/graphin';

const { ZoomCanvas } = Behaviors;

const data = Utils.mock(6)
  .circle()
  .graphin();
const layout = {
  type: 'circular',
};

data.edges = [
  {
    source: 'node-0',
    target: 'node-1',
    style: {
      label: {
        value: '设置 keyshape 颜色 和 宽度 ',
      },
      keyshape: {
        stroke: 'red',
        lineWidth: 4,
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-2',
    style: {
      label: {
        value: '设置 keyshape 虚线 ',
      },
      keyshape: {
        lineDash: [4, 4],
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-3',
    style: {
      label: {
        value: '设置 keyshape 箭头 ',
      },
      keyshape: {
        endArrow: {
          path: 'M 0,0 L 8,4 L 8,-4 Z',
          fill: '#545872',
        },
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-4',
    style: {
      label: {
        value: '设置 label 标签',
        fill: 'red',
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-5',
    style: {
      label: {
        value: '设置 halo 光晕',
      },
      halo: {
        fill: '#ddd',
        visible: true,
      },
    },
  },
];

console.log('%c data', 'color:red', data);
export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout}></Graphin>
    </div>
  );
};
