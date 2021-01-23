import React, { useContext, useEffect } from 'react';
import Graphin, { IG6GraphEvent, Utils, GraphinData, GraphinContext } from '@antv/graphin';
import { INode, NodeConfig } from '@antv/g6';

const data: GraphinData = Utils.mock(8)
  .circle()
  .graphin();

const SampleBehavior = () => {
  const { graph } = useContext(GraphinContext);

  useEffect(() => {
    const handleClick = (evt: IG6GraphEvent) => {
      const node = evt.item as INode;
      const model = node.getModel() as NodeConfig;
      console.log(model);
      // TODO
    };
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
