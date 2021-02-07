import hexToRgba, { hexToRgbaToHex } from './hexToRgba';
import mock from './mock';
import debug from './debug';
import shallowEqual from './shallowEqual';
import getNodeStyleByTheme from '../theme/node-style';
import getEdgeStyleByTheme from '../theme/edge-style';
import getComboStyleByTheme from '../theme/combo-style';
import processEdges from './processEdges';

import { deepMix } from '@antv/util';
import uuid from './uuid';
import walk from './walk';

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
  walk,
  processEdges,
};
