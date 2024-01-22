import * as React from 'react';
// @ts-expect-error
import type { IG6GraphEvent, HoverActivateOptions } from '@antv/g6';
import { GraphinContext } from '../context';

const Hoverable: React.FC<HoverActivateOptions> = props => {
  const graphin = React.useContext(GraphinContext);
  const { itemTypes = 'node', disabled, activateState = 'active' } = props;
  const { graph } = graphin;
  React.useEffect(() => {
    if (disabled || !graph) {
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

    if (itemTypes === 'node') {
      graph.on('node:pointerenter', handleNodeMouseEnter);
      graph.on('node:pointerleave', handleNodeMouseLeave);
    }
    if (itemTypes === 'edge') {
      graph.on('edge:pointerenter', handleEdgeMouseEnter);
      graph.on('edge:pointerleave', handleEdgeMouseLeave);
    }

    return () => {
      if (itemTypes === 'node') {
        graph.off('node:pointerenter', handleNodeMouseEnter);
        graph.off('node:pointerleave', handleNodeMouseLeave);
      }
      if (itemTypes === 'edge') {
        graph.off('edge:pointerenter', handleEdgeMouseEnter);
        graph.off('edge:pointerleave', handleEdgeMouseLeave);
      }
    };
  }, [graph, disabled]);

  return null;
};

export default Hoverable;
