import React, { useEffect, useState } from 'react';
import { GraphScopeComponent } from '@antv/graphin-graphscope';
import { Utils } from '@antv/graphin';

const originData = Utils.mock(5)
  .circle()
  .graphin();

originData.nodes[0].style = {
  keyshape: {
    size: [20, 20],
  },
};

export default () => {
  const [data, setData] = useState(originData);
  const domRef = React.useRef(null);

  const queryNeighbors = (nodeId: string, degree: number) => {
    const model = data.nodes.filter(node => node.id === nodeId);
    const newData = Utils.mock(3)
      .expand(model)
      .graphin();

    setData({
      nodes: [...data.nodes, ...newData.nodes],
      edges: [...data.edges, ...newData.edges],
    } as any);
  };

  const nodeClick = model => {
    console.log('click node', model);
  };

  console.log('------原始shuju', data);
  return (
    <div>
      <div ref={domRef}></div>
      <GraphScopeComponent
        graphDOM={domRef.current}
        data={data}
        height={400}
        neighbors={queryNeighbors}
        hasContextMenu={true}
        hasMinimap={false}
        nodeClick={nodeClick}
      />
    </div>
  );
};
