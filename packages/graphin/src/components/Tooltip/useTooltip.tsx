import React, { useEffect } from 'react';
import { GraphinContext, IG6GraphEvent } from '../../index';

export interface State {
  /** 当前状态 */
  visible: boolean;
  x: number;
  y: number;
  /** 触发的元素 */
  item?: IG6GraphEvent['item'];
}

export interface Props {
  bindType: 'node' | 'edge';
}

const useTooltip = (props: Props) => {
  const { bindType = 'node' } = props;
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
};

export default useTooltip;
