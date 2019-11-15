import { notification, Modal } from 'antd';
import copy2Clipboard from 'copy-to-clipboard';
import { GrapheneState, Dispatch } from '../types';

interface ContextMenu extends GrapheneState {
    dispatch: Dispatch;
}
const renderContextMenu = (option: ContextMenu) =>  {
    const { selectedNodes, dispatch } = option;

    const openNotification = (type: string, message: string, description: string) => {
        notification[type]({
            message,
            description,
        });
    };

    const copyId = () => {
        if (selectedNodes.length === 0) {
            openNotification('info', '复制ID', '复制ID需要至少选中一个节点');
            return;
        }
        const nodeIds = selectedNodes.map(node => node.id).join(',');
        if (copy2Clipboard(nodeIds)) {
            openNotification('success', '复制ID', '复制ID成功');
        } else {
            openNotification('success', '复制ID', '复制ID失败');
        }
    };

    const deleteNodes = () => {
        if (selectedNodes.length === 0) {
            openNotification('info', '删除实体', '删除实体需要至少选中一个节点');
            return;
        }
        const nodeName = selectedNodes[0].id;
        const content =
            selectedNodes.length === 1
                ? `确定删除${nodeName}实体？`
                : `确定删除${nodeName}等${selectedNodes.length}个实体？`;
        Modal.confirm({
            title: '确认',
            content,
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                dispatch({
                    type: 'graph/deleteNodes',
                    payload: {
                        selectedNodes,
                    },
                });
            },
        });
    };

    const menu = [
        {
            key: 'copyId',
            title: '复制ID',
            iconType: 'iconfuzhiID',
            visible: true,
            onClick: copyId,
        },
        // {
        //     key: 'dividing-line',
        //     text: null,
        //     onClick: () => {},
        // },
        {
            key: 'deleteNode',
            title: '删除实体',
            iconType: 'iconfuzhiID',
            visible: true,
            onClick: deleteNodes,
        },
        {
            key: 'invertSelect',
            title: '反选实体',
            iconType: 'iconfuzhiID',
            visible: false,
            onClick: () => {},
        },
    ];
    return menu;
};

export default renderContextMenu;
