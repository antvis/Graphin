import { layouts } from '../layout/utils/options';
import getComboStyleByTheme from '../theme/combo-style';
import getEdgeStyleByTheme from '../theme/edge-style';
import getNodeStyleByTheme from '../theme/node-style';
import calcByteLength from './calcByteLength';
import debug from './debug';
import hexToRgba, { hexToRgbaToHex } from './hexToRgba';
import mock from './mock';
import processEdges from './processEdges';
import { getEnumDataMap, getEnumValue } from './processGraphData';
import shallowEqual from './shallowEqual';
import uuid from './uuid';
import walk from './walk';

/**
 * @deprecated
 */
const deprecated = (fn: string) => {
  return () => {
    console.error(`⚠️ @antv/graphin Utils 不再提供 ${fn} 方法，请从 lodash 中引入！`);
    console.error(`⚠️ @antv/graphin Utils no longer provides ${fn} methods, please use lodash instead!`);
  };
};

export default {
  hexToRgba,
  debug,
  mock,
  shallowEqual,
  hexToRgbaToHex,
  getNodeStyleByTheme,
  getEdgeStyleByTheme,
  getComboStyleByTheme,
  deepMix: deprecated('deepMix'),
  cloneDeep: deprecated('cloneDeep'),
  uuid,
  walk,
  processEdges,
  calcByteLength,
  layouts,
  uniqBy: deprecated('uniqBy'),
  getEnumDataMap,
  getEnumValue,
};
