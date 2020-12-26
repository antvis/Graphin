import React from 'react';
import Graphin, { Utils, GraphinContext } from '@antv/graphin';
import { VisSettingPanel } from '@antv/graphin-components';
// Do not forget to import CSS
import '@antv/graphin/dist/index.css';

const Demo = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(2).circle().graphin()}>
        <VisSettingPanel />
      </Graphin>
    </div>
  );
};
export default Demo;
