// @ts-nocheck
import React, { ErrorInfo } from 'react';

import { cloneDeep } from 'lodash';
/** controller */
import initController from './controller/init';
import registerController from './controller/register';
import HistoryController from './controller/history';

import layoutController from './controller/layout';
import apisController from './apis';
import eventController from './events/index';

/** types  */
import { GraphinProps, GraphinState, ExtendedGraphOptions, GraphType, ForceSimulation } from './types';

/** utils */
import debug from './utils/debug';

import './index.less';
/** font */
// import './fonts/iconfont.css';

class Graph extends React.PureComponent<GraphinProps, GraphinState> {
    graphDOM: HTMLDivElement | null = null;

    graph: GraphType;

    history: HistoryController;

    forceSimulation: ForceSimulation | null;

    g6Options?: Partial<ExtendedGraphOptions>;

    getLayoutInfo: () => any; // eslint-disable-line

    clearEvents?: () => void;

    constructor(props: GraphinProps) {
        super(props);
        this.state = {
            /** 图是否准备完成 */
            isGraphReady: false,
            data: props.data,
            forceSimulation: null,
            width: 0,
            height: 0,
            graphSave: null,
        };
        this.history = new HistoryController();
        this.forceSimulation = null;
        this.graph = {} as GraphType;
        this.getLayoutInfo = () => {};
    }

    componentDidMount() {
        const { data } = this.props;
        debug('effect')('did-mount');
        /** 1. 注册节点 */
        const behavirosMode = registerController(this.props);
        /** 2. 初始化实例 */
        const { instance, width, height, options } = initController(
            this.props,
            this.graphDOM as HTMLDivElement,
            behavirosMode,
        );
        this.g6Options = options;
        this.graph = instance as GraphType;
        const { data: newData, forceSimulation } = layoutController(this.getContext(), { data });
        this.forceSimulation = forceSimulation!;
        /** 3.设置state */
        this.setState(
            {
                isGraphReady: true,
                graph: this.graph,
                width,
                height,
                data: newData,
                forceSimulation,
            },
            () => {
                this.renderGraphWithLifeCycle();
            },
        );
        /** 4.内部监听一些图事件 */
        this.handleEvents();
    }

    componentDidUpdate(prevProps: GraphinProps) {
        const isDataChange = this.shouldUpdateWithDeps(prevProps, ['data']);
        const isLayoutChange = this.shouldUpdateWithDeps(prevProps, ['layout']);
        /** 只有data或者layout改变的时候，才会重新update */
        if (isDataChange || isLayoutChange) {
            let { data: currentData } = this.state;
            if (isDataChange) {
                const { data } = this.props;
                currentData = data;
            }
            const { data, forceSimulation } = layoutController(this.getContext(), { data: currentData, prevProps });
            this.forceSimulation = forceSimulation!;
            /** 5.设置state */
            this.setState(
                {
                    data,
                    forceSimulation,
                },
                () => {
                    /** 6.渲染 */
                    this.renderGraphWithLifeCycle();
                },
            );
        }
    }

    componentWillUnmount() {
        this.clearEvents!();
        debug('Unmount')('componentWillUnmount');
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Catch component error: ', error, info);
    }

    getApis = () => {
        const context = this.getContext();
        return apisController(context);
    };

    getHistoryInfo = () => {
        return this.history.getHistoryInfo();
    };

    clear = () => {
        this.graph.clear();
        this.history.reset();
        this.clearEvents!();

        this.setState(
            {
                data: { nodes: [], edges: [] },

                forceSimulation: null,
                graphSave: null,
            },
            () => {
                const { data } = this.state;
                this.renderGraph(data);
            },
        );
    };

    shouldUpdateWithDeps(prevProps: GraphinProps, deps: string[]) {
        const { props } = this;
        let isUpdate = false;
        deps.forEach(key => {
            if (prevProps[key] !== props[key]) {
                isUpdate = true;
            }
        });
        return isUpdate;
    }

