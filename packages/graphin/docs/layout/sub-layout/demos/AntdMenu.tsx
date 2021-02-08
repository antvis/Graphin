import React from 'react';
import { GraphinContext, Utils } from '@antv/graphin';

import { SwapOutlined, DeleteOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const { layouts } = Utils;

const { SubMenu } = Menu;
console.log('layouts(***********', layouts);
const AntdMenu = () => {
  // const { handleChange } = props;
  const { graph, contextmenu } = React.useContext(GraphinContext);
  const { canvas } = contextmenu;

  const handleClick = e => {
    const nodes = graph.findAllByState('node', 'selected').map(c => c.getModel());
    const edges = graph.findAllByState('edge', 'selected').map(c => c.getModel());
    console.log('nodes******', nodes, edges);
    // const newData = Utils.subLayout().add(
    //   {
    //     nodes,
    //     edges,
    //   },
    //   {
    //     type: e,
    //   },
    // );

    // handleChange(newData);
    canvas.handleClose();
  };

  return (
    <div
      style={{
        boxShadow: `0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%)`,
      }}
    >
      <Menu onClick={handleClick} style={{ width: 140 }} mode="vertical">
        <SubMenu key="sublayout" title="子图布局" icon={<SwapOutlined />} style={{ maxHeight: '400px' }}>
          <Menu.Item>选择子图</Menu.Item>

          {layouts.map(item => {
            const { title, type } = item;
            return (
              <Menu.Item
                key={type}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {title}
              </Menu.Item>
            );
          })}
        </SubMenu>

        <Menu.Item key="delete">
          <DeleteOutlined />
          清空画布
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default AntdMenu;
