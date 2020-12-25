//@ts-nocheck
import React, { ErrorInfo } from 'react';
// todo ,G6@unpack版本将规范类型的输出
import G6, { Graph, Graph as IGraph } from '@antv/g6';

import { cloneDeep, get, takeRightWhile } from 'lodash';

/** types  */
import { IconLoader } from './typings/type';
/** utils */
// import shallowEqual from './utils/shallowEqual';
import deepEqual from './utils/deepEqual';

import './index.less';

import { TREE_LAYOUTS, G6_DEFAULT_NODE, G6_DEFAULT_COMBO, G6_DEFAULT_EDGE } from './consts';

/** Context */
import GraphinContext from './GraphinContext';
/** 内置 Behaviros */
import Behaviors from './behaviors';
/** 内置布局 */
import LayoutController from './layout';

const { DragCanvas, ZoomCanvas, DragNode, ClickSelect, BrushSelect, ResizeCanvas } = Behaviors;

type DiffValue = any;
interface RegisterFunction {
  (name: string, options: { [key: string]: any }, extendName?: string): void;
}

class Graphin extends React.PureComponent<IGraphin.Props, IGraphin.State> {
  static registerNode: RegisterFunction = (nodeName, options, extendedNodeName) => {
    G6.registerNode(nodeName, options, extendedNodeName);
  };

  static registerEdge: RegisterFunction = (edgeName, options, extendedEdgeName) => {
    G6.registerEdge(edgeName, options, extendedEdgeName);
  };

  static registerCombo: RegisterFunction = (comboName, options, extendedComboName) => {
    G6.registerCombo(comboName, options, extendedComboName);
  };

  static registerBehavior(behaviorName: string, behavior: any) {
    G6.registerBehavior(behaviorName, behavior);
  }

  static registerFontFamily(iconLoader: IconLoader): { [icon: string]: any } {
    /**  注册 font icon */
    const iconFont = iconLoader();
    const { glyphs, fontFamily } = iconFont;
    const icons = glyphs.map(item => {
      return {
        name: item.name,
        unicode: String.fromCodePoint(item.unicode_decimal),
      };
    });

    return new Proxy(icons, {
      get: (target, propKey, receiver) => {
        const matchIcon = target.find(icon => {
          return icon.name === propKey;
        });
        if (!matchIcon) {
          console.error(`%c fontFamily:${fontFamily},does not found ${propKey} icon`);
          return '';
        }
        return matchIcon?.unicode;
      },
    });
  }
  static registerLayout(layoutName, layout) {
    G6.registerLayout(layoutName, layout);
  }

  /** Graph的DOM */
  graphDOM: HTMLDivElement | null = null;

  /** G6 instance */
  graph: IGraph;

  /** layout */
  layout: {
    type: string;
    instance: null;
    destroyed: true;
  };

  width: number;

  height: number;

  /** 是否为 Tree Graph */
  isTree: boolean;

  /** G6实例中的 nodes,edges,combos 的 model，会比props.data中多一些引用赋值产生的属性，比如node中的 x,y */
  data;

  /** 默认样式 */
  defaultStyle: {
    node: {};
    edge: {};
    combo: {};
  };

  constructor(props: IGraphin.Props) {
    super(props);
    this.data = { ...props.data };
    this.options = { ...props.options };
    this.isTree =
      Boolean(props.data && props.data.children) || TREE_LAYOUTS.indexOf(props.layout && props.layout.type) !== -1;
    this.graph = {} as IGraph;
    this.layout = {};
    this.height = Number(props.height);
    this.width = Number(props.width);
    this.state = {
      isReady: false,
    };
    /** 默认的样式 */
    this.defaultStyle = {
      node: props.defaultNode || G6_DEFAULT_NODE,
      edge: props.defaultEdge || G6_DEFAULT_EDGE,
      combo: props.defaultCombo || G6_DEFAULT_COMBO,
    };
  }

  initData = data => {
    if (data.children) {
      this.isTree = true;
    }
    console.time('clone data');
    this.data = cloneDeep(data);
    console.timeEnd('clone data');
  };

  initGraphInstance = () => {
    const { data, layout, width, height, modes = { default: [] }, animate, ...otherOptions } = this.props;
    if (modes.default.length > 0) {
      //TODO :给用户正确的引导，推荐使用Graphin的Bheaviors组件
      console.info('%c suggestion: you can use @antv/graphin Behaviros components', 'color:lightgreen');
    }
    /**  width and height */
    const { clientWidth, clinetHeight } = this.graphDOM;
    /** shallow clone */
    this.initData(data);

    /** 重新计算宽度 */
    this.width = Number(width) || clientWidth || 500;
    this.height = Number(height) || clinetHeight || 500;

    /** graph type */
    this.isTree = Boolean(data.children) || TREE_LAYOUTS.indexOf(props.layout && props.layout.type) !== -1;

    this.options = {
      container: this.graphDOM,
      renderer: 'canvas',
      width: this.width,
      height: this.height,
      animate: animate === false ? false : true,
      defaultNode: this.defaultStyle.node,
      defaultEdge: this.defaultStyle.edge,
      defaultCombo: this.defaultStyle.combo,
      // layout: {
      //   ...layout,
      // },
      modes,
      ...otherOptions,
    };

    if (this.isTree) {
      this.options.layout = { ...layout };

      this.graph = new G6.TreeGraph(this.options);
    } else {
      this.graph = new G6.Graph(this.options);
    }

    this.graph.data(this.data);
    /** 初始化布局 */
    if (!this.isTree) {
      this.layout = new LayoutController(this);
      this.layout.start();
    }
    this.graph.get('canvas').set('localRefresh', false);
    this.graph.render();
    this.initStatus();
  };

