import { LayoutOptionBase, Node, Data } from '../../types';

export interface CircleLayoutOption extends LayoutOptionBase {
  /** 圆心 x坐标 */
  x: number;
  /** 圆心 y坐标 */
  y: number;
  /** 半径，默认半径为节点数*10 */
  r: number;
  scale?: number;
}

/**
 *
 * @param {*} data
 * 如果是nodes，则返回nodes，如果输入的是nodes和edges的对象，则返回对应的对象
 * @param {*} cfg
 */
const circleLayout = (data: Data, cfg: CircleLayoutOption) => {
  const { x, y, r } = cfg;

  const startX = x;
  const startY = y;
  const RR = r;
  const { edges, nodes } = data;
  const { length } = nodes;

  const newNodes = nodes.map((node: Node, index: number) => {
    const isCenterNode = node.x === startX && node.y === startY;
    const isCenter = !!isCenterNode;
    const R = isCenterNode ? 0 : RR;
    const angle = (index / length) * 2 * Math.PI;
    return {
      ...node,
      x: isCenter ? startX : startX + R * Math.cos(angle),
      y: isCenter ? startY : startY + R * Math.sin(angle),
      layout: {
        ...node.layout,
        circle: {
          x: startX,
          y: startY,
          theta: angle,
          isCenter,
        },
      },
    };
  });

  if (edges) {
    return {
      nodes: newNodes,
      edges,
    };
  }

  return newNodes;
};

export default circleLayout;
