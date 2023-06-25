import G6, { GraphData, GraphOptions, Graph as IGraph, TreeGraphData } from '@antv/g6';
import React, { ErrorInfo } from 'react';
/** 内置API */
import ApiController from './apis';
import { ApisType } from './apis/types';
/** 内置 Behaviors */
import Behaviors from './behaviors';
import { DEFAULT_GRAPH_LAYOUT_OPTIONS, DEFAULT_TREE_LATOUT_OPTIONS, TREE_LAYOUTS } from './consts';
/** Context */
import GraphinContext from './GraphinContext';
// import './index.less';
/** 内置布局 */
import LayoutController from './layout';
import { getDefaultStyleByTheme, ThemeData } from './theme/index';
/** types  */
import { cloneDeep } from 'lodash-es';
import { GraphinData, GraphinProps, GraphinTreeData, IconLoader, IUserNode, PlainObject } from './typings/type';
/** utils */
// import shallowEqual from './utils/shallowEqual';
import deepEqual from './utils/deepEqual';
import { processLayoutConfig } from './utils/layout';

const { DragCanvas, ZoomCanvas, DragNode, DragCombo, ClickSelect, BrushSelect, ResizeCanvas } = Behaviors;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DiffValue = any;

export interface GraphinState {
  isReady: boolean;
  context: {
    graph: IGraph;
    apis: ApisType;
    theme: ThemeData;
    layout: LayoutController;
    dragNodes: IUserNode[];
    updateContext: (config: PlainObject) => void;
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

  layoutCache: boolean;

  width: number;

  height: number;

  /** 是否为 Tree Graph */
  isTree: boolean;

  /** G6实例中的 nodes,edges,combos 的 model，会比props.data中多一些引用赋值产生的属性，比如node中的 x,y */
  data: GraphinTreeData | GraphinData | undefined;

  options: GraphOptions;

  apis: ApisType;

  theme: ThemeData;

  dragNodes: IUserNode[];

  // 标记是否使用 graphin 的 layoutController，否则使用 g6 的 layoutController。待正式版本移除 graphin 的 layoutController
  useGraphinLayoutController: boolean;

  constructor(props: GraphinProps) {
    super(props);

    const { data, layout, width, height, layoutCache, ...otherOptions } = props;
    this.data = data;
    this.isTree =
      Boolean(props.data && (props.data as GraphinTreeData).children) ||
      TREE_LAYOUTS.indexOf(String(layout && layout.type)) !== -1;
    this.graph = {} as IGraph;
    this.height = Number(height);
    this.width = Number(width);

    this.theme = {} as ThemeData;
    this.apis = {} as ApisType;
    this.layoutCache = layoutCache;
    this.layout = {} as LayoutController;
    this.dragNodes = [] as IUserNode[];
    this.useGraphinLayoutController = layout?.type === 'graphin-force';

    this.options = { ...otherOptions } as GraphOptions;

    this.state = {
      isReady: false,
      context: {
        graph: this.graph,
        apis: this.apis,
        theme: this.theme,
        layout: this.layout,
        dragNodes: this.dragNodes,
        updateContext: this.updateContext,
      },
    };
  }

  initData = (data: GraphinProps['data']) => {
    if ((data as GraphinTreeData).children) {
      this.isTree = true;
    }
    this.data = cloneDeep(data);
  };

  initGraphInstance = () => {
    const {
      theme,
      data,
      layout,
      width,
      height,
      defaultCombo = { style: {}, type: 'graphin-combo' },
      defaultEdge = { style: {}, type: 'graphin-line' },
      defaultNode = { style: {}, type: 'graphin-circle' },
      nodeStateStyles,
      edgeStateStyles,
      comboStateStyles,
      modes = { default: [] },
      animate,
      handleAfterLayout,
      ...otherOptions
    } = this.props;
    if (modes.default.length > 0) {
      // TODO :给用户正确的引导，推荐使用Graphin的Behaviors组件
      console.info('%c suggestion: you can use @antv/graphin Behaviors components', 'color:lightgreen');
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
      ...otherTheme
    } = themeResult;

    /** graph type */
    this.isTree =
      Boolean((data as GraphinTreeData).children) || TREE_LAYOUTS.indexOf(String(layout && layout.type)) !== -1;

    const finalStyle = {
      defaultNode: { style: { ...defaultNode.style, _theme: theme }, type: defaultNode.type || 'graphin-circle' }, // isGraphinNodeType ? deepMix({}, defaultNodeStyle, defaultNode) : defaultNode,
      defaultEdge: { style: { ...defaultEdge.style, _theme: theme }, type: defaultEdge.type || 'graphin-line' }, // isGraphinEdgeType ? deepMix({}, defaultEdgeStyle, defaultEdge) : defaultEdge,
      defaultCombo: {
        style: { ...defaultCombo.style, _theme: theme },
        type: defaultCombo.type || 'combo',
        labelCfg: defaultCombo.labelCfg,
      }, // deepMix({}, defaultComboStyle, defaultCombo), // TODO:COMBO的样式需要内部自定义
      /** status 样式 */
      nodeStateStyles, // isGraphinNodeType ? deepMix({}, defaultNodeStatusStyle, nodeStateStyles) : nodeStateStyles,
      edgeStateStyles, // isGraphinEdgeType ? deepMix({}, defaultEdgeStatusStyle, edgeStateStyles) : edgeStateStyles,
      comboStateStyles, // deepMix({}, defaultComboStatusStyle, comboStateStyles),
    };
    // @ts-ignore
    this.theme = { ...finalStyle, ...otherTheme } as ThemeData;

    this.options = {
      container: this.graphDOM,
      renderer: 'canvas',
      width: this.width,
      height: this.height,
      animate: animate !== false,
      ...finalStyle,
      modes,
      ...otherOptions,
    } as GraphOptions;

    if (this.isTree) {
      this.options.layout = layout || DEFAULT_TREE_LATOUT_OPTIONS;
      this.graph = new G6.TreeGraph(this.options);
    } else {
      if (!this.useGraphinLayoutController) {
        // processLayoutConfig 兼容布局参数
        this.options.layout = processLayoutConfig(layout, this.graph) || DEFAULT_GRAPH_LAYOUT_OPTIONS;
      }
      this.graph = new G6.Graph(this.options);
    }

    /** 内置事件:AfterLayout 回调 */
    this.graph.on('afterlayout', () => {
      if (handleAfterLayout) {
        handleAfterLayout(this.graph);
      }
    });

    /** 装载数据 */
    this.graph.data(this.data as GraphData | TreeGraphData);

    /** Setting the text direction */
    this.setTextDirection();

    /** 渲染 */
    this.graph.render();

    /** 初始化布局：仅限网图且使用了 graphin-force */
    if (!this.isTree && this.useGraphinLayoutController) {
      this.layout = new LayoutController(this);
      this.layout.start();
    }

    // this.graph.get('canvas').set('localRefresh', true);

    /** FitView 变为组件可选 */

    /** 初始化状态 */
    this.initStatus();
    /** 生成API */
    this.apis = ApiController(this.graph);
    /** 设置Context */
    this.setState({
      isReady: true,
      context: {
        graph: this.graph,
        apis: this.apis,
        theme: this.theme,
        layout: this.layout,
        dragNodes: this.dragNodes,
        updateContext: this.updateContext,
      },
    });
  };

  setTextDirection() {
    const { dir = 'ltr' } = this.props;
    this.graph.get('canvas').get('el').setAttribute('dir', dir);
  }

  updateLayout = () => {
    if (this.useGraphinLayoutController) this.layout.changeLayout();
  };

  componentDidMount() {
    this.initGraphInstance();
  }

  /**
   * 组件更新的时候
   * @param prevProps
   */
  updateOptions = () => {
    const { ...options } = this.props;
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
    // console.time('did-update');
    const isDataChange = this.shouldUpdate(prevProps, 'data');
    const isLayoutChange = this.shouldUpdate(prevProps, 'layout');
    const isOptionsChange = this.shouldUpdate(prevProps, 'options');
    const isThemeChange = this.shouldUpdate(prevProps, 'theme');
    // console.timeEnd('did-update');
    const { data, layoutCache, rtl, layout: LAYOUT } = this.props;
    // @ts-ignore
    const layout = cloneDeep(LAYOUT);
    this.layoutCache = layoutCache;
    // const isGraphTypeChange = (prevProps.data as GraphinTreeData).children !== (data as GraphinTreeData).children;

    if (isThemeChange) {
      // TODO :Node/Edge/Combo 批量调用 updateItem 来改变
    }

    /** 图类型变化 */
    // if (isGraphTypeChange) {
    //   console.error(
    //     'The data types of pervProps.data and props.data are inconsistent,Graphin does not support the dynamic switching of TreeGraph and NetworkGraph',
    //   );
    //   return;
    // }

    /** 配置变化 */
    if (isOptionsChange) {
      // this.updateOptions();

      if (prevProps.rtl !== rtl) {
        this.setTextDirection();
        this.graph.render();
      }
    }

    let newDragNodes: IUserNode[];

    /** 数据变化 */
    if (isDataChange) {
      this.initData(data);

      if (this.isTree) {
        // this.graph.data(this.data as TreeGraphData);
        this.graph.changeData(this.data as TreeGraphData);
      } else {
        const {
          context: { dragNodes },
        } = this.state;
        // 若 dragNodes 中的节点已经不存在，则从数组中删去
        // @ts-ignore
        newDragNodes = dragNodes.filter(
          dNode =>
            (this.data as GraphinData)?.nodes && (this.data as GraphinData).nodes.find(node => node.id === dNode.id),
        );

        // 更新拖拽后的节点的mass到data
        // @ts-ignore
        this.data?.nodes?.forEach(node => {
          const dragNode = newDragNodes.find(item => item.id === node.id);
          if (dragNode) {
            node.mass = dragNode.layout?.force?.mass;
            node.layout = {
              ...node.layout,
              force: {
                mass: dragNode.layout?.force?.mass,
              },
            };
          }
        });
        if (this.useGraphinLayoutController) {
          this.graph.data(this.data as GraphData | TreeGraphData);
          this.graph.set('layoutController', null);
          this.graph.changeData(this.data as GraphData | TreeGraphData);

          // 由于 changeData 是将 this.data 融合到 item models 上面，因此 changeData 后 models 与 this.data 不是同一个引用了
          // 执行下面一行以保证 graph item model 中的数据与 this.data 是同一份
          // @ts-ignore
          this.data = this.layout.getDataFromGraph();
          this.layout.changeLayout();
        } else {
          if (layout) {
            layout.disableTriggerLayout = true;
          }
          const layoutCfg = processLayoutConfig(layout, this.graph); // 兼容布局参数
          this.graph.updateLayout(layoutCfg);
          this.graph.data(this.data as GraphData | TreeGraphData);
          this.graph.changeData(this.data as GraphData | TreeGraphData);
          this.data = this.graph.get('data');
        }
      }

      this.initStatus();
      this.apis = ApiController(this.graph);

      this.setState(
        preState => {
          return {
            ...preState,
            context: {
              graph: this.graph,
              apis: this.apis,
              theme: this.theme,
              layout: this.layout,
              dragNodes: newDragNodes || preState.context.dragNodes,
              updateContext: this.updateContext,
            },
          };
        },
        () => {
          this.graph.emit('graphin:datachange');
          if (isLayoutChange) {
            this.graph.emit('graphin:layoutchange', { prevLayout: prevProps.layout, layout });
          }
        },
      );
      return;
    }
    /** 布局变化 */
    if (isLayoutChange) {
      this.useGraphinLayoutController = layout?.type === 'graphin-force';
      if (this.isTree) {
        this.graph.updateLayout(layout);
        return;
      }
      if (this.useGraphinLayoutController) {
        // graphin-force 时使用 graphin 的 layoutController，否则使用 G6 全套逻辑
        /**
         * TODO
         * 1. preset 前置布局判断问题
         * 2. enablework 问题
         * 3. G6 LayoutController 里的逻辑
         */
        /** 数据需要从画布中来 */
        // @ts-ignore
        if (Object.keys(this.layout).length === 0) {
          this.layout = new LayoutController(this);
        }
        // @ts-ignore
        this.data = this.layout.getDataFromGraph();
        this.layout.changeLayout();
        // this.layout.refreshPosition();
      } else {
        const layoutController = this.graph.get('layoutController');
        if (!layoutController) {
          // @ts-ignore
          this.graph.initLayoutController();
        }
        const layoutCfg = processLayoutConfig(layout, this.graph); // 兼容布局参数
        if (layoutCfg) {
          layoutCfg.disableTriggerLayout = false;
        }

        this.graph.updateLayout(layoutCfg);
        this.data = this.graph.get('data');
      }

      this.graph.emit('graphin:layoutchange', { prevLayout: prevProps.layout, layout });
    }
  }

  /**
   * 组件移除的时候
   */
  componentWillUnmount() {
    const { willUnmount } = this.props;
    if (willUnmount) {
      willUnmount();
      if (this.layout && this.layout.destroy) {
        this.layout.destroy(); // tree graph
      }
      this.layout = {} as LayoutController;
      this.graph.destroyLayout();
    } else {
      this.clear();
    }
  }

  /**
   * 组件崩溃的时候
   * @param error
   * @param info
   */
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Catch component error: ', error, info);
  }

