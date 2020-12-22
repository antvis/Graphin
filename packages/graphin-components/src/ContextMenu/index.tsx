import React, { useEffect } from 'react';
import { GraphinContext } from '@antv/graphin';
import Menu from './Menu';

const defaultStyle: React.CSSProperties = {
  width: 200,
  background: '#fff',
};

interface IContextMenuProps {
  children: React.ReactChildren;
  style?: React.CSSProperties;
  bindType?: 'node' | 'edge' | 'canvas';
}

interface IState {
  /** 当前壮体啊 */
  visible: boolean;
  x: number;
  y: number;
  /** 触发的元素 */
  item?: {};
}

let containerRef: HTMLDivElement | null;

const ContextMenu: React.FunctionComponent<IContextMenuProps> & { Menu: typeof Menu } = (props) => {
  const { children, bindType = 'node', style } = props;
  const graphin = React.useContext(GraphinContext);
  const { graph } = graphin;

  const [state, setState] = React.useState<IState>({
    visible: false,
    x: 0,
    y: 0,
    item: {},
  });
  const handleShow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const width: number = graph.get('width');
    const height: number = graph.get('height');
    console.log(containerRef);

    const bbox = (containerRef as HTMLDivElement).getBoundingClientRect();

    const offsetX = graph.get('offsetX') || 0;
    const offsetY = graph.get('offsetY') || 0;

    const graphTop = graph.getContainer().offsetTop;
    const graphLeft = graph.getContainer().offsetLeft;

    let x = e.canvasX + graphLeft + offsetX;
    let y = e.canvasY + graphTop + offsetY;

    // when the menu is (part of) out of the canvas
    if (x + bbox.width > width) {
      x = e.canvasX - bbox.width - offsetX + graphLeft;
    }
    if (y + bbox.height > height) {
      y = e.canvasY - bbox.height - offsetY + graphTop;
    }

    /** 设置变量 */
    setState({
      visible: true,
      x,
      y,
      item: e.item,
    });
  };
  const handleClose = () => {
    setState({
      item: state.item,
      visible: false,
      x: 0,
      y: 0,
    });
  };

  useEffect(() => {
    graph.on(`${bindType}:contextmenu`, handleShow);
    graph.on('canvas:click', handleClose);
    return () => {
      graph.off(`${bindType}:contextmenu`, handleShow);
      graph.off('canvas:click', handleClose);
    };
  }, []);
  const { x, y, visible, item } = state;
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    left: x,
    top: y,
  };

  /** 将一些方法和数据传递给子组件 */
  graphin.contextmenu = {
    handleOpen: handleShow,
    handleClose,
    item,
    visible,
    x,
    y,
  };
  return (
    <React.Fragment>
      <div
        ref={(node) => {
          containerRef = node;
        }}
        className="graphin-components-contextmenu"
        style={{ ...defaultStyle, ...style, ...positionStyle }}
      >
        {visible && children}
      </div>
    </React.Fragment>
  );
};

ContextMenu.Menu = Menu;

export default ContextMenu;