    handleEvents() {
        this.clearEvents = eventController(this.getContext()).clear;
    }

    getContext = () => {
        return this;
    };

    renderGraphWithLifeCycle = () => {
        const { data } = this.state;
        this.graph.changeData(cloneDeep(data));
        this.graph.emit('afterchangedata');
        this.handleSaveHistory();
    };

    stopForceSimulation = () => {
        /** 如果有模拟器需要先停止 */
        const { forceSimulation } = this.state;
        if (forceSimulation) {
            forceSimulation.stop();
        }
    };

    handleSaveHistory = () => {
        const currentState = {
            ...this.state,
            graphSave: cloneDeep(this.graph.save()), // 避免数据引用
        };
        this.history.save(currentState);
    };

    handleUndo = () => {
        this.stopForceSimulation();

        const prevState = this.history.undo();
        if (prevState) {
            this.setState(
                {
                    ...prevState,
                },
                () => {
                    this.renderGraphByHistory();
                },
            );
        }
    };

    handleRedo = () => {
        this.stopForceSimulation();

        const nextState = this.history.redo();
        if (nextState) {
            this.setState(
                {
                    ...nextState,
                },
                () => {
                    this.renderGraphByHistory();
                },
            );
        }
    };

    renderGraph = (data: any) => {
        this.graph.changeData(cloneDeep(data));
        /**
         * TODO 移除 `afterchangedata` Event
         * 此方法应该放到G6的changeData方法中去emit
         */
        this.graph.emit('afterchangedata');
    };

    /**
     * 根据history来渲染图
     */
    renderGraphByHistory = () => {
        /** 如果历史上有模拟器，需要重新启动 */
        const { forceSimulation, graphSave } = this.state;
        if (forceSimulation) {
            forceSimulation.restart(graphSave.nodes || [], this.graph);
        }
        this.renderGraph(graphSave);
    };

    renderChildren = () => {
        let { children } = this.props;

        const combineProps = {
            graph: this.graph,
            graphDOM: this.graphDOM,
            graphVars: this.state, // 保留引用
            apis: this.getApis(),
        };

        if (!children) {
            return null;
        }

        /**  1.render-props */
        if (typeof children === 'function') {
            return children(combineProps);
        }

        /** 2.combose-component */
        /**
         * Children是React元素的情况 :有包裹的Tag即可，无论是div或者是Fragement或者是组件
         * 1. <Graphehe> <div> this is text <ContextMenu />  </div> </Graphene>
         * 2. <Graphehe> <CustomerComponent> this is text  <ContextMenu /> </CustomerComponent> </Graphene>
         * 2. <Graphehe> <Fragment> this is text  <ContextMenu /> </Graphene>
         */
        if (
            React.isValidElement(children) &&
            (String(children.type) === 'Symbol(react.fragment)' || typeof children.type === 'string')
        ) {
            // eslint-disable-next-line no-console
            console.error('Please do not wrap components inside dom element or Fragment when using Graphin');
            return children;
        }

        if (!Array.isArray(children)) {
            children = [children];
        }

        return React.Children.map(children, child => {
            // 如果传入的是 DOM 元素或不是合法的 Element，不传入 props
            if (!React.isValidElement(child) || typeof child.type === 'string') {
                return child;
            }
            return React.cloneElement(child, {
                ...combineProps,
            });
        });
    };

    render() {
        // debug('core')(this.state);
        const { isGraphReady } = this.state;
        return (
            <>
                <div
                    data-testid="custom-element"
                    className="graphin-core"
                    style={{
                        height: '100%',
                        width: '100%',
                        minHeight: '500px',
                        background: '#fff',
                    }}
                    ref={node => {
                        this.graphDOM = node;
                    }}
                />
                <div className="graphin-components">{isGraphReady && this.renderChildren()}</div>
            </>
        );
    }
}
export default Graph;
