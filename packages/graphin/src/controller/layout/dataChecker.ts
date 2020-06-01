import { Data } from '../../types';
import * as _ from 'lodash';

interface CheckerOption {
  edge: {
    autoLoop: boolean;
    autoPoly: boolean;
  };
}

function isEven(number: number) {
  return number % 2 === 0;
}

function isOdd(number: number) {
  return !isEven(number);
}

// function getPolyEdgeControlPoint(p1: Position, p2: Position, d: number) {
//   const pm = {
//     x: (p2.x + p1.x) / 2,
//     y: (p2.y + p1.y) / 2,
//   };
//   const dx = p2.x - p1.x;
//   const dy = p2.y - p1.y;
//   const y = pm.y - (dx * d) / Math.sqrt(dx ** 2 + dy ** 2) || 0;
//   const x = pm.x + (dy * d) / Math.sqrt(dx ** 2 + dy ** 2) || 0;
//   return {
//     x, y,
//   };
// }

function makePolyEdge(edges: Data['edges'], data: Data, options: CheckerOption) {
  if (!options.edge.autoPoly) return edges;
  const noLoopEdges = edges.filter(edge => edge.source !== edge.target);
  const loopEdges = edges.filter(edge => edge.source === edge.target);
  const groups = _.groupBy(noLoopEdges, edge => {
    // a => b === b => a
    const name = [edge.source, edge.target].sort();
    return `${name[0]}-${name[1]}`;
  });
  const polyGroups = _.pickBy(groups, group => group.length > 1);
  const directGroups = _.pickBy(groups, group => group.length <= 1);

  const polyEdges = _.flatMap(polyGroups, group => {
    let distance = isEven(group.length) ? 0 : -5;
    return group
      .map(edge => {
        return {
          edge,
          point: [edge.source, edge.target].sort(),
        };
      })
      .map(({ edge, point }, index) => {
        const source = data.nodes.find(node => node.id === point[0]);
        const target = data.nodes.find(node => node.id === point[1]);

        if (!source || !target) throw new Error('Invalid Edge, Cannot Find Source/Target Node');

        if (isEven(group.length) && isEven(index)) distance += 40;
        if (isOdd(group.length) && (isOdd(index) || index === 0)) distance += 40;
        const polyEdge = {
          ...edge,
          shape: 'PolyEdge',
        };
        // polyEdge.controlPoints = [
        //   getPolyEdgeControlPoint(source as Position, target as Position, isEven(index) ? distance : -distance)
        // ];
        polyEdge.poly = {
          distance,
        };
        return polyEdge;
      });
  });
  const directEdges = _.flatMap(directGroups);

  const transformedEdges = [...loopEdges, ...directEdges, ...polyEdges];

  return transformedEdges;
}

function checkEdges(edges: Data['edges'], data: Data, options: CheckerOption) {
  let transformedEdges: Data['edges'] = edges
    .filter(edge => {
      const { source, target } = edge;
      if (!source || !target) {
        // eslint-disable-next-line no-console
        console.warn(
          `edge requires  source and target，this '${JSON.stringify(edge)}' edge will be automatically filtered`,
        );
        return false;
      }
      if (!edge.data) {
        // eslint-disable-next-line no-console
        console.warn(`edge requires an data field，this '${JSON.stringify(edge)}' edge will be automatically filtered`);
        return false;
      }
      /** 边是可以重复的，因为properties可能不一样 */
      return true;
    })
    .map(edge => {
      const { shape, style } = edge;
      return {
        shape: shape || 'LineEdge',
        style: style || {
          line: {
            width: 1,
          },
          label: {
            size: 1,
          },
        },
        poly: {
          distance: 0,
        },
        loopCfg: {
          position: 'top',
          dist: 20,
        },
        ...edge,
        data: {
          ...edge.data,
          source: edge.source,
          target: edge.target,
        },
      };
    })
    .map(edge => {
      // loop edge checker
      if (!options.edge.autoLoop) return edge;
      // skip user-defined shape
      if (edge.shape === 'LineEdge' && edge.source === edge.target) {
        edge.shape = 'loop';
      }
      return edge;
    });

  transformedEdges = makePolyEdge(transformedEdges, data, options);

  return transformedEdges;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function checkNodes(nodes: Data['nodes'], _data: Data, _options: CheckerOption) {
  const nodeIds: string[] = [];
  const graphinNodes = nodes
    .filter(node => {
      const { id } = node;
      // 如果节点不存在，则忽略该节点
      if (!id) {
        console.warn(`node requires an id，this '${JSON.stringify(node)}' node will be automatically filtered`);
        return false;
      }
      if (!node.data) {
        console.warn(`node requires an data field，this '${JSON.stringify(node)}' node will be automatically filtered`);
        return false;
      }
      // 如果节点ID存在重复，则忽略后加入的节点
      if (nodeIds.indexOf(id) !== -1) {
        return false;
      }

      nodeIds.push(id);
      return true;
    })
    .map(node => {
      return {
        shape: node.shape || 'CircleNode',
        ...node,
        data: {
          ...node.data,
          id: node.id,
        },
      };
    });
  return graphinNodes;
}

// Checking data, filter out invalid data and fill in optional field with default value
const checkData = (data: Data = { nodes: [], edges: [] }, options: CheckerOption): Data => {
  const { edges = [], nodes = [], combos } = data;
  // nodes
  const graphinNodes = checkNodes(nodes, data, options);

  // edges
  const graphinEdges = checkEdges(edges, data, options);

  return {
    nodes: graphinNodes,
    edges: graphinEdges,
    combos,
  };
};

export default checkData;
