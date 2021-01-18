import React, { ErrorInfo } from 'react';
// todo ,G6@unpack版本将规范类型的输出
import G6, { Graph as IGraph, GraphOptions, GraphData, TreeGraphData } from '@antv/g6';
import { cloneDeep } from 'lodash';
import { deepMix } from '@antv/util';

/** utils */
// import shallowEqual from './utils/shallowEqual';
import deepEqual from './utils/deepEqual';

import './index.less';

/** Context */
import GraphinContext from './GraphinContext';
/** 内置 Behaviros */
import Behaviors from './behaviors';
/** 内置布局 */
import LayoutController from './layout';
/** 内置API */
import ApiController from './apis';
import { ApisType } from './apis/types';

/** types  */
import { GraphinProps, IconLoader, GraphinData, GraphinTreeData } from './typings/type';
import { TREE_LAYOUTS, getDefaultStyleByTheme, ThemeData } from './consts';

const { DragCanvas, ZoomCanvas, DragNode, ClickSelect, BrushSelect, ResizeCanvas, Hoverable } = Behaviors;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DiffValue = any;

export interface GraphinState {
  isReady: boolean;
  context: {
    graph: IGraph;
    apis: ApisType;
    theme: ThemeData;
  };
}

export interface RegisterFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (name: string, options: { [key: string]: any }, extendName?: string): void;
}

class Graphin extends React.PureComponent<GraphinProps, GraphinState> {
  static registerNode: RegisterFunction = (nodeName, options, extendedNodeName) => {
    G6.registerNode(nodeName, options, extendedNodeName);
  };

  static registerEdge: RegisterFunction = (edgeName, options, extendedEdgeName) => {
    G6.registerEdge(edgeName, options, extendedEdgeName);
  };

