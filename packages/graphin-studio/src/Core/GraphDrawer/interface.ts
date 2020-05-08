import { Graph } from '@antv/g6';
import { GrapheneState, Dispatch } from '@types';

export interface GraphDrawerProps {
  dispatch: Dispatch;
  state: GrapheneState;
  graph?: Graph;
}
