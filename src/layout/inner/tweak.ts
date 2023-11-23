import { GraphinData, IUserEdge, IUserNode } from '../../typings/type';

/* eslint-disable no-param-reassign */
const getRandomPosition = () => {
  return Math.round((Math.random() - 0.5) * 80);
};
/**
 *
 * @param currentData
 * @param options
 */

const width = 500;
const height = 300;
const tweak = (currentData: GraphinData, prevData: GraphinData) => {
  const { nodes: currNodes, edges: currEdges } = currentData;
  const { nodes: preNodes } = prevData;

  /** 将图上之前节点的位置信息存储在positionMap中 */
  const positionMap = new Map();
  preNodes.forEach((item: IUserNode) => {
    const { id, x, y } = item;
    positionMap.set(id, {
      x,
      y,
    });
  });

  const incrementNodesMap = new Map();
  currNodes.forEach((node: IUserNode) => {
    const { id } = node;
    const { x, y } = positionMap.get(id);
    if (!window.isNaN(x) && !window.isNaN(y)) {
      node.x = x;
      node.y = y;
    } else {
      incrementNodesMap.set(id, node);
    }
  });

  const incrementPositonMap = new Map();
  currEdges.forEach((edge: IUserEdge) => {
    const { source, target } = edge;

    const nodeInSource = incrementNodesMap.get(source);
    const nodeInTarget = incrementNodesMap.get(target);
    const sourcePosition = positionMap.get(source);
    const positionInSource = !window.isNaN(sourcePosition.x) && !window.isNaN(sourcePosition.y);
    const targetPosition = positionMap.get(target);
    const positionInTarget = !window.isNaN(targetPosition.x) && !window.isNaN(targetPosition.y);

    if (nodeInSource && positionInTarget) {
      incrementPositonMap.set(source, {
        // ...nodeInSource,
        x: targetPosition.x + getRandomPosition(),
        y: targetPosition.y + getRandomPosition(),
      });
    }
    if (nodeInTarget && positionInSource) {
      incrementPositonMap.set(target, {
        // ...nodeInTarget,
        x: sourcePosition.x + getRandomPosition(),
        y: sourcePosition.y + getRandomPosition(),
      });
    }
  });

  currNodes.forEach((node: IUserNode) => {
    const { id } = node;

    let position = positionMap.get(id);
    if (window.isNaN(position.x) || window.isNaN(position.y)) {
      position = incrementPositonMap.get(id) || {};
    }

    if (!window.isNaN(position.x) && !window.isNaN(position.y)) {
      node.x = position.x;
      node.y = position.y;
    } else {
      node.x = width / 2 + Math.round(Math.random() * width);
      node.y = height / 2 + Math.round(Math.random() * height);
    }
  });

  return {
    ...currentData,
    nodes: currNodes,
    edges: currEdges,
  };
};
export default tweak;
