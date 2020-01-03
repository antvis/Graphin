import { Graph } from '@antv/graphin';
import { GrapheneState, Dispatch } from '../../types';

export interface GraphDrawerProps {
    dispatch: Dispatch;
    state: GrapheneState;
    graph?: Graph;
}
