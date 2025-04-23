import EventEmitter from '@antv/event-emitter';
import React, { memo } from 'react';
import type { GIContextProps } from '../context';
import { GIContext } from '../context';
import type { GlobalModel } from '../context/types';
import RegistryManager from '../registry';
import StateManager from '../state';
import type { AssetPackage } from '../types';
import type { GIRenderProps } from './Render';
import { GIRender } from './Render';
import type { RuntimeContext } from './types';

export interface GIRuntimeAppProps {
  /**
   * 图应用资产包
   */
  assets?: AssetPackage[];
  /**
   * 初始全局状态
   */
  initialGlobalState?: GlobalModel;
}

export class GIRuntimeApp {
  public context: RuntimeContext = {};

  public App: React.FC<GIRenderProps>;

  constructor({ assets=[], initialGlobalState=[] }:{ assets?: AssetPackage[]; initialGlobalState?: GlobalModel }) {
    this.initRuntime(assets, initialGlobalState);

    this.App = this.getApp();
  }

  private initRuntime(assets: AssetPackage[], initialGlobalState: GlobalModel) {
    if (!this.context.registry) this.context.registry = new RegistryManager(assets);
    if (!this.context.state) this.context.state = new StateManager(initialGlobalState);
    if (!this.context.eventBus) this.context.eventBus = new EventEmitter();
  }

  private getApp() {
    const { registry, state, eventBus } = this.context;

    return memo((props: GIRenderProps) => {
      state?.initState(props.config);

      const contextValue = { registry, state, eventBus } as GIContextProps;

      return (
        <GIContext.Provider value={contextValue}>
          <GIRender {...props} />
        </GIContext.Provider>
      );
    });
  }
}
