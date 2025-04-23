import React, { useMemo } from 'react';
import { useRegistryManager, useStateManager, useWidgetProps } from '../../hooks';
import type { WidgetSchema } from '../../spec';
import type { SlotElements } from '../../types';
import { parseSlot } from '../../utils/slot';

export interface ImplWidgetProps {
  /**
   * 组件配置
   */
  widget: WidgetSchema;
}

export const ImplWidget: React.FC<ImplWidgetProps> = ({ widget }) => {
  const { id: widgetId, type, slots } = widget;

  const { defaultProperties, component: Comp, metadata } = useRegistryManager().getWidget(type);

  const [properties] = useWidgetProps(widgetId);
  const mergedProperties = useMemo(() => Object.assign({}, defaultProperties, properties), [properties]);

  const widgets = useStateManager().widgetStore.getWidgets();

  const slotElements: SlotElements = useMemo(() => {
    let elements = {};

    if (slots) {
      const parsedSlots = parseSlot(slots);
      elements = Object.entries(parsedSlots).reduce((acc, [slotName, slotIds]) => {
        const slotWidgets = slotIds.map((id) => widgets.find((w) => w.id === id)).filter(Boolean) as WidgetSchema[];

        if (!slotWidgets.length) return acc;

        // @ts-ignore
        acc[slotName] = slotWidgets.map((slotWidget) => (
          <ImplWidget key={slotWidget.id} widget={slotWidget} />
        ));
        return acc;
      }, {});
    }
    return elements;
  }, [widgets, slots]);

  return (
    <React.Fragment key={widgetId}>
      <Comp
        data-widget-id={widgetId}
        data-widget-name={metadata.name}
        slotElements={slotElements}
        {...mergedProperties}
      />
    </React.Fragment>
  );
};
