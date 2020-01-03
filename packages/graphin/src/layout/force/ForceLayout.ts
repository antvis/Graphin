import { Graph, NodeConfig } from '@antv/g6';
import Vector from './Vector';
import Point from './Point';
import { Node, Edge } from './Elements';
import Spring from './Spring';
import { getDegree } from '../utils/graph';
import { Data, Node as NodeType } from '../../types';

type ForceNodeType = Node;

type ForceEdgeType = Edge;

const getBaseLog = (x: number, y: number) => {
  return Math.log(y) / Math.log(x);
};
interface ForceData {
  nodes: Node[];
  edges: Edge[];
}

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

interface Prop {
  /** 向心力 */
  centripetalOptions: {
    /** 叶子节点的施加力的因子 */
    leaf?: number;
    /** 孤立节点的施加力的因子 */
    single?: number;
    /** 其他节点的施加力的因子 */
    others?: number;
    /** 向心力的中心点，默认为画布的中心 */
    center?: (
      node: NodeType,
    ) => {
      x: number;
      y: number;
    };
  };
  /** spring stiffness 弹簧劲度系数 */
  stiffness: number;
  /** 默认的弹簧长度 */
  defSpringLen: number;
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
  /** 240, // 1000000次/(1000/60) = 60000s = 1min */
  MaxIterations: number;
  /** 初始化时候是否需要动画 */
  animation: boolean;
  /** 重启后是否需要动画 */
  restartAnimation: boolean;
  /** 力导区域的宽度 */
  width: number;
  /** 力导区域的高度 */
  height: number;
  /**  力导结束后的回调函数 */
  done?: () => void;
  /** 忽略节点，不参加力导计算 */
  ignore?: (node: NodeType) => void;
}

interface IndexableProp extends Prop {
  [key: string]: Prop[keyof Prop];
}

