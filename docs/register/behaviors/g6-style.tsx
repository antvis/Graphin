import React from 'react';
import Graphin, { IG6GraphEvent, Utils, GraphinData } from '@antv/graphin';
import { message } from 'antd';
import { INode, NodeConfig } from '@antv/g6';

const data: GraphinData = Utils.mock(8).circle().graphin();

Graphin.registerBehavior('sampleBehavior', {
  getEvents() {
    return {
      'node:click': 'onClick',
    };
  },
  onClick(evt: IG6GraphEvent) {
    const node = evt.item as INode;
    const model = node.getModel() as NodeConfig;
    message.info(model.id);
    // TODO
  },
});

/**
 * @example
 * https://g6.antv.vision/zh/docs/api/Behavior
 */
export default () => {
  return <Graphin data={data} layout={{ type: 'concentric' }} modes={{ default: ['sampleBehavior'] }} />;
};
