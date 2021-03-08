import React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar, ContextMenu } from '@antv/graphin-components';
import { PlusOutlined } from '@ant-design/icons';
import AntdMenu from './AntdMenu';

const { Menu } = ContextMenu;

const source = Utils.mock(6).circle().graphin();
source.edges = [];

let index = 5;
const SchemaBuilder = () => {
  const [state, setState] = React.useState({
    data: source,
    layout: 'circular',
  });

  const { data, layout } = state;

  const handleAddEdge = newEdge => {
    const edges = Utils.processEdges([...data.edges, newEdge]);
    setState({
      data: {
        ...data,
        edges,
      },
      layout: 'preset',
    });
  };

  const handleAddNode = item => {
    console.log(item);
    const { key } = item;
    if (key === 'add-node') {
      index = index + 1;
      setState({
        data: {
          ...data,
          nodes: [
            ...data.nodes,
            {
              id: `node-${index}`,
              style: {
                label: {
                  value: `node-${index}`,
                },
              },
            },
          ],
        },
        layout: 'circular',
      });
    }
  };
  console.log(data);

  return (
    <div>
      <Graphin data={data} layout={{ type: layout }}>
        <ContextMenu bindType="node" style={{ width: '140px' }}>
          <AntdMenu handleAddEdge={handleAddEdge} />
        </ContextMenu>
        <ContextMenu bindType="canvas" style={{ width: '140px' }}>
          <Menu
            bindType="canvas"
            options={[
              {
                icon: <PlusOutlined />,
                key: 'add-node',
                name: '添加节点',
              },
            ]}
            onChange={handleAddNode}
          />
        </ContextMenu>
      </Graphin>
    </div>
  );
};

export default SchemaBuilder;
