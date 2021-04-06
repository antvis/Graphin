/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from 'redux';

interface Action {
  type: string;
  payload: any;
}

const initialState = {
  data: {
    nodes: [
      {
        id: 'node-1',
        type: 'user',
      },
      {
        id: 'node-2',
        type: 'company',
      },
      {
        id: 'node-3',
        type: 'company',
      },
      {
        id: 'node-4',
        type: 'company',
      },
    ],
    edges: [
      {
        source: 'node-1',
        target: 'node-2',
        weight: 1,
      },
      {
        source: 'node-1',
        target: 'node-3',
        weight: 10,
      },
      {
        source: 'node-1',
        target: 'node-4',
      },
    ],
  },
  layout: {
    type: 'concentric',
    options: {},
  },
  tooltip: {
    placement: 'top',
    visible: true,
    hasArrow: true,
    keys: ['id'],
  },
  allKeys: ['id', 'type'],
};

const RootReducers = (state = initialState, action: Action) => {
  const { type, ...payload } = action;
  switch (type) {
    case 'Update_Data':
      const allKeys = Object.keys(payload.data.nodes[0]);
      return {
        ...state,
        ...payload,
        allKeys,
      };
    case 'Update_Layout':
      return {
        ...state,
        ...payload,
      };
    case 'Update_Tooltip':
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

const store = createStore(RootReducers);

export default store;
