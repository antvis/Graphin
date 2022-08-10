import { IG6GraphEvent, NodeConfig, EdgeConfig } from '@antv/g6';
import React, { useEffect } from 'react';
import GraphinContext from '../GraphinContext';

export interface DragNodeWithForceProps {
  /**
   * @description 被拖拽的节点，是否自动固定住
   * @description.en-US Whether the dragged node is automatically fixed
   * @default false
   */
  autoPin?: boolean;
  dragNodeMass?: number;
}
const DragNodeWithForce = (props: DragNodeWithForceProps) => {
  const { graph, layout, dragNodes, updateContext } = React.useContext(GraphinContext);

  const { autoPin, dragNodeMass = 10000000000 } = props;
  const { instance } = layout;

  useEffect(() => {
    const { simulation, type } = instance || { type: graph.get('layout')?.type };

    const handleNodeDragStart = () => {
      if (simulation) {
        simulation.stop();
      } else {
        const layouts = graph.get('layoutController')?.layoutMethods || [];
        // @ts-ignore
        layouts.forEach(layout => layout.stop?.());
      }
    };
    const handleNodeDragEnd = (e: IG6GraphEvent) => {
      if (type !== 'graphin-force' && type !== 'force2') {
        return;
      }

      if (e.item) {
        const nodeModel = e.item.get('model');
        nodeModel.x = e.x;
        nodeModel.y = e.y;
        nodeModel.layout = {
          ...nodeModel.layout,
          force: {
            mass: autoPin ? dragNodeMass : null,
          },
        };
        // simulation.restart([nodeModel], graph);
        // graph.refreshPositions();
        const selectedNodes: NodeConfig[] = [];
        graph.getNodes().forEach(node => {
          if (node.hasState('selected')) {
            const selectNodeModel = node.get('model');
            selectNodeModel.layout.force = {
              mass: autoPin ? dragNodeMass : null,
            };
            selectedNodes.push(selectNodeModel);
          }
        });
        let newDragNodes = dragNodes.concat([nodeModel]) as NodeConfig[];
        // 多选拖动的场景
        if (selectedNodes.length > 1) {
          newDragNodes = newDragNodes.concat(selectedNodes);
        }
        updateContext({
          dragNodes: newDragNodes,
        });
      }
    };

    graph.on('node:dragstart', handleNodeDragStart);
    graph.on('node:dragend', handleNodeDragEnd);
    return () => {
      graph.off('node:dragstart', handleNodeDragStart);
      graph.off('node:dragend', handleNodeDragEnd);
    };
  }, [graph, autoPin, instance, dragNodes, updateContext]);
  return null;
};
DragNodeWithForce.defaultProps = {
  autoPin: false,
  dragNodeMass: 10000000000,
};

export default DragNodeWithForce;
