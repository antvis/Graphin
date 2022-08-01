import { Graph, Item } from '@antv/g6';
import { GraphinData as Data, IUserNode as NodeType } from '../../typings/type';
import Utils from '../utils/graph';
import { Edge, Node } from './Elements';
import { forceNBody } from './ForceNBody';
import Point from './Point';
import Spring from './Spring';
import Vector from './Vector';

type ForceNodeType = Node;

type ForceEdgeType = Edge;

interface CentripetalOptions {
  /** 叶子节点的施加力的因子 */
  leaf?: number | ((node: NodeType, nodes: NodeType[], edges: Edge[]) => number);
  /** 孤立节点的施加力的因子 */
  single?: number | ((node: NodeType) => number);
  /** 其他节点的施加力的因子 */
  others?: number | ((node: NodeType) => number);
  /** 向心力的中心点，默认为画布的中心 */
  center?: (
    node: NodeType,
    nodes: NodeType[],
    edges: Edge[],
    width: number,
    height: number,
  ) => {
    x: number;
    y: number;
    centerStrength?: number;
  };
}
// const getBaseLog = (x: number, y: number) => {
//   return Math.log(y) / Math.log(x);
// };
// interface ForceData {
//   nodes: Node[];
//   edges: Edge[];
// }

interface Map<K, V> {
  clear(): void;
  delete(key: K): boolean;
  // eslint-disable-next-line
  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
  get(key: K): V;
  has(key: K): boolean;
  set(key: K, value: V): this;
  readonly size: number;
}

export interface ForceProps {
  /** 向心力 */
  centripetalOptions: CentripetalOptions;
  /** 是否需要叶子节点聚类 */
  leafCluster: boolean;
  /** 是否需要全部节点聚类 */
  clustering: boolean;
  /** 节点聚类的映射字段 */
  nodeClusterBy: string;
  /** 节点聚类作用力系数 */
  clusterNodeStrength: number | ((node: NodeType) => number);
  /** spring stiffness 弹簧劲度系数 */
  stiffness: number;
  /** 默认的弹簧长度 */
  defSpringLen: (edge: Edge, source: Point, target: Point) => number;
  /** 计算画布上下两侧对节点吸引力大小  */
  defSideCoe?: (node: Node) => number;
  /** repulsion 斥力，这里指代 库伦常量Ke */
  repulsion: number;
  /** https://www.khanacademy.org/science/ap-physics-1/ap-electric-charge-electric-force-and-voltage/coulombs-law-and-electric-force-ap/a/coulombs-law-and-electric-force-ap-physics-1 */
  /** volocity damping factor 速度的减震因子，其实就是阻尼系数 */
  damping: number;
  /** 最小能量阈值，当粒子运动，有阻尼系数的存在，最终会将初始的能量消耗殆尽,默认0.1, */
  minEnergyThreshold: number;
  /**  最大的速度 ？[0,1000]的加速度 */
  maxSpeed: number;
  /** default Coulombs Constant 默认0.005 */
  coulombDisScale: number;
  /** default time, used in velocity, acceleration and position's updating */
  tickInterval: number;
  groupFactor: number;
  maxIterations: number;
  /** 最小位移阈值，小于阈值则会停止迭代，默认0.5 */
  minDistanceThreshold: number;
  /** 阈值的使用条件，mean 代表平均移动距离小于 minDistanceThreshold 时停止迭代，max 代表最大移动距离大时 minDistanceThreshold 时停时迭代。默认为 mean */
  distanceThresholdMode: 'mean' | 'max' | 'min';
  /** 初始化时候是否需要动画 */
  animation: boolean;
  /** 是否启动webworker */
  enableWorker: boolean;

  /** 重启后是否需要动画 */
  restartAnimation: boolean;
  /** 力导区域的宽度 */
  width: number;
  /** 力导区域的高度 */
  height: number;
  /**  力导结束后的回调函数 */
  done?: (nodes: NodeType[]) => void;
  /** 忽略节点，不参加力导计算 */
  ignore?: (node: NodeType) => boolean;
}

interface IndexableProp extends ForceProps {
  [key: string]: ForceProps[keyof ForceProps];
}

class ForceLayout {
  props: IndexableProp; // eslint-disable-line

  sourceData: Data;

  nodes: ForceNodeType[];

  edges: ForceEdgeType[];

  nodeSet: {
    [key: string]: Node;
  };

  edgeSet: {
    [key: string]: Edge;
  };

  renderNodes: NodeType[];

