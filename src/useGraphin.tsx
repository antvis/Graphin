import { IGraph } from '@antv/g6';
import React from 'react';

export interface GraphinContextType {
  graph: IGraph;
  isReady: boolean;
  [key: string]: any;
}
//@ts-ignore
export const GraphinContext: React.Context<GraphinContextType> = React.createContext({
  graph: null,
  isReady: false,
});

export const useGraphin = () => {
  const context = React.useContext(GraphinContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(`useContext must be used within a GraphInsightProvider`);
  }
  return context;
};
