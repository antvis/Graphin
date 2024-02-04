import React, { useEffect } from 'react';
import { useEvent, useModel } from '../../hooks';

export const ClickNode = () => {
  const [model, setModel] = useModel();
  const graph = model.get('graph');
  const nodeClick = useEvent(e => {
    const model = graph.getNodeData(e.itemId);
    setModel('interaction.clickNode', {
      id: e.itemId,
      type: 'click',
      model,
    });
  });

  const canvasClick = useEvent(e => {
    setModel('interaction.clickNode', undefined);
  });

  useEffect(() => {
    graph.on('node:click', nodeClick);
    graph.on('canvas:click', canvasClick);
  }, []);

  return null;
};