  nodePoints: Map<string, Point>;

  edgeSprings: Map<string, Spring>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registers: Map<string, (params: any) => any>;

  done: boolean;

  iterations: number;

  nextEdgeId: number;

  timer: number;

  /** 向心力的中心点 */
  center: Vector;

  /** 与 minDistanceThreshold 进行对比的判断停止迭代节点移动距离 */
  judgingDistance: number;

  centripetalOptions: CentripetalOptions;

  /** 被拖动过的节点 */
  dragNodes: ForceNodeType[];

  constructor(options: Partial<ForceProps>) {
    this.props = {
      stiffness: 200.0,
      enableWorker: false,
      defSpringLen: edge => {
        return edge.data.spring || 200;
      },
      repulsion: 200.0 * 5,
      centripetalOptions: {
        leaf: 2,
        single: 2,
      },
      leafCluster: false,
      clustering: false,
      nodeClusterBy: 'cluster',
      clusterNodeStrength: 20,
      damping: 0.9,
      minEnergyThreshold: 0.1,
      maxSpeed: 1000,
      coulombDisScale: 0.005,
      tickInterval: 0.02,
      groupFactor: 4,
      /** 浏览器16ms刷新一次，1min = 1 * 60s = 1 * 60 * 1000ms = 1 * 60 * (1000ms / 16ms)次 = 3750次 */
      maxIterations: 7440, // 3750,
      minDistanceThreshold: 0.4,
      distanceThresholdMode: 'mean',
      animation: true,
      restartAnimation: true,
      width: 200,
      height: 200,
    };
    this.updateOptions(options);
    /** 存放器：节点与边 */
    this.sourceData = {
      nodes: [],
      edges: [],
      combos: [],
    };
    this.nodes = [];
    this.edges = [];
    this.nodeSet = {};
    this.edgeSet = {};
    this.renderNodes = [];
    this.nodePoints = new Map();
    this.edgeSprings = new Map();
    this.registers = new Map();
    this.done = false;
    this.judgingDistance = 0;

    /** 计数器 */
    this.iterations = 0;
    this.nextEdgeId = 0; // 边属性计数自增
    this.timer = 0;
    this.center = new Vector(0, 0);
    /** 默认的向心配置 */
    this.centripetalOptions = {
      leaf: 2,
      single: 2,
      others: 1,
      // eslint-disable-next-line
      center: (_node: any) => {
        return {
          x: this.props.width / 2,
          y: this.props.height / 2,
        };
      },
    };
    this.dragNodes = [];
  }

  /**
   * Iterate options to update this.props
   * @param {*} options
   */
  updateOptions = (options: Partial<IndexableProp>) => {
    if (!options) {
      return;
    }
    Object.keys(options).forEach(key => {
      this.props[key] = options[key];
    });
  };

  setData = (data: Data) => {
    // clean all data
    this.nodes = [];
    this.edges = [];
    this.nodeSet = {};
    this.edgeSet = {};
    this.nodePoints = new Map();
    this.edgeSprings = new Map();
    this.sourceData = data;
    this.judgingDistance = 0;

    // add nodes and edges
    if ('nodes' in data || 'edges' in data) {
      this.addNodes(data.nodes);
      // eslint-disable-next-line
      this.addEdges(data.edges as any);
    }
  };

  getMass = (node: NodeType) => {
    const {
      degree = Utils.getDegree(node, this.edges)?.degree, // 节点度数
      force,
    } = node.layout || {};
    /** 当你在layout.force.mass中制定了才使用 */
    if (force && force.mass) {
      // eslint-disable-next-line prefer-destructuring
      return force.mass;
    }
    /** 默认质量都是通过节点的度数自动计算的 */
    return degree < 5 ? 1 : degree * 5;
  };

