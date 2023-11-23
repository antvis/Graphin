import Graphin, { GraphinData, registerIconFonts } from '@antv/graphin';

import React, { useEffect, useState } from 'react';

const fetchData = async () => {
  // registerIconFonts 是异步方法，参数为 fontIconIds []
  const icons = await registerIconFonts();

  const nodes = [
    {
      id: 'node-1',
      style: {
        type: 'graphin-circle',
        icon: {
          type: 'font', // // 指定图标为Font类型
          fontFamily: 'iconfont', // // 指定FontFamily
          value: icons.user, // 指定图标的值
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
          text: icons.user,
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
