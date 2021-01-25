/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin from '@antv/graphin';
// 引入Graphin CSS

const source = {
  nodes: [
    {
      name: '商家',
      type: 'amazon-square-fill',
    },
    {
      name: 'A某',
      type: 'user',
    },
    {
      name: 'B某',
      type: 'user',
    },
    {
      name: 'C某',
      type: 'user',
    },
    {
      name: '银行卡',
      type: 'credit card',
    },
  ],
  edges: [
    {
      source: 'A某',
      target: '银行卡',
      relative: '转账1000元',
    },
    {
      source: '银行卡',
      target: 'B某',
      relative: '常用银行卡',
    },
    {
      source: 'B某',
      target: 'C某',
      relative: '亲友',
    },
    {
      source: 'C某',
      target: '商家',
      relative: '交易1200元',
    },
    {
      source: '商家',
      target: 'A某',
      relative: '同人',
      lineType: 'dash',
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
      icon: node.type,
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
    style: {
      line: {
        dash: edge.lineType === 'dash' ? [2, 2] : 0,
      },
    },
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
        preset: { name: 'concentric' },
      },
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('container'));
