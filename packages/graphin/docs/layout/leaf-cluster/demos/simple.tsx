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
  };
  const basicLayout = {
    type: 'graphin-force',
    animation: false,
    preset: {
      type: 'concentric', // 力导的前置布局
    },
  };
  const [data, setData] = useState({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/83e88b79-4bd2-478f-8b1f-78260f2801ad.json')
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
      <Card title="简单场景：不使用叶子节点按类型聚类">
        <Graphin data={data} layout={basicLayout} />
      </Card>
      <Card title="简单场景：使用叶子节点按类型聚类">
        <Graphin
          data={data}
          layout={{
            ...basicLayout,
            leafCluster: true, // 是否需要叶子节点按类型聚类
            nodeClusterBy: 'cluster', // 聚类的映射字段
            clusterNodeStrength: 8, // 节点聚类作用力系数
          }}
        />
      </Card>
    </div>
  );
};
export default Demo;
