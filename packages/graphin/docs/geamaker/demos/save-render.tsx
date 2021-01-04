import React from 'react';
import Graphin, { Utils } from '@antv/graphin';

export default () => {
  const [state, setState] = React.useState({ data: { nodes: [], edges: [] } });
  React.useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
      .then(res => res.json())
      .then(res => {
        setState({
          data: res,
        });
      });
  }, []);

  const { data } = state;
  return (
    <div>
      <Graphin data={data} layout={{ type: 'graphin-force' }}></Graphin>
    </div>
  );
};
