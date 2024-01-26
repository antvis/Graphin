import React from 'react';
import { Button } from 'antd';
import { get } from 'lodash-es';
import ReactDOM from 'react-dom';
import GISDK, { Widgets, useModel, useGraph } from '../src';

const data = {
  nodes: [
    { id: 'node0', data: {} },
    { id: 'node1', data: {} },
    { id: 'node2', data: {} },
    { id: 'node3', data: {} },
    { id: 'node4', data: {} },
    { id: 'node5', data: {} },
    { id: 'node6', data: {} },
    { id: 'node7', data: {} },
    { id: 'node8', data: {} },
    { id: 'node9', data: {} },
    { id: 'node10', data: {} },
    { id: 'node11', data: {} },
    { id: 'node12', data: {} },
    { id: 'node13', data: {} },
    { id: 'node14', data: {} },
    { id: 'node15', data: {} },
    { id: 'node16', data: {} },
  ],
  edges: [
    { id: 'edge0', source: 'node0', target: 'node1' },
    { id: 'edge1', source: 'node0', target: 'node2' },
    { id: 'edge2', source: 'node0', target: 'node3' },
    { id: 'edge3', source: 'node0', target: 'node4' },
    { id: 'edge4', source: 'node0', target: 'node5' },
    { id: 'edge5', source: 'node1', target: 'node6' },
    { id: 'edge6', source: 'node1', target: 'node7' },
    { id: 'edge7', source: 'node2', target: 'node8' },
    { id: 'edge8', source: 'node2', target: 'node9' },
    { id: 'edge9', source: 'node2', target: 'node10' },
    { id: 'edge10', source: 'node2', target: 'node11' },
    { id: 'edge11', source: 'node2', target: 'node12' },
    { id: 'edge12', source: 'node2', target: 'node13' },
    { id: 'edge13', source: 'node3', target: 'node14' },
    { id: 'edge14', source: 'node3', target: 'node15' },
    { id: 'edge15', source: 'node3', target: 'node16' },
  ],
};

const CustomSidebar = props => {
  // const { graph } = useGraph();
  const [model, setModel] = useModel();
  const { panel } = model;

  return (
    <div style={{ height: '100%' }}>
      <p>sider</p>
      <p style={{ color: 'green' }}>{panel?.open ? 'panel open' : 'panel close'}</p>
      <Button
        onClick={() => {
          setModel('widgets:[2]properties.count', Math.floor(Math.random() * 1000));
        }}
      >
        Change panel Count
      </Button>
    </div>
  );
};

const CustomPanel = props => {
  const { properties } = props;
  const [model, setModel] = useModel();
  const { sider } = model;
  const nodes = get(model, 'interaction.nodes', []);

  return (
    <div>
      <p>{properties?.count}...</p>
      <p>{sider?.open ? 'sider open' : 'sider close'}</p>
      <p>current node: {nodes.length}</p>
    </div>
  );
};

const CustomHeader = props => {
  return <h1 style={{ height: 48, lineHeight: '48px', textAlign: 'center' }}>GI SDK</h1>;
};

Widgets.register('CustomSidebar', CustomSidebar);
Widgets.register('CustomPanel', CustomPanel);
Widgets.register('CustomHeader', CustomHeader);

const SPEC = {
  version: 'v0.1',
  metadata: {
    name: '测试应用',
  },
  dataset: {
    id: '4a4fee6d-f4e8-403b-a1e6-19fc7fcad418',
    metadata: {
      name: '我链接的 GraphScope 数据',
    },
    type: 'remote',
    serviceType: 'GS_SERVICE_INTIAL_GRAPH',
    properties: {},
  },
  spec: {
    graph: {
      layout: {
        type: 'force',
        linkDistance: 50,
        animated: true,
        clustering: true,
        nodeClusterBy: 'cluster',
        clusterNodeStrength: 100,
      },
      data,
    },
    widgets: [
      {
        name: 'CustomHeader',
        solt: 'header',
      },
      {
        name: 'CustomSidebar',
        solt: 'sider',
      },
      {
        name: 'CustomPanel',
        solt: 'panel',
        properties: {
          count: 100,
        },
      },
    ],
  },
};

ReactDOM.render(<GISDK {...SPEC}></GISDK>, document.getElementById('root'));
