import { G } from '@antv/g6/types/g';
import G6 from '@antv/g6';
import { G6Node } from '../../types';
import { GREY, PRIMARY_NODE_COLOR, EnumNodeAndEdgeStatus } from './constants';
import { normalizeColor } from './utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (g6: any) => {
  g6.registerNode('CanonicalStubNode', {
    draw(cfg: G6Node, group: G.Group) {
      const hasLabel = cfg.label;

      const color = cfg.style?.dark ? GREY : normalizeColor(cfg.style?.primaryColor || PRIMARY_NODE_COLOR);

      const keyShape = group.addShape('rect', {
        attrs: {
          id: 'simplicity-floor',
          x: 0,
          y: 0,
          height: 4,
          width: 12,
          radius: [2],
          fill: cfg.style?.dark ? '#1E202D' : color.dark,
        },
      });
      group.addShape('rect', {
        attrs: {
          id: 'simplicity-selected',
          x: 0,
          y: 0,
          height: 0,
          width: 0,
          radius: [0],
          fill: '#FFF',
          opacity: 0.15,
        },
      });
      if (hasLabel) {
        group.addShape('text', {
          attrs: {
            id: 'simplicity-label',
            x: 12 + 7,
            y: 2,
            fontSize: 12,
            text: cfg.label,
            textAlign: 'left',
            fill: cfg.style?.dark ? '#8D93B0' : '#FFFFFF',
          },
        });
      }
      return keyShape;
    },
    setState(name: EnumNodeAndEdgeStatus, value: string, node: G6.Node) {
      if (!name) return;
      const data: G6Node = node.get('model');
      const container = node.getContainer();
      const floor = container.get('children').find((item: G.Shape) => item.attr().id === 'simplicity-floor');
      const selected = container.get('children').find((item: G.Shape) => item.attr().id === 'simplicity-selected');
      const text = container.get('children').find((item: G.Shape) => item.attr().id === 'simplicity-label');

      const color = data.style?.dark ? GREY : normalizeColor(data.style?.primaryColor || PRIMARY_NODE_COLOR);

      const targetAttrs = {
        floor: {
          fill: data.style?.dark ? '#1E202D' : color.dark,
        },
        selected: {
          r: 0,
        },
        text: {
          fill: data.style?.dark ? '#8D93B0' : '#FFFFFF',
        },
      };
      if ((name === EnumNodeAndEdgeStatus.SELECTED && value) || (name === EnumNodeAndEdgeStatus.LIGHT && value)) {
        targetAttrs.floor.fill = color.normal;
        targetAttrs.selected = {
          r: 8,
        };
      }
      if (name === EnumNodeAndEdgeStatus.DARK && value) {
        targetAttrs.floor.fill = '#1E202D';
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
