import React, { useEffect } from 'react';
import { register, Extensions } from '@antv/g6';
import { useGraphin } from '../../context';
import { createNode, getElementKey } from '../../utils';
import type { Graph } from '../../types';
// @ts-expect-error
import type { ContextMenuOptions, NodeModel } from '@antv/g6';

register('widget', 'menu', Extensions.Menu);

export interface ContextMenuProps extends ContextMenuOptions {
  children: (model: NodeModel, graph: Graph) => React.ReactElement;
  options?: Partial<ContextMenuOptions>;
  onClick?: (menuItem, menuData) => void;
}

const PLUGIN_KEY = 'graphin-context-menu';

const ContextMenu: React.FC<ContextMenuProps> = props => {
  const { children, onClick, options } = props;
  const { graph } = useGraphin();

  // const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!graph) return;
    graph.addPlugins([
      {
        type: 'menu',
        key: PLUGIN_KEY,
        trigger: 'contextmenu',
        getContent: e => {
          return new Promise(resolve => {
            const model = graph.getNodeData(e.itemId) as NodeModel;
            resolve(createNode(children(model, graph)));
          });
        },
        handleMenuClick: (target: HTMLLIElement, itemId: string) => {
          const model = graph.getNodeData(itemId);
          onClick && onClick({ key: getElementKey(target, 'data-key') }, model);
        },
        ...options,
      },
    ]);
    return () => {
      graph && graph.removePlugins([PLUGIN_KEY]);
    };
  }, [graph]);

  return null;
};

export default ContextMenu;