const SPEED = 5; // 根据节点的大小可以自动设置速度的大小
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

  constructor(options: Partial<Prop>) {
    this.props = {
      stiffness: 200.0,
      defSpringLen: 200,
      repulsion: 200.0 * SPEED,
      centripetalOptions: {
        leaf: 2,
        single: 2,
      },
      damping: 0.9,
      minEnergyThreshold: 0.1,
      maxSpeed: 1000,
      coulombDisScale: 0.005,
      tickInterval: 0.02,
      groupFactor: 4,
      MaxIterations: 10000,
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
    };
    this.nodes = [];
    this.edges = [];
    this.nodeSet = {};
    this.edgeSet = {};
    this.nodePoints = new Map();
    this.edgeSprings = new Map();
    this.registers = new Map();
    this.done = false;

    /** 计数器 */
    this.iterations = 0;
    this.nextEdgeId = 0; // 边属性计数自增
    this.timer = 0;
    this.center = new Vector(0, 0);
  }

  /**
   * Iterate options to update this.props
   * @param {*} options
   */
  updateOptions(options: Partial<IndexableProp>) {
    if (!options) {
      return;
    }
    Object.keys(options).forEach(key => {
      this.props[key] = options[key];
    });
  }

  setData(data: Data) {
    // clean all data
    this.nodes = [];
    this.edges = [];
    this.nodeSet = {};
    this.edgeSet = {};
    this.nodePoints = new Map();
    this.edgeSprings = new Map();
    this.sourceData = data;

    // add nodes and edges
    if ('nodes' in data || 'edges' in data) {
      this.addNodes(data.nodes);
      // eslint-disable-next-line
      this.addEdges(data.edges as any);
    }
  }

  getMass = (node: NodeType) => {
    const {
      degree = getDegree(node, this.edges), // 节点度数
      force,
    } = node.layout || {};

    /** 当你在layout.force.mass中制定了才使用 */
    if (force && force.mass) {
      // eslint-disable-next-line prefer-destructuring
      return force.mass;
    }
    /** 默认质量都是通过节点的度数自动计算的 */
    return degree < 5 ? 1 : degree * 10;
  };

  init() {
    /** 初始化点和边的信息 */
    const { width, height } = this.props;

    this.nodes.forEach(node => {
      const x = node.data.x || width / 2;
      const y = node.data.y || height / 2;
      const vec = new Vector(x, y);

      if (!node.data.layout) {
        node.data.layout = {};
      }
      const degree = getDegree(node, this.edges);
      node.data.layout.degree = degree;

      const mass = this.getMass(node.data);

      this.nodePoints.set(node.id, new Point(vec, String(node.id), node.data, mass));
    });

    this.edges.forEach(edge => {
      const source = this.nodePoints.get(edge.source.id) as Point;
      const target = this.nodePoints.get(edge.target.id) as Point;

      let length = source.p.subtract(target.p).magnitude(); // 相邻两点的向量

      if (this.props.defSpringLen) {
        length = this.props.defSpringLen;
      }

      if (edge.data.spring) {
        length = edge.data.spring;
      }

      this.edgeSprings.set(edge.id, new Spring(source, target, length));
    });

    /** 其他参数设置 */
    const { size } = this.nodePoints;
    const vv = Math.pow(10, 2);
    this.props.minEnergyThreshold = (1 / 2) * Math.pow(1, 2) * 1 * size * vv;
  }

  start() {
    /** 初始化节点 */
    this.init();
    if (this.props.animation) this.animation();
    else this.slienceForce();
  }

  calTotalEnergy() {
    let energy = 0.0;

    this.nodes.forEach(node => {
      const point = this.nodePoints.get(node.id) as Point;
      const speed = point.v.magnitude();

      const m = 1; // point.m;
      energy += m * Math.pow(speed, 2) * 0.5; // p = 1/2*(mv^2)
    });

    return energy;
  }

  slienceForce() {
    for (let i = 0; i < this.props.MaxIterations; i++) {
      this.tick(this.props.tickInterval);
      const energy = this.calTotalEnergy();

      /** 如果需要监控信息，则提供给用户 */
      const monitor = this.registers.get('monitor');
      if (monitor) {
        monitor(this.reportMointor(energy));
      }

      if (
        energy <= this.props.minEnergyThreshold ||
        i === this.props.MaxIterations - 1 // 1000000次/(1000/60) = 60000s = 1min
      ) {
        this.render();
        if (this.props.done) {
          this.props.done();
        }
        break;
      }
    }
  }

  animation() {
    const step = () => {
      const { done, tickInterval, minEnergyThreshold, MaxIterations } = this.props;

      this.tick(tickInterval);

      this.render();

      this.iterations++;
      const energy = this.calTotalEnergy();

      /** 如果需要监控信息，则提供给用户 */
      const monitor = this.registers.get('monitor');
      if (monitor) {
        monitor(this.reportMointor(energy));
      }

      if (
        energy <= minEnergyThreshold ||
        this.iterations === MaxIterations // 1000000次/(1000/60) = 60000s = 1min
      ) {
        window.cancelAnimationFrame(this.timer);
        this.iterations = 0;
        this.done = true;
        if (done) {
          done();
        }
      } else {
        this.timer = window.requestAnimationFrame(step);
      }
    };
    this.timer = window.requestAnimationFrame(step);
  }

  render() {
    const render = this.registers.get('render');
    const nodes: NodeType[] = [];
    this.nodePoints.forEach(node => {
      nodes.push({
        ...(this.nodeSet[node.id] && this.nodeSet[node.id].data),
        x: node.p.x,
        y: node.p.y,
      });
    });

    if (render) {
      render({
        nodes,
        edges: this.sourceData.edges,
      });
    } else {
      // eslint-disable-next-line no-console
      console.error('need a render function');
    }
  }

  reportMointor(energy: number) {
    const params = {
      energy,
      iterations: this.iterations,
      nodes: this.nodes,
      edges: this.edges,
      // memory: window.performance && window.performance.memory && window.performance.memory.usedJSHeapSize,
    };

    return params;
  }

  tick(interval: number) {
    this.updateCoulombsLaw();
    this.updateHookesLaw();
    this.attractToCentre();
    this.updateVelocity(interval);
    this.updatePosition(interval);
  }

  /** 布局算法 */
  updateCoulombsLaw() {
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
  }

  updateHookesLaw() {
    this.edges.forEach(edge => {
      const spring = this.edgeSprings.get(edge.id);
      const v = spring.target.p.subtract(spring.source.p);
      const displacement = spring.length - v.magnitude();
      const direction = v.normalise();

      spring.source.updateAcc(direction.scalarMultip(-this.props.stiffness * displacement));
      spring.target.updateAcc(direction.scalarMultip(this.props.stiffness * displacement));
    });
  }

  attractToCentre() {
    const implementForce = (node: Node, center: Vector, radio = 2) => {
      const point = this.nodePoints.get(node.id);
      const direction = point.p.subtract(center);

      point.updateAcc(direction.scalarMultip(-radio));
    };
    this.nodes.forEach(node => {
      // 默认的向心力指向画布中心
      const degree = (node.data && node.data.layout && node.data.layout.degree) as number;
      const leafNode = degree === 1;
      const singleNode = degree === 0;
      /** 默认的向心力配置 */
      const defaultRadio = {
        left: 2,
        single: 2,
        others: 1, //  1 / getBaseLog(2, degree),
        center: () => {
          return {
            x: this.props.width / 2,
            y: this.props.height / 2,
          };
        },
      };

      const { leaf, single, others, center } = { ...defaultRadio, ...this.props.centripetalOptions };
      const { x, y } = center(node);
      const centerVector = new Vector(x, y);

      /** 如果radio为0，则认为忽略向心力 */
      if (leaf === 0 || single === 0 || others === 0) {
        return;
      }

      if (singleNode) {
        implementForce(node, centerVector, single);
        return;
      }

      if (leafNode) {
        implementForce(node, centerVector, leaf);
        return;
      }
      /** others */
      implementForce(node, centerVector, others);
    });
  }

  updateVelocity(interval: number) {
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
  }

  updatePosition(interval: number) {
    this.nodes.forEach(node => {
      const point = this.nodePoints.get(node.id);
      point.p = point.p.add(point.v.scalarMultip(interval)); // 路程公式 s = v * t
    });
  }

  /**
   * add one Node
   * @param {[type]} node [description]
   */
  addNode(node: ForceNodeType) {
    const { ignore } = this.props;
    if (ignore && ignore(node)) {
      return;
    }
    if (!(node.id in this.nodeSet)) {
      this.nodes.push(node);
    }
    this.nodeSet[node.id] = node;
  }

  /**
   * add Nodes
   * @param {[type]} data [description]
   */
  addNodes(data: NodeType[]) {
    data.forEach(node => {
      this.addNode(new Node(node));
    });
  }

  /**
   * add one Edge
   * @param {[type]} edge [description]
   */
  addEdge(edge: Edge) {
    if (!(edge.id in this.edgeSet)) {
      this.edges.push(edge);
    }

    this.edgeSet[edge.id] = edge;
    return edge;
  }

  /**
   * add Edges
   * @param {[type]} data [description]
   */
  addEdges(data: Edge[]) {
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
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(type: string, options: any) {
    this.registers.set(type, options); // 将用户的自定义函数注册进来
  }

  restart = (dragNode: ForceNodeType[], graph: Graph) => {
    /** 将位置更新到nodePoint中 */
    const { ignore } = this.props;
    graph.getNodes().forEach((nodeItem: NodeConfig) => {
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
      // const mass = (node.layout && node.layout.force && node.layout.force.mass) || 100000;
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
    dragNode.forEach(changeNodePosition);

    if (this.props.restartAnimation) this.animation();
    else this.slienceForce();
  };

  stop() {
    window.cancelAnimationFrame(this.timer);
    this.done = true;
  }
}

export default ForceLayout;
