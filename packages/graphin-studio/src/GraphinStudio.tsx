import React, { useRef, useReducer } from 'react';

import { GrapheneState } from 'src/types';
import { Layout, Header, Footer, Main, Side } from './Components/Layout';

/** components */
import OperatorBar from './Core/OperatorBar';
import NodeEdgeCount from './Core/NodeEdgeCount';
import SearchBar from './Core/SearchBar';

import GraphDrawer from './Core/GraphDrawer';
import GraphModal from './Core/GraphModal';
// import LayoutSelector from './Core/LayoutSelector';

import initialState from './Redux/store';
import reducer from './Redux/reducer';

import Graph from './Graph';

const OnlyGraphinReady = props => {
    const { children, graphRef } = props;

    if (graphRef && graphRef.current && graphRef.current.graph) {
        const { graph, apis } = graphRef.current;
        const graphProps = {
            graph,
            apis,
        };

        return (
            <div>
                {React.Children.map(children, child => {
                    // 如果传入的是 DOM 元素或不是合法的 Element，不传入 props
                    if (!React.isValidElement(child) || typeof child.type === 'string') {
                        return child;
                    }
                    return React.cloneElement(child, {
                        ...graphProps,
                    });
                })}
            </div>
        );
    }
    return null;
};

const Graphene = () => {
    // const graphRef = useRef(null) as any; // eslint-disable-line
    const [state, dispatch] = useReducer(reducer, initialState);
    const { data, layout, toolbar, graphRef } = state as GrapheneState;

    return (
        <Layout>
            <Header>This is Header</Header>
            <Side>
                <OnlyGraphinReady graphRef={graphRef}>
                    <OperatorBar dispatch={dispatch} state={state} graphRef={graphRef} />
                    {/* <SearchBar dispatch={dispatch} state={state} /> */}
                </OnlyGraphinReady>
            </Side>
            <Main>
                <Graph data={data} layout={layout} toolbar={toolbar} dispatch={dispatch} store={state} />
                <OnlyGraphinReady graphRef={graphRef}>
                    <GraphDrawer dispatch={dispatch} state={state} />
                    <GraphModal dispatch={dispatch} state={state} />
                </OnlyGraphinReady>
            </Main>
            <Footer>This is Footer</Footer>
        </Layout>
    );
};

export default Graphene;
