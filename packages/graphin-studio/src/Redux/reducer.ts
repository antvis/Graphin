import { updateChain } from 'immutability-helper-x';
import diffuseReducer from './reducer/diffuse';
import changeToolbarReducer from './reducer/changeToolbar';
import deleteNodes from './reducer/deleteNodes';
import { GrapheneState } from '../types';

// eslint-disable-next-line
const reducer = (state: GrapheneState, action: { type: string; payload: { [key: string]: any } }) => {
  const { type, payload } = action;
  switch (type) {
    case 'graph/drawer':
      return updateChain(state)
        .$set('drawer.visible', payload.visible)
        .$set('drawer.type', payload.type)
        .$set('drawer.width', payload.width || 'none')
        .$set('drawer.title', payload.title)
        .$set('drawer.closeMask', payload.closeMask)
        .value();
    case 'graph/modal':
      return updateChain(state)
        .$set('modal.visible', payload.visible)
        .$set('modal.type', payload.type)
        .$set('modal.title', payload.title)
        .$set('modal.handleOk', payload.handleOk)
        .value();
    case 'graph/searchBar':
      return updateChain(state)
        .$set('searchBar.visible', payload.visible)
        .value();
    case 'graph/addNodes':
      return updateChain(state)
        .$set('data', payload)
        .value();
    case 'graph/changeData':
      return updateChain(state)
        .$set('data', payload)
        .value();
    case 'graph/changeLayout':
      return updateChain(state)
        .$set('layout', {
          name: payload.name,
          options: {
            preset: state.layout.name,
            ...payload.options,
          },
        })
        .value();
    case 'graph/node-click':
      return updateChain(state)
        .$set('selectedNodes', payload.selectedNodes)
        .$set('drawer.visible', payload.drawer.visible)
        .$set('drawer.type', payload.drawer.type)
        .$set('drawer.width', payload.drawer.width)
        .$set('drawer.title', payload.drawer.title)
        .$set('drawer.closeMask', payload.drawer.closeMask)
        .value();
    case 'graph/canvas-click':
      return updateChain(state)
        .$set('drawer', payload.drawer)
        .$set('modal', payload.modal)
        .$set('searchBar', payload.searchBar)
        .$set('selectedNodes', payload.selectedNodes)
        .value();
    case 'graph/diffuse':
      return diffuseReducer(state, payload.start);
    case 'graph/changeToolbar':
      return changeToolbarReducer(state, payload.direction);
    case 'graph/deleteNodes':
      return deleteNodes(state, payload.selectedNodes);

    case 'graph/graphRef':
      return updateChain(state)
        .$set('graphRef', payload)
        .value();

    default:
      return state;
  }
};
export default reducer;
