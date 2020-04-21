// TODO remove concentric eslint-ignore-rules
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable no-multi-assign */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */

import { getDegree } from '../utils/graph';
import { LayoutOptionBase, Node } from '../../types';
import { Edge } from '../../layout/force/Elements';

export interface BBox {
  x1: number;
  y1: number;
  x2?: number;
  y2?: number;
  w: number;
  h: number;
}

interface NodeValue {
  value: number;
  node: Node;
}

interface Level extends Array<NodeValue> {
  dTheta?: number;
  r?: number;
}

interface ConcentricConfig extends LayoutOptionBase {
  /** 同心圆的布局范围，默认为当前画布的宽高范围 */
  boundingBox: BBox;
  /** 节点间的距离，默认为60 */
  minNodeSpacing: number;
  /** 每层的节点度数范围 */
  levelWidth: (nodes: Node[], maxDegree: number) => number;
  counterclockwise: boolean;
  clockwise: boolean;
  concentric: (node: Node) => number;
  avoidOverlap: boolean;
  sweep?: number;
  equidistant: boolean;
  startAngle: number;
}

type PartialConcentricOption = Partial<Exclude<ConcentricConfig, keyof LayoutOptionBase>>;

export type ConcentricOption = PartialConcentricOption & LayoutOptionBase;

// makes a full bb (x1, y1, x2, y2, w, h) from implicit params
export const makeBoundingBox = (bb: BBox): BBox | undefined => {
  if (bb.x2 != null && bb.y2 != null && bb.x2 >= bb.x1 && bb.y2 >= bb.y1) {
    return {
      x1: bb.x1,
      y1: bb.y1,
      x2: bb.x2,
      y2: bb.y2,
      w: bb.x2 - bb.x1,
      h: bb.y2 - bb.y1,
    };
  }
  if (bb.w >= 0 && bb.h >= 0) {
    return {
      x1: bb.x1,
      y1: bb.y1,
      x2: bb.x1 + bb.w,
      y2: bb.y1 + bb.h,
      w: bb.w,
      h: bb.h,
    };
  }
};

const defaults = {
  fit: true, // whether to fit the viewport to the graph
  padding: 30, // the padding on fit
  startAngle: (3 / 2) * Math.PI, // where nodes start in radians
  sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
  clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
  equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
  minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
  nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
  height: undefined, // height of layout area (overrides container height)
  width: undefined, // width of layout area (overrides container width)
  spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  // eslint-disable-next-line
  concentric(node: any) {
    // returns numeric value for each node, placing higher nodes in levels towards the centre
    return node.degree();
  },
  // eslint-disable-next-line
  levelWidth(nodes: any) {
    // the letiation of concentric values in each level
    return nodes.maxDegree() / 4;
  },
  animate: false, // whether to transition the node positions
  animationDuration: 500, // duration of animation in ms if enabled
  animationEasing: undefined, // easing of animation if enabled
  ready: undefined, // callback on layoutready
  stop: undefined, // callback on layoutstop
};

class ConcentricLayout {
  options: ConcentricOption;

  constructor(options: Partial<ConcentricOption>) {
    const { edges } = options.data!;
    this.options = {
      ...defaults,
      ...{
        concentric(node: Node) {
          // eslint-disable-next-line
          return getDegree(node, edges as any);
        },
      },
      ...options,
    } as ConcentricOption;
  }

  run() {
    const { options } = this;
    const clockwise = options.counterclockwise !== undefined ? !options.counterclockwise : options.clockwise;
    const { nodes } = this.options.data;

    const bb = makeBoundingBox(
      options.boundingBox
        ? options.boundingBox
        : {
            x1: 0,
            y1: 0,
            w: options.width,
            h: options.height,
          },
    );

    const center = {
      x: bb!.x1 + bb!.w / 2,
      y: bb!.y1 + bb!.h / 2,
    };

    let maxNodeSize = 0;
    // 计算每个节点的concentric权重value
    const nodeValues: NodeValue[] = nodes
      .map(node => {
        return {
          value: options.concentric!(node),
          node,
        };
      })
      .sort((a, b) => {
        return b.value - a.value;
      });

    // maxNodeSize = Math.max(maxNodeSize, nbb.w, nbb.h);
    maxNodeSize = 50;
    const maxDegree = nodeValues[0].value;
    const levelWidth = options.levelWidth!(nodes, maxDegree);
    // put the values into levels
    const levels: Level[] = [[]];
    let currentLevel: Level = levels[0];
    nodeValues.forEach(node => {
      if (currentLevel.length > 0) {
        const firstItem = currentLevel[0].value;
        const diff = Math.abs(firstItem - node.value);
        if (diff >= levelWidth) {
          currentLevel = [];
          levels.push(currentLevel);
        }
      }
      currentLevel.push(node);
    });

    // create positions from levels

    let minDist = maxNodeSize + options.minNodeSpacing!; // min dist between nodes

    if (!options.avoidOverlap) {
      // then strictly constrain to bb
      const firstLvlHasMulti = levels.length > 0 && levels[0].length > 1;
      const maxR = Math.min(bb!.w, bb!.h) / 2 - minDist;
      const rStep = maxR / (levels.length + (firstLvlHasMulti ? 1 : 0));

      minDist = Math.min(minDist, rStep);
    }

    // find the metrics for each level
    let r = 0;

    levels.forEach(level => {
      const sweep = options.sweep === undefined ? 2 * Math.PI - (2 * Math.PI) / level.length : options.sweep;
      level.dTheta = sweep / Math.max(1, level.length - 1);
      const { dTheta } = level;
      // calculate the radius
      if (level.length > 1 && options.avoidOverlap) {
        // but only if more than one node (can't overlap)
        const dcos = Math.cos(dTheta) - Math.cos(0);
        const dsin = Math.sin(dTheta) - Math.sin(0);
        const rMin = Math.sqrt((minDist * minDist) / (dcos * dcos + dsin * dsin)); // s.t. no nodes overlapping
        r = Math.max(rMin, r);
      }
      level.r = r;
      r += minDist;
    });

    if (options.equidistant) {
      let rDeltaMax = 0;
      let radius = 0;

      for (let i = 0; i < levels.length; i++) {
        const level = levels[i];
        const rDelta = level.r! - radius;

        rDeltaMax = Math.max(rDeltaMax, rDelta);
      }

      radius = 0;
      for (let i = 0; i < levels.length; i++) {
        const level = levels[i];

        if (i === 0) {
          radius = level.r!;
        }

        level.r = radius;

        radius += rDeltaMax;
      }
    }

    // calculate the node positions
    const pos: { [key: string]: { x: number; y: number } } = {}; // id => position
    const outerR = [...levels].pop()!.r;
    const result: Node[] = [];
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      const { dTheta } = level;
      const { r: radius } = level;

      for (let j = 0; j < level.length; j++) {
        const val = level[j];
        const theta = options.startAngle! + (clockwise ? 1 : -1) * dTheta! * j;
        const p = {
          x: center.x + radius! * Math.cos(theta),
          y: center.y + radius! * Math.sin(theta),
        };
        pos[val.node.data.id] = p;

        result.push({
          ...val.node,
          data: val.node.data,
          degree: val.value,
          layout: {
            ...val.node.layout,
            concentric: {
              outerR,
              center,
              theta,
            },
          },
          x: p.x,
          y: p.y,
        });
      }
    }
    const { edges } = options.data;
    return {
      outerR,
      levels,
      nodes: result,
      edges,
    };
  }
}

export default ConcentricLayout;
