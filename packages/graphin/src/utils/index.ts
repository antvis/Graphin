import hexToRgba, { hexToRgbaToHex } from './hexToRgba';
import mock from './mock';
import debug from './debug';
import shallowEqual from './shallowEqual';
import getNodeStyleByTheme from '../theme/node-style';
import getEdgeStyleByTheme from '../theme/edge-style';
import getComboStyleByTheme from '../theme/combo-style';

import { deepMix } from '@antv/util';
import uuid from './uuid';

export default {
  hexToRgba,
  debug,
  mock,
  shallowEqual,
  hexToRgbaToHex,
  getNodeStyleByTheme,
  getEdgeStyleByTheme,
  getComboStyleByTheme,
  deepMerge: deepMix,
  uuid,
};
