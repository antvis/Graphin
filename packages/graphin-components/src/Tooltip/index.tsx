import { GraphinContext, IG6GraphEvent, NodeStyle } from '@antv/graphin';
import React, { useEffect } from 'react';
import Edge from './Edge';
import Node from './Node';

const defaultStyle: React.CSSProperties = {
  width: 200,
  background: '#fff',
};

interface TooltipProps {
  /**
   * @description tooltip绑定的图元素
   * @default node\
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
  /**
   * @description Tooltip 的位置
   */
  placement?: 'top' | 'bottom' | 'right' | 'left' | 'center';
  /**
   * @description 是否展示小箭头
   * @description.en-US display arrow
   */
  hasArrow?: boolean;
}

interface State {
  /** 当前状态 */
  visible: boolean;
  x: number;
  y: number;
  /** 触发的元素 */
  item?: IG6GraphEvent['item'];
}

const getTranslate = ({
  placement,
  nodeSize,
  x,
  y,
  bindType = 'node',
  visible,
}: {
  visible: boolean;
  placement: TooltipProps['placement'];
  nodeSize: number;
  x: number;
  y: number;
  bindType: string;
}) => {
  if (bindType === 'edge') {
    return {
      left: x,
      top: y,
    };
  }

  if (placement === 'top') {
    if (visible) {
      return {
        left: x,
        top: y - nodeSize / 2,
        opacity: 1,
        transform: 'translate(-50%,calc(-100% - 6px))',
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      left: 0,
      top: 0,
      opacity: 0.5,
      transform: 'translate(-50%,-100%)',
    };
  }
  if (placement === 'bottom') {
    if (visible) {
      return {
        left: x,
        top: y + nodeSize / 2,
        opacity: 1,
        transform: 'translate(-50%,6px)',
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      left: x,
      top: y + nodeSize / 2,
      opacity: 0.5,
      transform: 'translate(-50%,0px)',
    };
  }
  if (placement === 'left') {
    if (visible) {
      return {
        left: x - nodeSize / 2,
        top: y,
        transform: 'translate(calc(-100% - 6px),-50%)',
        opacity: 1,
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      opacity: 0,
      left: x - nodeSize / 2,
      top: y,
      transform: 'translate(-100%,-50%)',
    };
  }
  if (placement === 'right') {
    if (visible) {
      return {
        left: x + nodeSize / 2,
        top: y,
        transform: 'translate(6px,-50%)',
        opacity: 1,
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      left: x + nodeSize / 2,
      top: y,
      transform: 'translate(0,-50%)',
      opacity: 0,
    };
  }
  if (placement === 'center') {
    if (visible) {
      return {
        left: x,
        top: y,
        opacity: 1,
        transition: 'opacity 0.5s,transform 0.5s',
      };
    }
    return {
      left: x,
      top: y,
      opacity: 0,
    };
  }

  return {
    left: x,
    top: y,
  };
};
// let containerRef: HTMLDivElement | null;

const Tooltip: React.FunctionComponent<TooltipProps> & { Node: typeof Node } & { Edge: typeof Edge } = props => {
  const { children, bindType = 'node', style, placement = 'top', hasArrow } = props;
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

    const point = graph.getPointByClient(e.clientX, e.clientY);
    let { x, y } = graph.getCanvasByPoint(point.x, point.y);
    if (bindType === 'node') {
      // 如果是节点，则x，y指定到节点的中心点
      // eslint-disable-next-line no-underscore-dangle
      if (e.item) {
        const { x: PointX = 0, y: PointY = 0 } = e.item.getModel();
        const CenterCanvas = graph.getCanvasByPoint(PointX, PointY);

        const daltX = e.canvasX - CenterCanvas.x;
        const daltY = e.canvasY - CenterCanvas.y;
        x = x - daltX;
        y = y - daltY;
      }
    }

    /** 设置变量 */
    setState(preState => {
      return {
        ...preState,
        visible: true,
        item: e.item,
        x,
        y,
      };
    });
  };
  const handleClose = () => {
    setState(preState => {
      return {
        ...preState,
        visible: false,
        item: null,
        x: 0,
        y: 0,
      };
    });
  };
  const handleDragStart = () => {
    setState({
      ...state,
      visible: false,
      x: 0,
      y: 0,
      item: null,
    });
  };
  const handleDragEnd = e => {
    const point = graph.getPointByClient(e.clientX, e.clientY);
    let { x, y } = graph.getCanvasByPoint(point.x, point.y);
    if (bindType === 'node') {
      // 如果是节点，则x，y指定到节点的中心点
      // eslint-disable-next-line no-underscore-dangle
      if (e.item) {
        const { x: PointX = 0, y: PointY = 0 } = e.item.getModel();
        const CenterCanvas = graph.getCanvasByPoint(PointX, PointY);

        const daltX = e.canvasX - CenterCanvas.x;
        const daltY = e.canvasY - CenterCanvas.y;
        x = x - daltX;
        y = y - daltY;
      }
      setState({
        ...state,
        visible: true,
        x,
        y,
        item: e.item,
      });
    }
  };
  useEffect(() => {
    graph.on(`${bindType}:mouseenter`, handleShow);
    graph.on(`${bindType}:mouseleave`, handleClose);
    graph.on(`afterremoveitem`, handleClose);
    graph.on(`node:dragstart`, handleDragStart);
    graph.on(`node:dragend`, handleDragEnd);
    // graph.on(`${bindType}:mousemove`, handleUpdatePosition);

    return () => {
      graph.off(`${bindType}:mouseenter`, handleShow);
      graph.off(`${bindType}:mouseleave`, handleClose);
      graph.off(`afterremoveitem`, handleClose);
      graph.off(`node:dragstart`, handleDragStart);
      graph.off(`node:dragend`, handleDragEnd);
      // graph.off(`${bindType}:mousemove`, handleUpdatePosition);
    };
  }, []);

  const { x, y, visible, item } = state;
  let nodeSize = 40;
  try {
    const modelStyle = item?.getModel().style as NodeStyle;
    if (modelStyle) {
      nodeSize = modelStyle.keyshape.size as number;
    }
  } catch (error) {
    console.log(error);
  }
  const padding = 12;
  const containerPosition = getTranslate({ placement, nodeSize: nodeSize + padding, x, y, bindType, visible });
  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    ...containerPosition,
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
        className={`graphin-components-tooltip ${placement}`}
        style={{ ...defaultStyle, ...style, ...positionStyle }}
      >
        {visible && (
          <div>
            {hasArrow && <div className={`tooltip-arrow ${placement}`} />}
            {children}
          </div>
        )}
      </div>
    </>
  );
};

Tooltip.Edge = Edge;
Tooltip.Node = Node;
export default Tooltip;
