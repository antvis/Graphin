import { IG6GraphEvent } from '@antv/g6';
import React, { useEffect } from 'react';
import GraphinContext from '../GraphinContext';

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
  const { instance } = layout;

  useEffect(() => {
    const { simulation, type } = instance;

    const handleNodeDragStart = () => {
      console.log('drag-start', instance);
      if (simulation) {
        simulation.stop();
      }
    };
    const handleNodeDragEnd = (e: IG6GraphEvent) => {
      if (type !== 'graphin-force') {
        return;
      }

      if (e.item) {
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
  }, [graph, autoPin, instance]);
  return null;
};

export default DragNodeWithForce;
