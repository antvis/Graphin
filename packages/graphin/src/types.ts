import G6, { GraphOptions } from '@antv/g6';
import { ReactElement, ReactNode } from 'react';
import Graphin from './Graphin';
import { LayoutOption } from './controller/layout/defaultLayouts';

/** export types  */
export type G6Type = any;
export type Graph = G6.Graph;

export type GraphNode = G6.Node;
export type GraphEdge = G6.Edge;

/** 以下用到类型G6中并没有类型定义，需要我们增强一下 */
export interface GraphType extends G6.Graph {
    canvas: Canvas;

    nodes: Node[];

    edges: Edge[];

    autoPaint(): void;

    emit: (eventName: string) => any;
}

/** G6 没有暴露这个类型 */
export interface G6Event extends MouseEvent {
    item: G6.Node & G6.Edge;
    target: MouseEvent['target'];
}

export interface G6KeyboardEvent extends KeyboardEvent {
    item: G6.Node & G6.Edge;
    target: KeyboardEvent['target'];
}

/** Graphin 用到一些 G6 官方没有暴露的 API，所以需要 extend 官方的类型 */
export interface ExtendedGraphOptions extends GraphOptions {
    /**
     * 默认缩放比例
     */
    zoom?: number;
    /**
     * 像素比率
     * 默认值 1.0
     */
    pixelRatio?: number;

    pan?: { x: number; y: number };

    disablePan?: boolean; // 禁止画布平移
    disableZoom?: boolean; // 禁用画布缩放
    disableDrag?: boolean; // 禁用节点拖拽
    disableHighlight?: boolean; // 禁用highlight
    delegateNode?: boolean;
    wheelSensitivity?: number;
    isZoomOptimize?: (graph?: Graph, e?: G6Event) => boolean;
    keyShapeZoom?: number;
    autoFollowWithForce?: boolean;
    autoPinWithForce?: boolean;
    [key: string]: any;
}

type CanvasKey = keyof Canvas;

/** G6 没有暴露这个类型 */
export interface Canvas {
    get(key: CanvasKey): Canvas[CanvasKey];
    width: number;
    height: number;
}

export interface ExtendedGraph extends Graph {
    /**
     * 画布实例
     */
    canvas: Canvas;

    nodes: Node[];

    edges: Edge[];

    autoPaint(): void;
}

export interface Node {
    /** 节点源数据 */
    data: {
        /** 唯一标示ID，必选 */
        id: string;
        /** 节点数据类型 */
        type?: string;
        /** 节点文本 */
        label?: string;
        /** 节点属性 */
        properties?: any[];
    };
    /** 唯一标示ID，必选 */
    id: string;
    /** 节点类型 */
    shape?: string;
    /** 节点样式 */
    style?: object;
    /** 节点位置信息 */
    x?: number;
    y?: number;
    /** 内置的布局，追加的额外属性 */
    layout?: NodeLayoutType;
    /** 节点度数 */
    degree?: number;
    searchTypes?: string[];
}

