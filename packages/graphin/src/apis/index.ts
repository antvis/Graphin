import highlight from './highlight';
import getInfo from './getInfo';
import search from './search';
import GraphCtor from '../Graphin';

const apis = (context: GraphCtor) => {
  const { graph, clear } = context;
  return {
    highlight: (nodeIds: string[]) => {
      return highlight(graph!)(nodeIds);
    },
    getInfo: () => {
      return {
        ...getInfo(graph!)(),
      };
    },
    search: (words: string) => search(graph!)(words),

    clear,
  };
};

export default apis;
