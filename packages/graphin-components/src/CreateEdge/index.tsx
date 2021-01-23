import React from 'react';

import { GraphinContext } from '@antv/graphin';

interface Props {
  onChange?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any): void;
  };
}
const CreateEdge: React.FunctionComponent<Props> = (props) => {
  const { children } = props;
  const [state, setState] = React.useState({
    active: false,
  });

  const { active } = state;
  React.useEffect(() => {
    const graphin = React.useContext(GraphinContext);
    // @ts-ignore
    const { graph } = graphin;
    graph.on('aftercreateedge', () => {
      const { edges } = graph.save();
      // TODO:边的处理，等G6拆包之后
      // G6.Util.processParallelEdges(edges);
      const newEdges = graph.getEdges();
      newEdges.forEach((edge, i) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        graph.updateItem(edge, (edges as any)[i]);
      });
      if (props.onChange) {
        props.onChange(newEdges);
      }
    });
  }, []);

  React.useEffect(() => {
    const graphin = React.useContext(GraphinContext);
    // @ts-ignore
    const { graph } = graphin;

    if (active) {
      graph.addBehaviors(
        {
          // 体验优化在`create-edge`中处理
          type: 'create-edge',
          trigger: 'click',
        },
        'default',
      );
    } else {
      // 非边建联，即可删除behaviros
      graph.removeBehaviors('create-edge', 'default');
    }
  }, [active]);

  const handleToggle = () => {
    setState({
      active: !active,
    });
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="graphin-create-edge-container" onClick={handleToggle} onKeyDown={handleToggle} aria-hidden="false">
      <div className="graphin-create-edge-icon">{children}</div>
    </div>
  );
};
export default CreateEdge;
