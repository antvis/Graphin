import { GraphEvent } from '@antv/graphin';

import { GrapheneState, Dispatch } from '../types';

interface HandleCanvasClickProps extends GrapheneState {
    dispatch: Dispatch;
    e: GraphEvent;
}

const handleCanvasClick = (props: HandleCanvasClickProps) => {
    const { drawer, modal, selectedNodes, searchBar, dispatch } = props;

    if (drawer.visible || modal.visible || selectedNodes.length !== 0 || searchBar.visible) {
        dispatch({
            type: 'graph/canvas-click',
            payload: {
                drawer: {
                    visible: false,
                    type: '',
                    width: null,
                },
                modal: {
                    visible: false,
                    type: '',
                },
                searchBar: {
                    visible: false,
                },
                selectedNodes: [],
            },
        });
    }
};
export default handleCanvasClick;
