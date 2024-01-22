import type { Graph, Specification } from '@antv/g6';

export interface GraphinProps extends Specification<{}, {}> {
  style?: React.CSSProperties;
  onInit?: (graph: Graph) => void;
  unMount?: (graph: Graph) => void;
  children?: React.ReactElement;
}

export interface GraphinContextType {
  graph?: Graph | null;
  isReady: boolean;
}
