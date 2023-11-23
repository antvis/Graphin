import { Extensions, Graph as G6Graph, extend } from '@antv/g6';

const handler = (data, options = {}, graphCore) => {
  const { combos } = data;
  console.log('node graphin....', data);

  const nodes = (data.nodes || []).map(item => {
    const { id, data, type, ...others } = item;

    return {
      id: id,
      data: {
        __type: type,
        ...data,
      },
      ...others,
    };
  });

  const edges = (data.edges || []).map((item, index) => {
    const { source, target, id, type, data, ...others } = item;
    return {
      id: id || `edge-${index}`,
      source,
      target,
      data: {
        __type: type,
        ...data,
      },
      ...others,
    };
  });

  return {
    nodes,
    edges,
    combos,
  };
};

const TransformGraphinData = (data, options, graphCore) => {
  const { dataAdded, dataUpdated, dataRemoved } = data;
  return {
    dataAdded: handler(dataAdded, options, graphCore),
    dataUpdated: handler(dataUpdated, options, graphCore),
    dataRemoved: handler(dataRemoved, options, graphCore),
  };
};

export default extend(G6Graph, {
  edges: {
    'quadratic-edge': Extensions.QuadraticEdge,
    'loop-edge': Extensions.LoopEdge,
  },
  nodes: {
    'sphere-node': Extensions.SphereNode,
    'donut-node': Extensions.DonutNode,
  },

  layouts: {
    //@ts-ignore
    dagre: Extensions.DagreLayout,
    //@ts-ignore
    d3force: Extensions.D3ForceLayout,
    //@ts-ignore
    force: Extensions.ForceLayout,
    //@ts-ignore
    radial: Extensions.RadialLayout,
  },
  behaviors: {
    //@ts-ignore
    'zoom-canvas': Extensions.ZoomCanvas,
    //@ts-ignore
    'drag-canvas': Extensions.DragCanvas,
    'drag-node': Extensions.DragNode,
    'hover-activate': Extensions.HoverActivate,
    'brush-select': Extensions.BrushSelect,
    //@ts-ignore
    'orbit-canvas-3d': Extensions.OrbitCanvas3D,
    //@ts-ignore
    'zoom-canvas-3d': Extensions.ZoomCanvas3D,
  },
  plugins: {
    minimap: Extensions.Minimap,
    menu: Extensions.Menu,
  },
  //@ts-ignore
  transforms: {
    'transform-graphin-data': TransformGraphinData,
    //@ts-ignore
    'process-parallel-edges': Extensions.ProcessParallelEdges,
  },
});
