import React from 'react';
import { G6, GraphinContext } from '@antv/graphin';
import { ShapeStyle } from '@antv/g6';

export interface SnapLineProps {
  /**
   * @description 辅助线的样式
   * @type ShapeStyle
   */
  line?: ShapeStyle;
  /**
   * @description 辅助线类型，true 表示双向辅助线的样式
   */
  itemAlignType?: boolean | 'horizontal' | 'vertical' | 'center';
}

const SnapLine: React.FunctionComponent<SnapLineProps> = ({ line, itemAlignType }) => {
  const { graph } = React.useContext(GraphinContext);

  React.useEffect(() => {
    const Snapline = new G6.SnapLine({ line, itemAlignType });
    graph.addPlugin(Snapline);
    return () => {
      if (graph && !graph.destroy) {
        graph.removePlugin(Snapline);
      }
    };
  }, [line, itemAlignType, graph]);

  return null;
};

export default SnapLine;
