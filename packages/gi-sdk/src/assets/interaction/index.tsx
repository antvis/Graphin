import React, { useRef, useEffect, useState } from 'react';
import { get } from 'lodash-es';
import { useEvent, useModel } from '../../hooks';
import { SDKModel } from '../../model';
import type { NodeState, EdgeState } from '../../types';

export const Interaction = () => {
  const [model, setModel] = useModel();
  const nodes = get(SDKModel, 'interaction.nodes');
  const graph = model.get('graph');
  const nodeClick = useEvent(e => {
    const model = graph.getNodeData(e.itemId);
    const exist = nodes.find((item: NodeState) => item.id === e.itemId);
    if (!exist) {
      nodes.push({
        id: e.itemId,
        type: 'selected',
        model,
      });
    } else {
      nodes.splice(
        nodes.findIndex((item: NodeState) => item.id === e.itemId),
        1,
      );
    }
    setModel('panel.open', true);
    setModel('interaction.nodes', nodes);
  });

  const canvasClick = useEvent(e => {
    setModel('panel.open', false);
    setModel('interaction.nodes', []);
  });

  useEffect(() => {
    graph.on('node:click', nodeClick);
    graph.on('canvas:click', canvasClick);
  }, []);

  return null;
};
