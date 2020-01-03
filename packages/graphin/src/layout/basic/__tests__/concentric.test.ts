import ConcentricLayout from '../concentric';
import json from './__mock__/concentric.input.json';
import { Data } from '../../../types';

const concentricOptions = {
  /** 同心圆的布局范围，默认为当前画布的宽高范围 */
  boundingBox: {
    x1: 0,
    y1: 0,
    w: 1000,
    h: 1000,
  },
  /** 节点间的距离，默认为60 */
  minNodeSpacing: 60,
  /** 每层的节点度数范围 */
  levelWidth: (nodes: object, maxDegree: number) => {
    /** 同心圆层数 */
    const levelNum = 8;
    return maxDegree / levelNum;
  },
  counterclockwise: true,
};

const concentricOptions2 = {
  /** 同心圆的布局范围，默认为当前画布的宽高范围 */
  boundingBox: {
    x1: 0,
    y1: 0,
    x2: 1000,
    y2: 1000,
    w: 1000,
    h: 1000,
  },
  /** 节点间的距离，默认为60 */
  minNodeSpacing: 60,
  equidistant: true,
  clockwise: false,
  avoidOverlap: false,
  /** 每层的节点度数范围 */
  levelWidth: (nodes: object, maxDegree: number) => {
    /** 同心圆层数 */
    const levelNum = 8;
    return maxDegree / levelNum;
  },
  sweep: 0.1,
};

const data: Data = json as any; // eslint-disable-line

describe('Concentric Layout', () => {
  it('Should return result that matches snapshot', () => {
    expect(
      new ConcentricLayout({
        ...concentricOptions,
        data,
      }).run(),
    ).toMatchSnapshot();
  });

  it('Should return result that matches snapshot with x2, y2', () => {
    expect(
      new ConcentricLayout({
        ...concentricOptions2,
        data,
      }).run(),
    ).toMatchSnapshot();
  });
});
