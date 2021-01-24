import React from 'react';
import Graphin, { Utils, GraphinContext, Behaviors } from '@antv/graphin';

const { ClickSelect } = Behaviors;
const Demo = () => {
  const graphinRef = React.createRef();
  const [state, setState] = React.useState({
    data: Utils.mock(10).circle().graphin(),
    layout: {
      type: 'grid',
    },
    selected: [],
  });

  React.useEffect(() => {
    console.log('app did mount:Ref', graphinRef);
    const { graph } = graphinRef.current;
    graph.on('node:click', (e) => {
      const node = e.item.getModel();
      console.log(node);
      graph.setItemState(node.id, 'selected', true);
    });
  }, []);

  const { data, layout } = state;
  data.nodes[0].status = {
    selected: true,
  };
  return (
    <div>
      <Graphin data={data} layout={layout} ref={graphinRef}>
        <ClickSelect disabled />
      </Graphin>
    </div>
  );
};
export default Demo;
