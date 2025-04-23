import { useMemo } from 'react';
import type { GIRuntimeAppProps } from './runtime';
import { GIRuntimeApp } from './runtime';
import type { GIRenderProps } from './runtime/Render';

export interface GISDKProps extends GIRenderProps, GIRuntimeAppProps {}

export const GISDK: React.FC<GISDKProps> = (props) => {
  const { assets, initialGlobalState, ...restProps } = props;

  const runtime = useMemo(
    () => new GIRuntimeApp({ assets, initialGlobalState }),
    [assets, initialGlobalState],
  );
  const { App } = runtime;

  return <App {...restProps} />;
};
