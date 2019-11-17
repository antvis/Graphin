import React from 'react';
import { RenderProps } from '@antv/graphin-components';
import LayoutSelector from '../Core/LayoutSelector';
import { GrapheneState, Dispatch, Layout } from '../types';

const renderToolbar = (renderProps: RenderProps, state: GrapheneState, dispatch: Dispatch) => {
    const { toolbarCfg } = renderProps;
    const { layout } = state;
    const { layouts } = renderProps.apis.getInfo();

    const RadioLayouts = layouts.map(items => {
        return {
            ...items,
            options: {},
        };
    });

    const items = [
        {
            id: 'layout',
            name: `布局方案`,
            icon: 'layout',
            disabled: false,
            action: () => {},
            style: {},
            renderTooltip: () => {
                return (
                    <LayoutSelector
                        layouts={RadioLayouts}
                        value={layout}
                        onChange={(params: Layout) => {
                            dispatch({
                                type: 'graph/changeLayout',
                                payload: {
                                    name: params.name,
                                    options: params.options,
                                },
                            });
                        }}
                    />
                );
            },
        },
    ];

    return [...items, ...toolbarCfg];
};

export default renderToolbar;
