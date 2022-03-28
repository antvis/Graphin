import Graphin, { Utils } from '@antv/graphin';
import React from 'react';

const data = Utils.mock(11).circle().graphin();
const layout = {
  type: 'concentric',
  nodeSize: 250,
};

data.edges = [
  {
    source: 'node-0',
    target: 'node-0',
    style: {
      label: {
        value: '自环边-1',
        offset: [0, 0],
      },
      keyshape: {
        type: 'loop',
        loop: {
          distance: 0,
        },
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-0',
    style: {
      label: {
        value: '自环边-2',
        offset: [0, 0],
      },
      keyshape: {
        type: 'loop',
        loop: {
          distance: 10,
        },
      },
    },
  },

  {
    source: 'node-0',
    target: 'node-1',
    style: {
      label: {
        value: '设置 keyshape 颜色 和 宽度 ',
      },
      keyshape: {
        stroke: 'red',
        // lineWidth: 4,
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
  {
    source: 'node-0',
    target: 'node-7',
    style: {
      label: {
        value: 'poly:40',
        offset: [0, 0],
      },
      keyshape: {
        type: 'poly',
        poly: {
          distance: 40,
        },
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-7',
    style: {
      label: {
        value: 'poly:-40',
        offset: [0, 0],
      },
      keyshape: {
        type: 'poly',
        poly: {
          distance: -40,
        },
        lineDash: [2, 2],
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-8',
    style: {
      keyshape: {
        lineDash: [8, 4],
        lineWidth: 2,
      },
      animate: {
        type: 'line-dash',
        repeat: true,
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-9',
    style: {
      keyshape: {
        lineWidth: 1,
      },
      animate: {
        type: 'circle-running',
        fill: 'green',
        repeat: true,
        duration: 4000,
      },
    },
  },
  {
    source: 'node-0',
    target: 'node-10',
    style: {
      keyshape: {
        stroke: 'red',
        lineWidth: 1,
      },
      animate: {
        type: 'line-growth',
        repeat: false,
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
