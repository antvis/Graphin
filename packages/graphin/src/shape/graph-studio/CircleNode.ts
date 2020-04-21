import { G } from '@antv/g6/types/g';
import G6 from '@antv/g6';
import { G6Node } from '../../types';
import { GREY, PRIMARY_NODE_COLOR, EnumNodeAndEdgeStatus, DEFAULT_ICON_FONT_FAMILY } from './constants';
import { normalizeColor } from './utils';
import iconFont from '../../icons/iconFont';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (g6: any) => {
  g6.registerNode('CanonicalCircleNode', {
    draw(cfg: G6Node, group: G.Group) {
      const hasLabel = cfg.label;
      const innerNodeSize = cfg.style?.nodeSize || 48;
      const innerSize = innerNodeSize > 28 ? innerNodeSize : 28;
      const outerSize = innerSize + 4;

      const color = cfg.style?.dark ? GREY : normalizeColor(cfg.style?.primaryColor || PRIMARY_NODE_COLOR);

      const keyShape = group.addShape('circle', {
        attrs: {
          id: 'circle-floor',
          x: 0,
          y: 0,
          r: outerSize / 2,
        },
      });
      group.addShape('circle', {
        attrs: {
          id: 'circle-selected',
          x: 0,
          y: 0,
          r: 0,
          fill: '#000',
          opacity: 0.05,
        },
      });
      group.addShape('circle', {
        attrs: {
          id: 'circle-border',
          x: 0,
          y: 0,
          r: outerSize / 2,
          stroke: cfg.style?.dark ? GREY.normal : color.normal,
          lineWidth: 2,
        },
      });
      const inner = group.addGroup(
        {
          attrs: {
            id: 'circle-inner-group',
          },
          // tslint:disable-next-line: align
        },
        {},
      );
      inner.addShape('circle', {
        attrs: {
          id: 'circle-inner',
          x: 0,
          y: 0,
          r: innerSize / 2,
          fill: cfg.style?.dark ? GREY.dark : color.dark,
        },
      });
      inner.addShape('text', {
        attrs: {
          id: 'circle-icon',
          x: 0,
          y: 0,
          text: iconFont(cfg.style?.icon || cfg.data.type || '', cfg.style?.fontFamily! || DEFAULT_ICON_FONT_FAMILY),
          fontSize: 20,
          textAlign: 'center',
          textBaseline: 'middle',
          fontFamily: cfg.style?.fontFamily || DEFAULT_ICON_FONT_FAMILY,
          fill: cfg.style?.dark ? '#8D93B0' : '#FFFFFF',
        },
      });
      if (hasLabel) {
        group.addShape('text', {
          attrs: {
            id: 'circle-label',
            x: 0,
            y: outerSize / 2 + 14,
            fontSize: 12,
            text: cfg.label,
            textAlign: 'center',
            fill: cfg.style?.dark ? '#8D93B0' : '#3B3B3B',
          },
        });
      }

      if (!cfg.badge) return keyShape;

      const children = group.addGroup(
        {
          attrs: {
            id: 'circle-children-group',
          },
          // tslint:disable-next-line: align
        },
        {},
      );
      children.addShape('circle', {
        attrs: {
          id: 'circle-children',
          x: outerSize / 2 - 9,
          y: -outerSize / 2 + 9,
          r: 9,
          fill: cfg.style?.dark ? '#1E202D' : color.dark,
        },
      });
      children.addShape('text', {
        attrs: {
          id: 'circle-children-icon',
          x: outerSize / 2 - 9,
          y: -outerSize / 2 + 9,
          text: cfg.badge,
          fontSize: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: cfg.style?.dark ? '#8D93B0' : '#FFFFFF',
        },
      });
      return keyShape;
    },
    setState(name: EnumNodeAndEdgeStatus, value: string, node: G6.Node) {
      if (!name) return;
      const data: G6Node = node.get('model');
      const container = node.getContainer();
      // const circleFloor = container.get('children').find(node => node.attr().id === 'circle-floor');
      const circleBorder = container.get('children').find((item: G.Shape) => item.attr().id === 'circle-border');
      const circleSelected = container.get('children').find((item: G.Shape) => item.attr().id === 'circle-selected');
      const circleInnerGroup = container
        .get('children')
        .find((item: G.Shape) => item.attr().id === 'circle-inner-group');
      const circleInner = circleInnerGroup.get('children').find((item: G.Shape) => item.attr().id === 'circle-inner');
      const circleIcon = circleInnerGroup.get('children').find((item: G.Shape) => item.attr().id === 'circle-icon');
      const circleLabel = container.get('children').find((item: G.Shape) => item.attr().id === 'circle-label');
      const circleChildrenGroup = container
        .get('children')
        .find((item: G.Shape) => item.attr().id === 'circle-children-group');
      const circleChildren = circleChildrenGroup
        ?.get('children')
        .find((item: G.Shape) => item.attr().id === 'circle-children');
      const circleChildrenIcon = circleChildrenGroup
        ?.get('children')
        .find((item: G.Shape) => item.attr().id === 'circle-children-icon');

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
          r: 0,
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
        targetAttrs.selected.r = outerSize / 2 + 10;
      }

      if (name === EnumNodeAndEdgeStatus.LIGHT && value) {
        targetAttrs.selected.r = outerSize / 2 + 10;
      }

      if (name === EnumNodeAndEdgeStatus.DARK && value) {
        targetAttrs.border.stroke = GREY.dark;
        targetAttrs.inner.fill = GREY.dark;
        targetAttrs.icon.fill = '#8D93B0';
        targetAttrs.label.fill = '#8D93B0';
        targetAttrs.children.fill = GREY.normal;
        targetAttrs.childrenIcon.fill = '#8D93B0';
      }

      circleBorder.attr(targetAttrs.border);
      circleSelected.attr(targetAttrs.selected);
      circleInner.attr(targetAttrs.inner);
      circleIcon.attr(targetAttrs.icon);
      if (circleLabel) circleLabel.attr(targetAttrs.label);
      if (circleChildren) circleChildren.attr(targetAttrs.children);
      if (circleChildrenIcon) circleChildrenIcon.attr(targetAttrs.childrenIcon);
    },
  });
};
