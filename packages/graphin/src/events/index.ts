import { debounce } from 'lodash';
import handleResize from './window-resize';
import handleZoom from './change-zoom';
import dragWithForce from './drag-with-force';
import Graphin from '../Graphin';

const handleGraphEvents = (graphin: Graphin) => {
  /**
   * 监听window事件
   * resize :debounce处理
   */
  const handleResizeEvent = debounce(() => {
    handleResize(graphin);
  }, 100);
  window.addEventListener('resize', handleResizeEvent, false);

  /**
   * 监听wheel/zoom事件
   */
  handleZoom(graphin);
  /**
   * 基于力导的节点拖拽
   */
  dragWithForce(graphin);

  /**
   * 事件清除
   */
  return {
    clear: () => {
      window.removeEventListener('resize', handleResizeEvent, false);
    },
  };
};
export default handleGraphEvents;
