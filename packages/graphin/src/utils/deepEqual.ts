/* eslint-disable @typescript-eslint/no-explicit-any */
const deepEqual = (x: any, y: any): boolean => {
  /** 1. NaN */
  if (window.isNaN(x) && window.isNaN(y) && typeof x === 'number' && typeof y === 'number') {
    return true;
  }
  /** 2. primitives and function reference */
  if (x === y) {
    return true;
  }
  /** 3.Function,Date,RegExp,String,Number */
  if (
    (typeof x === 'function' && typeof y === 'function') ||
    (x instanceof Date && y instanceof Date) ||
    (x instanceof RegExp && y instanceof RegExp) ||
    (x instanceof String && y instanceof String) ||
    (x instanceof Number && y instanceof Number)
  ) {
    return x.toString() === y.toString();
  }
  /** 4.plain object */
  if (!(x instanceof Object && y instanceof Object)) {
    return false;
  }
  const isEqualArray: boolean[] = [];
  const xKey = Object.keys(x);
  const yKey = Object.keys(y);
  if (xKey.length !== yKey.length) {
    return false;
  }
  for (let i = 0; i < xKey.length; i++) {
    const key = xKey[i];
    const isEqual = deepEqual(x[key], y[key]);
    isEqualArray.push(isEqual);
  }
  return isEqualArray.every(c => c);
};

export default deepEqual;
