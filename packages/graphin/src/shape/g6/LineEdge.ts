import setEdgeState from './setState.edge';

export default (G6: any) => {
    G6.registerEdge(
        'LineEdge',
        {
            // 设置状态
            setState(name: any, value: any, item: any) {
                setEdgeState(name, value, item);
            },
        },
        'line',
    );
};
