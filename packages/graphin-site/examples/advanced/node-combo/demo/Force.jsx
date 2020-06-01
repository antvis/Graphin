/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';
import { message } from 'antd';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import '@antv/graphin-components/dist/index.css'; // 引入Graphin CSS

const App = () => {
  const data = Utils.mock(20)
    .tree()
    .combos(8)
    .graphin();
  console.log(data);
  return (
    <div className="App">
      <Graphin
        data={data}
        options={{
          layout: {
            type: 'comboForce',
            nodeSpacing: d => 8,
          },
        }}
      ></Graphin>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
