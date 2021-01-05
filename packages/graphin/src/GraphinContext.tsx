import React from 'react';
import { Graph as IGraph } from '@antv/g6';

const defaultContext = {
  graph: {} as IGraph,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GraphinContext: React.Context<{ graph: IGraph; [key: string]: any }> = React.createContext(defaultContext);
export default GraphinContext;
