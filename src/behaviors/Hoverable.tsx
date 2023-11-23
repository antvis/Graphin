import { IG6GraphEvent } from '@antv/g6';
import * as React from 'react';
import { GraphinContext } from '../useGraphin';

export interface HoverableProps {
  bindType?: 'node' | 'edge';
  disabled?: boolean;
  activateState?: string;
}

const Hoverable: React.FunctionComponent<HoverableProps> = props => {
  const graphin = React.useContext(GraphinContext);
  const { bindType = 'node', disabled, activateState = 'active' } = props;
  const { graph } = graphin;
  React.useEffect(() => {
    if (disabled) {
      return;
    }

    const handleNodeMouseEnter = (evt: IG6GraphEvent & any) => {
      graph.setItemState(evt.itemId, activateState, true);
      graph.setCursor('pointer');
    };

    const handleNodeMouseLeave = (evt: IG6GraphEvent & any) => {
      graph.setItemState(evt.itemId, activateState, false);
      graph.setCursor('default');
    };

    const handleEdgeMouseEnter = (evt: IG6GraphEvent & any) => {
      graph.setItemState(evt.itemId, activateState, true);
      graph.setCursor('pointer');
    };

    const handleEdgeMouseLeave = (evt: IG6GraphEvent & any) => {
      graph.setItemState(evt.itemId, activateState, false);
      graph.setCursor('default');
    };

    if (bindType === 'node') {
      graph.on('node:pointerenter', handleNodeMouseEnter);
      graph.on('node:pointerleave', handleNodeMouseLeave);
    }
    if (bindType === 'edge') {
      graph.on('edge:pointerenter', handleEdgeMouseEnter);
      graph.on('edge:pointerleave', handleEdgeMouseLeave);
    }

    return () => {
      if (bindType === 'node') {
        graph.off('node:pointerenter', handleNodeMouseEnter);
        graph.off('node:pointerleave', handleNodeMouseLeave);
      }
      if (bindType === 'edge') {
        graph.off('edge:pointerenter', handleEdgeMouseEnter);
        graph.off('edge:pointerleave', handleEdgeMouseLeave);
      }
    };
  }, [graph, disabled]);

  return null;
};

export default Hoverable;
