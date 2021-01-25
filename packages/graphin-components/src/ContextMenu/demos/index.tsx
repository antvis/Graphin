import React from 'react';
import Graphin, { GraphinContext, Utils } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import { message } from 'antd';
import { TagFilled, DeleteFilled, ExpandAltOutlined } from '@ant-design/icons';

// Do not forget to import CSS

const { Menu } = ContextMenu;

const options = [
  {
    key: 'tag',
    icon: <TagFilled />,
    name: '打标',
  },
  {
    key: 'delete',
    icon: <DeleteFilled />,
    name: '删除',
  },
  {
    key: 'expand',
    icon: <ExpandAltOutlined />,
    name: '扩散',
  },
];

const CanvasMenu = () => {
  const { graph, contextmenu } = React.useContext(GraphinContext);

  const context = contextmenu.canvas;

  const handleDownload = () => {
    graph.downloadFullImage('canvas-contextmenu');
    context.handleClose();
  };
  const handleClear = () => {
    message.info(`清除画布成功`);
    context.handleClose();
  };
  const handleStopLayout = () => {
    message.info(`停止布局成功`);
    context.handleClose();
  };

  return (
    <Menu bindType="canvas">
      <Menu.Item onClick={handleClear}>清除画布</Menu.Item>
      <Menu.Item onClick={handleStopLayout}>停止布局</Menu.Item>
      <Menu.Item onClick={handleDownload}>下载画布</Menu.Item>
    </Menu>
  );
};
const App = () => {
  const data = Utils.mock(5).circle().graphin();
  const handleChange = (menuItem, menuData) => {
    console.log(menuItem, menuData);
    message.info(`元素：${menuData.id}，动作：${menuItem.name}`);
  };

  return (
    <div className="App">
      <Graphin data={data}>
        <ContextMenu style={{ width: '80px' }}>
          <Menu options={options} onChange={handleChange} bindType="node" />
        </ContextMenu>
        <ContextMenu style={{ width: '80px' }} bindType="canvas">
          <CanvasMenu />
        </ContextMenu>
        <ContextMenu style={{ width: '120px' }} bindType="edge">
          <Menu
            options={options.map((item) => {
              return { ...item, name: `${item.name}-EDGE` };
            })}
            onChange={handleChange}
            bindType="edge"
          />
        </ContextMenu>
      </Graphin>
    </div>
  );
};
export default App;
