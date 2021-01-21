import React, { useEffect } from 'react';
import { GraphinContext } from '@antv/graphin';

import Node from './Node';
import Edge from './Edge';

const defaultStyle: React.CSSProperties = {
  width: 200,
  background: '#fff',
};

interface TooltipProps {
  /**
   * @description tooltip绑定的图元素
   * @default node
   */
  bindType?: 'node' | 'edge';
  /**
   * @description children
   * @type  React.ReactChild | JSX.Element
   */
  children: React.ReactChild | JSX.Element;
  /**
   * @description styles
   */
  style?: React.CSSProperties;
}

interface State {
  /** 当前状态 */
  visible: boolean;
  x: number;
  y: number;
  /** 触发的元素 */
  item?: {};
}

// let containerRef: HTMLDivElement | null;

const Tooltip: React.FunctionComponent<TooltipProps> & { Node: typeof Node } & { Edge: typeof Edge } = (props) => {
  const { children, bindType = 'node', style } = props;
  const graphin = React.useContext(GraphinContext);
  const { graph } = graphin;

  const [state, setState] = React.useState<State>({
    visible: false,
    x: 0,
    y: 0,
    item: {},
  });
  const handleShow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // const width: number = graph.get('width');
    // const height: number = graph.get('height');

    // const bbox = (containerRef as HTMLDivElement).getBoundingClientRect();

    const point = graph.getPointByClient(e.clientX, e.clientY);
    let { x, y } = graph.getCanvasByPoint(point.x, point.y);

    // if (x > width / 2) {
    //   x = x - bbox.width;
    // }
    // if (y > height / 2) {
    //   y = y - bbox.height;
    // }

    if (bindType === 'node') {
      // 如果是节点，则x，y指定到节点的中心点
      // eslint-disable-next-line no-underscore-dangle
      const { x: PointX, y: PointY } = e.item.getModel();
      const CenterCanvas = graph.getCanvasByPoint(PointX, PointY);

      const daltX = e.canvasX - CenterCanvas.x;
      const daltY = e.canvasY - CenterCanvas.y;
      x = x - daltX;
      y = y - daltY;
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
    graph.on(`${bindType}:mouseenter`, handleShow);
    // graph.on(`${bindType}:mousemove`, handleUpdatePosition);
    graph.on(`${bindType}:mouseleave`, handleClose);
    graph.on(`afterremoveitem`, handleClose);

    graph.on('canvas:click', handleClose);
    graph.on('canvas:drag', handleClose);
    graph.on('wheelzoom', handleClose);

    return () => {
      graph.off(`${bindType}:mouseenter`, handleShow);
      graph.off(`${bindType}:mouseleave`, handleClose);
      graph.off(`afterremoveitem`, handleClose);
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
  graphin.tooltip = {
    ...graphin.tooltip,
    [bindType]: {
      handleOpen: handleShow,
      handleClose,
      item,
      visible,
      x,
      y,
    },
  };
  return (
    <>
      <div
        ref={() => {
          // containerRef = node;
        }}
        className="graphin-components-tooltip"
        style={{ ...defaultStyle, ...style, ...positionStyle }}
      >
        {visible && children}
      </div>
    </>
  );
};

Tooltip.Node = Node;
Tooltip.Edge = Edge;
export default Tooltip;
