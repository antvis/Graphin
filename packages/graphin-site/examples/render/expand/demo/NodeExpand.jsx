import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Button } from 'antd';
import 'antd/dist/antd.css';

import '@antv/graphin/dist/index.css';

const App = () => {
    const [state, setState] = React.useState({
        selected: [],
        data: Utils.mock(5).graphin(),
    });

    const { data, selected } = state;
    const graphRef = React.createRef(null);
    React.useEffect(() => {
        const { graph } = graphRef.current;
        const onNodeClick = e => {
            setState({
                ...state,
                selected: [e.item.get('model')],
            });
        };
        graph.on('node:click', onNodeClick);
        return () => {
            graph.off('node:click', onNodeClick);
        };
    }, [state]);

    const onExpand = () => {
        const count = 5;
        const expandData = Utils.mock(count)
            .expand(selected)
            .graphin();
        setState({
            ...state,
            data: {
                nodes: [...state.data.nodes, ...expandData.nodes],
                edges: [...state.data.edges, ...expandData.edges],
            },
        });
    };
    return (
        <div className="App">
            <Button onClick={onExpand} type="primary">
                Node Expand
            </Button>
            <Graphin data={data} layout={{ name: 'concentric' }} ref={graphRef} />
        </div>
    );
};
// eslint-disable-next-line no-undef
const rootElement = document.getElementById('container');

ReactDOM.render(<App />, rootElement);