  init = () => {
    /** 初始化点和边的信息 */
    const { width, height } = this.props;

    let { centripetalOptions } = this.props;
    const { leafCluster, clustering, nodeClusterBy, clusterNodeStrength: propsClusterNodeStrength } = this.props;
    const getClusterNodeStrength = (node: NodeType) =>
      typeof propsClusterNodeStrength === 'function' ? propsClusterNodeStrength(node) : propsClusterNodeStrength;

    // eslint-disable-next-line
    let sameTypeLeafMap: any;

    this.nodes.forEach(node => {
      const x = node.data.x || width / 2;
      const y = node.data.y || height / 2;
      const position = new Vector(x, y);

      if (!node.data.layout) {
        node.data.layout = {};
      }
      const degreeInfo = Utils.getDegree(node, this.edges);
      node.data.layout = {
        ...node.data.layout,
        ...degreeInfo,
      };
      const mass = this.getMass(node.data);
      this.nodePoints.set(node.id, new Point(position, String(node.id), node.data, mass));
    });
    this.edges.forEach(edge => {
      const source = this.nodePoints.get(edge.source.id) as Point;
      const target = this.nodePoints.get(edge.target.id) as Point;
      const length = this.props.defSpringLen(edge, source, target);
      this.edgeSprings.set(edge.id, new Spring(source, target, length));
    });

    // 如果传入了需要叶子节点聚类
    if (leafCluster) {
      sameTypeLeafMap = this.getSameTypeLeafMap();
      const relativeNodesType = Utils.getRelativeNodesType(this.nodes, nodeClusterBy);
      centripetalOptions = {
        single: 100,
        leaf: (node, nodes, edges) => {
          // 找出与它关联的边的起点或终点出发的所有一度节点中同类型的叶子节点
          const { relativeLeafNodes, sameTypeLeafNodes } = sameTypeLeafMap[node.id] || {};
          // 如果都是同一类型或者每种类型只有1个，则施加默认向心力
          if (sameTypeLeafNodes?.length === relativeLeafNodes?.length || relativeNodesType?.length === 1) {
            return 1;
          }
          return getClusterNodeStrength(node);
        },
        others: 1,
        center: (node, nodes, edges) => {
          const { degree } = node.data?.layout || {};
          // 孤点默认给1个远离的中心点
          if (!degree) {
            return {
              x: 100,
              y: 100,
            };
          }
          let centerNode;
          if (degree === 1) {
            // 如果为叶子节点
            // 找出与它关联的边的起点出发的所有一度节点中同类型的叶子节点
            const { sameTypeLeafNodes = [] } = sameTypeLeafMap[node.id] || {};
            if (sameTypeLeafNodes.length === 1) {
              // 如果同类型的叶子节点只有1个，中心节点置为undefined
              centerNode = undefined;
            } else if (sameTypeLeafNodes.length > 1) {
              // 找出同类型节点平均位置节点的距离最近的节点作为中心节点
              centerNode = Utils.getAvgNodePosition(sameTypeLeafNodes);
            }
          } else {
            centerNode = undefined;
          }
          return {
            x: centerNode?.x as number,
            y: centerNode?.y as number,
          };
        },
      };
    }

    // 如果传入了全局节点聚类
    if (clustering) {
      if (!sameTypeLeafMap) sameTypeLeafMap = this.getSameTypeLeafMap();
      const clusters: string[] = Array.from(new Set(this.nodes.map(node => node.data?.[nodeClusterBy]))).filter(
        item => item !== undefined,
      );
      const centerNodeInfo: { [key: string]: { x: number; y: number } } = {};
      clusters.forEach(cluster => {
        const sameTypeNodes = this.nodes.filter(item => item.data?.[nodeClusterBy] === cluster);
        // 找出同类型节点平均位置节点的距离最近的节点作为中心节点
        centerNodeInfo[cluster] = Utils.getAvgNodePosition(sameTypeNodes);
      });

      centripetalOptions = {
        single: node => getClusterNodeStrength(node),
        leaf: node => getClusterNodeStrength(node),
        others: node => getClusterNodeStrength(node),
        center: (node, nodes, edges) => {
          // 找出同类型节点平均位置节点的距离最近的节点作为中心节点
          const centerNode = centerNodeInfo[node.data?.[nodeClusterBy]];
          return {
            x: centerNode?.x as number,
            y: centerNode?.y as number,
          };
        },
      };
    }

    this.centripetalOptions = {
      ...this.centripetalOptions,
      ...centripetalOptions,
    };

    /** 其他参数设置 */
    const { size } = this.nodePoints;
    const vv = Math.pow(10, 2);
    this.props.minEnergyThreshold = (1 / 2) * Math.pow(1, 2) * 1 * size * vv;
  };

  start = () => {
    /** 初始化节点 */
    this.init();
    if (this.props.animation) this.animation();
    else this.slienceForce();
  };

  calTotalEnergy = () => {
    let energy = 0.0;

    this.nodes.forEach(node => {
      const point = this.nodePoints.get(node.id) as Point;
      const speed = point.v.magnitude();

      const { m } = point; // 1;
      energy += m * Math.pow(speed, 2) * 0.5; // p = 1/2*(mv^2)
    });

    return energy;
  };

