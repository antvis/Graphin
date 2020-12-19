// @ts-nocheck
import React, { ErrorInfo } from 'react';
import G6, { Graph as GraphType } from '@antv/g6';

import { cloneDeep } from 'lodash';

/** types  */
import { GraphinProps, Data, Layout } from './types';
import { IconLoader } from './typings';
/** utils */
// import shallowEqual from './utils/shallowEqual';
import deepEqual from './utils/deepEqual';

import './index.less';
import { ICON_FONT_FAMILY_MAP } from './icons/iconFont';

import { TREE_LAYOUTS } from './consts';
import Events from './Events';

/** Context */

export const GraphinContext: React.Context<{ graph: GraphType }> = React.createContext();

type DiffValue = Data | Layout | undefined;

class Graphin extends React.PureComponent<GraphinProps> {
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

  /** Graph的DOM */
  graphDOM: HTMLDivElement | null = null;

  /** G6 instance */
  graph?: GraphType;

  /** layout */
  layout: {
    type: string;
    instance: null;
    destroyed: true;
  };

  /** 是否为 Tree Graph */
  isTree: boolean;

  /** G6实例中的 nodes,edges,combos 的 model，会比props.data中多一些引用赋值产生的属性，比如node中的 x,y */
  data;

  constructor(props: GraphinProps) {
    super(props);
    this.data = props.data;
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
          'drag-canvas',
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
          // 缩放画布
          {
            type: 'zoom-canvas',
            disable: true,
            options: {},
          },
        ],
      },
      fitView: true,

      layout: {
        ...layout,
      },
    };

    if (this.isTree) {
      this.graph = new G6.TreeGraph(this.options);
    } else {
      this.graph = new G6.Graph(this.options);
    }

    this.graph.data(this.data);
    this.updateLayout();
    this.graph.get('canvas').set('localRefresh', false);
    this.graph.render();
    this.initStatus();
  };

  updateLayout = () => {
    if (!this.graph || this.graph.destroyed || !this.data || !this.data.nodes || !this.data.nodes.length) {
      return false;
    }
    const { layout } = this.props;
    const { type, ...layoutOptions } = layout;
    const instance = new G6.Layout[type](layoutOptions);
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

  componentDidUpdate(prevProps: GraphinProps) {
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
      this.updateLayout();
      if (this.options?.animate) {
        this.graph!.positionsAnimate();
      } else {
        this.graph!.refreshPositions();
      }
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

  shouldUpdate(prevProps: GraphinProps, key: string) {
    /* eslint-disable react/destructuring-assignment */
    const prevVal = prevProps[key] as DiffValue;
    const currentVal = this.props[key] as DiffValue;
    const isEqual = deepEqual(prevVal, currentVal);
    return !isEqual;
  }

  render() {
    console.log('%c graphin render...', 'color:lightblue');
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
            {this.state.isReady && (
              <React.Fragment>
                <Events graphDOM={this.graphDOM} />
                {this.props.children}
              </React.Fragment>
            )}
          </div>
        </div>
      </GraphinContext.Provider>
    );
  }
}
export default Graphin;
