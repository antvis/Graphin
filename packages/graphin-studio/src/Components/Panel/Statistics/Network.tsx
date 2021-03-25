import { Radar } from '@ant-design/charts';
import React from 'react';

const DemoRadar: React.FC = () => {
  const data = [
    { name: '网络平均度数', star: 10 },
    { name: '网络密度', star: 7 },
    { name: '平均聚类系数', star: 2 },
    { name: '平均路径长度', star: 1 },
    { name: 'PageRank', star: 20 },
  ];
  const config = {
    data: data.map(d => ({ ...d, star: Math.log(d.star).toFixed(2) })),
    xField: 'name',
    yField: 'star',
    meta: {
      star: {
        alias: '分数',
        min: 0,
        nice: true,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启辅助点
    point: {},
    area: {},
  };
  return (
    <div>
      <Radar {...config} />
    </div>
  );
};

export default DemoRadar;
