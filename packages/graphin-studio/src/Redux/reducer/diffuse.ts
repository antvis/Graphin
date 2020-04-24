import { updateChain } from 'immutability-helper-x';
import { Utils } from '@antv/graphin';
import uniqueElementsBy from '../../Utils/helper';
import transform from '../../Custom/transform';
import getNodeProperties from '../../Service/getNodeProperties';
import { NodeData, EdgeData, GrapheneState } from '../../types';

const diffuseReducer = (state: GrapheneState, startNodes: NodeData[]) => {
  const count = Math.round((Math.random() + 1) * 5);

  const { nodes, edges } = Utils.mock(count)
    .expand(startNodes)
    .value();

  const data = transform.data({
    nodes: getNodeProperties(nodes),
    edges,
  });

  const mergeNodes = uniqueElementsBy([...data.nodes, ...state.data.nodes], (a: NodeData, b: NodeData) => {
    return a.id === b.id;
  });
  const mergeEdges = uniqueElementsBy([...data.edges, ...state.data.edges], (a: EdgeData, b: EdgeData) => {
    return a.source === b.source && a.target === b.target;
  });
  const { layout } = state;

  return updateChain(state)
    .$set('data', {
      nodes: mergeNodes,
      edges: mergeEdges,
    })
    .$set('drawer.visible', false)
    .$set('drawer.type', '')
    .$set('layout', {
      name: layout.name,
      options: {
        ...layout.options,
        preset: {
          name: layout.name,
        },
      },
    })
    .value();
};

export default diffuseReducer;
