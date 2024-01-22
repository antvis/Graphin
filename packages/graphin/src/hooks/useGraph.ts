import React, { useRef, useEffect, useState } from 'react';
import { isEqual, cloneDeep } from '../utils';
import {  } from '@antv/g6';
import { DEFAULT_SPEC } from '../constants';
import { GraphinProps, Graph } from '../types';

export default function useGraph<T extends Graph, U extends GraphinProps>(GraphClass: T, options: U) {
  const [isReady, setIsReady] = useState(false);
  const graphRef = useRef<T>();
  const graphOptions = useRef<U>();
  const container = useRef<HTMLDivElement>(null);
  const { onInit, unMount, ...rest } = options;

  useEffect(() => {
    const graph = graphRef.current;
    if (graph && !isEqual(graphOptions.current, rest)) {
      /** 可能会存在性能问题 */
      graph.updateSpecification(rest);
      graphOptions.current = cloneDeep(rest);
    }
  }, [rest]);

  useEffect(() => {
    if (!container.current) {
      return () => null;
    }
    if (!graphOptions.current) {
      graphOptions.current = cloneDeep(rest);
    }
    const graphInstance: T = new (GraphClass as any)({
      container: container.current,
      ...DEFAULT_SPEC,
      ...rest,
    });

    graphRef.current = graphInstance;
    if (onInit) {
      onInit(graphInstance);
    }
    setIsReady(true);

    return () => {
      if (graphInstance) {
        graphInstance.destroy();
        unMount && unMount(graphInstance);
        graphRef.current = undefined;
      }
    };
  }, []);

  return {
    graph: graphRef.current,
    container,
    isReady,
  };
}
