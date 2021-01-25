import React from 'react';
import Graphin, { Utils, GraphinContext } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import { Menu } from 'antd';
// Do not forget to import CSS

// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const AntdMenu = () => {
  const graphin = React.useContext(GraphinContext);
  const handleClick = () => {
    console.log('click', graphin);
    graphin.contextmenu.node.handleClose();
  };
  return (
    <Menu onClick={handleClick} style={{ width: 156 }} mode="vertical">
      <SubMenu key="sub1" title="Navigation One">
        <Menu.ItemGroup title="Item 1">
          <Menu.Item key="1">
            {/* <MailOutlined /> */}
            Option 1
          </Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Iteom 2">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <SubMenu key="sub2" title="Navigation Two">
        <Menu.Item key="5">
          {/* <AppstoreOutlined /> */}
          Option 5
        </Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="sub4" title="Navigation Three">
        <Menu.Item key="9">
          {/* <SettingOutlined /> */}
          Option 9
        </Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(5).circle().graphin()}>
        <ContextMenu style={{ width: 156 }} bindType="node">
          <AntdMenu />
        </ContextMenu>
      </Graphin>
    </div>
  );
};
export default App;
