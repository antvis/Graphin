import React, { useEffect, useRef } from 'react';
import { useGraphin } from '../../useGraphin';
export interface ContextMenuProps {
  children: React.ReactNode[];
  options: {
    key: string;
    icon: React.ReactNode;
    name: string;
  }[];
  onChange: (menuItem, menuData) => void;
  bindType: 'node' | 'edge' | 'canvas';
}

const ContextMenu: React.FunctionComponent<ContextMenuProps> = props => {
  const { children, bindType, options, onChange } = props;
  const { graph } = useGraphin();

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const itemContent = options
      .map(item => {
        const { key, icon, name } = item;
        return `<li class='g6-contextmenu-li' code=${key}> ${icon} ${name} </li>`;
      })
      .join('');

    const content = `
      <ul class='g6-contextmenu-ul'>
      ${itemContent}
      </ul>
  `;
    graph.addPlugins([
      {
        type: 'menu',
        key: 'graphin-context-menu',
        trigger: 'contextmenu',
        /** async string menu */
        getContent: e => {
          return content;
        },
        handleMenuClick: (target: HTMLLIElement, itemId) => {
          //@ts-ignore
          const { value } = Object.values(target.attributes).find(item => item.name === 'code');
          const item = graph.getNodeData(itemId);
          onChange && onChange({ key: value }, item);
        },
      },
    ]);
    return () => {
      graph && graph.removePlugins(['graphin-context-menu']);
    };
  }, [graph]);
  return <div ref={containerRef}></div>;
};

export default ContextMenu;
