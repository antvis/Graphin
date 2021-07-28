import { G6, GraphinContext } from '@antv/graphin';
import React from 'react';
import './index.less';

export interface GridProps {
  /**
   * @description grid图片，`url(${image})`，image为base64格式字符串
   */
  img?: string;
}

const Grid: React.FunctionComponent<GridProps> = ({ img }) => {
  const { graph } = React.useContext(GraphinContext);

  React.useEffect(() => {
    const grid = new G6.Grid({ img });
    graph.addPlugin(grid);
    return () => {
      if (graph && !graph.destroy) {
        graph.removePlugin(grid);
      }
    };
  }, [img, graph]);

  return null;
};

export default Grid;
