import React, { useEffect, useContext } from 'react';
import * as Graphin from '@antv/graphin';

interface ClickElementProps {
  nodeClick: (model: Graphin.NodeConfig, type: string) => void;
}

const ClickElement: React.FC<ClickElementProps> = ({ nodeClick }) => {
  const { graph } = useContext(Graphin.GraphinContext);
  useEffect(() => {
    graph.on('node:click', evt => {
      const { item } = evt;
      const model = item.getModel() as Graphin.NodeConfig;

      if (nodeClick) {
        nodeClick(model, 'NODE');
      }
    });

    return () => graph.off('node:click');
  }, []);

  return null;
};

export default ClickElement;
