import { Graph } from '@antv/graphin';
import { GrapheneState, Dispatch } from '../../types';

export interface AddNodesProps {
    state: GrapheneState;
    dispatch?: Dispatch;
    graph?: Graph;
    [key: string]: any; // eslint-disable-line
}

export interface NormalState {
    type?: string;
    params?: string;
    errormsg?: string;
}

export interface NormalProps {
    dispatch?: Dispatch;
    graph?: Graph;
}

export interface RandomState {
    mockType: string;
    nodeCount: number;
    options: string;
}

export interface RandomProps {
    dispatch?: Dispatch;
}
