import { useLayoutEffect } from 'react';
import { G6Event } from '@antv/graphin/dist/types';

import handleNodeClick from './node-click';
import handleCanvasClick from './canvas-click';
import { GrapheneState } from '../types';

// eslint-disable-next-line
const useGraphEvents = (state: GrapheneState, graphRef: any, dispatch: React.Dispatch<any>) => {
  useLayoutEffect(() => {
    const { graph } = graphRef.current;
    const events = {
      'node:click': (e: G6Event) => {
        handleNodeClick({ ...state, e, dispatch });
        console.log(e.item);
      },
      'canvas:click': (e: G6Event) => {
        handleCanvasClick({ ...state, e, dispatch });
      },
    };

    Object.keys(events).forEach((name: string) => {
      graph.on(name, events[name]);
    });

    return () => {
      Object.keys(events).forEach(name => {
        graph.off(name, events[name]);
      });
    };
  }, [state]);
};
export default useGraphEvents;
