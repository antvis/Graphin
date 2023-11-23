import Graphin, { GraphinData, registerIconFonts } from '@antv/graphin';
import React, { useEffect, useState } from 'react';

const fetchData = async () => {
  const icons = await registerIconFonts(['font_4331738_e3gzt4yq6wf']);

  const nodes = [
    {
      id: 'node-1',
      style: {
        type: 'graphin-circle',
        icon: {
          type: 'font', // // 指定图标为Font类型
          fontFamily: 'iconfont', // // 指定FontFamily
          value: icons['graphin-logo'], // 指定图标的值
        },
        label: {
          value: 'graphin-circle icon',
        },
      },
    },
    {
      id: 'node-2',
      style: {
        type: 'circle-node',
        iconShape: {
          fontFamily: 'iconfont',
          text: icons['alipay'],
          fill: '#fff',
        },
        labelShape: {
          text: 'circle-node icon',
        },
      },
    },
  ];
  return { nodes, edges: [] };
};

export default () => {
  const [data, setData] = useState<GraphinData>({ nodes: [], edges: [] });
  useEffect(() => {
    fetchData().then(res => {
      setData(res);
    });
  }, []);
  console.log('data', data);
  return (
    <div>
      <Graphin data={data} layout={{ type: 'grid' }}></Graphin>
    </div>
  );
};
