import { Graph } from '@antv/graphin';
import { GrapheneState, Dispatch } from '../../types';

export interface StylingProps {
    dispatch?: Dispatch;
    state?: GrapheneState;
    graph?: Graph;
}

export interface ColorProps {
    hex: string;
}

export interface ColorSpanProps {
    color: string;
    isOpen?: boolean;
    onClick: () => void;
}

export interface ColorPickerProps {
    type: string;
    name: string;
    defaultColor: string;
    onChange: (type: string, color: string) => void;
}
