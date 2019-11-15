import { Edge } from '../../layout/force/Elements';
import { Node } from '../../types';

export const getDegree = (node: Node, edges: Edge[]) => {
    const nodeId = node.data.id;
    let index = 0;

    edges.forEach(edge => {
        if (edge.data.source === nodeId || edge.data.target === nodeId) {
            index = index + 1;
        }
    });

    return index;
};

/**
 *
 * @param {*} n n个圆沿着大圆排列,根据弧长公式  2*Math.PI*R = 2*r*n +gap*n
 * @param {*} r 小圆的半径r
 *
 */
// export const getCircleR = (n: number, r: number, gap = 8) => {
//     const R = (2 * r * n + gap * n) / (2 * Math.PI);
//     return R;
// };
