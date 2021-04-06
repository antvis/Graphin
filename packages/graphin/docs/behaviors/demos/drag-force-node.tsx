import { ExpandAltOutlined } from '@ant-design/icons';
import Graphin, { Behaviors, Utils } from '@antv/graphin';
import { ContextMenu, Toolbar } from '@antv/graphin-components';
import { Switch } from 'antd';
import React from 'react';

const { Menu } = ContextMenu;

const layout = {
  type: 'graphin-force',
};

const { DragNodeWithForce } = Behaviors;

export default () => {
  const [autoPin, setAutoPin] = React.useState(false);
  const [data, setData] = React.useState(Utils.mock(6).circle().graphin());
  const onChange = checked => {
    setAutoPin(checked);
  };
  const handleExpand = (menuItem, menuData) => {
    const expandData = Utils.mock(5).expand([menuData]).graphin();
    console.log(expandData);

    setData({
      // 还需要对Node和Edge去重，这里暂不考虑
      nodes: [...data.nodes, ...expandData.nodes],
      edges: [...data.edges, ...expandData.edges],
    });
  };
  return (
    <div>
      <Graphin data={data} layout={layout}>
        <DragNodeWithForce autoPin={autoPin} />
        <Toolbar>
          <Toolbar.Item>
            被拖拽的节点，是否自动固定住 <Switch defaultChecked onChange={onChange} checked={autoPin} />
          </Toolbar.Item>
        </Toolbar>
        <ContextMenu>
          <Menu
            bindType="node"
            options={[
              {
                key: 'tag',
                icon: <ExpandAltOutlined />,
                name: '打标',
              },
            ]}
            onChange={handleExpand}
          />
        </ContextMenu>
      </Graphin>
    </div>
  );
};
