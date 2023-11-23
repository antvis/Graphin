import React from 'react';
import { GraphinContext, GraphinContextType } from '../../index';
import Utils from '../../utils';
import type { LegendProps } from './typing';

const { getEnumValue, getEnumDataMap } = Utils;

const useLegend = ({
  bindType = 'node',
  sortKey,
}: {
  bindType: LegendProps['bindType'];
  sortKey: LegendProps['sortKey'];
}) => {
  const graphin = React.useContext<GraphinContextType>(GraphinContext);
  const { graph } = graphin;
  const data = graph.save();

  /** 暂时不支持treeGraph的legend */
  if (data.children) {
    console.error('not support tree graph');
    return {
      dataMap: new Map(),
      options: {},
    };
  }
  // @ts-ignore
  const dataMap = getEnumDataMap(data[`${bindType}s`], sortKey);

  /** 计算legend.content 的 options */
  const keys = [...dataMap.keys()];
  const options = keys.map(key => {
    const item = (dataMap.get(key) || [{}])[0];

    const graphinStyleColor = getEnumValue(item, 'style.keyshape.fill');
    const g6StyleCcolor = getEnumValue(item, 'style.color');

    const color = graphinStyleColor || g6StyleCcolor;
    return {
      /** 颜色 */
      color,
      /** 值 */
      value: key,
      /** 标签 */
      label: key,
      /** 是否选中 */
      checked: true,
    };
  });
  return {
    dataMap,
    options,
  };
};
export default useLegend;
