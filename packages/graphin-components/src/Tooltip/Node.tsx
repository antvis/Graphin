/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphinContext } from '@antv/graphin/dist';
import * as React from 'react';
import './index.less';

export interface NodeProps {
  /**
   * @description children 为一个函数
   * @type (model: any) => JSX.Element | JSX.Element[];
   */
  children: (model: any) => JSX.Element | JSX.Element[];
}

const Node: React.FunctionComponent<NodeProps> = (props) => {
  const { children } = props;
  const { tooltip } = React.useContext(GraphinContext);
  const context = tooltip.node;
  const { item } = context;
  if (typeof children !== 'function') {
    console.error('<Tooltip.Node /> children should be a function');
    return null;
  }
  return <div className="graphin-components-tooltip-content">{children(item.getModel())}</div>;
};

export default Node;
