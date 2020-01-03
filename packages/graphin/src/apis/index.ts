import highlight from './highlight';
import getInfo from './getInfo';
import search from './search';
import GraphCtor from '../Graphin';

const apis = (context: GraphCtor) => {
  const { graph, clear, handleRedo, handleUndo, handleSaveHistory, getHistoryInfo, getLayoutInfo } = context;
  return {
    highlight: (nodeIds: string[]) => {
      return highlight(graph!)(nodeIds);
    },
    getInfo: () => {
      return {
        ...getInfo(graph!)(),
        layouts: getLayoutInfo(),
      };
    },
    search: (words: string) => search(graph!)(words),
    history: {
      redo: handleRedo,
      undo: handleUndo,
      save: handleSaveHistory,
      getInfo: getHistoryInfo,
    },
    clear,
  };
};

export default apis;
