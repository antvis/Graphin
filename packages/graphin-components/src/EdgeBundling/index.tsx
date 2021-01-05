import React from 'react';

import { GraphinContext, G6 } from '@antv/graphin';

interface IEdgeBundlingProps {}
let edgeBundling;
const EdgeBundling: React.FunctionComponent<IEdgeBundlingProps> = (props) => {
  const { graph } = React.useContext(GraphinContext);

  React.useEffect(() => {
    edgeBundling = new G6.Bundling({
      bundleThreshold: 0.6,
      K: 100,
    });
    const data = graph.save();
    graph.addPlugin(edgeBundling);
    edgeBundling.bundling(data);
    graph.data(data);
    graph.render();
  }, []);

  return null;
};

export default EdgeBundling;
