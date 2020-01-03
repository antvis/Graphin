import { Graph } from '@antv/g6';
import { NodeData, Node, Data } from '../types';

interface Property {
  value?: string;
}

const search = (graph: Graph) => (words = '') => {
  // 搜索分词，默认空格隔开
  const wordsArray = words.trim().split(' ');

  // 目前先只支持node 的搜索
  const { nodes } = graph.save() as Data;

  // 匹配方法
  const matchWord = (node: NodeData, word: string) => {
    const { id, label = '', properties } = node;

    // 按 id 匹配
    if (word && String(id).indexOf(word) !== -1) {
      return { isMatch: true, searchType: 'id' };
    }

    // 按 label 匹配
    if (word && String(label).indexOf(word) !== -1) {
      return { isMatch: true, searchType: 'label' };
    }

    let matchProperty: Property[] = [];

    // 按 property 匹配
    if (properties) {
      // eslint-disable-next-line
      matchProperty = properties.filter((property: Property) => {
        return property.value && property.value === word;
      });
    }
    if (matchProperty.length > 0) {
      return { isMatch: true, searchType: 'property' };
    }

    return { isMatch: false, searchType: '' };
  };

  const result: Node[] = [];
  nodes.forEach((node: Node) => {
    const matchResult = wordsArray.map(word => {
      return matchWord(node.data, word);
    });

    const searchTypes = matchResult.reduce<string[]>((acc, curr) => {
      const { searchType } = curr;
      if (searchType && acc.indexOf(searchType) === -1) {
        acc.push(searchType);
      }
      return acc;
    }, []);

    if (searchTypes.length > 0) {
      result.push({
        ...node,
        searchTypes,
      });
    }
  });
  return result;
};
export default search;
