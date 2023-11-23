/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Graph as IGraph } from '@antv/g6';
import { ApisType } from './apis/types';
import { ThemeType } from './theme/index';
import LayoutController from './layout';

const defaultContext = {
  graph: {} as IGraph,
  apis: {} as ApisType,
  theme: {} as ThemeType,
  layout: {} as LayoutController,
};
export interface GraphinContextType {
  graph: IGraph;
  apis: ApisType;
  theme: ThemeType;
  layout: LayoutController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const GraphinContext: React.Context<GraphinContextType> = React.createContext(defaultContext);

export default GraphinContext;
