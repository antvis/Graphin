import React from 'react';

import { GraphinContext, G6 } from '@antv/graphin';

const EdgeBundling: React.FunctionComponent = () => {
  const { graph } = React.useContext(GraphinContext);

  React.useEffect(() => {
    const edgeBundling = new G6.Bundling({
      bundleThreshold: 0.6,
      K: 100,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = graph.save() as any;
    graph.addPlugin(edgeBundling);

    edgeBundling.bundling(data);
    graph.data(data);
    graph.render();
  }, []);

  return null;
};

export default EdgeBundling;
