import React, { useEffect } from 'react';
import { subscribe } from 'valtio';
import { get } from 'lodash-es';
import { hasIntersection } from '../utils';
import { SDKModel } from '../model';
import { useModel } from '../hooks';

const WAHCHER_LIST = ['clickNode', 'clickCanvas'];

export const Watcher = () => {
  const [_, setModel] = useModel();
  /**
   * @description 监听交互变化，更新面板状态
   */
  const watch = changed => {
    const changedKey = get(changed, '0.1', []);
    if (!hasIntersection(changedKey, WAHCHER_LIST)) {
      return;
    }
    setModel('panel.open', !!get(changed, '0.2'));
  };

  useEffect(() => {
    const unsubscribe = subscribe(SDKModel.interaction, watch);

    return () => {
      unsubscribe();
    };
  }, []);

  return null;
};
