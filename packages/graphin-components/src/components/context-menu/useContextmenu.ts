import { useState, useEffect, isValidElement } from 'react';
import { G6Event } from './types';
import getPosition from './getPosition';
import { ContextMenuProps } from './index';

export type MenuStyle = {
  width: number;
  height: number;
};

interface State {
  visible: boolean;
  position: { x: number; y: number };
}

const useContextmenu = (props: ContextMenuProps): [State, React.Dispatch<React.SetStateAction<State>>] => {
  const {
    graph,
    bindType = 'node',
    render,
    options,
    onContextmenu = () => {
      return true;
    },
  } = props;

  const menuStyle: MenuStyle = { width: 250, height: 300 };

  if (options && Array.isArray(options)) {
    menuStyle.height = options.length * 30;
  }

  if (render) {
    const renderedMenu = render(props);
    if (isValidElement(renderedMenu)) {
      const menuProps = renderedMenu.props as { style: MenuStyle };
      const { width, height } = (menuProps && menuProps.style) || menuStyle;
      menuStyle.height = height;
      menuStyle.width = width;
    }
  }

  let keydown: boolean;
  const KEYCODE = 17; // ctrl

  const [state, setState] = useState({
    visible: false,
    position: { x: 0, y: 0 },
  });
  useEffect(() => {
    if (!graph) return;
    graph.on(`${bindType}:contextmenu`, (e: G6Event) => {
      if (keydown) {
        e.preventDefault();
        return;
      }

      const newPosition = getPosition(graph, e, menuStyle);
      const show = onContextmenu(e, graph);
      setState({
        ...state,
        position: newPosition,
        visible: show,
      });
    });
    graph.on('canvas:click', () => {
      setState({ ...state, visible: false });
    });
    graph.on('keyup', () => {
      keydown = false;
    });
    // FIXME G6 Event 继承自 MouseEvent，KeyBoard Event 的属性不存在
    // eslint-disable-next-line
    graph.on('keydown', (e: any) => {
      const code = e.keyCode || e.which;
      if (code === KEYCODE) {
        keydown = true;
      } else {
        keydown = false;
      }
    });
  }, []);
  return [state, setState];
};

export default useContextmenu;
