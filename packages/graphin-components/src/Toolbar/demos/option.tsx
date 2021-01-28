// @ts-ignore
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
import { Button } from 'antd';

const OptionToolbar = () => {
  const graphinRef = React.useRef(null);

  const [direction, setDirection] = useState('horizontal');
  const options = [
    {
      key: 'zoomOut',
      name: (
        <span>
          放大 <ZoomInOutlined />
        </span>
      ),
      icon: <ZoomInOutlined />,
    },
    {
      key: 'zoomIn',
      name: <ZoomOutOutlined />,
    },
    {
      key: 'visSetting',
      name: <PieChartOutlined />,
    },
    {
      key: 'clearCanvas',
      name: <DeleteOutlined />,
    },
    {
      key: 'showHideElement',
      name: <VideoCameraAddOutlined />,
    },
  ];

  const handleClick = (graph, config) => {
    console.log(graph, config);
    const { handleZoomIn, handleZoomOut } = graphinRef.current.apis;
    if (config.key === 'zoomIn') {
      handleZoomIn();
    } else if (config.key === 'zoomOut') {
      handleZoomOut();
    }
  };

  const handleToggle = () => {
    if (direction === 'horizontal') {
      setDirection('vertical');
    } else if (direction === 'vertical') {
      setDirection('horizontal');
    }
  };
  return (
    <Graphin ref={graphinRef} data={Utils.mock(5).circle().graphin()}>
      <Button onClick={handleToggle} style={{ position: 'absolute', top: 0 }}>
        切换 ToolBar 排布
      </Button>
      <Toolbar options={options} onChange={handleClick} direction={direction} />
    </Graphin>
  );
};

export default OptionToolbar;
