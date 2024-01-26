import React from 'react';
import { PlusCircleOutlined, MinusCircleOutlined, ColumnWidthOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { useGraph } from '../../hooks';
import { PREFIX } from '../../constants';
import './style.less';

export const Toolbar: React.FC<any> = props => {
  const { zoomSensitivity = 20 } = props;
  const { graph } = useGraph();

  const zoomIn = () => {
    const zoomRatio = (100 + zoomSensitivity) / 100;
    graph.zoom(zoomRatio, undefined, {});
  };
  const zoomOut = () => {
    const zoomRatio = 100 / (100 + zoomSensitivity);
    graph.zoom(zoomRatio, undefined, {});
  };

  const fitWiew = () => {
    graph.fitView();
  };

  return (
    <div className={`${PREFIX}-toolbar`}>
      <Popover placement="right" content="放大">
        <PlusCircleOutlined onClick={() => zoomIn()} />
      </Popover>
      <Popover placement="right" content="缩小">
        <MinusCircleOutlined onClick={() => zoomOut()} />
      </Popover>
      <Popover placement="right" content="视图自适应居中">
        <ColumnWidthOutlined onClick={() => fitWiew()} />
      </Popover>
    </div>
  );
};
