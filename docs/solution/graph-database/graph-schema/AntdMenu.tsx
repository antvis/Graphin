import React from 'react';
import { GraphinContext, GraphinData } from '@antv/graphin';

import { EditOutlined, SwapOutlined, DeleteOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
// Do not forget to import CSS
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const AntdMenu = props => {
  const { handleAddEdge } = props;
  const { graph, contextmenu } = React.useContext(GraphinContext);
  const nodes = graph.getNodes().map(node => node.getModel()) as GraphinData['nodes'];
  const { node } = contextmenu;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentNode = node.item.getModel() as any;
  console.log(currentNode, node.item);

  const handleClick = () => {
    node.handleClose();
  };

  const AddEdge = item => {
    console.log('item', item);
    const newEdge = {
      source: currentNode.id,
      target: item.id,
    };
    handleAddEdge(newEdge);
  };
  return (
    <div
      style={{
        boxShadow: `0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%)`,
      }}
    >
      <Menu onClick={handleClick} style={{ width: 140 }} mode="vertical">
        <SubMenu key="addEdge" title="建立关系" icon={<SwapOutlined />} style={{ maxHeight: '400px' }}>
          <Menu.Item>选择目标节点</Menu.Item>

          {nodes.map(node => {
            const { id, style } = node;
            if (currentNode.id === id) {
              return (
                <Menu.Item
                  key={id}
                  onClick={() => {
                    AddEdge(node);
                  }}
                >
                  {style.label.value}(自环)
                </Menu.Item>
              );
            }
            return (
              <Menu.Item
                key={id}
                onClick={() => {
                  AddEdge(node);
                }}
              >
                {style.label.value}
              </Menu.Item>
            );
          })}
        </SubMenu>
        <Menu.Item key="rename">
          <EditOutlined /> 重命名
        </Menu.Item>
        <Menu.Item key="delete">
          <DeleteOutlined />
          删除
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default AntdMenu;
