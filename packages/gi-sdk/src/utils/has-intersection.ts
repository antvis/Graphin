/**
 * @description 判断两数组是否有交集
 */
export const hasIntersection = (a: string[], b: string[]) => a.some(x => b.includes(x));
