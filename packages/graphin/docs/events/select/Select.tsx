import React from 'react';
import Graphin, { Utils, GraphinContext } from '@antv/graphin';

const CustomComponent = props => {
  const { selected } = props;
  const graphin = React.useContext(GraphinContext);
  console.log('custom component', props, graphin);
  return <div>CustomComponent</div>;
};

const Demo = () => {
  const graphinRef = React.createRef();
  const [state, setState] = React.useState({
    data: Utils.mock(10)
      .circle()
      .graphin(),
    layout: {
      type: 'grid',
    },
    selected: [],
  });

  React.useEffect(() => {
    console.log('app did mount:Ref', graphinRef);
    const { graph } = graphinRef.current as any;
    graph.on('node:click', e => {
      const node = e.item.getModel();
      console.log(node);
      setState(preState => {
        return {
          ...preState,
          selected: [e.item.getModel()],
        };
      });
      graph.setItemState(node.id, 'selected', true);
    });
  }, []);
  const { data, layout, selected } = state;
  data.nodes[0].states = {
    selected: true,
  };
  return (
    <div>
      <Graphin data={data} layout={layout} ref={graphinRef}>
        <CustomComponent selected={selected} />
      </Graphin>
    </div>
  );
};
export default Demo;
