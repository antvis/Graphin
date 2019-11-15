import getInfo from '../getInfo';

const MockGraph: any = {
    nodes: [{ id: 1 }, { id: '2' }],
    edges: [{ source: { id: '1' }, target: { id: '2' } }],
    get: (k: any) => {
        return MockGraph[k];
    },
};


describe('Get info  API', () => {
    it('Should return right count result', () => {
        expect(getInfo(MockGraph)()).toEqual({
            count: {
                nodes: 2,
                edges: 1,
            },
        });
    });
});
