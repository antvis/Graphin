import { IG6GraphEvent } from '@antv/g6';
import * as React from 'react';
import GraphinContext from '../GraphinContext';

export interface HoverableProps {
  bindType?: 'node' | 'edge';
  disabled?: boolean;
}
let isSingle = true;
const Hoverable: React.FunctionComponent<HoverableProps> = props => {
  const graphin = React.useContext(GraphinContext);
  const { bindType = 'node', disabled } = props;
  const { graph } = graphin;
  React.useEffect(() => {
    if (!isSingle) {
      return;
    }
    isSingle = false;
    if (disabled) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleNodeMouseEnter = (evt: IG6GraphEvent & any) => {
      graph.setItemState(evt.item, 'hover', true);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleNodeMouseLeave = (evt: IG6GraphEvent & any) => {
      graph.setItemState(evt.item, 'hover', false);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdgeMouseEnter = (evt: IG6GraphEvent & any) => {
      graph.setItemState(evt.item, 'hover', true);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdgeMouseLeave = (evt: IG6GraphEvent & any) => {
      graph.setItemState(evt.item, 'hover', false);
    };

    if (bindType === 'node') {
      graph.on('node:mouseenter', handleNodeMouseEnter);
      graph.on('node:mouseleave', handleNodeMouseLeave);
    }
    if (bindType === 'edge') {
      graph.on('edge:mouseenter', handleEdgeMouseEnter);
      graph.on('edge:mouseleave', handleEdgeMouseLeave);
    }

    return () => {
      if (bindType === 'node') {
        graph.off('node:mouseenter', handleNodeMouseEnter);
        graph.off('node:mouseleave', handleNodeMouseLeave);
      }
      if (bindType === 'edge') {
        graph.off('edge:mouseenter', handleEdgeMouseEnter);
        graph.off('edge:mouseleave', handleEdgeMouseLeave);
      }
      isSingle = true;
    };
  }, [graph, disabled]);

  return null;
};

export default Hoverable;