  slienceForce = () => {
    const { done, maxIterations, minDistanceThreshold } = this.props;
    for (let i = 0; (this.judgingDistance > minDistanceThreshold || i < 1) && i < maxIterations; i++) {
      this.tick(this.props.tickInterval);
      this.iterations++;
    }
    this.render();
    if (done) {
      done(this.renderNodes);
    }
  };

  /** polyfill: support webworker requestAnimationFrame */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestAnimationFrame = (fn: any): any => {
    const { enableWorker } = this.props;
    if (enableWorker) {
      return setInterval(() => {
        fn();
      }, 16);
    }
    return window.requestAnimationFrame(fn);
  };

  cancelAnimationFrame = (handleId: number) => {
    const { enableWorker } = this.props;
    if (enableWorker) {
      clearInterval(handleId);
    } else {
      window.cancelAnimationFrame(handleId);
    }
  };

  animation = () => {
    const { enableWorker, maxIterations, minDistanceThreshold, done, tickInterval } = this.props;
    if (enableWorker) {
      let startTimer = new Date().valueOf();
      const firstTickInterval = 0.22;
      const interval = (step: number) => {
        // 目标：迭代10次，稳定在2s，函数选择需要后续考虑
        return step > 10 ? 2000 : 20 * step * step;
      };
      for (let i = 0; i < maxIterations; i++) {
        const tickInterval = Math.max(0.02, firstTickInterval - i * 0.002);
        this.tick(tickInterval);
        const diff = new Date().valueOf() - startTimer;
        if (diff >= interval(i)) {
          this.render();
          startTimer = new Date().valueOf();
        }
        const energy = this.calTotalEnergy();
        /** 如果需要监控信息，则提供给用户 */
        const monitor = this.registers.get('monitor');
        if (monitor) {
          monitor(this.reportMointor(energy));
        }

        if (this.judgingDistance < minDistanceThreshold) {
          this.render();
          if (done) {
            done(this.renderNodes);
          }
          return;
        }
      }
      return;
    }
    const step = () => {
      this.tick(tickInterval);

      this.render();

      this.iterations++;
      const energy = this.calTotalEnergy();

      /** 如果需要监控信息，则提供给用户 */
      const monitor = this.registers.get('monitor');
      if (monitor) {
        monitor(this.reportMointor(energy));
      }

      if (this.judgingDistance < minDistanceThreshold || this.iterations > this.props.maxIterations) {
        this.cancelAnimationFrame(this.timer);
        this.iterations = 0;
        this.done = true;
        if (done) {
          done(this.renderNodes);
        }
      } else {
        this.timer = this.requestAnimationFrame(step);
      }
    };
    this.timer = this.requestAnimationFrame(step);
  };

  render = () => {
    const render = this.registers.get('render');
    this.renderNodes = [];
    this.nodePoints.forEach(node => {
      this.renderNodes.push({
        ...(this.nodeSet[node.id] && this.nodeSet[node.id].data),
        x: node.p.x,
        y: node.p.y,
      });
    });

    if (render) {
      render({
        nodes: this.renderNodes,
        edges: this.sourceData.edges,
      });
    } else {
      // eslint-disable-next-line no-console
      console.error('need a render function');
    }
  };

  reportMointor = (energy: number) => {
    const params = {
      energy,
      iterations: this.iterations,
      nodes: this.nodes,
      edges: this.edges,
      // memory: window.performance && window.performance.memory && window.performance.memory.usedJSHeapSize,
    };

    return params;
  };

  tick = (interval: number) => {
    // this.updateCoulombsLaw();
    this.updateCoulombsLawOptimized();
    this.updateHookesLaw();
    this.attractToCentre();
    this.attractToSide();
    this.updateVelocity(interval);
    this.updatePosition(interval);
  };

  /** 布局算法 */
  updateCoulombsLawOptimized = () => {
    // 用force-n-body结合 Barnes-Hut approximation 优化的方法
    const { coulombDisScale } = this.props;
    const { repulsion } = this.props;
    const nodes = this.nodes.map(n => {
      const point = this.nodePoints.get(n.id).p;
      return {
        x: point.x,
        y: point.y,
      };
    });
    const forces = forceNBody(nodes, coulombDisScale, repulsion);
    this.nodes.forEach((node, i) => {
      this.nodePoints.get(node.id).updateAcc(new Vector(forces[i].vx, forces[i].vy));
    });
  };

