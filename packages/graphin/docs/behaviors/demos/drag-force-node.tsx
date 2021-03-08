import React from 'react';
import Graphin, { Utils, Behaviors } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';
import { Switch } from 'antd';

const data = Utils.mock(6).circle().graphin();
const layout = {
  type: 'graphin-force',
};

const { DragNodeWithForce } = Behaviors;

export default () => {
  const [autoPin, setAutoPin] = React.useState(false);
  const onChange = checked => {
    setAutoPin(checked);
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
      </Graphin>
    </div>
  );
};
