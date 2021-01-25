/* eslint-disable no-undef */
import React from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';
import * as d3 from 'd3';
// 引入Graphin CSS

const { DragCombo } = Behaviors;

/** 构造数据 */

const source = {
  id: 'root',
  children: [
    {
      id: 'combo-1',
      children: [
        {
          id: 'node-1',
          value: 1,
        },
        {
          id: 'node-2',
          value: 1,
        },
        {
          id: 'node-3',
          value: 1,
        },
        {
          id: 'node-4',
          value: 1,
        },
      ],
    },
    {
      id: 'combo-2',
      children: [
        {
          id: 'node-5',
          value: 1,
        },
        {
          id: 'node-6',
          value: 1,
        },
        {
          id: 'node-7',
          value: 1,
        },
        {
          id: 'node-8',
          value: 1,
        },
        {
          id: 'node-9',
          value: 1,
        },
        {
          id: 'combo-3',
          children: [
            {
              id: 'node-10',
              value: 1,
            },
          ],
        },
      ],
    },
  ],
};

const walk = (schema, func) => {
  if (schema.children && schema.children.length) {
    schema.children.forEach(child => {
      func(child, schema.data.id);
      walk(child, func);
    });
  }
};

/** 1. 将树形结构转变为Graphin可以识别的数据结构 */
const transTree2Graphin = sourceData => {
  const nodes = [];
  const combos = [];
  walk(sourceData, (node, comboId) => {
    if (node.children) {
      combos.push({ ...node, id: node.data.id });
    } else {
      nodes.push({
        ...node,
        id: node.data.id,
        shape: 'CircleNode',
        label: node.data.id,
        comboId,
      });
    }
  });
  return {
    nodes,
    combos,
    edges: [
      {
        source: 'node-10',
        target: 'node-8',
        data: {},
      },
      {
        source: 'node-10',
        target: 'node-1',
        data: {},
      },
    ],
  };
};

const pack = data =>
  d3
    .pack()
    .size([1000, 500])
    .padding(3)(
    d3
      .hierarchy(data)

      .sum(d => {
        // console.log('sum d', d);
        return d.value;
      })
      .sort((a, b) => {
        // console.log('sort', a, b)
        return b.value - a.value;
      }),
  );

const data = transTree2Graphin(pack(source));
data.nodes.forEach(node => {
  delete node.parent;
});

data.combos.forEach(combo => {
  delete combo.parent;
  delete combo.children;
});

const layoutOptions = {
  name: 'force',

  options: {
    preset: {
      name: 'grid', // 力导的前置布局可以人为指定，试试 grid
    },
    centripetalOptions: {
      single: 200, // 给孤立节点设置原来 （100/2）倍的向心力
      leaf: 200,
      others: 200,
      center: (node, degree) => {
        // console.log('node', node)
        let center = {};
        data.combos.forEach(combo => {
          if (node.data.comboId === combo.id) {
            center = {
              x: combo.x,
              y: combo.y,
            };
          }
        });
        return center;
        // 根据不同的节点与度数设置不同的向心力的中心点
      },
    },
  },
};

const Demo = () => {
  return (
    <div className="App">
      <Graphin
        data={data}
        // layout={layoutOptions}
        options={{
          layout: {
            type: 'comboForce',
            nodeSpacing: d => 28,
          },
        }}
      >
        <DragCombo />
      </Graphin>
    </div>
  );
};
export default Demo;