  updateContext = (config: PlainObject) => {
    this.setState(prevState => ({
      context: {
        ...prevState.context,
        ...config,
      },
    }));
  };

  clear = () => {
    if (this.layout && this.layout.destroy) {
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
    const { isReady } = this.state;
    const { modes, style, containerId, containerStyle } = this.props;

    return (
      <GraphinContext.Provider value={this.state.context}>
        <div
          id={containerId || 'graphin-container'}
          style={{
            height: '100%',
            width: '100%',
            position: 'relative',
            ...containerStyle,
          }}
        >
          <div
            data-testid="custom-element"
            className="graphin-core"
            ref={node => {
              this.graphDOM = node;
            }}
            style={{
              height: '100%',
              width: ' 100%',
              minHeight: '500px',
              background: this.theme?.background || '#fff',
              ...style,
            }}
          />
          <div className="graphin-components">
            {isReady && (
              <>
                {
                  /** modes 不存在的时候，才启动默认的behaviors，否则会覆盖用户自己传入的 */
                  !modes && (
                    <>
                      {/* 拖拽画布 */}
                      <DragCanvas />
                      {/* 缩放画布 */}
                      <ZoomCanvas />
                      {/* 拖拽节点 */}
                      <DragNode />
                      {/* 点击节点 */}
                      <DragCombo />
                      {/* 点击节点 */}
                      <ClickSelect />
                      {/* 圈选节点 */}
                      <BrushSelect />
                    </>
                  )
                }
                {/** resize 画布 */}
                <ResizeCanvas graphDOM={this.graphDOM as HTMLDivElement} />
                {/* <Hoverable bindType="edge" /> */}
                {this.props.children}
                {/* <Hoverable bindType="node" /> 2.3.3 版本移除 */}
              </>
            )}
          </div>
        </div>
      </GraphinContext.Provider>
    );
  }
}
export default Graphin;
