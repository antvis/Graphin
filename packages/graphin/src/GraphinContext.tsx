import React from 'react';
import { Graph as IGraph } from '@antv/g6';

const defaultContext = {
  graph: {} as IGraph,
};

const GraphinContext: React.Context<{ graph: IGraph }> = React.createContext(defaultContext);
export default GraphinContext;
