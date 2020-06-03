import { Group, Shape } from '@antv/g-canvas';
import { G6Node } from '../../types';
import { INode } from '@antv/g6/lib/interface/item';
import { GREY, PRIMARY_NODE_COLOR, EnumNodeAndEdgeStatus } from './constants';
import { normalizeColor } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (g6: any) => {
  g6.registerNode('PointNode', {
    draw(cfg: G6Node, group: Group) {
      const hasLabel = cfg.label;

      const color = cfg.style?.dark ? GREY : normalizeColor(cfg.style?.primaryColor || PRIMARY_NODE_COLOR);

      const keyShape = group.addShape('circle', {
        attrs: {
          id: 'point-floor',
          x: 0,
          y: 0,
          r: 4,
          stroke: cfg.style?.dark ? '#1E202D' : color.dark,
          lineWidth: 3,
        },
        draggable: true,
        name: 'point-floor',
      });
      group.addShape('circle', {
        attrs: {
          id: 'point-selected',
          x: 0,
          y: 0,
          r: 0,
          stroke: '#FFF',
          lineWidth: 6,
          opacity: 0.15,
        },
        draggable: true,
        name: 'point-selected',
      });
      if (hasLabel) {
        group.addShape('text', {
          attrs: {
            id: 'point-label',
            x: 4 + 7,
            y: 4,
            fontSize: 12,
            text: cfg.label,
            textAlign: 'left',
            fill: cfg.style?.dark ? '#8D93B0' : '#3B3B3B',
          },
          draggable: true,
          name: 'point-label',
        });
      }
      return keyShape;
    },
    setState(name: EnumNodeAndEdgeStatus, value: string, node: INode) {
      if (!name) return;
      const data: G6Node = node.get('model');
      const container = node.getContainer();
      const floor = container.get('children').find((item: Shape.Base) => item.attr().id === 'point-floor');
      const selected = container.get('children').find((item: Shape.Base) => item.attr().id === 'point-selected');
      const text = container.get('children').find((item: Shape.Base) => item.attr().id === 'point-label');

      const color = data.style?.dark ? GREY : normalizeColor(data.style?.primaryColor || PRIMARY_NODE_COLOR);

      const targetAttrs = {
        floor: {
          stroke: color.dark,
        },
        selected: {
          r: 0,
        },
        text: {
          fill: data.style?.dark ? '#8D93B0' : '#3B3B3B',
        },
      };
      if ((name === EnumNodeAndEdgeStatus.SELECTED && value) || (name === EnumNodeAndEdgeStatus.LIGHT && value)) {
        targetAttrs.floor.stroke = color.normal;
        targetAttrs.selected = {
          r: 8,
        };
      }
      if (name === EnumNodeAndEdgeStatus.DARK && value) {
        targetAttrs.floor.stroke = GREY.dark;
        targetAttrs.text.fill = '#8D93B0';
      }
      floor.attr(targetAttrs.floor);
      selected.attr(targetAttrs.selected);
      if (text) text.attr(targetAttrs.text);
    },
  });
};
