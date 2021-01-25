/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin from '@antv/graphin';
// 引入Graphin CSS

const source = {
  nodes: [
    {
      name: '大安全',
    },
    {
      name: '反洗钱',
    },
    {
      name: '内容安全',
    },
    {
      name: '终端安全',
    },
    {
      name: '身份安全',
    },
    {
      name: '业务安全',
    },
    {
      name: '反欺诈',
    },
    {
      name: '反作弊',
    },
    /** 反欺诈 */
    {
      name: '盗用',
    },
    {
      name: '骗贷',
    },
    {
      name: '骗赔',
    },
    {
      name: '骗保',
    },
    /** 反作弊 */
    {
      name: '刷单',
    },
    {
      name: '薅羊毛',
    },
    {
      name: '廉政/内审',
    },
  ],
  edges: [
    /** 大安全 */
    {
      source: '大安全',
      target: '业务安全',
      relative: '包含',
    },
    {
      source: '大安全',
      target: '反洗钱',
      relative: '包含',
    },
    {
      source: '大安全',
      target: '内容安全',
      relative: '包含',
    },

    {
      source: '大安全',
      target: '身份安全',
      relative: '包含',
    },
    {
      source: '大安全',
      target: '终端安全',
      relative: '包含',
    },
    {
      source: '大安全',
      target: '业务安全',
      relative: '包含',
    },

    /** 业务安全 */
    {
      source: '业务安全',
      target: '反作弊',
      relative: '包含',
    },

    {
      source: '业务安全',
      target: '反欺诈',
      relative: '包含',
    },
    /** 反欺诈 */
    {
      source: '反欺诈',
      target: '盗用',
      relative: '案例',
    },
    {
      source: '反欺诈',
      target: '骗贷',
      relative: '案例',
    },
    {
      source: '反欺诈',
      target: '骗赔',
      relative: '案例',
    },
    {
      source: '反欺诈',
      target: '骗保',
      relative: '案例',
    },
    /** 反作弊 */
    {
      source: '反作弊',
      target: '刷单',
      relative: '案例',
    },
    {
      source: '反作弊',
      target: '薅羊毛',
      relative: '案例',
    },
    {
      source: '反作弊',
      target: '廉政/内审',
      relative: '案例',
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
  };
});

const App = () => (
  <Graphin
    data={{
      nodes,
      edges,
    }}
    layout={{
      name: 'dagre',
      options: {
        align: 'DL',
      },
    }}
  />
);

ReactDOM.render(<App />, document.getElementById('container'));
