import CircleLayout, { CircleLayoutOption } from '../circle';
import json from './__mock__/concentric.input.json';

const defaultOptions = {
    /** 圆心 x坐标 */
    x: 200 / 2,
    /** 圆心 y坐标 */
    y: 200 / 2,
    /** 半径，默认半径为节点数*10 */
    r: json.nodes.length * 10,
};

const node = {
    id: 'node-0',
    shape: 'CircleNode',
    x: 100,
    y: 100,
    data: {
        id: 'node-0',
        type: 'company',
        properties: [],
    },
};

describe('Cricle Layout', () => {
    it('Should return result that matches snapshot', () => {
        expect(CircleLayout(json, defaultOptions as CircleLayoutOption)).toMatchSnapshot();
    });

    it('Should return correct result for empty input', () => {
        expect(CircleLayout({ nodes: [node] } as any, { x: 100, y: 100 } as CircleLayoutOption)).toMatchSnapshot();
    });
});
