import type { ContextMenuValue } from '@antv/graphin';
import Graphin, { Components, Utils } from '@antv/graphin';
import { Menu, message } from 'antd';
import React from 'react';

const { ContextMenu } = Components;

const MyMenu = (value: ContextMenuValue) => {
  const handleClick = (e: { key: unknown }) => {
    const { onClose, id } = value;
    message.info(`${e.key}:${id}`);
    onClose();
  };

  return (
    <Menu onClick={handleClick}>
      <Menu.Item key="copy">复制</Menu.Item>
      <Menu.Item key="delete">删除</Menu.Item>
      <Menu.Item key="tag">打标</Menu.Item>
    </Menu>
  );
};

const App = () => {
  const data = Utils.mock(5).circle().graphin();

  return (
    <div className="App">
      <Graphin data={data}>
        <ContextMenu style={{ background: '#fff' }} bindType="node">
          {value => {
            return <MyMenu {...value} />;
          }}
        </ContextMenu>
      </Graphin>
    </div>
  );
};
export default App;