  updateLayout = () => {
    this.layout.changeLayout();
  };

  componentDidMount() {
    this.initGraphInstance();
    this.setState({
      isReady: true,
    });
  }

  /**
   * 组件更新的时候
   * @param prevProps
   */
  updateOptions = () => {
    const { options } = this.props;
    return options;
  };

  /** 初始化状态 */
  initStatus = () => {
    if (!this.isTree) {
      const { data } = this.props;
      const { nodes = [], edges = [] } = data;
      nodes.forEach(node => {
        const { states } = node;
        if (states) {
          Object.keys(states).forEach(k => {
            this.graph.setItemState(node.id, k, states[k]);
          });
        }
      });
      edges.forEach(edge => {
        const { states } = edge;
        if (states) {
          Object.keys(states).forEach(k => {
            this.graph.setItemState(edge.id, k, states[k]);
          });
        }
      });
    }
  };

  componentDidUpdate(prevProps: IGraphin.Props) {
    console.time('did-update');
    const isDataChange = this.shouldUpdate(prevProps, 'data');
    const isLayoutChange = this.shouldUpdate(prevProps, 'layout');
    const isOptionsChange = this.shouldUpdate(prevProps, 'options');
    console.timeEnd('did-update');
    const { data, layout, options } = this.props;
    const isGraphTypeChange = prevProps.data.children !== data.children;

    /** 图类型变化 */
    if (isGraphTypeChange) {
      this.initGraphInstance();
      console.log('%c isGraphTypeChange', 'color:grey');
    }
    /** 配置变化 */
    if (isOptionsChange) {
      this.updateOptions();
      console.log('isOptionsChange');
    }
    /** 数据变化 */
    if (isDataChange) {
      this.initData(data);
      this.layout.changeLayout();
      this.graph.data(this.data);
      this.graph.changeData(this.data);

      this.initStatus();
      console.log('%c isDataChange', 'color:grey');
      return;
    }
    /** 布局变化 */
    if (isLayoutChange) {
      /**
       * TODO
       * 1. preset 前置布局判断问题
       * 2. enablework 问题
       * 3. G6 LayoutController 里的逻辑
       */
      this.layout.changeLayout();
      this.layout.refreshPosition();

      /** 走G6的layoutController */
      // this.graph.updateLayout();
      console.log('%c isLayoutChange', 'color:grey');
    }
  }

  /**
   * 组件移除的时候
   */
  componentWillUnmount() {
    this.clear();
  }

  /**
   * 组件崩溃的时候
   * @param error
   * @param info
   */
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Catch component error: ', error, info);
  }

  clear = () => {
    this.layout && this.layout.destroyed && this.layout.destroy(); // tree graph
    this.layout = {};
    this.graph!.clear();
    this.data = { nodes: [], edges: [], combos: [] };
    this.graph!.destroy();
  };

  shouldUpdate(prevProps: IGraphin.Props, key: string) {
    /* eslint-disable react/destructuring-assignment */
    const prevVal = prevProps[key] as DiffValue;
    const currentVal = this.props[key] as DiffValue;
    const isEqual = deepEqual(prevVal, currentVal);
    return !isEqual;
  }

  render() {
    console.log('%c graphin render...', 'color:lightblue', this);
    const { isReady } = this.state;
    const { modes } = this.props;
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
          <div className="graphin-components">
            {isReady && (
              <>
                {/** modes 不存在的时候，才启动默认的behaviros，否则会覆盖用户自己传入的 */
                !modes && (
                  <React.Fragment>
                    {/* 拖拽画布 */}
                    <DragCanvas />
                    {/* 缩放画布 */}
                    <ZoomCanvas />
                    {/* 拖拽节点 */}
                    <DragNode />
                    {/* 点击节点 */}
                    <ClickSelect />
                    {/* 圈选节点 */}
                    <BrushSelect />
                    {/** resize 画布 */}
                  </React.Fragment>
                )}

                {/** resize 画布 */}
                <ResizeCanvas graphDOM={this.graphDOM} />

                {this.props.children}
              </>
            )}
          </div>
        </div>
      </GraphinContext.Provider>
    );
  }
}
export default Graphin;
