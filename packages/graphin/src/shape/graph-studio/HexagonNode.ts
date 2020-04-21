import { G } from '@antv/g6/types/g';
import G6 from '@antv/g6';
import { G6Node } from '../../types';
import { GREY, PRIMARY_NODE_COLOR, EnumNodeAndEdgeStatus, DEFAULT_ICON_FONT_FAMILY } from './constants';
import { normalizeColor } from './utils';
import iconFont from '../../icons/iconFont';

function makeHexagon(border: number) {
  const height = border / 2 + (border * Math.sqrt(5)) / 4;
  return [
    [border / 2, 0],
    [border, border / 4],
    [border, height - border / 4],
    [border / 2, height],
    [0, height - border / 4],
    [0, border / 4],
  ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (g6: any) => {
  g6.registerNode('CanonicalHexagonNode', {
    draw(cfg: G6Node, group: G.Group) {
      const hasLabel = cfg.label;
      const innerNodeSize = cfg.style?.nodeSize || 48;
      const innerSize = innerNodeSize > 28 ? innerNodeSize : 28;
      const outerSize = innerSize + 4;

      const color = cfg.style?.dark ? GREY : normalizeColor(cfg.style?.primaryColor || PRIMARY_NODE_COLOR);

      const keyShape = group.addShape('polygon', {
        attrs: {
          id: 'hexagon-floor',
          points: makeHexagon(outerSize),
          // fill: '#10121A',
        },
      });
      group.addShape('polygon', {
        attrs: {
          id: 'hexagon-border',
          points: makeHexagon(outerSize),
          stroke: cfg.style?.dark ? '#1E202D' : color.normal,
          lineWidth: 2,
        },
      });
      const selected = group.addShape('polygon', {
        attrs: {
          id: 'hexagon-selected',
          points: [],
          fill: '#FFF',
          opacity: 0.15,
        },
      });
      selected.translate(-5, -5);

      const inner = group.addGroup(
        {
          attrs: {
            id: 'hexagon-inner-group',
          },
          // tslint:disable-next-line: align
        },
        {},
      );
      inner.addShape('polygon', {
        attrs: {
          id: 'hexagon-inner',
          points: makeHexagon(innerSize),
          fill: cfg.style?.dark ? '#1E202D' : color.dark,
        },
      });
      inner.translate((outerSize - innerSize) / 2, (outerSize - innerSize) / 2);

      inner.addShape('text', {
        attrs: {
          id: 'hexagon-icon',
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

      if (hasLabel) {
        group.addShape('text', {
          attrs: {
            id: 'hexagon-label',
            x: outerSize / 2,
            y: outerSize + 14,
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
            id: 'hexagon-children-group',
          },
          // tslint:disable-next-line: align
        },
        {},
      );
      children.addShape('polygon', {
        attrs: {
          id: 'hexagon-children',
          points: makeHexagon(16),
          fill: cfg.style?.dark ? '#1E202D' : color.normal,
        },
      });
      children.addShape('text', {
        attrs: {
          id: 'hexagon-children-icon',
          x: 16 / 2,
          y: 16 / 2,
          text: cfg.badge,
          fontSize: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: cfg.style?.dark ? '#8D93B0' : '#FFFFFF',
        },
      });
      children.translate(outerSize / 2 - 16 / 2, 0);
      return keyShape;
    },
    setState(name: EnumNodeAndEdgeStatus, value: string, node: G6.Node) {
      if (!name) return;
      const data: G6Node = node.get('model');
      const container = node.getContainer();
      const hexagonBorder = container.get('children').find((item: G.Shape) => item.attr().id === 'hexagon-border');
      const hexagonSelected = container.get('children').find((item: G.Shape) => item.attr().id === 'hexagon-selected');
      const hexagonInnerGroup = container
        .get('children')
        .find((item: G.Shape) => item.attr().id === 'hexagon-inner-group');
      const hexagonInner = hexagonInnerGroup
        .get('children')
        .find((item: G.Shape) => item.attr().id === 'hexagon-inner');
      const hexagonIcon = hexagonInnerGroup.get('children').find((item: G.Shape) => item.attr().id === 'hexagon-icon');
      const hexagonLabel = container.get('children').find((item: G.Shape) => item.attr().id === 'hexagon-label');
      const hexagonChildrenGroup = container
        .get('children')
        .find((item: G.Shape) => item.attr().id === 'hexagon-children-group');
      const hexagonChildren = hexagonChildrenGroup
        ?.get('children')
        .find((item: G.Shape) => item.attr().id === 'hexagon-children');
      const hexagonChildrenIcon = hexagonChildrenGroup
        ?.get('children')
        .find((item: G.Shape) => item.attr().id === 'hexagon-children-icon');

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
          points: [] as number[][],
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
        targetAttrs.selected.points = makeHexagon(outerSize + 10);
      }

      if (name === EnumNodeAndEdgeStatus.LIGHT && value) {
        targetAttrs.selected.points = makeHexagon(outerSize + 10);
      }

      if (name === EnumNodeAndEdgeStatus.DARK && value) {
        targetAttrs.border.stroke = GREY.dark;
        targetAttrs.inner.fill = GREY.dark;
        targetAttrs.icon.fill = '#8D93B0';
        targetAttrs.label.fill = '#8D93B0';
        targetAttrs.children.fill = GREY.normal;
        targetAttrs.childrenIcon.fill = '#8D93B0';
      }

      hexagonBorder.attr(targetAttrs.border);
      hexagonSelected.attr(targetAttrs.selected);
      hexagonInner.attr(targetAttrs.inner);
      hexagonIcon.attr(targetAttrs.icon);
      if (hexagonLabel) hexagonLabel.attr(targetAttrs.label);
      if (hexagonChildren) hexagonChildren.attr(targetAttrs.children);
      if (hexagonChildrenIcon) hexagonChildrenIcon.attr(targetAttrs.childrenIcon);
    },
    getAnchorPoints() {
      const x = 1 / (2 + Math.sqrt(5));
      return [
        [0.5, 0],
        [1, x],
        [1, (Math.sqrt(5) + 1) * x],
        [0.5, 1],
        [0, (Math.sqrt(5) + 1) * x],
        [0, x],
      ];
    },
  });
};
