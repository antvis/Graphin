import React, { useState } from 'react';
import { Toolbar, Type } from '@antv/graphin-components';
import Graphin, { GraphinContext, Utils } from '@antv/graphin';

import {
  ZoomOutOutlined,
  ZoomInOutlined,
  PieChartOutlined,
  DeleteOutlined,
  VideoCameraAddOutlined,
} from '@ant-design/icons';
import { Tooltip, Button } from 'antd';

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
      {options.map((item, index) => {
        return (
          <Tooltip title={item.description} key={item.key}>
            <span onClick={item.action} onKeyDown={item.action} role="menuitem" tabIndex={index}>
              {item.name}
            </span>
          </Tooltip>
        );
      })}
    </div>
  );
};

const AntdDemo = () => {
  const [direction, setDirection] = useState<Type.ToolbarDirectionType>('horizontal');

  const handleToggle = () => {
    if (direction === 'horizontal') {
      setDirection('vertical');
    } else if (direction === 'vertical') {
      setDirection('horizontal');
    }
  };

  const handleTest = () => {
    console.log('点击 Test');
  };

  const handleAdd = () => {
    console.log('点击增加');
  };

  return (
    <Graphin data={Utils.mock(5).circle().graphin()}>
      <Button onClick={handleToggle} style={{ position: 'absolute', top: 0 }}>
        切换 ToolBar 排布
      </Button>

      <Toolbar direction={direction}>
        <CustomContent />
      </Toolbar>

      <Toolbar direction={direction} y={100} style={{ position: 'fixed', left: '0px', top: '60px' }}>
        <Toolbar.Item onClick={handleTest}>tesst</Toolbar.Item>
        <Toolbar.Item>删除</Toolbar.Item>
        <Toolbar.Item onClick={handleAdd}>增加</Toolbar.Item>
      </Toolbar>
    </Graphin>
  );
};

export default AntdDemo;