export interface NodeLayoutType {
    /** 节点度数 */
    degree?: number;
    /** 力导布局 */
    force?: {
        mass?: number;
    };
    /** 同心圆布局 */
    concentric?: {
        outerR?: number;
        center: {
            x: number;
            y: number;
        };
        theta: number;
    };
}
export interface Edge {
    /** 边的数据，必选 */
    data: {
        /** 边的属性 */
        properties?: object[];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
    /** 边的源节点，必选 */
    source: string;
    /** 边的目标节点，必选 */
    target: string;
    /** 边的类型 */
    shape?: string;

    /** 边的文本 */
    label?: string;
    /** 边的样式 */
    style?: object;
    id?: string;
    /** 边的弹簧长度，力导时使用 */
    spring?: number;
}
export type NodeData = Node['data'];
export type EdgeData = Edge['data'];

export interface Data {
    /** 节点 */
    nodes: Node[];
    /** 边 */
    edges: Edge[];
}
export interface Layout {
    /** 布局名称，必选 */
    name: string;
    /** 布局配置，可选 */
    options?: object;
}

/** 用户自定义shape的样式 */
export interface NodeShape {
    name: string;
    shapeComponent?: object;
}
export interface EdgeShape {
    name: string;
    style?: object;
}

// export interface HandleEventProps {
//     graph: GraphType;
//     /** G6的event对象 */
//     e: G6Event;
//     /** 事件类型,eg:"node:click" */
//     type: string;
// }

type renderFunc = (props: GraphinProps) => ReactElement;
export interface NodeShapeFunction {
    (node: Node): {
        /** 自定义Shape的名称，之后数据指定即可调用这个Shape定义 */
        shape: string;
        shapeComponents: {
            /**  'rect' | 'circle' | 'Marker' | 'text'; */
            shape: string;
            attrs: {
                /** 这个shape图形的ID，用户自定义，保证不重复即可 */
                id: string;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                [key: string]: any;
            };
        }[];
        state: {
            [stateName: string]: {
                [id: string]: {
                    [attr: string]: any;
                };
            };
        };
        update?: any;
    };
}

export interface ExendNodeShape {
    name: string;
    render: NodeShapeFunction;
}
export interface ExendLayout {
    /** 布局名称，唯一标示 */
    name: string;
    /** 布局展示名称 */
    desc: string;
    /** antd icon */
    icon: string;
    /** layout 布局执行函数 */
    layout: (
        data: Data,
        options: LayoutOption,
    ) => {
        data: Data;
        forceSimulation?: ForceSimulation;
    };
}
export interface ExtendMarker {
    /** 唯一标示名称 */
    name: string;
    /** Marker的Path路径 */
    path: string;
}

export interface Register {
    /** 节点名称 */
    name: string;
    /** register执行函数,参数为G6对象 */
    register: (G6: G6Type) => void;
}

export interface BehaviorRegister extends Register {
    options: any;
    mode: string;
}

type GraphTypeKey = keyof GraphinProps;
export interface GraphinProps {
    /** render */
    data: Data;
    /** options */
    options?: Partial<ExtendedGraphOptions>;
    /** layout */
    layout?: Layout;

    extend?: {
        layout?: (graphin: Graphin, prevProps: GraphinProps) => ExendLayout[];
        nodeShape?: () => ExendNodeShape[];
        marker?: () => ExtendMarker[];
    };
    register?: {
        /** 通过G6原生方法，注册节点 */
        nodeShape?: (G6: G6Type) => Register[];
        /** 通过G6原生方法，注册边 */
        edgeShape?: (G6: G6Type) => Register[];
        /** 通过G6原生方法，注册事件 */
        behavior?: (G6: G6Type) => BehaviorRegister[];
    };

    children?: ReactNode;

    [key: string]: GraphinProps[keyof GraphinProps];
    // /** children */
    // children?: ReactChild | ReactFragment | ReactPortal | boolean | null | undefined | renderFunc;
}

export interface ForceSimulation {
    stop: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    restart: (selectedNodes: Node[], graph: GraphType) => any;
    done: boolean;
}

export interface GraphinHistory extends GraphinState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    graphSave: any;
}

export interface GraphinState {
    isGraphReady: boolean;
    width: number;
    height: number;
    data: Data;
    graph?: GraphType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    graphSave?: any;
    forceSimulation?: ForceSimulation | null;
}

export interface NodeModel {
    id: string;
    data: NodeData;
    shapeComponent: {};
    layout: {};
    x?: number;
    y?: number;
}

// export interface G6Graph {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     _cfg: any;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     [key: string]: any;
// }

// export interface GraphinComponent {
//     graph: G6Graph;
//     graphDOM: HTMLElement;
//     props: GraphinProps;
//     state: GraphinState;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     [key: string]: any;
// }

export interface LayoutOptionBase {
    graph: GraphType;
    width: number;
    height: number;
    data: Data;
}
