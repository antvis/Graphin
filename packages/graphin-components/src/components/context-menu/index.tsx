import React, { memo, isValidElement } from 'react';
import { Graph } from '@antv/g6';

import useContextmenu from './useContextmenu';
import Container, { MenuItemType } from './Container';
import { G6Event } from './types';
import './index.less';

/** 用户传入的 render 函数的参数 */
interface RenderProps extends ContextMenuProps {
  onClose?: () => void;
}

export interface ContextMenuProps {
  /** 事件绑定的类型，节点，边或者画布 */
  bindType?: 'node' | 'edge' | 'canvas';
  /** G6 实例 */
  graph?: Graph;
  /** 菜单配置 */
  options?: MenuItemType[];
  /** 自定义的菜单渲染函数 */
  render?: (props: RenderProps) => React.ReactElement;
  /** 用户提供的 ContextMenu 事件回调，可以用来实现自定义逻辑。返回 false 会阻止 ContextMenu 事件触发 */
  onContextmenu?: (e: G6Event, graph: Graph) => boolean; // 有这么一种业务场景，用户在关系扩散中，右键菜单希望是展开或者收起与其相关的叶子节点。这个时候，ContextMenu组件是否需要提供一种hook函数，来控制默认的右键行为
}

export const ContextMenu: React.FC<ContextMenuProps> = props => {
  const { graph, render, options } = props;

  const [state, setState] = useContextmenu(props);
  const { position, visible } = state;

  const onClose = () => {
    setState({ ...state, visible: false });
  };

  const styles: React.CSSProperties = {
    position: 'absolute',
    left: position.x,
    top: position.y,
  };

  if (!visible) {
    return null;
  }

  let children: MenuItemType[] | React.ReactElement | null = null;

  if (options && Array.isArray(options)) {
    children = <Container graph={graph!} menu={options} onClose={onClose} />;
  }

  /** 用户自定义渲染 */
  if (render) {
    const renderMenu = render({ onClose, ...props });
    if (isValidElement(renderMenu)) {
      children = renderMenu;
    } else {
      return null;
    }
  }

  return <div style={styles}>{children}</div>;
};

export const isEqual = (prevProps: ContextMenuProps, nextProps: ContextMenuProps) => {
  if (prevProps.render !== nextProps.render || prevProps.options !== nextProps.options) {
    return false;
  }
  return true;
};

export default memo(ContextMenu, isEqual);
