import React, { useContext, useEffect } from 'react';
import Graphin, { IG6GraphEvent, Utils, GraphinData, GraphinContext } from '@antv/graphin';
import { INode, NodeConfig } from '@antv/g6';

const data: GraphinData = Utils.mock(8).circle().graphin();

const SampleBehavior = () => {
  const { graph, apis } = useContext(GraphinContext);

  useEffect(() => {
    // 初始化聚焦到`node-1`

    apis.focusNodeById('node-1');

    const handleClick = (evt: IG6GraphEvent) => {
      const node = evt.item as INode;
      const model = node.getModel() as NodeConfig;
      apis.focusNodeById(model.id);
    };
    // 每次点击聚焦到点击节点上
    graph.on('node:click', handleClick);
    return () => {
      graph.off('node:click', handleClick);
    };
  }, []);
  return null;
};

/**
 * @example
 * https://g6.antv.vision/zh/docs/api/Behavior
 */
export default () => {
  return (
    <Graphin data={data} layout={{ type: 'concentric' }}>
      <SampleBehavior />
    </Graphin>
  );
};
