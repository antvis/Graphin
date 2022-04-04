import React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import { SnapLine } from '@antv/graphin-components';

const App = () => {
  const data = Utils.mock(5).circle().graphin();

  return (
    <div className="App">
      <Graphin data={data}>
        <SnapLine />
      </Graphin>
    </div>
  );
};
export default App;
