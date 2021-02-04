import * as React from 'react';
import GraphinContext from '../GraphinContext';

import { IG6GraphEvent } from '@antv/g6';

export interface HoverableProps {
  bindType: 'node' | 'edge';
}

const hoverable: React.FunctionComponent<HoverableProps> = props => {
  const graphin = React.useContext(GraphinContext);
  const { bindType = 'node' } = props;
  React.useEffect(() => {
    const { graph } = graphin;
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
    };
  }, []);

  return null;
};

export default hoverable;
