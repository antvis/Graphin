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
  // 发生 pin 的动作，由 props 控制而非拖拽产中的 pin 动作
  pinAction?: { id: string; pinned: boolean } | undefined;
}
const DragNodeWithForce = (props: DragNodeWithForceProps) => {
  const { graph, layout, dragNodes, updateContext } = React.useContext(GraphinContext);

  const { autoPin, pinAction, dragNodeMass = 10000000000 } = props;
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
            if (!selectNodeModel.layout) selectNodeModel.layout = {};
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

  /** props 控制一个 pin 的动作，可能是 pin 或 unpin */
  useEffect(() => {
    const { id, pinned } = pinAction || {};
    if (!id) return;
    let newDragNodes = dragNodes;
    if (!pinned) {
      newDragNodes = dragNodes.filter((node: NodeConfig) => node.id !== id);
    } else {
      const node = graph.findById(id);
      if (!node) return;
      const nodeModel = node.get('model');
      if (!nodeModel.layout) nodeModel.layout = {};
      nodeModel.layout.force = {
        mass: autoPin ? dragNodeMass : null,
      };
      newDragNodes.push(nodeModel);
    }
    updateContext({
      dragNodes: newDragNodes,
    });
  }, [pinAction]);

  return null;
};
DragNodeWithForce.defaultProps = {
  autoPin: false,
  dragNodeMass: 10000000000,
  pinAction: undefined,
};

export default DragNodeWithForce;
