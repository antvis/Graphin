import hexToRgba, { hexToRgbaToHex } from './hexToRgba';
import mock from './mock';
import debug from './debug';
import shallowEqual from './shallowEqual';
import { genDefaultComboStyle, genDefaultEdgeStyle, genDefaultNodeStyle } from '../consts';
import { deepMix } from '@antv/util';

export default {
  hexToRgba,
  debug,
  mock,
  shallowEqual,
  hexToRgbaToHex,
  genDefaultComboStyle,
  genDefaultEdgeStyle,
  genDefaultNodeStyle,
  deepMerge: deepMix,
};
