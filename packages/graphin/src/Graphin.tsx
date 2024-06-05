import React, { CSSProperties, PropsWithChildren, forwardRef, memo, useImperativeHandle } from 'react';
import { Graph } from '@antv/g6';
import { GraphinContext } from './context';
import useGraph from './hooks/useGraph';
import type { GraphinProps } from './types';

type GraphRef = Graph | null;

const Graphin = forwardRef<GraphRef, PropsWithChildren<GraphinProps>>((props, ref) => {
  const { style, children, ...restProps } = props;
  const { graph, containerRef, isReady } = useGraph<GraphinProps>(restProps);

  useImperativeHandle(ref, () => graph!, [isReady]);

  const containerStyle: CSSProperties = {
    height: 'inherit',
    position: 'relative',
    ...style,
  };

  if (children) {
    return (
      <GraphinContext.Provider value={{ graph, isReady }}>
        <div ref={containerRef} style={containerStyle}>
          {isReady && children}
        </div>
      </GraphinContext.Provider>
    );
  }

  return <div ref={containerRef} style={containerStyle}></div>;
});

export default memo(Graphin);
