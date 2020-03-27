import { updateChain } from 'immutability-helper-x';
import Storage from '../../Service/Storage';
import { GrapheneState } from '../../types';

const changeToolbarReducer = (state: GrapheneState, direction: string) => {
    const storage = new Storage('graphin-studio');
    storage.set('config', {
        ...storage.get('config'),
        toolbar: {
            direction,
        },
    });

    return updateChain(state).$set('toolbar.direction', direction).value();
};

export default changeToolbarReducer;
