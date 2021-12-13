import { deepMix } from '@antv/util';
import { layouts } from '../layout/utils/options';
import getComboStyleByTheme from '../theme/combo-style';
import getEdgeStyleByTheme from '../theme/edge-style';
import getNodeStyleByTheme from '../theme/node-style';
import { uniqBy } from './array';
import cloneDeep from './cloneDeep';
import debug from './debug';
import hexToRgba, { hexToRgbaToHex } from './hexToRgba';
import mock from './mock';
import processEdges from './processEdges';
import shallowEqual from './shallowEqual';
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
  deepMix,
  cloneDeep,
  uuid,
  walk,
  processEdges,

  layouts,
  uniqBy,
};
