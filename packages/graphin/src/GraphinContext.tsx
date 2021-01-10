import React from 'react';
import { Graph as IGraph } from '@antv/g6';
import { ApisType } from './apis/types';

const defaultContext = {
  graph: {} as IGraph,
  apis: {} as ApisType,
};
export interface GraphinContextType {
  graph: IGraph;
  apis: ApisType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const GraphinContext: React.Context<GraphinContextType> = React.createContext(defaultContext);

export default GraphinContext;
