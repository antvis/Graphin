/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';

import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import { Legend } from '@antv/graphin-components';
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS

const source = Utils.mock(6)
  .circle()
  .graphin();

source.nodes.forEach((node, index) => {
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
  const [data, setData] = React.useState(source);

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

  const handleLegend = (_checked, options, LegendProps) => {
    // Filter 逻辑
    const optionsMap = options.reduce((acc, curr) => {
      acc[curr.value] = curr;
      return acc;
    }, {});

    const filterNodes = source.nodes.filter(node => {
      return optionsMap[node.data.type].checked;
    });
    const ids = filterNodes.map(c => c.id);
    const filterEdges = source.edges.filter(edge => {
      return ids.indexOf(edge.source) !== -1 && ids.indexOf(edge.target) !== -1;
    });
    setData({
      edges: filterEdges,
      nodes: filterNodes,
    });
  };

  return (
    <div>
      <Graphin data={data} layout={{ name: 'concentric' }}>
        <Legend options={legendOptions} onChange={handleLegend} />
      </Graphin>
    </div>
  );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
