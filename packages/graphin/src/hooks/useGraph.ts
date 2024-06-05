import { useRef, useEffect, useState } from 'react';
import { Graph } from '@antv/g6';
import type { GraphinProps } from '../types';

/**
 *
 * @param props
 */
export default function useGraph<P extends GraphinProps>(props: P) {
  const { onInit, onRender, onDestroy, options } = props;
  const [isReady, setIsReady] = useState(false);
  const graphRef: React.MutableRefObject<Graph | null> = useRef(null);
  const containerRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    if (graphRef.current || !containerRef.current) return;

    const graph = new Graph({ container: containerRef.current! });
    graphRef.current = graph;

    setIsReady(true);
    onInit?.(graph);

    return () => {
      const graph = graphRef.current;
      if (graph) {
        graph.destroy();
        onDestroy?.(graph);
        graphRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const graph = graphRef.current;

    if (!options || !container || !graph || graph.destroyed) return;

    graph.setOptions(options);
    graph.render().then(() => onRender?.(graph));
  }, [options]);

  return {
    graph: graphRef.current,
    containerRef,
    isReady,
  };
}
