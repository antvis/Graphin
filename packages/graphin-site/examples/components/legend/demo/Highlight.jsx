/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
// 引入Graphin CSS
import { Legend } from '@antv/graphin-components';
// Graphin 组件 CSS

const { nodes, edges } = Utils.mock(6).circle().graphin();
console.log(nodes, edges);
nodes.forEach((node, index) => {
  const isCompany = index % 3 === 0;

  node.style = {
    ...node.style,
    fontFamily: 'graphin',
    icon: isCompany ? 'company' : 'user',
    primaryColor: isCompany ? '#873bf4' : '#f79e26',
  };
  node.data.type = isCompany ? 'company' : 'person';
});

const App = () => {
  const legendOptions = [
    {
      label: '公司',
      value: 'company',
      color: '#873bf4',
    },
    {
      label: '人群',
      value: 'person',
      color: '#f79e26',
    },
  ];

  const handleLegend = (checked, options, LegendProps) => {
    const { apis } = LegendProps;
    // Highlight 逻辑
    const optionsMap = options.reduce((acc, curr) => {
      acc[curr.value] = curr;
      return acc;
    }, {});

    const filterNodes = nodes.filter((node) => {
      return optionsMap[node.data.type].checked;
    });
    const nodeIds = filterNodes.map((c) => c.id);
    console.log(filterNodes, nodeIds);

    apis.highlight(nodeIds);

    // Hide逻辑
  };
  return (
    <div>
      <Graphin data={{ nodes, edges }} layout={{ name: 'concentric' }}>
        <Legend options={legendOptions} onChange={handleLegend} />
      </Graphin>
    </div>
  );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
