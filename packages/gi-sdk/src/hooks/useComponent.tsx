import React from 'react';
import { get } from 'lodash-es';
import { useModel } from './useModel';
import { BASIC_WIDGETS } from '../constants';
import { widgets as widgetsMap } from '../assets';

import { WidgetItem } from '../types';

export const useComponent = () => {
  const [model] = useModel();
  const widgets = get(model, 'application.spec.widgets', []);
  const allWidgets = [...BASIC_WIDGETS, ...widgets];
  const renderComponent = (solt: string) => {
    const soltWidgets = allWidgets.filter(item => item.solt === solt);
    return soltWidgets.map((item: WidgetItem, index) => {
      const { name, ...rest } = item;
      const Component = widgetsMap.get(name);
      if (!Component) {
        return null;
      }

      return <Component key={`${name}-${index}`} {...rest} graph={model.get('graph')} />;
    });
  };

  return {
    renderComponent,
  };
};
