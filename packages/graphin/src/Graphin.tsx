import React, { forwardRef, memo, useImperativeHandle } from 'react';
import { Graph } from '@antv/g6';
import { GraphinContext } from './context';
import useGraph from './hooks/useGraph';
import type { GraphinProps } from './types';

const Graphin: React.FC<GraphinProps> = forwardRef((props, ref) => {
  const { style, children, ...rest } = props;

  // @ts-expect-error
  const { graph, container, isReady } = useGraph<Graph, GraphinProps>(Graph, rest);

  const containerStyle: React.CSSProperties = {
    height: 'inherit',
    position: 'relative',
    minHeight: 300,
    ...style,
  };

  useImperativeHandle(ref, () => graph);

  if (children) {
    return (
      <GraphinContext.Provider value={{ graph, isReady }}>
        <div ref={container} style={containerStyle}>
          {isReady && children}
        </div>
      </GraphinContext.Provider>
    );
  }
  return <div ref={container} style={containerStyle}></div>;
});

export default memo(Graphin);
