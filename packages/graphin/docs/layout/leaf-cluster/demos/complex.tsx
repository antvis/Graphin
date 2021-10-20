import React, { useEffect, useState } from 'react';
import Graphin from '@antv/graphin';
import { Card } from 'antd';

const Demo = () => {
  const colorMap = {
    'node-type-0': '#BDD2FD',
    'node-type-1': '#BDEFDB',
    'node-type-2': '#A6C3B7',
    'node-type-3': '#FFD8B8',
    'node-type-4': '#D3C6EA',
    'node-type-5': '#C5A89C',
    'node-type-6': '#A3D8F0',
    'node-type-7': '#EEE8E2',
    'node-type-8': '#A5D6A0',
    'node-type-9': '#D6C6EA',
    'node-type-10': '#C1FFC1',
    'node-type-11': '#EEE9BF',
    'node-type-12': '#EEA2AD',
    'node-type-13': '#EEAD0E',
  };
  const basicLayout = {
    type: 'graphin-force',
    animation: false,
    preventOverlap: true,
    nodeSize: 40,
    defSpringLen: (_edge, source, target) => {
      const nodeSize = 40;
      const Sdegree = source.data.layout?.degree;
      const Tdegree = target.data.layout?.degree;
      const minDegree = Math.min(Sdegree, Tdegree);
      return minDegree === 1 ? nodeSize * 4 : Math.min(minDegree * nodeSize * 1.5, 200);
    },
  };
  const [data, setData] = useState({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/e43f523c-ffe7-445b-8b32-c968ae93fdb9.json')
      .then(res => res.json())
      .then(data => {
        setData({
          nodes: data.nodes.map(node => ({
            ...node,
            type: 'graphin-circle',
            style: {
              label: {
                value: node.label,
              },
              keyshape: {
                fill: colorMap[node.cluster],
                fillOpacity: 1,
              },
            },
          })),
          edges: data.edges.map(edge => ({
            ...edge,
            style: {
              label: {
                value: edge.label,
              },
            },
          })),
        });
      });
  }, []);

  return (
    <div className="App">
      <Card title="复杂场景：不使用叶子节点聚类">
        <Graphin data={data} layout={basicLayout} />
      </Card>
      <Card title="复杂场景：使用叶子节点聚类">
        <Graphin
          data={data}
          layout={{
            ...basicLayout,
            leafCluster: true, // 是否需要叶子节点聚类
            nodeClusterBy: 'cluster', // 节点聚类的映射字段
            clusterNodeStrength: 40, // 节点聚类作用力系数
          }}
        />
      </Card>
    </div>
  );
};
export default Demo;
