/**
 * 向量运算 Youtube教程：https://www.youtube.com/watch?v=Kti2mNKDOTw&list=PLA9470D64579500CE&index=6
 *
 * 向量有3个容易混淆概念
 * scalar Multip 系数积
 * dot Product 内积/点积
 * cross product 外积/有向积
 */

class Vector {
  /** x点坐标 */
  x: number;

  /** y点坐标 */
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getvec() {
    return this;
  }

  add(v2: Vector) {
    return new Vector(this.x + v2.x, this.y + v2.y);
  }

  subtract(v2: Vector) {
    return new Vector(this.x - v2.x, this.y - v2.y);
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalise() {
    return this.divide(this.magnitude());
  }

  divide(n: number) {
    return new Vector(this.x / n || 0, this.y / n || 0);
  }

  scalarMultip(n: number) {
    return new Vector(this.x * n, this.y * n);
  }
}

export default Vector;
