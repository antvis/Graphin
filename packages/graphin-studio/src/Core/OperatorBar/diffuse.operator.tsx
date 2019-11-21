import { notification } from 'antd';
import { OperatorBarProps } from './index';

const diffuseOperator = (props: OperatorBarProps) => {
    const { dispatch, state } = props;
    const { selectedNodes } = state;
    if (selectedNodes.length === 0) {
        notification.info({
            message: '关系扩散',
            description: '关系扩散需要至少选中一个节点',
        });
    } else {
        dispatch({
            type: 'graph/drawer',
            payload: {
                title: '关系扩散',
                type: 'diffuse',
                visible: true,
                width: 550,
            },
        });
    }
};
export default diffuseOperator;
