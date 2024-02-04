import React from 'react';
import { useSnapshot } from 'valtio';
import { SDKModel } from '../model';

export const useGraph = () => {
  const model = useSnapshot(SDKModel);
  const graph = model.get('graph');

  return {
    graph,
  };
};
