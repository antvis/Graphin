/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 根据key取对象的值
 * @param obj 对象
 * @param keyString 对象字段,支持多层,例如data.property.key
 * @returns
 */
export const getEnumValue = (obj: any, keyString: string) => {
  const keyArray = keyString.split('.');
  const enumValue = keyArray.reduce((acc, curr, currIndex, array) => {
    const currValue = acc[curr];
    if (!currValue && currIndex !== array.length - 1) {
      return {};
    }
    return currValue;
  }, obj) as string;

  return enumValue;
};

/**
 * 根据字段分类，得到分类后的枚举值Map
 * @param data nodes or edges
 * @param sortKey 分类的字段，例如 nodeType 或者 data.type
 * @returns
 */
export const getEnumDataMap = (data: any[], sortKey: string) => {
  const enumDataMap: Map<string | number, any[]> = new Map();

  data.forEach(item => {
    /** 得到枚举值 */
    const enumValue = getEnumValue(item, sortKey);
    /** 按照枚举值重新将节点存放 */
    const current = enumDataMap.get(enumValue);
    if (current) {
      enumDataMap.set(enumValue, [...current, item]);
    } else {
      enumDataMap.set(enumValue, [item]);
    }
  });

  return enumDataMap;
};
