import { Dispatch } from '../types';

interface HandleNodeClickProps {
    dispatch: Dispatch;
    e?: any; // eslint-disable-line
}

const handleNodeClick = (props: HandleNodeClickProps) => {
    const { dispatch, e } = props;
    // 单选
    const node = e.item.get('model').data; // TODO 多选
    // 多选

    dispatch({
        type: 'graph/node-click',
        payload: {
            drawer: {
                visible: true,
                type: 'nodeAttr',
                title: '实体属性面板',
                width: 350,
                closeMask: true,
            },
            selectedNodes: [node],
        },
    });
};
export default handleNodeClick;
