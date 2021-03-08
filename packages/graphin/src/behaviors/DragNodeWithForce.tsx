import React, { useEffect } from 'react';
import GraphinContext from '../GraphinContext';

import { IG6GraphEvent } from '@antv/g6';

export interface DragNodeWithForceProps {
  /**
   * @description 被拖拽的节点，是否自动固定住
   * @description.en-US Whether the dragged node is automatically fixed
   * @default false
   */
  autoPin?: boolean;
}
const DragNodeWithForce = (props: DragNodeWithForceProps) => {
  const { graph, layout } = React.useContext(GraphinContext);
  const { autoPin } = props;

  useEffect(() => {
    const { instance } = layout;
    const { simulation, type } = instance;
    console.log(instance, layout);
    const handleNodeDragStart = () => {
      if (simulation) {
        simulation.stop();
      }
    };
    const handleNodeDragEnd = (e: IG6GraphEvent) => {
      if (type !== 'graphin-force') {
        return;
      }

      if (e.item) {
        console.log('e.item', instance);
        const nodeModel = e.item.get('model');
        nodeModel.x = e.x;
        nodeModel.y = e.y;
        nodeModel.layout = {
          ...nodeModel.layout,
          force: {
            mass: autoPin ? 1000000 : null,
          },
        };
        const drageNodes = [nodeModel];
        simulation.restart(drageNodes, graph);
        graph.refreshPositions();
      }
    };

    graph.on('node:dragstart', handleNodeDragStart);
    graph.on('node:dragend', handleNodeDragEnd);
    return () => {
      graph.off('node:dragstart', handleNodeDragStart);
      graph.off('node:dragend', handleNodeDragEnd);
    };
  }, [graph, autoPin]);
  return null;
};

export default DragNodeWithForce;