  updateCoulombsLaw = () => {
    const len = this.nodes.length;

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        // eslint-disable-next-line no-continue
        if (i === j) continue;
        const iNode = this.nodes[i];
        const jNode = this.nodes[j];

        const { coulombDisScale } = this.props;
        const { repulsion } = this.props;
        const v = (this.nodePoints.get(iNode.id) as Point).p.subtract(this.nodePoints.get(jNode.id).p);
        const dis = (v.magnitude() + 0.1) * coulombDisScale;
        const direction = v.normalise(); // 向量的方向：基向量
        const factor = 1;

        this.nodePoints.get(iNode.id).updateAcc(
          // 得到库伦力
          direction.scalarMultip(repulsion * factor).divide(Math.pow(dis, 2)),
        );
        this.nodePoints.get(jNode.id).updateAcc(direction.scalarMultip(repulsion * factor).divide(-Math.pow(dis, 2)));
      }
    }
  };

  updateHookesLaw = () => {
    this.edges.forEach(edge => {
      const spring = this.edgeSprings.get(edge.id);
      const v = spring.target.p.subtract(spring.source.p);
      const displacement = spring.length - v.magnitude();
      const direction = v.normalise();
      spring.source.updateAcc(direction.scalarMultip(-this.props.stiffness * displacement));
      spring.target.updateAcc(direction.scalarMultip(this.props.stiffness * displacement));
    });
  };

  implementForce = (node: Node, other: Vector, radio = 2) => {
    const point = this.nodePoints.get(node.id);
    const direction = point.p.subtract(other);

    point.updateAcc(direction.scalarMultip(-radio));
  };

  attractToCentre = () => {
    this.nodes.forEach(node => {
      const { degree, sDegree, tDegree } = node.data?.layout as { [key: string]: number };

      const { leaf: finalLeaf, single: finalSingle, others: finalOthers, center } = this.centripetalOptions;

      const { width, height } = this.props;

      if (center === undefined) {
        return;
      }

      const { x, y, centerStrength } = center(node, this.nodes, this.edges, width, height);

      if (x === undefined || y === undefined) {
        return;
      }

      const centerVector = new Vector(x, y);

      if (centerStrength) {
        this.implementForce(node, centerVector, centerStrength);
        return;
      }

      const leaf = typeof finalLeaf === 'function' ? finalLeaf(node, this.nodes, this.edges) : finalLeaf;
      const single = typeof finalSingle === 'function' ? finalSingle(node) : finalSingle;
      const others = typeof finalOthers === 'function' ? finalOthers(node) : finalOthers;
      // 没有出度或没有入度，都认为是叶子节点
      const leafNode = tDegree === 0 || sDegree === 0;
      const singleNode = degree === 0;
      /** 如果radio为0，则认为忽略向心力 */
      if (leaf === 0 || single === 0 || others === 0) {
        return;
      }

      if (singleNode) {
        this.implementForce(node, centerVector, single);
        return;
      }

      if (leafNode) {
        this.implementForce(node, centerVector, leaf);
        return;
      }
      /** others */
      this.implementForce(node, centerVector, others);
    });
  };

  attractToSide = () => {
    if (!this.props.defSideCoe || typeof this.props.defSideCoe !== 'function') return;
    const { height } = this.props;
    this.nodes.forEach(node => {
      const sideCoe = this.props.defSideCoe!(node);
      if (sideCoe === 0) return;
      const point = this.nodePoints.get(node.id);
      const { x } = point.p;
      const y = sideCoe > 0 ? 0 : height;
      const sideVector = new Vector(x, y);
      this.implementForce(node, sideVector, Math.abs(sideCoe));
    });
  };

  updateVelocity = (interval: number) => {
    this.nodes.forEach(node => {
      const point = this.nodePoints.get(node.id);
      point.v = point.v
        .add(point.a.scalarMultip(interval)) // 根据加速度求速度公式 V_curr= a*@t + V_pre
        .scalarMultip(this.props.damping);

      if (point.v.magnitude() > this.props.maxSpeed) {
        point.v = point.v.normalise().scalarMultip(this.props.maxSpeed);
      }
      point.a = new Vector(0, 0);
    });
  };

  updatePosition = (interval: number) => {
    if (!this.nodes?.length) {
      this.judgingDistance = 0;
      return;
    }
    const { distanceThresholdMode } = this.props;
    let sum = 0;
    if (distanceThresholdMode === 'max') this.judgingDistance = -Infinity;
    else if (distanceThresholdMode === 'min') this.judgingDistance = Infinity;
    this.nodes.forEach(node => {
      const point = this.nodePoints.get(node.id);
      point.p = point.p.add(point.v.scalarMultip(interval)); // 路程公式 s = v * t
      const distance = point.v.scalarMultip(interval);
      const distanceMagnitude = distance.magnitude();
      switch (distanceThresholdMode) {
        case 'max':
          if (this.judgingDistance < distanceMagnitude) this.judgingDistance = distanceMagnitude;
          break;
        case 'min':
          if (this.judgingDistance > distanceMagnitude) this.judgingDistance = distanceMagnitude;
          break;
        default:
          sum = sum + distanceMagnitude;
          break;
      }
    });
    if (!distanceThresholdMode || distanceThresholdMode === 'mean') this.judgingDistance = sum / this.nodes.length;
  };

  /**
   * add one Node
   * @param {[type]} node [description]
   */
  addNode = (node: ForceNodeType) => {
    const { ignore } = this.props;
    if (ignore && ignore(node)) {
      return;
    }
    if (!(node.id in this.nodeSet)) {
      this.nodes.push(node);
    }
    this.nodeSet[node.id] = node;
  };

  /**
   * add Nodes
   * @param {[type]} data [description]
   */
  addNodes = (data: NodeType[]) => {
    data.forEach(node => {
      this.addNode(new Node(node));
    });
  };

  /**
   * add one Edge
   * @param {[type]} edge [description]
   */
  addEdge = (edge: Edge) => {
    if (!(edge.id in this.edgeSet)) {
      this.edges.push(edge);
    }

    this.edgeSet[edge.id] = edge;
    return edge;
  };

  /**
   * add Edges
   * @param {[type]} data [description]
   */
  addEdges = (data: Edge[]) => {
    try {
      const len = data.length;
      for (let i = 0; i < len; i++) {
        const e = data[i];

        const sourceId = e.source;
        const targetId = e.target;

        // eslint-disable-next-line
        const node1 = this.nodeSet[sourceId as any];
        if (node1 === undefined) {
          throw new TypeError(`invalid node name: ${e.source}`);
        }

        // eslint-disable-next-line
        const node2 = this.nodeSet[targetId as any];
        if (node2 === undefined) {
          throw new TypeError(`invalid node name: ${e.target}`);
        }
        const attr = e.data;

        const edge = new Edge(String(this.nextEdgeId++), node1, node2, attr);
        this.addEdge(edge);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register = (type: string, options: any) => {
    this.registers.set(type, options); // 将用户的自定义函数注册进来
  };

  restart = (dragNodes: ForceNodeType[], graph: Graph) => {
    /** 将位置更新到nodePoint中 */
    const { ignore } = this.props;
    graph.getNodes().forEach((nodeItem: Item) => {
      const node = nodeItem.get('model');

      if (ignore && ignore(node)) {
        return;
      }
      const vec = new Vector(node.x, node.y);
      const point = this.nodePoints.get(node.id);
      if (point) {
        point.p = vec;
        this.nodePoints.set(node.id, point);
      }
    });

    const changeNodePosition = (node: ForceNodeType) => {
      const vec = new Vector(node.x, node.y);
      const mass = this.getMass(node);
      this.nodePoints.set(node.id, new Point(vec, node.id, node.data, mass));
      this.edges.forEach(edge => {
        const source = this.nodePoints.get(edge.source.id);
        const target = this.nodePoints.get(edge.target.id);
        if (source.id === node.id || target.id === node.id) {
          const length = this.edgeSprings.get(edge.id).length || 100;
          this.edgeSprings.set(edge.id, new Spring(source, target, length));
        }
      });
    };

    // TODO:支持多点拖拽
    dragNodes.forEach(changeNodePosition);

    if (this.props.restartAnimation) this.animation();
    else this.slienceForce();
  };

  stop = () => {
    window.cancelAnimationFrame(this.timer);
    this.done = true;
  };

  getSameTypeLeafMap = () => {
    const { nodeClusterBy } = this.props;
    // eslint-disable-next-line
    const sameTypeLeafMap: { [nodeId: string]: any } = {};
    this.nodes.forEach(node => {
      const { degree } = node.data?.layout || {};
      if (degree === 1) {
        sameTypeLeafMap[node.id] = Utils.getCoreNodeAndRelativeLeafNodes('leaf', node, this.edges, nodeClusterBy);
      }
    });
    return sameTypeLeafMap;
  };
}

export default ForceLayout;
