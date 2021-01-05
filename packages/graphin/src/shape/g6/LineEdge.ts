import { Item } from '@antv/g6/lib/types';
import setEdgeState from './setState.edge';
import Graphin from '../../Graphin';



// eslint-disable-next-line
export default (G6: any) => {
  G6.registerEdge(
    'Simplicity',
    {
      // 设置状态
      setState(name: string, value: string, item: Item) {
        setEdgeState(name, value, item);
      },
    },
    'line',
  );
};
