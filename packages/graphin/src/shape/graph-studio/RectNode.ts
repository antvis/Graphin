import { G } from '@antv/g6/types/g';
import G6 from '@antv/g6';
import { G6Node } from '../../types';
import { GREY, PRIMARY_NODE_COLOR, EnumNodeAndEdgeStatus, DEFAULT_ICON_FONT_FAMILY } from './constants';
import { normalizeColor } from './utils';
import iconFont from '../../icons/iconFont';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (g6: any) => {
  g6.registerNode('CanonicalRectNode', {
    draw(cfg: G6Node, group: G.Group) {
      const hasLabel = cfg.label;
      const innerNodeSize = cfg.style?.nodeSize || 48;
      const innerSize = innerNodeSize > 28 ? innerNodeSize : 28;
      const outerSize = innerSize + 4;

      const color = cfg.style?.dark ? GREY : normalizeColor(cfg.style?.primaryColor || PRIMARY_NODE_COLOR);

      const keyShape = group.addShape('rect', {
        attrs: {
          id: 'rect-floor',
          x: 0,
          y: 0,
          width: outerSize,
          height: outerSize,
          // fill: '#10121A',
        },
      });
      group.addShape('rect', {
        attrs: {
          id: 'rect-border',
          x: 0,
          y: 0,
          width: outerSize,
          height: outerSize,
          stroke: color.normal,
          lineWidth: 2,
        },
      });
      group.addShape('rect', {
        attrs: {
          id: 'rect-selected',
          x: -5,
          y: -5,
          width: 0,
          height: 0,
          fill: '#000',
          opacity: 0.15,
        },
      });
      const inner = group.addGroup(
        {
          attrs: {
            id: 'rect-inner-group',
          },
          // tslint:disable-next-line: align
        },
        {},
      );
      inner.addShape('rect', {
        attrs: {
          id: 'rect-inner',
          x: 0,
          y: 0,
          width: innerSize,
          height: innerSize,
          fill: color.dark,
        },
      });
      inner.addShape('text', {
        attrs: {
          id: 'rect-icon',
          x: innerSize / 2,
          y: innerSize / 2,
          text: iconFont(cfg.style?.icon || cfg.data.type || '', cfg.style?.fontFamily! || DEFAULT_ICON_FONT_FAMILY),
          fontSize: 20,
          textAlign: 'center',
          textBaseline: 'middle',
          fontFamily: cfg.style?.fontFamily || DEFAULT_ICON_FONT_FAMILY,
          fill: cfg.style?.dark ? '#8D93B0' : '#FFFFFF',
        },
      });
      inner.translate((outerSize - innerSize) / 2, (outerSize - innerSize) / 2);

      if (hasLabel) {
        group.addShape('text', {
          attrs: {
            id: 'rect-label',
            x: outerSize / 2,
            y: outerSize + 8,
            fontSize: 12,
            text: cfg.label,
            textAlign: 'center',
            fill: cfg.style?.dark ? '#8D93B0' : '#FFFFFF',
          },
        });
      }

      if (!cfg.degree) return keyShape;

      const children = group.addGroup(
        {
          attrs: {
            id: 'rect-children-group',
          },
          // tslint:disable-next-line: align
        },
        {},
      );
      children.addShape('rect', {
        attrs: {
          id: 'rect-children',
          x: 0,
          y: 0,
          width: 12,
          height: 12,
          fill: color.normal,
        },
      });
      children.addShape('text', {
        attrs: {
          id: 'rect-children-icon',
          x: 12 / 2,
          y: 12 / 2,
          text: cfg.degree > 100 ? '99+' : cfg.degree,
          fontSize: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: cfg.style?.dark ? '#8D93B0' : '#3B3B3B',
        },
      });
      children.translate(outerSize - 12, 0);
      return keyShape;
    },
    setState(name: EnumNodeAndEdgeStatus, value: string, node: G6.Node) {
      if (!name) return;
      const data: G6Node = node.get('model');
      const container = node.getContainer();
      const rectBorder = container.get('children').find((item: G.Shape) => item.attr().id === 'rect-border');
      const rectSelected = container.get('children').find((item: G.Shape) => item.attr().id === 'rect-selected');
      const rectInnerGroup = container.get('children').find((item: G.Shape) => item.attr().id === 'rect-inner-group');
      const rectInner = rectInnerGroup.get('children').find((item: G.Shape) => item.attr().id === 'rect-inner');
      const rectIcon = rectInnerGroup.get('children').find((item: G.Shape) => item.attr().id === 'rect-icon');
      const rectLabel = container.get('children').find((item: G.Shape) => item.attr().id === 'rect-label');
      const rectChildrenGroup = container
        .get('children')
        .find((item: G.Shape) => item.attr().id === 'rect-children-group');
      const rectChildren = rectChildrenGroup
        ?.get('children')
        .find((item: G.Shape) => item.attr().id === 'rect-children');
      const rectChildrenIcon = rectChildrenGroup
        ?.get('children')
        .find((item: G.Shape) => item.attr().id === 'rect-children-icon');

      const color = data.style?.dark ? GREY : normalizeColor(data.style?.primaryColor || PRIMARY_NODE_COLOR);
      const innerNodeSize = data.style?.nodeSize || 48;
      const innerSize = innerNodeSize > 28 ? innerNodeSize : 28;
      const outerSize = innerSize + 4;

      const targetAttrs = {
        border: {
          stroke: color.normal,
          lineWidth: 2,
        },
        selected: {
          width: 0,
          height: 0,
        },
        inner: {
          fill: color.dark,
        },
        icon: {
          fill: data.style?.dark ? '#8D93B0' : '#FFFFFF',
        },
        label: {
          fill: data.style?.dark ? '#8D93B0' : '#3B3B3B',
        },
        children: {
          fill: color.normal,
        },
        childrenIcon: {
          fill: data.style?.dark ? '#8D93B0' : '#FFFFFF',
        },
      };

      if (name === EnumNodeAndEdgeStatus.SELECTED && value) {
        targetAttrs.border.lineWidth = 5;
        targetAttrs.selected.width = outerSize + 10;
        targetAttrs.selected.height = outerSize + 10;
      }

      if (name === EnumNodeAndEdgeStatus.LIGHT && value) {
        targetAttrs.selected.width = outerSize + 10;
        targetAttrs.selected.height = outerSize + 10;
      }

      if (name === EnumNodeAndEdgeStatus.DARK && value) {
        targetAttrs.border.stroke = GREY.dark;
        targetAttrs.inner.fill = GREY.dark;
        targetAttrs.icon.fill = '#8D93B0';
        targetAttrs.label.fill = '#8D93B0';
        targetAttrs.children.fill = GREY.normal;
        targetAttrs.childrenIcon.fill = '#8D93B0';
      }

      rectBorder.attr(targetAttrs.border);
      rectSelected.attr(targetAttrs.selected);
      rectInner.attr(targetAttrs.inner);
      rectIcon.attr(targetAttrs.icon);
      if (rectLabel) rectLabel.attr(targetAttrs.label);
      if (rectChildren) rectChildren.attr(targetAttrs.children);
      if (rectChildrenIcon) rectChildrenIcon.attr(targetAttrs.childrenIcon);
    },
  });
};
