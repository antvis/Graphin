export interface ApisType {
  /**
   * @description 将视窗缩放至自适应画布的大小
   */
  handleAutoZoom: () => { text: string; ratio: number };
  /**
   * @description 将视窗缩放到1:1大小
   */
  handleRealZoom: () => { text: string; ratio: number };
  /**
   * @description 自定义缩放
   */
  handleChangeZoom: () => { text: string; ratio: number };
  /**
   * @description 放大
   */
  handleZoomIn: () => { text: string; ratio: number };
  /**
   * @description 缩小
   */
  handleZoomOut: () => { text: string; ratio: number };
  /**
   * @description 根据节点ID查询
   */
  focusNodeById: (nodeId: string) => void;
  /**
   * @description 根据节点ID，高亮关联节点
   */
  highlightNodeById: (nodeId: string[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [key: string]: (a?:any) => void;
}
