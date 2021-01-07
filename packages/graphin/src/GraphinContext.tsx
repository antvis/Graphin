import React from 'react';
import { Graph as IGraph } from '@antv/g6';
import { ApisType } from './apis/types';

const defaultContext = {
  graph: {} as IGraph,
  apis: {} as ApisType,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GraphinContext: React.Context<{ graph: IGraph; apis: ApisType; [key: string]: any }> = React.createContext(
  defaultContext,
);
export default GraphinContext;
