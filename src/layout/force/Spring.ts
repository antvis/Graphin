import Point from './Point';

class Spring {
  /** 源节点ID */
  source: Point;

  /** 目标节点ID */
  target: Point;

  /** 弹簧的长度 */
  length: number;

  constructor(source: Point, target: Point, length: number) {
    this.source = source;
    this.target = target;
    this.length = length;
  }
}
export default Spring;
