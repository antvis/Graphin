import RadialLayout, { RadialLayoutOption } from '../radial';
import json from '../../basic/__tests__/__mock__/concentric.input.json';

const defaultOptions = {
    /** 中心点坐标 */
    center: [200 / 2, 200 / 2],
    /** 防止覆盖 */
    preventOverlap: true,
    /** 节点大小 */
    nodeSize: 100,
    /** 每层的半径 */
    unitRadius: 150,
};

describe('Radial Layout', () => {
    it('Should return result that matches snapshot', () => {
        expect(RadialLayout(json, defaultOptions as RadialLayoutOption)).toMatchSnapshot();
    });
});
