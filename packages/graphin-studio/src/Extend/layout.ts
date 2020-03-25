import Graphin, { Data, GraphinProps } from '@antv/graphin';

const layout = (graphin: Graphin, props: GraphinProps) => {
    return [
        {
            name: 'pomelo',
            desc: '自定义随机布局',
            icon: 'home',
            layout: (): { data: Data } => {
                const nodes = props.data.nodes.map((node) => {
                    return {
                        ...node,
                        x: Math.round(Math.random() * 800),
                        y: Math.round(Math.random() * 500),
                    };
                });
                return {
                    data: {
                        nodes,
                        edges: props.data.edges,
                    },
                };
            },
        },
    ];
};

export default layout;
