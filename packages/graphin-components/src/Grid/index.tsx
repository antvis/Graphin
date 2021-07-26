import React from 'react';
import { GraphinContext, G6 } from '@antv/graphin';
import './index.less';

export interface GridProps {
  /**
   * @description grid图片，`url(${image})`，image为base64格式字符串
   */
  img?: string;
}

const Grid: React.FunctionComponent<GridProps> = ({ img }) => {
  const { graph } = React.useContext(GraphinContext);
  let grid;

  React.useEffect(() => {
    grid = new G6.Grid({ img });
    graph?.addPlugin(grid);
    return () => {
      if (grid) {
        graph?.removePlugin(grid);
      }
    };
  }, [img, graph]);

  return <></>;
};

export default Grid;
