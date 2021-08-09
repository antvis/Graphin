import { quadtree } from 'd3-quadtree';

const theta2 = 0.81; // Barnes-Hut approximation threshold
const epsilon = 0.1; // 为了防止出现除0的情况，加一个epsilon

interface Node {
  x: number;
  y: number;
}

interface InternalNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function forceNBodyBruteForce(nodes: Node[], coulombDisScale: number, repulsion: number) {
  return nodes.map((a, i) => {
    const v = { vx: 0, vy: 0 };

    nodes.forEach((b, j) => {
      if (i === j) return;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const len = Math.sqrt(dx * dx + dy * dy) + epsilon;
      const dis = len * coulombDisScale;
      const force = repulsion / (dis * dis) || 0;

      v.vx += (dx / len || 0) * force;
      v.vy += (dy / len || 0) * force;
    });

    return v;
  });
}

export function forceNBody(nodes: Node[], coulombDisScale: number, repulsion: number) {
  const weight = repulsion / (coulombDisScale * coulombDisScale);
  const data = nodes.map((n, i) => ({
    index: i,
    ...n,
    vx: 0,
    vy: 0,
    weight,
  }));

  const tree = quadtree(
    data,
    d => d.x,
    d => d.y,
  ).visitAfter(accumulate); // init internal node

  data.forEach(n => {
    computeForce(n, tree);
  });

  return data.map(n => ({
    vx: n.vx,
    vy: n.vy,
  }));
}

// @ts-ignore
function accumulate(quad) {
  let accWeight = 0;
  let accX = 0;
  let accY = 0;

  if (quad.length) {
    // internal node, accumulate 4 child quads
    for (let i = 0; i < 4; i++) {
      const q = quad[i];
      if (q && q.weight) {
        accWeight += q.weight;
        accX += q.x * q.weight;
        accY += q.y * q.weight;
      }
    }
    quad.x = accX / accWeight;
    quad.y = accY / accWeight;
    quad.weight = accWeight;
  } else {
    // leaf node
    const q = quad;
    quad.x = q.data.x;
    quad.y = q.data.y;
    quad.weight = q.data.weight;
  }
}

// @ts-ignore
function computeForce(node: InternalNode, tree) {
  // @ts-ignore
  const apply = (quad, x1: number, y1: number, x2: number, y2: number) => {
    const dx = node.x - quad.x;
    const dy = node.y - quad.y;
    const width = x2 - x1;
    const len2 = dx * dx + dy * dy + epsilon;
    const len = Math.sqrt(len2) + epsilon;

    // far node, apply Barnes-Hut approximation
    if ((width * width) / theta2 < len2) {
      node.vx += ((dx / len) * quad.weight) / len2;
      node.vy += ((dy / len) * quad.weight) / len2;

      return true;
    }
    // near quad, compute force directly
    if (quad.length) return false; // internal node, visit children

    // leaf node

    if (quad.data !== node) {
      node.vx += ((dx / len) * quad.data.weight) / len2;
      node.vy += ((dy / len) * quad.data.weight) / len2;
    }
  };

  tree.visit(apply);
}
