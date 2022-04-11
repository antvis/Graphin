import Graphin, { Components, Utils } from '@antv/graphin';
import React from 'react';

const { MiniMap } = Components;

// Do not forget to import CSS

const App = () => {
  const data = Utils.mock(5).circle().graphin();

  return (
    <div className="App">
      <Graphin data={data}>
        <MiniMap />
      </Graphin>
    </div>
  );
};
export default App;
