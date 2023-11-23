/* eslint-disable no-undef */
import React from 'react';
import Graphin from '@antv/graphin';

import iconLoader from '@antv/graphin-icons';
import { Legend } from '@antv/graphin-components';

const icons = Graphin.registerFontFamily(iconLoader);
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

const nodes = source.nodes.map(node => {
  const { type } = node;
  return {
    data: node,
    type: 'graphin-circle',
    id: node.name,
    style: {
      keyshape: {
        size: 18,
      },
      label: {
        value: node.name,
      },
      icon: {
        type: 'font',
        fontFamily: 'graphin',
        value: icons[type],
      },
    },
  };
});

const edges = source.edges.map(edge => {
  return {
    data: edge,
    source: edge.source,
    target: edge.target,
    shape: 'graphin-line',
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
      type: 'graphin-force',
      preset: {
        type: 'concentric',
      },
      animation: false,
    }}
  >
    <Legend bindType="node" sortKey="data.type" colorKey="style.keyshape.stroke">
      <Legend.Node />
    </Legend>
  </Graphin>
);
export default App;
