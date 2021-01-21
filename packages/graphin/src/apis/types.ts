export interface ApisType {
  handleAutoZoom: () => { text: string; ratio: number };
  handleRealZoom: () => { text: string; ratio: number };
  handleChangeZoom: () => { text: string; ratio: number };
  handleZoomIn: () => { text: string; ratio: number };
  handleZoomOut: () => { text: string; ratio: number };
  focusNodeById: (nodeId: string) => void;
  highlightNodeById: (nodeId: string[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [key: string]: (a?:any) => void;
}
