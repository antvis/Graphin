import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

const data = Utils.mock(7).circle().graphin();
const layout = {
  type: 'concentric',
  nodeSize: 250,
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
        fontSize: 26,
        offset: [0, 0],
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
  {
    source: 'node-0',
    target: 'node-6',
    style: {
      label: {
        value: '设置 label 的 background ',
        fill: '#fff',
        fontSize: 12,
        background: {
          // 设置背景的填充色
          fill: 'lightgreen',
          // 设置圆角
          radius: 8,
          // 设置border，即 stroke
          stroke: '#000',
        },
      },
    },
  },
];

console.log('%c data', 'color:red', data);
export default () => {
  return (
    <div>
      <Graphin data={data} layout={layout} />
    </div>
  );
};
