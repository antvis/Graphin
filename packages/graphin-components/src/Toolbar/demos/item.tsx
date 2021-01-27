import * as React from 'react';
import Toolbar from '../index';
import Graphin, { Utils } from '@antv/graphin';
import { ZoomOutOutlined, ZoomInOutlined } from '@ant-design/icons';
import { Tooltip, Button } from 'antd';

const ItemDemo = () => {
  const graphinRef = React.useRef(null);

  const options = [
    {
      key: 'zoomIn',
      name: '缩小',
      icon: <ZoomOutOutlined />,
      action: () => {
        const { apis } = graphinRef.current;
        const { handleZoomIn } = apis;
        handleZoomIn();
      },
    },
    {
      key: 'zoomOut',
      name: '放大',
      icon: <ZoomInOutlined />,
      action: () => {
        const { apis } = graphinRef.current;
        const { handleZoomOut } = apis;
        handleZoomOut();
      },
    },
  ];

  return (
    <Graphin
      ref={graphinRef}
      data={Utils.mock(5)
        .circle()
        .graphin()}
    >
      <Toolbar direction="vertical">
        {options.map(item => {
          return (
            <Toolbar.Item>
              <Tooltip title={item.name} key={item.key}>
                <Button onClick={item.action}>{item.icon}</Button>
              </Tooltip>
            </Toolbar.Item>
          );
        })}
      </Toolbar>
    </Graphin>
  );
};

export default ItemDemo;
