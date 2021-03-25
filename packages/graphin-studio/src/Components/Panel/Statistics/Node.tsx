import { Scatter } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';

const DemoScatter: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/aao6XnO5pW/IMDB.json')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    appendPadding: 10,
    data,
    xField: 'Revenue (Millions)',
    yField: 'Rating',
    shape: 'circle',
    colorField: 'Genre',
    size: 4,
    yAxis: {
      nice: true,
      line: { style: { stroke: '#aaa' } },
    },
    xAxis: {
      min: -100,
      grid: { line: { style: { stroke: '#eee' } } },
      line: { style: { stroke: '#aaa' } },
    },
  };
  return <Scatter {...config} />;
};

export default DemoScatter;
