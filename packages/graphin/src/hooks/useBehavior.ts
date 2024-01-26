import { isEmpty } from 'lodash-es';
import React from 'react';
import { GraphinContext } from '../context';

interface Props {
  type: string;
  defaultConfig: Record<string, unknown>;
  userProps: any;
  mode?: string;
}

const useBehavior = (params: Props) => {
  const { type, defaultConfig, userProps, mode = 'default' } = params;
  const { graph } = React.useContext(GraphinContext);
  const { disabled, ...otherConfig } = userProps;

  React.useEffect(() => {
    if (!graph || graph.destroyed || isEmpty(graph)) return;
    try {
      graph.removeBehaviors([type], mode);
    } catch (error) {}

    if (disabled) return;

    graph.addBehaviors(
      {
        type,
        ...defaultConfig,
        ...otherConfig,
      },
      mode,
    );
    return () => {
      if (!graph.destroyed) {
        graph.removeBehaviors([type], mode);
      }
    };
  }, []);
};

export default useBehavior;
