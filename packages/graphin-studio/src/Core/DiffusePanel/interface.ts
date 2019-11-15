import { GrapheneState } from '../../types';

export type CheckboxValueType = string | number | boolean;

export interface DiffusePanelProps {
    apis?: object;
    dispatch?: (props: { type: string; payload: object }) => any; // eslint-disable-line
    state: GrapheneState;
    graphVars?: { [propName: string]: any }; // eslint-disable-line
}

export interface DiffusePanelState {
    selectedNodeTypes: CheckboxValueType[];
    selectedEdgeTypes: CheckboxValueType[];
}

export interface TypeProps {
    value: CheckboxValueType[];
    onChange: (value: CheckboxValueType[]) => void;
}
