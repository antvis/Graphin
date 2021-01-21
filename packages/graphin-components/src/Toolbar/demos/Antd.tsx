import * as React from 'react';
import Toolbar from '../index';
import Graphin, { GraphinContext, Utils } from '@antv/graphin';
import { ZoomOutOutlined, ZoomInOutlined } from '@ant-design/icons';
import { Tooltip, Button } from 'antd';

const CustomContent = () => {
  const { apis } = React.useContext(GraphinContext);
  const { handleZoomIn, handleZoomOut } = apis;
  const options = [
    {
      id: 'zoomIn',
      name: '放大',
      icon: <ZoomInOutlined />,
      action: () => {
        handleZoomIn();
      },
    },
    {
      id: 'zoomOut',
      name: '缩小',
      icon: <ZoomOutOutlined />,
      action: () => {
        handleZoomOut();
      },
    },
  ];
  return (
    <div>
      {options.map((item) => {
        return (
          <Tooltip title={item.name} key={item.id}>
            <Button onClick={item.action}>{item.icon}</Button>
          </Tooltip>
        );
      })}
    </div>
  );
};
const AntdDemo = () => {
  return (
    <Graphin data={Utils.mock(5).circle().graphin()}>
      <Toolbar>
        <CustomContent />
      </Toolbar>
    </Graphin>
  );
};

export default AntdDemo;
