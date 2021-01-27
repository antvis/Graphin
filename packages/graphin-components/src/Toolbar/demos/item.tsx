import React, { useState } from 'react';
import Toolbar from '../index';
import Graphin, { Utils } from '@antv/graphin';
import {
  ZoomOutOutlined,
  ZoomInOutlined,
  PieChartOutlined,
  DeleteOutlined,
  VideoCameraAddOutlined,
} from '@ant-design/icons';
import { Tooltip, Button } from 'antd';

const ItemDemo = () => {
  const graphinRef = React.useRef(null);
  const [direction, setDirection] = useState('horizontal');

  const options = [
    {
      key: 'zoomOut',
      name: <ZoomInOutlined />,
      description: '放大',
      action: () => {
        const { apis } = graphinRef.current;
        const { handleZoomOut } = apis;
        handleZoomOut();
      },
    },
    {
      key: 'zoomIn',
      name: <ZoomOutOutlined />,
      description: '缩小',
      action: () => {
        const { apis } = graphinRef.current;
        const { handleZoomIn } = apis;
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

  const handleToggle = () => {
    if (direction === 'horizontal') {
      setDirection('vertical');
    } else if (direction === 'vertical') {
      setDirection('horizontal');
    }
  };

  return (
    <Graphin
      ref={graphinRef}
      data={Utils.mock(5)
        .circle()
        .graphin()}
    >
      <Button onClick={handleToggle} style={{ position: 'absolute', top: 0 }}>
        切换 ToolBar 排布
      </Button>
      <Toolbar direction={direction as any}>
        {options.map(item => {
          return (
            <Toolbar.Item>
              <Tooltip title={item.description} key={item.key}>
                <Button onClick={item.action}>{item.name}</Button>
              </Tooltip>
            </Toolbar.Item>
          );
        })}
      </Toolbar>
    </Graphin>
  );
};

export default ItemDemo;
