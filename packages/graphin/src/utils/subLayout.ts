import { Layout } from '@antv/layout';
import { GraphinData } from '../typings/type';

const subLayout = () => {
  const newData: GraphinData = {
    nodes: [],
    edges: [],
    combos: null,
  };
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    add: (data: GraphinData, layout: any) => {
      const layoutInstance = new Layout(layout);
      // TODO:计算数据中最小包围盒，从而计算布局所需要的中心点和宽高
      // @ts-ignore
      const subData = layoutInstance.layout(data) as GraphinData;
      newData.nodes = [...newData.nodes, ...subData.nodes];
      newData.edges = [...newData.edges, ...subData.edges];
    },
    layout: () => {
      return newData;
    },
  };
};

export default subLayout;
