import React from 'react';
import Node from './Node';
import type { LegendProps } from './typing';
import useLegend from './useLegend';

const defaultStyle: React.CSSProperties = {
  position: 'absolute',
  top: '0px',
  right: '0px',
};
// @ts-ignore
const Legend: React.FunctionComponent<LegendProps> & { Node: typeof Node } = props => {
  const { bindType = 'node', sortKey, children, style } = props;

  const { dataMap, options } = useLegend({
    bindType,
    sortKey,
  });

  return (
    <div
      className="graphin-components-legend"
      // @ts-ignore
      style={{ ...defaultStyle, ...style }}
    >
      {children({
        bindType,
        sortKey,
        // @ts-ignore
        dataMap,
        // @ts-ignore
        options,
      })}
    </div>
  );
};

Legend.Node = Node;
export default Legend;
