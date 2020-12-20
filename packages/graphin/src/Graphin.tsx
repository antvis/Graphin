//@ts-nocheck
import React, { ErrorInfo } from 'react';
// todo ,G6@unpack版本将规范类型的输出
import G6, { Graph as IGraph } from '@antv/g6';

import { cloneDeep } from 'lodash';

/** types  */
import { IconLoader } from './typings';
/** utils */
// import shallowEqual from './utils/shallowEqual';
import deepEqual from './utils/deepEqual';

import './index.less';
import { ICON_FONT_FAMILY_MAP } from './icons/iconFont';

import { TREE_LAYOUTS } from './consts';

/** 内置事件 */
import Events from './Events';
/** Context */
import GraphinContext from './GraphinContext';
/** 内置 Behaviros */
import Behaviors from './behaviors';

const { DragCanvas, ZoomCanvas } = Behaviors;

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

  static registerFontFamily(iconLoader: IconLoader) {
    /**  注册 font icon */
    const iconLoaders = iconLoader();
    iconLoaders.forEach(item => {
      ICON_FONT_FAMILY_MAP[item.fontFamily] = item.map;
    });
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

  constructor(props: IGraphin.Props) {
    super(props);
    this.data = props.data;
    this.isTree = Boolean(props.data && props.data.children);
    this.graph = {} as IGraph;
    this.layout = {
      type: '',
      instance: '',
      destroyed: false,
    };
    this.height = props.height || 500;
    this.width = props.width || 500;
    this.state = {
      isReady: false,
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
    const { data, layout, width, height } = this.props;
    /**  width and height */
    const { clientWidth, clinetHeight } = this.graphDOM;
    /** shallow clone */
    this.initData(data);

    this.width = width || clientWidth;
    this.height = height || clinetHeight;

    /** graph type */
    this.isTree = Boolean(data.children);

    this.options = {
      container: this.graphDOM,
      renderer: 'canvas',
      width: this.width,
      height: 500,
      animate: true,
      defaultNode: {
        type: 'circle',
        size: [30],
        labelCfg: {
          position: 'bottom',
        },
      },
      modes: {
        default: [
          // 画布拖拽
          // 拖拽节点
          'drag-node',
          // 点击选择
          {
            type: 'click-select',
            disable: false,
            options: {
              multiple: true, // 允许多选
              trigger: 'alt',
            },
          },
        ],
      },
      fitView: true,
      layout: {
        ...layout,
      },
    };

    if (this.isTree) {
      // this.options.layout = { ...layout };
      this.graph = new G6.TreeGraph(this.options);
    } else {
      this.graph = new G6.Graph(this.options);
    }

    this.graph.data(this.data);
    // this.updateLayout();
    this.graph.get('canvas').set('localRefresh', false);
    this.graph.render();
    this.initStatus();
  };

  updateLayout = () => {
    if (!this.graph || this.graph.destroyed || !this.data || !this.data.nodes || !this.data.nodes.length) {
      return false;
    }
    const { layout = { type: 'grid' } } = this.props;
    const { type = 'grid', ...layoutOptions } = layout;
    const params = {
      ...layoutOptions,
      width: this.width / 2,
      height: this.height / 2,
    };
    const instance = new G6.Layout[type](params);
    instance.init(this.data);
    instance.execute();
    /** 变量存储 */
    this.layout.type = type;
    this.layout.options = layoutOptions;
    this.layout.instance = instance;
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

    /** 配置变化 */
    if (isGraphTypeChange) {
      this.initGraphInstance();
      console.log('%c isGraphTypeChange', 'color:grey');
    }
    if (isOptionsChange) {
      this.updateOptions();
      console.log('isOptionsChange');
    }
    /** 数据变化 */
    if (isDataChange) {
      this.initData(data);
      this.updateLayout();
      this.graph!.changeData(this.data);
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
      // this.updateLayout();
      // if (this.options?.animate) {
      //   this.graph!.positionsAnimate();
      // } else {
      //   this.graph!.refreshPositions();
      // }

      /** 走G6的layoutController */
      this.graph.updateLayout(layout);
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
    console.log('%c graphin render...', 'color:lightblue', this.graph.cfg);
    const { isReady } = this.state;
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
                {/* 拖拽画布 */}
                <DragCanvas />
                {/* 缩放画布 */}
                <ZoomCanvas />
                {
                  // perf test
                  // Array.from({ length: 20 }).map((item, index) => {
                  //   return <ZoomCanvas key={index} />;
                  // })
                }
                <Events graphDOM={this.graphDOM} />
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
