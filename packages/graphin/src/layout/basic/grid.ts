import { Data, LayoutOptionBase } from '../../types';

export interface GridLayoutOptions extends LayoutOptionBase {
  /** 布局范围的宽度 */
  width: number;
  /** 布局范围的高度 */
  height: number;
  /** 节点间的间距，上下左右均是一致的 */
  nodeSep: number;
  /** 节点的大小，单位px */
  nodeSize: number;
}

const gridLayout = (data: Data, options: GridLayoutOptions) => {
  const {
    width,
    height,
    nodeSep = 100, // 节点间的间距，上下左右均是一致的
    nodeSize = 50, // 节点的大小，单位px
  } = options;
  const { nodes, edges } = data;
  const count = nodes.length;

  const cols = Math.round(Math.sqrt(count * (height / width))); // 列的个数
  const rows = Math.round(Math.sqrt(count * (width / height))); // 行的个数
  const start = {
    x: width / 2 - (cols / 2 - 1) * (nodeSize + nodeSep / 2),
    y: height / 2 - (rows / 2 - 1) * (nodeSize + nodeSep / 2),
  };

  const resultNodes = nodes.map((node, index: number) => {
    const xIndex = Math.floor(index / cols) - 1; // 行序号，向下取整
    const yIndex = Math.floor(index % cols) - 1; // 列序号，向下取整

    const x = start.x + xIndex * (nodeSize + nodeSep / 2);
    const y = start.y + yIndex * (nodeSize + nodeSep / 2);
    return {
      ...node,
      x,
      y,
    };
  });
  return {
    nodes: resultNodes,
    edges,
  };
};
export default gridLayout;
