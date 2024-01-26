import React from 'react';
import type { GraphinContextType } from '../types';

export const GraphinContext = React.createContext<GraphinContextType>({
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
