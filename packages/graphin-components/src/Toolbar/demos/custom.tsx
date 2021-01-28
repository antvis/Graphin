import React from 'react';
import { Toolbar } from '@antv/graphin-components';
import Graphin, { GraphinContext, Utils } from '@antv/graphin';
import { Tooltip, Button } from 'antd';
import {
  ZoomOutOutlined,
  ZoomInOutlined,
  PieChartOutlined,
  DeleteOutlined,
  VideoCameraAddOutlined,
} from '@ant-design/icons';

const CustomContent = () => {
  const { apis } = React.useContext(GraphinContext);
  const { handleZoomIn, handleZoomOut } = apis;

  const options = [
    {
      key: 'zoomOut',
      name: <ZoomInOutlined />,
      description: '放大',
      action: () => {
        handleZoomOut();
      },
    },
    {
      key: 'zoomIn',
      name: <ZoomOutOutlined />,
      description: '缩小',
      action: () => {
        handleZoomIn();
      },
    },
    {
      key: 'visSetting',
      name: <PieChartOutlined />,
      description: '可视化设置',
    },
    {
      key: 'clearCanvas',
      name: <DeleteOutlined />,
      description: '清空画布',
    },
    {
      key: 'showHideElement',
      name: <VideoCameraAddOutlined />,
      description: '显示隐藏元素',
    },
  ];

  return (
    <div>
      {options.map((item) => {
        return (
          <Tooltip title={item.description} key={item.key}>
            <Button onClick={item.action}>{item.name}</Button>
          </Tooltip>
        );
      })}
    </div>
  );
};

const AntdDemo = () => {
  return (
    <Graphin data={Utils.mock(5).circle().graphin()}>
      <Toolbar direction="horizontal" style={{ position: 'absolute', right: '250px' }}>
        <CustomContent />
      </Toolbar>
    </Graphin>
  );
};

export default AntdDemo;
