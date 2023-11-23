import { IGraph, Specification } from '@antv/g6';
import React, { forwardRef, memo, useEffect, useRef, useState } from 'react';
import ExtendGraph from './ExtendGraph';
import ApiController from './apis';
import Compatible from './compatible';
import { edgeStyleTransform } from './styling/edge-style-transform';
import { nodeStyleTransform } from './styling/node-style-transform';
import { GraphinContext } from './useGraphin';

interface GraphinProps extends Specification<{}, {}> {
  container?: string;
  style?: React.CSSProperties;
  /** 兼容的props  */
  fitView?: boolean;
  onInit?: (graph: any) => void;
  unMount?: (graph: any) => void;
  children?: React.ReactNode[];
  /** 是否兼容V2 */
  compatibility?: boolean;
  node?: any;
  edge?: any;
}

const LOD_NODE_NUM_THRESHOLD = 300;

const Graphin: React.FunctionComponent<GraphinProps> = forwardRef((props, ref) => {
  const {
    style,
    children,
    compatibility,
    data,
    layout,
    container = `graphin-container-${Math.random()}`,
    onInit,
    unMount,
    node = nodeStyleTransform,
    edge = edgeStyleTransform,
    renderer = 'canvas',
    ...options
  } = props;

  const dataRef = useRef(data);
  const layoutRef = useRef(layout);
  console.log('%c GRAPHIN RENDER....', 'color:yellow', props, layoutRef.current);
  const [state, setState] = useState<{
    isReady: boolean;
    graph: IGraph;
  }>({
    isReady: false,
    //@ts-ignore
    graph: null,
    apis: {},
  });
  const { isReady, graph } = state;

  if (dataRef.current !== data) {
    console.log('%c GRAPHIN DATA CHANGE....', 'color:yellow', data);
    console.time('GRAPHIN_CHANGE_DATA_COST');
    //@ts-ignore
    graph && graph.changeData(data, 'mergeReplace', false);
    //@ts-ignore
    if (
      //@ts-ignore
      (dataRef.current.nodes.length && graph) ||
      (graph && graph.layoutController.previousNodes && graph.layoutController.previousNodes.size === 0)
    ) {
      console.log('>>>>>>>> LAYOUT>>>>>>');
      //@ts-ignore
      graph.layout({
        ...layout,
        presetLayout: {},
      });
    }
    //@ts-ignore
    dataRef.current = data;
    console.timeEnd('GRAPHIN_CHANGE_DATA_COST');
  }
  if (layoutRef.current !== layout) {
    console.log('%c GRAPHIN LAYOUT CHANGE....', 'color:#f0f', layout);

    //@ts-ignore
    graph && graph.layout(layout);
    //@ts-ignore
    layoutRef.current = layout;
  }

  useEffect(() => {
    if (graph) {
      console.log('%c Graphin change EdgeMapper', 'color:yellow');
      graph.updateMapper('edge', edge);
    }
  }, [edge, graph]);

  useEffect(() => {
    if (graph) {
      console.log('%c Graphin change NodeMapper', 'color:yellow');
      graph.updateMapper('node', node);
    }
  }, [node, graph]);

  useEffect(() => {
    let {
      width,
      height,
      //@ts-ignore
      node,
      //@ts-ignore
      edge,
      // behaviors
      modes = { default: ['zoom-canvas', 'drag-canvas'], lasso: [] },
    } = options;
    const ContainerDOM = document.getElementById(container);

    const { clientWidth, clientHeight } = ContainerDOM as HTMLDivElement;
    width = Number(width) || clientWidth || 500;
    height = Number(height) || clientHeight || 500;
    console.log('EFFECT>>>>>>>>', renderer);

    let instance = new ExtendGraph({
      container,
      width,
      height,
      modes,
      data,
      layout,
      renderer,
      node,
      edge,
      optimize: { tileFirstRender: 100000000000 },
      transforms: [
        //@ts-ignore
        'transform-graphin-data',
        //@ts-ignore
        {
          //@ts-ignore
          type: 'process-parallel-edges',
          multiEdgeType: 'quadratic-edge',
          loopEdgeType: 'loop-edge',
        },
      ],
      plugins: [
        //@ts-ignore
        {
          type: 'lod-controller',
          //@ts-ignore
          disableLod: true, //data.nodes.length < LOD_NODE_NUM_THRESHOLD,
        },
      ],
      nodeState: {
        hover: {
          keyShape: {
            lineWidth: 0,
          },
          //@ts-ignore
          haloShape: {
            opacity: 0.25,
            lineWidth: 12,
            pointerEvents: 'none',
            zIndex: -1,
            visible: true,
            droppable: false,
          },
        },
      },
      edgeState: {
        hover: {
          keyShape: {
            lineWidth: 1,
          },
          //@ts-ignore
          haloShape: {
            opacity: 0.25,
            lineWidth: 12,
            zIndex: -1,
            pointerEvents: 'none',
            visible: true,
            droppable: false,
          },
        },
      },
    });

    /** @ts-ignore 做兼容性处理 */
    Compatible.graph(instance);

    if (ref) {
      //@ts-ignore
      ref.current = instance;
    }
    //@ts-ignore
    const apis = ApiController(instance);

    onInit && onInit({ graph: instance, apis });

    //@ts-ignore
    setState(preState => {
      return {
        ...preState,
        graph: instance,
        isReady: true,
        apis,
      };
    });

    return () => {
      console.log('%c GRAPHIN DESTORY....', 'color:rgba(48,86,227,1)');
      instance.destroy();
      //@ts-ignore
      instance = null;
      unMount && unMount(instance);
    };
  }, [renderer]);

  const containerStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    minHeight: '500px',
    position: 'relative',
    ...style,
  };

  if (children) {
    return (
      <GraphinContext.Provider value={state}>
        <>
          <div id={container} style={containerStyle}></div>
          {isReady && children}
        </>
      </GraphinContext.Provider>
    );
  }
  return (
    <>
      <div id={container} style={containerStyle}></div>
    </>
  );
});

export default memo(Graphin);
