import * as React from 'react';
import { GraphinContext } from '@antv/graphin';

const defaultConfig = {
  /** 触发事件 :click and dblclick */
  trigger: 'click',
  onChange: (item, collapsed) => {
    const data = item.get('model').data;
    data.collapsed = collapsed;
    return true;
  },
  shouldBegin: (e) => {
    return true;
  },
};

export type ITreeCollapseProps = Partial<typeof defaultConfig>;

const TreeCollapse: React.FunctionComponent<ITreeCollapseProps> = (props) => {
  const graphin = React.useContext(GraphinContext);
  React.useEffect(() => {
    const { graph } = graphin as any;
    console.log({
      type: 'collapse-expand',
      ...defaultConfig,
      ...props,
    });
    graph.addBehaviors(
      {
        type: 'collapse-expand',
        ...defaultConfig,
        ...props,
      },
      'default',
    );
    return () => {
      graph.removeBehaviors('collapse-expand', 'default');
    };
  }, []);
  return null;
};

export default TreeCollapse;
