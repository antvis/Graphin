import type { Graph, GraphOptions } from '@antv/g6';

export interface GraphinProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'id' | 'className' | 'style'> {
  onDestroy?: (graph: Graph) => void;
  onInit?: (graph: Graph) => void;
  onRender?: (graph: Graph) => void;
  options?: GraphOptions;
}

export interface GraphinContextProps {
  graph: Graph | null;
  isReady: boolean;
}
