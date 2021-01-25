/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Graphin from '@antv/graphin';
// 引入Graphin CSS
// import data from '../../data'

const legend = [
  {
    color: '#c23531',
    category: 0,
    name: 'HTMLElement',
  },
  {
    color: '#161616',
    category: 1,
    name: 'WebGL',
  },
  {
    color: '#61a0a8',
    category: 2,
    name: 'SVG',
  },
  {
    color: '#c23531',
    category: 3,
    name: 'CSS',
  },
  {
    color: '#91c7ae',
    category: 4,
    name: 'Other',
  },
];
const colors = legend.map((c) => c.color);
const App = () => {
  const [data, setData] = React.useState({ nodes: [], edges: [] });
  React.useEffect(() => {
    fetch('../../examples/data/web.json')
      .then((res) => res.json())
      .then((res) => {
        const nodes = res.nodes.map((node, index) => {
          return {
            id: String(index),
            label: node.name,
            type: 'CircleNode',
            data: node,
            style: {
              primaryColor: colors[node.category],
              nodeSize: 10,
            },
          };
        });
        const edges = res.links.map((edge) => {
          return {
            source: String(edge.source),
            target: String(edge.target),
            data: edge,
          };
        });

        setData({
          nodes,
          edges,
        });
      });
  }, []);
  return (
    <div>
      <Graphin
        data={data}
        layout={{
          name: 'force',
          options: {
            preset: {
              name: 'grid',
            },
            repulsion: 200 * 6,
            stiffness: 200,
            MaxIterations: 1200,
            tickInterval: 0.02,
            maxSpeed: 1000,
            damping: 0.8,
            /** 启用 webworker 计算 */
            enableWorker: true,
            animation: true,
            defSpringLen: (_edge, source, target) => {
              const nodeSize = 30;
              const Sdegree = source.data.layout?.degree;
              const Tdegree = target.data.layout?.degree;
              const minDegree = Math.min(Sdegree, Tdegree);
              /** 根据边两边节点的度数来动态设置边的初始化长度：度数越小，则边越短，能够产生聚类效果 */
              return minDegree < 3 ? nodeSize : minDegree * nodeSize * 2;
            },
          },
        }}
      />
    </div>
  );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
