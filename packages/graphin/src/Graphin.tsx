// @ts-nocheck
import React, { ErrorInfo } from 'react';
import G6, { Graph as GraphType } from '@antv/g6';

import { cloneDeep } from 'lodash';
/** controller */
import initController, { initGraphAfterRender } from './controller/init';
import registerController from './controller/register';

import layoutController from './controller/layout';
import apisController from './apis';
import eventController from './events/index';

/** types  */
import { GraphinProps, ForceSimulation, Data, Layout } from './types';
import { IconLoader } from './typings';
/** utils */
// import shallowEqual from './utils/shallowEqual';
import deepEqual from './utils/deepEqual';

import './index.less';
import { ICON_FONT_FAMILY_MAP } from './icons/iconFont';

/** Context */

export const GraphinContext = React.createContext();

type DiffValue = Data | Layout | undefined;

class Graphin extends React.PureComponent<GraphinProps> {
  graphDOM: HTMLDivElement | null = null;
  /** G6的实例 */
  graph?: GraphType;
  forceSimulation: ForceSimulation | null;

  static registerNode(nodeName, options, extendedNodeName) {
    G6.registerNode(nodeName, options, extendedNodeName);
  }

  static registerEdge(edgeName, options, extendedEdgeName) {
    G6.registerEdge(edgeName, options, extendedEdgeName);
  }

  static registerCombo(comboName, options, extendedComboName) {
    G6.registerCombo(comboName, options, extendedComboName);
  }

  static registerBehavior(behaviorName: string, behavior) {
    G6.registerBehavior(behaviorName, behavior);
  }

  static registerFontFamily(iconLoader: IconLoader) {
    /**  注册 font icon */
    const iconLoaders = iconLoader();
    iconLoaders.forEach(item => {
      ICON_FONT_FAMILY_MAP[item.fontFamily] = item.map;
    });
  }

  constructor(props: GraphinProps) {
    super(props);
    this.data = props.data;
    this.forceSimulation = null;
    this.height = props.height || 500;
    this.width = props.width || 500;
    this.state = {
      isReady: false,
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const behaviorsMode = registerController(this.props);
    // init G6 instance
    const { instance, width, height, options } = initController(
      this.props,
      this.graphDOM as HTMLDivElement,
      behaviorsMode,
    );

    this.g6Options = options;
    this.graph = instance as GraphType;
    const { data: newData, forceSimulation } = layoutController(this.getContext(), { data });
    this.forceSimulation = forceSimulation!;

    this.width = width;
    this.height = height;
    this.data = newData;
    this.data.forceSimulation;

    this.renderGraphWithLifeCycle(true);

    this.handleEvents();
    this.isGraphReady = true;
    this.setState({
      isReady: true,
    });
  }

  /**
   * 组件更新的时候
   * @param prevProps
   */
  componentDidUpdate(prevProps: GraphinProps) {
    console.time('componentDidUpdate');
    const isDataChange = this.shouldUpdate(prevProps, 'data');
    const isLayoutChange = this.shouldUpdate(prevProps, 'layout');
    const isOptionsChange = this.shouldUpdate(prevProps, 'options');
    console.timeEnd('componentDidUpdate');

    /** 如果都没有改变，不渲染 */
    if (!isDataChange && !isLayoutChange && !isOptionsChange) {
      return;
    }
    /** 布局策略改变了，相当于重新渲染：render and initState */
    if (isLayoutChange) {
      const { data, forceSimulation } = layoutController(this.getContext(), { data: this.props.data, prevProps });
      this.data = data;
      this.forceSimulation = forceSimulation!;
      this.renderGraphWithLifeCycle(true);
      return;
    }
    // // 如果仅是数据变化，需要对数据做diff
    // if (isDataChange) {
    //   const { nodes, edges, combos } = this.props.data;
    //   const { nodes: PreNodes, edges: PreEdges, combos: PreCombos } = prevProps.data;
    //   // 先判断节点
    //   console.time('is data change');
    //   const addNodes = [];
    //   nodes.forEach(node => {
    //     const { id, status, ...others } = node;
    //     const matchNode = PreNodes.find(n => n.id === id); //需要替换成Map，看下性能
    //     if (!matchNode) {
    //       addNodes.push(node);
    //       return;
    //     }
    //     const { status: PrevStatus, ...prevOthers } = matchNode;
    //     if (JSON.stringify(status) !== JSON.stringify(PrevStatus)) {
    //       Object.keys(status).forEach(k => {
    //         graph.setItemState(id, k, status[k]);
    //       });
    //     }
    //     if (JSON.stringify(others) !== JSON.stringify(prevOthers)) {
    //       this.graph?.updateItem(id, node);
    //     }
    //   });
    //   console.timeEnd('is data change');

    //   addNodes.forEach(node => {
    //     this.graph?.addItem('node', node);
    //   });
    //   console.log(this.graph);
    //   this.graph?.render();
    //   console.log('addNodes', addNodes);
    // }

    if (isDataChange) {
      const { data } = this.props;
      this.data = this.props.data;
    }
    const { data, forceSimulation } = layoutController(this.getContext(), { data: this.data, prevProps });
    this.data = data;
    this.forceSimulation = forceSimulation!;
    this.renderGraphWithLifeCycle();
  }
  /**
   * 组件移除的时候
   */
  componentWillUnmount() {
    this.clearEvents!();
  }
  /**
   * 组件崩溃的时候
   * @param error
   * @param info
   */
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Catch component error: ', error, info);
  }

  getApis = () => {
    const context = this.getContext();
    return apisController(context);
  };

  clear = () => {
    this.graph!.clear();
    this.history.reset();
    this.clearEvents!();
    this.data = { nodes: [], edges: [] };
    this.forceSimulation = null;
    this.renderGraph();
  };

  shouldUpdate(prevProps: GraphinProps, key: string) {
    /* eslint-disable react/destructuring-assignment */
    const prevVal = prevProps[key] as DiffValue;
    const currentVal = this.props[key] as DiffValue;
    const isEqual = deepEqual(prevVal, currentVal);
    return !isEqual;
  }

  handleEvents() {
    this.clearEvents = eventController(this.getContext()).clear;
  }

  getContext = () => {
    return this;
  };

  renderGraphWithLifeCycle = (firstRender: boolean) => {
    console.time('cloneDeep-data');
    const newData = cloneDeep(this.data);
    console.timeEnd('cloneDeep-data');

    console.time('change-data');
    // this.graph!.changeData(newData);
    this.graph?.data(newData);
    this.graph?.render();
    console.timeEnd('change-data');

    this.graph!.emit('afterchangedata');
    this.graph!.emit('layout:done');
    console.log(this.graph);

    if (firstRender) {
      initGraphAfterRender(this.props, this.graphDOM, this.graph);
    }
  };

  stopForceSimulation = () => {
    const { forceSimulation } = this.state;
    if (forceSimulation) {
      forceSimulation.stop();
    }
  };

  renderGraph = () => {
    this.graph!.changeData(cloneDeep(this.data));
    /**
     * TODO 移除 `afterchangedata` Event
     * 此方法应该放到G6的changeData方法中去emit
     */
    this.graph!.emit('afterchangedata');
  };

  render() {
    return (
      <GraphinContext.Provider
        value={{
          graph: this.graph,
        }}
      >
        <div id="graphin-container">
          <div
            data-testid="custom-element"
            className="graphin-core"
            ref={node => {
              this.graphDOM = node;
            }}
          />
          <div className="graphin-components">{this.state.isReady && this.props.children}</div>
        </div>
      </GraphinContext.Provider>
    );
  }
}
export default Graphin;
