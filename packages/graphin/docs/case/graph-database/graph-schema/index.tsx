import React from 'react';
import Graphin from '@antv/graphin';
import { Toolbar, ContextMenu } from '@antv/graphin-components';
import { PlusOutlined, SwapOutlined } from '@ant-design/icons';
import AntdMenu from './AntdMenu';

const source = {
  nodes: [
    {
      id: 'node-A',
      style: {
        label: {
          value: '节点A',
        },
      },
    },
    {
      id: 'node-B',
      style: {
        label: {
          value: '节点B',
        },
      },
    },
    {
      id: 'node-C',
      style: {
        label: {
          value: '节点C',
        },
      },
    },
    {
      id: 'node-D',
      style: {
        label: {
          value: '节点D',
        },
      },
    },
  ],
  edges: [],
};

const options = [
  {
    key: 'addEdge',
    name: (
      <span>
        添加关系 <SwapOutlined />
      </span>
    ),
  },
  {
    key: 'addNode',
    name: (
      <span>
        添加实体 <PlusOutlined />
      </span>
    ),
  },
];

const SchemaBuilder = () => {
  const [state, setState] = React.useState({
    data: source,
    layout: 'grid',
  });
  const handleChange = (graphin, option) => {
    console.log('option', option);
  };

  const { data, layout } = state;

  const handleAddEdge = newEdge => {
    setState({
      data: {
        ...data,
        edges: [...data.edges, newEdge],
      },
      layout: 'preset',
    });
  };

  return (
    <div>
      <Graphin data={data} layout={{ type: layout }}>
        <Toolbar
          style={{ position: 'absolute', left: 0, right: 'unset' }}
          options={options}
          onChange={handleChange}
          direction="horizontal"
        />
        <ContextMenu bindType="node" style={{ width: '140px' }}>
          <AntdMenu handleAddEdge={handleAddEdge} />
        </ContextMenu>
      </Graphin>
    </div>
  );
};

export default SchemaBuilder;