  static registerCombo: RegisterFunction = (comboName, options, extendedComboName) => {
    G6.registerCombo(comboName, options, extendedComboName);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static registerBehavior(behaviorName: string, behavior: any) {
    G6.registerBehavior(behaviorName, behavior);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      get: (target, propKey: string) => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static registerLayout(layoutName: string, layout: any) {
    G6.registerLayout(layoutName, layout);
  }

  /** Graph的DOM */
  graphDOM: HTMLDivElement | null = null;

  /** G6 instance */
  graph: IGraph;

  /** layout */
  layout: LayoutController;

  width: number;

  height: number;

  /** 是否为 Tree Graph */
  isTree: boolean;

  /** G6实例中的 nodes,edges,combos 的 model，会比props.data中多一些引用赋值产生的属性，比如node中的 x,y */
  data: GraphinTreeData | GraphinData | undefined;

  options: GraphOptions;

  apis: ApisType;

  theme: ThemeData;

  constructor(props: GraphinProps) {
    super(props);

    const {
      data,
      layout,
      width,
      height,

      ...otherOptions
    } = props;

    this.data = data;
    this.isTree =
      Boolean(props.data && props.data.children) || TREE_LAYOUTS.indexOf(String(layout && layout.type)) !== -1;
    this.graph = {} as IGraph;
    this.height = Number(height);
    this.width = Number(width);

    this.theme = {} as ThemeData;
    this.apis = {} as ApisType;

    this.state = {
      isReady: false,
      context: {
        graph: this.graph,
        apis: this.apis,
        theme: this.theme,
      },
    };

    this.options = { ...otherOptions } as GraphOptions;
    this.layout = {} as LayoutController;
  }

  initData = (data: GraphinProps['data']) => {
    if (data.children) {
      this.isTree = true;
    }
    console.time('clone data');
    this.data = cloneDeep(data);
    console.timeEnd('clone data');
  };

  initGraphInstance = () => {
    const {
      theme,
      data,
      layout,
      width,
      height,
      defaultCombo,
      defaultEdge,
      defaultNode,
      nodeStateStyles,
      edgeStateStyles,
      comboStateStyles,
      modes = { default: [] },
      animate,
      ...otherOptions
    } = this.props;
    if (modes.default.length > 0) {
      // TODO :给用户正确的引导，推荐使用Graphin的Bheaviors组件
      console.info('%c suggestion: you can use @antv/graphin Behaviros components', 'color:lightgreen');
    }
    /**  width and height */
    const { clientWidth, clientHeight } = this.graphDOM as HTMLDivElement;
    /** shallow clone */
    this.initData(data);

    /** 重新计算宽度 */
    this.width = Number(width) || clientWidth || 500;
    this.height = Number(height) || clientHeight || 500;

    const themeResult = getDefaultStyleByTheme(theme);

    const {
      defaultNodeStyle,
      defaultEdgeStyle,
      defaultComboStyle,
      defaultNodeStatusStyle,
      defaultEdgeStatusStyle,
      defaultComboStatusStyle,
    } = themeResult;
    // @ts-ignore
    this.theme = themeResult as ThemeData;
    /** graph type */
    this.isTree = Boolean(data.children) || TREE_LAYOUTS.indexOf(String(layout && layout.type)) !== -1;
    const isGraphinNodeType = defaultNode?.type === undefined || defaultNode?.type === defaultNodeStyle.type;
    const isGraphinEdgeType = defaultEdge?.type === undefined || defaultEdge?.type === defaultEdgeStyle.type;

    this.options = {
      container: this.graphDOM,
      renderer: 'canvas',
      width: this.width,
      height: this.height,
      animate: animate !== false,
      /** 默认样式 */
      defaultNode: isGraphinNodeType ? deepMix({}, defaultNodeStyle, defaultNode) : defaultNode,
      defaultEdge: isGraphinEdgeType ? deepMix({}, defaultEdgeStyle, defaultEdge) : defaultEdge,
      defaultCombo: deepMix({}, defaultComboStyle, defaultCombo),
      /** status 样式 */
      nodeStateStyles: deepMix({}, defaultNodeStatusStyle, nodeStateStyles),
      edgeStateStyles: deepMix({}, defaultEdgeStatusStyle, edgeStateStyles),
      comboStateStyles: deepMix({}, defaultComboStatusStyle, comboStateStyles),

      modes,
      ...otherOptions,
    } as GraphOptions;

    if (this.isTree) {
      this.options.layout = { ...layout };

      this.graph = new G6.TreeGraph(this.options);
    } else {
      this.graph = new G6.Graph(this.options);
    }

    this.graph.data(this.data as GraphData | TreeGraphData);
    /** 初始化布局 */
    if (!this.isTree) {
      this.layout = new LayoutController(this);
      this.layout.start();
    }
    this.graph.get('canvas').set('localRefresh', false);
    this.graph.render();
    this.initStatus();
    this.apis = ApiController(this.graph);
  };

  updateLayout = () => {
    this.layout.changeLayout();
  };

  componentDidMount() {
    console.log('did mount...');

    this.initGraphInstance();
    this.setState({
      isReady: true,
      context: {
        graph: this.graph,
        apis: this.apis,
        theme: this.theme,
      },
    });
  }

  /**
   * 组件更新的时候
   * @param prevProps
   */
  updateOptions = () => {
    const { layout, data, ...options } = this.props;
    return options;
  };

  /** 初始化状态 */
  initStatus = () => {
    if (!this.isTree) {
      const { data } = this.props;
      const { nodes = [], edges = [] } = data as GraphinData;
      nodes.forEach(node => {
        const { status } = node;
        if (status) {
          Object.keys(status).forEach(k => {
            this.graph.setItemState(node.id, k, Boolean(status[k]));
          });
        }
      });
      edges.forEach(edge => {
        const { status } = edge;
        if (status) {
          Object.keys(status).forEach(k => {
            this.graph.setItemState(edge.id, k, Boolean(status[k]));
          });
        }
      });
    }
  };

  componentDidUpdate(prevProps: GraphinProps) {
    console.time('did-update');
    const isDataChange = this.shouldUpdate(prevProps, 'data');
    const isLayoutChange = this.shouldUpdate(prevProps, 'layout');
    const isOptionsChange = this.shouldUpdate(prevProps, 'options');
    const isThemeChange = this.shouldUpdate(prevProps, 'theme');
    console.timeEnd('did-update');
    const { data } = this.props;
    const isGraphTypeChange = prevProps.data.children !== data.children;

    if (isThemeChange) {
      // TODO :Node/Edge/Combo 批量调用 updateItem 来改变
    }

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
      this.graph.data(this.data as GraphData | TreeGraphData);
      this.graph.changeData(this.data as GraphData | TreeGraphData);
      this.initStatus();
      this.apis = ApiController(this.graph);
      console.log('%c isDataChange', 'color:grey');
      this.setState(preState => {
        return {
          ...preState,
          context: {
            graph: this.graph,
            apis: this.apis,
            theme: this.theme,
          },
        };
      });
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
    if (this.layout && this.layout.destroyed) {
      this.layout.destroy(); // tree graph
    }
    this.layout = {} as LayoutController;
    this.graph!.clear();
    this.data = { nodes: [], edges: [], combos: [] };
    this.graph!.destroy();
  };

  shouldUpdate(prevProps: GraphinProps, key: string) {
    /* eslint-disable react/destructuring-assignment */
    const prevVal = prevProps[key];
    const currentVal = this.props[key] as DiffValue;
    const isEqual = deepEqual(prevVal, currentVal);
    return !isEqual;
  }

  render() {
    console.log('%c graphin render...', 'color:lightblue', this);
    const { isReady } = this.state;
    const { modes, style } = this.props;
    console.log('theme', this.theme);
    return (
      <GraphinContext.Provider value={this.state.context}>
        <div id="graphin-container">
          <div
            data-testid="custom-element"
            className="graphin-core"
            ref={node => {
              this.graphDOM = node;
            }}
            style={{ background: this.theme?.background, ...style }}
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
                  </React.Fragment>
                )}

                {/** resize 画布 */}
                <ResizeCanvas graphDOM={this.graphDOM as HTMLDivElement} />
                <Hoverable bindType="node" />
                {/* <Hoverable bindType="edge" /> */}
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
