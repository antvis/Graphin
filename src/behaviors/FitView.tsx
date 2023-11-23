import React, { useEffect } from 'react';
import GraphinContext from '../GraphinContext';

export type FitViewProps = Partial<{
  /**
   * @description 适配视窗的间距 padding
   * @default [0,0]
   */
  padding: number[];
  /**
   * @description 是否绑定布局变化：即每次布局变化后，都执行FitView操作
   * @default false
   */
  isBindLayoutChange: boolean;
}>;
const FitView = (props: FitViewProps) => {
  const { padding, isBindLayoutChange } = props;
  const { graph } = React.useContext(GraphinContext);

  useEffect(() => {
    const handleFitView = () => {
      graph.fitView(padding);
    };
    /** 第一次就执行 FitView */
    handleFitView();
    if (isBindLayoutChange) {
      graph.on('afterlayout', handleFitView);
    }
    return () => {
      if (isBindLayoutChange) {
        graph.off('afterlayout', handleFitView);
      }
    };
  }, []);
  return null;
};

export default FitView;
