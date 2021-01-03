import React, { useEffect } from 'react';
import { GraphinContext, IG6GraphEvent } from '@antv/graphin';
import Menu from './Menu';

const defaultStyle: React.CSSProperties = {
  width: 200,
  background: '#fff',
};

interface ContextMenuProps {
  children: React.ReactChildren | JSX.Element;
  style?: React.CSSProperties;
  bindType?: 'node' | 'edge' | 'canvas';
}

interface State {
  /** 当前状态 */
  visible: boolean;
  x: number;
  y: number;
  /** 触发的元素 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item?: IG6GraphEvent['item'];
}

let containerRef: HTMLDivElement | null;

const ContextMenu: React.FunctionComponent<ContextMenuProps> & { Menu: typeof Menu } = (props) => {
  const { children, bindType = 'node', style } = props;
  const graphin = React.useContext(GraphinContext);
  const { graph } = graphin;

  const [state, setState] = React.useState<State>({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });
  const handleShow = (e: IG6GraphEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const width: number = graph.get('width');
    const height: number = graph.get('height');

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

    if (bindType === 'node') {
      // 如果是节点，则x，y指定到节点的中心点
      // eslint-disable-next-line no-underscore-dangle
      const { x: PointX, y: PointY } = (e.item && e.item.getModel()) as { x: number; y: number };
      const CenterCanvas = graph.getCanvasByPoint(PointX, PointY);

      const daltX = e.canvasX - CenterCanvas.x;
      const daltY = e.canvasY - CenterCanvas.y;
      x = x - daltX;
      y = y - daltY;
    }

    /** 设置变量 */
    setState((preState) => {
      return {
        ...preState,
        visible: true,
        x,
        y,
        item: e.item,
      };
    });
  };
  const handleClose = () => {
    setState((preState) => {
      if (preState.visible) {
        return {
          ...preState,
          visible: false,
          x: 0,
          y: 0,
        };
      }
      return preState;
    });
  };

  useEffect(() => {
    // @ts-ignore
    graph.on(`${bindType}:contextmenu`, handleShow);
    graph.on('canvas:click', handleClose);
    graph.on('canvas:drag', handleClose);
    graph.on('canvas:drag', handleClose);
    graph.on('wheelzoom', handleClose);

    return () => {
      graph.off(`${bindType}:contextmenu`, handleShow);
      graph.off('canvas:click', handleClose);
      graph.off('canvas:drag', handleClose);
      graph.off('wheelzoom', handleClose);
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
    ...graphin.contextmenu,
    [bindType]: {
      handleOpen: handleShow,
      handleClose,
      item,
      visible,
      x,
      y,
      bindType,
    },
  };

  const id = item && item.getModel && item.getModel().id;

  return (
    <React.Fragment>
      <div
        ref={(node) => {
          containerRef = node;
        }}
        className="graphin-components-contextmenu"
        style={{ ...defaultStyle, ...style, ...positionStyle }}
        key={id}
      >
        {visible && children}
      </div>
    </React.Fragment>
  );
};

ContextMenu.Menu = Menu;

export default ContextMenu;
