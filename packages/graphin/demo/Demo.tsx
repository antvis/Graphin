import React from 'react';
import ReactDOM from 'react-dom';

import Graphin, { Utils, GraphinData } from '../src';

const data: GraphinData = Utils.mock(8).circle().graphin();

const Demo = () => {
  return <Graphin data={data} />;
};

ReactDOM.render(<Demo />, document.getElementById('root'));
