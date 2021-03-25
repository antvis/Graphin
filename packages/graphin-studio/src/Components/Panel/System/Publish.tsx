import { Button, Modal } from 'antd';
import React, { useState } from 'react';

interface PublishProps {}

const code = `
import React from 'react';
import Graphin, { Behaviors, GraphinData, Utils } from '@antv/graphin';
import { ContextMenu, FishEye, MiniMap, Legend } from '@antv/graphin-components';
import G6 from '@antv/g6';
/** Graphin */
const { ZoomCanvas, DragNode } = Behaviors;

<Graphin data={data} layout={layout} height={900}>
    <ZoomCanvas enableOptimize />
    <DragNode />
    <MiniMap visible />
    <ContextMenu>
      <CustomMenu state={state} updateState={setState} nodeMap={nodeMap} aggregatedNodeMap={aggregatedNodeMap} />
    </ContextMenu>
    <ContextMenu bindType="canvas">
      <Menu bindType="canvas">
        <Menu.Item onClick={handleOpen}>开启鱼眼</Menu.Item>
        <Menu.Item onClick={handleRefresh}>重置画布</Menu.Item>
      </Menu>
    </ContextMenu>
    <FishEye options={{ showLabel: false }} visible={visible} handleEscListener={handleClose} />
    <Legend bindType="node" sortKey="id" colorKey="style.keyshape.stroke">
      <Legend.Node />
    </Legend>
</Graphin>
`;
const Publish: React.FunctionComponent<PublishProps> = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        生成SDK
      </Button>
      <Modal title="代码预览" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <code>
          <pre>{code}</pre>
        </code>
      </Modal>
    </div>
  );
};

export default Publish;
