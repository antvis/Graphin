import { GrapheneState } from '../types';
import Storage from '../Service/Storage';

const storage = new Storage('graphin-studio');

if (!storage.get('config')) {
    storage.set('config', {
        toolbar: {
            direction: 'vertical',
        },
        theme: 'light',
    });
}

const initialState: GrapheneState = {
    data: {
        nodes: [],
        edges: [],
    },
    layout: {
        name: 'force',
        options: {
            preset: {
                name: 'concentric',
            },
        },
    },

    selectedNodes: [],
    drawer: {
        visible: false,
        type: '',
    },
    modal: {
        visible: false,
    },
    searchBar: {
        visible: false,
    },
    toolbar: {
        direction: storage.get('config').toolbar.direction,
    },
    theme: storage.get('config').theme,

    graphRef: {
        current: null,
    },
};

export default initialState;
