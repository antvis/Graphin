/* eslint-disable no-undef */

import React from 'react';
import { G6, GraphinContext } from '../../index';
// import type  {SnapLineConfig} from '@antv/g6-plugin/es/snapline/'

const defaultOptions = {
  line: {
    stroke: '#FA8C16',
    lineWidth: 0.5,
  },
  itemAlignType: 'center',
};
export interface SnapLineProps {
  /**
   * @description 是否开启
   * @default false
   */
  visible: boolean;
  /**
   * @description 配置项
   * @default `https://github.com/antvis/G6/blob/master/packages/plugin/src/snapline/index.ts`
   */
  options?: Partial<typeof defaultOptions>;
}

const SnapLine: React.FunctionComponent<SnapLineProps> = props => {
  const { graph } = React.useContext(GraphinContext);
  const { options, visible } = props;

  React.useEffect(() => {
    const Options = {
      ...defaultOptions,
      ...options,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const snapLine = new G6.SnapLine(Options as any);

    if (visible) {
      graph.addPlugin(snapLine);
    }

    return () => {
      if (graph && !graph.destroyed) {
        graph.removePlugin(snapLine);
      }
    };
  }, [graph, options, visible]);

  return null;
};

export default SnapLine;
