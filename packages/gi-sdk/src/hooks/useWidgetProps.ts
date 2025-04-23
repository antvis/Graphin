import { useCallback, useEffect, useState } from 'react';
import { WidgetStoreEvent } from '../state/constants';
import type { ID } from '../types';
import { useStateManager } from './useStateManager';

/**
 * Hook for widget schema properties management.
 * @param widgetId - widget id
 * @returns [properties, updateProperties]
 * @public
 */
export const useWidgetProps = <Properties extends Record<string, unknown> = Record<string, unknown>>(widgetId: ID) => {
  const { widgetStore } = useStateManager();

  const [properties, setProperties] = useState<Properties>(widgetStore.getWidgetProperties<Properties>(widgetId));

  useEffect(() => {
    const updateInternalProperties = ({
      widgetId: id,
      properties: newProperties,
    }: { widgetId: string; properties: Properties }) => {
      if (id === widgetId) {
        setProperties(newProperties);
      }
    };

    widgetStore.on(WidgetStoreEvent.UPDATE_PROPS, updateInternalProperties);

    return () => {
      widgetStore.off(WidgetStoreEvent.UPDATE_PROPS, updateInternalProperties);
    };
  }, [widgetStore]);

  const updateProperties = useCallback(
    (newProperties: Properties) => {
      widgetStore.setWidgetProperties<Properties>(widgetId, newProperties);
    },
    [widgetStore],
  );

  return [properties, updateProperties] as const;
};
