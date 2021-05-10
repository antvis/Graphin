import { GraphinContext } from '@antv/graphin';
import React from 'react';

export interface Props {
  /** 是否激活建立连线模式 */
  active: boolean;
  /**
   * @description 创建边后的回调函数
   */
  onChange?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (edges: any, edge: any): void;
  };
  /**
   * @description 创建边dom容器的点击事件
   */
  onClick: {
    (): void;
  };
}
const CreateEdge: React.FunctionComponent<Props> = props => {
  const { children, onChange, active, onClick } = props;

  const { graph } = React.useContext(GraphinContext);

  React.useEffect(() => {
    if (active) {
      graph.addBehaviors(
        {
          // 体验优化在`create-edge`中处理
          type: 'create-edge',
        },
        'default',
      );
      graph.get('canvas').setCursor('crosshair');
    }

    const handleAftercreateedge = e => {
      const edges = graph.getEdges().map(v => {
        return v.getModel();
      });

      if (onChange) {
        onChange(edges, e.edge);
      }
    };

    graph.on('aftercreateedge', handleAftercreateedge);
    return () => {
      graph.removeBehaviors('create-edge', 'default');
      graph.get('canvas').setCursor('default');
      graph.off('aftercreateedge', handleAftercreateedge);
    };
  }, [active, graph, onChange]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="graphin-create-edge-icon" onClick={onClick}>
      {children}
    </div>
  );
};
export default CreateEdge;
