/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Layout } from '@antv/graphin';

import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import '@antv/graphin-components/dist/index.css'; // 引入Graphin CSS

/** 构造数据 */

const source = {
  id: 'root',
  children: [
    {
      id: 'combo-1',
      children: [
        {
          id: 'node-1',
        },
        {
          id: 'node-2',
        },
        {
          id: 'node-3',
        },
        {
          id: 'node-4',
        },
      ],
    },
    {
      id: 'combo-2',
      children: [
        {
          id: 'node-5',
        },
        {
          id: 'node-6',
        },
        {
          id: 'node-7',
        },
        {
          id: 'node-8',
        },
        {
          id: 'node-9',
        },
        {
          id: 'combo-3',
          children: [
            {
              id: 'node-10',
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
      func(child, schema.id);
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
      const combo = { id: node.id, label: node.id, parentId: comboId };
      if (comboId === 'root') {
        delete combo.parentId;
      }
      combos.push(combo);
    } else {
      nodes.push({
        id: node.id,
        comboId,
        label: node.id,
        data: node,
        shape: 'CircleNode',
      });
    }
  });
  return {
    nodes,
    combos,
    edges: [],
  };
};
/** 2.布局 */

const layout = data => {
  const { nodes, combos, edges } = data;

  const nodeMap = new Map();
  nodes.forEach(node => {
    const NodeMapNodes = nodeMap.get(node.comboId);
    if (!NodeMapNodes) {
      nodeMap.set(node.comboId, [node]);
    } else {
      nodeMap.set(node.comboId, [...NodeMapNodes, node]);
    }
  });

  const [circleNodes, gridNodes, singleNodes] = [...nodeMap.values()];

  const layoutCircleNodes = new Layout.Circle(
    { nodes: circleNodes },
    {
      x: 100,
      /** 圆心 y坐标 */

      y: 100,
      /** 半径，默认半径为节点数*10 */
      r: 100,
    },
  );
  const layoutGridNodes = new Layout.Circle(
    { nodes: gridNodes },
    {
      x: 500,
      /** 圆心 y坐标 */

      y: 500,
      /** 半径，默认半径为节点数*10 */
      r: 100,
    },
  );

  const layoutSingleNodes = new Layout.Circle(
    { nodes: singleNodes },
    {
      x: 700,
      /** 圆心 y坐标 */
      y: 400,
      /** 半径，默认半径为节点数*10 */
      r: 100,
    },
  );

  const layoutNodes = [...layoutCircleNodes, ...layoutGridNodes, ...layoutSingleNodes];

  return {
    nodes: layoutNodes,
    combos,
    edges,
  };
};

const graphinData = transTree2Graphin(source);
const data = layout(graphinData);

const App = () => {
  return (
    <div className="App">
      <Graphin data={data} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
