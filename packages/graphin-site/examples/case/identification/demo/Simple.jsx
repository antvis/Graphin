/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin from '@antv/graphin';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS

const source = {
  nodes: [
    {
      name: '陆某',
      age: 17,
    },
    {
      name: '陆某雷',
    },
    {
      name: '顾某',
    },
    {
      name: '饿了么',
    },
    {
      name: '蜂鸟APP',
    },
    {
      name: 'elemeID',
    },
    // friends

    {
      name: '小王',
    },
    {
      name: '小红',
    },
    {
      name: '小张',
    },
    {
      name: '小罗',
    },
  ],
  edges: [
    {
      source: '陆某雷',
      target: '陆某',
      relative: '父子',
    },
    {
      source: '顾某',
      target: '饿了么',
      relative: '启东恒大区域送餐负责人',
    },
    {
      source: 'elemeID',
      target: '蜂鸟APP',
      relative: '账户',
    },
    {
      source: '饿了么',
      target: '蜂鸟APP',
      relative: '骑手端产品',
    },
    {
      source: 'elemeID',
      target: '陆某',
      relative: '冒用',
    },
    {
      source: 'elemeID',
      target: '陆某雷',
      relative: '注册',
    },
    /** 朋友 */
    {
      source: '陆某',
      target: '小王',
      relative: '朋友',
    },
    {
      source: '陆某',
      target: '小罗',
      relative: '朋友',
    },
    {
      source: '陆某',
      target: '小张',
      relative: '朋友',
    },
    {
      source: '陆某',
      target: '小红',
      relative: '朋友',
    },
  ],
};

const nodes = source.nodes.map((node) => {
  return {
    data: node,
    shape: 'CircleNode',
    id: node.name,
    label: node.name,
    style: {
      icon: 'home',
      fontFamily: 'graphin',
      nodeSize: 18,
    },
  };
});

const edges = source.edges.map((edge) => {
  return {
    data: edge,
    source: edge.source,
    target: edge.target,
    shape: 'LineEdge',
    label: edge.relative,
  };
});

const App = () => (
  <Graphin
    data={{
      nodes,
      edges,
    }}
    layout={{
      name: 'force',
      options: {
        preset: { name: 'circle' },
      },
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('container'));
