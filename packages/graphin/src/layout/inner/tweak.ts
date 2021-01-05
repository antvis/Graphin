import { Data, Node, Edge } from '../../types';

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
const tweak = (currentData: Data, prevData: Data) => {
  const { nodes: currNodes, edges: currEdges } = currentData;
  const { nodes: preNodes } = prevData;

  /** 将图上之前节点的位置信息存储在positionMap中 */
  const positionMap = new Map();
  preNodes.forEach((item: Node) => {
    const { id, x, y } = item;
    positionMap.set(id, {
      x,
      y,
    });
  });

  const incrementNodesMap = new Map();
  currNodes.forEach((node: Node) => {
    const { id } = node;
    const position = positionMap.get(id);
    if (position) {
      node.x = position.x;
      node.y = position.y;
    } else {
      incrementNodesMap.set(id, node);
    }
  });

  const incrementPositonMap = new Map();
  currEdges.forEach((edge: Edge) => {
    const { source, target } = edge;

    const nodeInSource = incrementNodesMap.get(source);
    const nodeInTarget = incrementNodesMap.get(target);
    const positionInSource = positionMap.get(source);
    const positionInTarget = positionMap.get(target);

    if (nodeInSource && positionInTarget) {
      incrementPositonMap.set(source, {
        // ...nodeInSource,
        x: positionInTarget.x + getRandomPosition(),
        y: positionInTarget.y + getRandomPosition(),
      });
    }
    if (nodeInTarget && positionInSource) {
      incrementPositonMap.set(target, {
        // ...nodeInTarget,
        x: positionInSource.x + getRandomPosition(),
        y: positionInSource.y + getRandomPosition(),
      });
    }
  });

  currNodes.forEach((node: Node) => {
    const { id } = node;
    const position = positionMap.get(id) || incrementPositonMap.get(id);

    if (position) {
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
