import { Group, Shape } from '@antv/g-canvas';
import { G6Node } from '../../types';
import { INode } from '@antv/g6/lib/interface/item';
import { GREY, PRIMARY_NODE_COLOR, EnumNodeAndEdgeStatus } from './constants';
import { normalizeColor } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (g6: any) => {
  g6.registerNode('StubNode', {
    draw(cfg: G6Node, group: Group) {
      const hasLabel = cfg.label;

      const color = cfg.style?.dark ? GREY : normalizeColor(cfg.style?.primaryColor || PRIMARY_NODE_COLOR);

      const keyShape = group.addShape('rect', {
        attrs: {
          id: 'stub-floor',
          x: 0,
          y: 0,
          height: 4,
          width: 12,
          radius: [2],
          fill: color.dark,
        },
        draggable: true,
        name: 'stub-floor',
      });
      group.addShape('rect', {
        attrs: {
          id: 'stub-selected',
          x: 0,
          y: 0,
          height: 0,
          width: 0,
          radius: [0],
          fill: '#FFF',
          opacity: 0.15,
        },
        draggable: true,
        name: 'stub-selected',
      });
      if (hasLabel) {
        group.addShape('text', {
          attrs: {
            id: 'stub-label',
            x: 12 + 7,
            y: 6,
            fontSize: 12,
            text: cfg.label,
            textAlign: 'left',
            fill: cfg.style?.dark ? '#8D93B0' : '#3B3B3B',
          },
          draggable: true,
          name: 'stub-label',
        });
      }
      return keyShape;
    },
    setState(name: EnumNodeAndEdgeStatus, value: string, node: INode) {
      if (!name) return;
      const data: G6Node = node.get('model');
      const container = node.getContainer();
      const floor = container.get('children').find((item: Shape.Base) => item.attr().id === 'stub-floor');
      const selected = container.get('children').find((item: Shape.Base) => item.attr().id === 'stub-selected');
      const text = container.get('children').find((item: Shape.Base) => item.attr().id === 'stub-label');

      const color = data.style?.dark ? GREY : normalizeColor(data.style?.primaryColor || PRIMARY_NODE_COLOR);

      const targetAttrs = {
        floor: {
          fill: color.dark,
        },
        selected: {
          r: 0,
        },
        text: {
          fill: data.style?.dark ? '#8D93B0' : '#3B3B3B',
        },
      };
      if ((name === EnumNodeAndEdgeStatus.SELECTED && value) || (name === EnumNodeAndEdgeStatus.LIGHT && value)) {
        targetAttrs.floor.fill = color.normal;
        targetAttrs.selected = {
          r: 8,
        };
      }
      if (name === EnumNodeAndEdgeStatus.DARK && value) {
        targetAttrs.floor.fill = GREY.dark;
        targetAttrs.text.fill = '#8D93B0';
      }
      floor.attr(targetAttrs.floor);
      selected.attr(targetAttrs.selected);
      if (text) text.attr(targetAttrs.text);
    },
    // getAnchorPoints() {
    //     return [
    //       [0, 0.5],
    //     ];
    //   },
  });
};
