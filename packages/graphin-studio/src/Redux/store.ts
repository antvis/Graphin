import { createStore } from 'redux';

interface Action {
  type: string;
  text: string;
}
function todos(state = [], action: Action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text as never]);
    default:
      return state;
  }
}

const store = createStore(todos, ['Use Redux' as never]);

// store.dispatch({
//   type: 'ADD_TODO',
//   text: 'Read the docs',
// });

export default store;
console.log(store.getState());
// [ 'Use Redux', 'Read the docs' ]
