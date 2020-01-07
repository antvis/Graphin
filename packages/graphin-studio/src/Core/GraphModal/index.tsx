import React from 'react';
import { Modal } from 'antd';
import { Graph } from '@antv/graphin';
import { GrapheneState, Dispatch } from 'src/types';
import Clear from '../Clear';
import Save from '../Save';

interface GraphModalProps {
    dispatch: Dispatch;
    state: GrapheneState;
    graph?: Graph;
}
const handleClose = (props: GraphModalProps) => {
    const { dispatch } = props;
    dispatch({ type: 'graph/modal', payload: { visible: false, type: '' } });
};

const getComponent = (component: string, props: GraphModalProps) => {
    switch (component) {
        case 'save':
            return <Save {...props} />;
        case 'clear':
            return <Clear {...props} />;

        default:
            return null;
    }
};

const GraphModal: React.FC<GraphModalProps> = props => {
    const {
        state: { modal },
    } = props;
    const { title = '', visible, type = '', handleOk = () => {} } = modal;
    const component = getComponent(type, props);
    return (
        <div>
            <Modal
                title={title}
                visible={visible}
                onOk={() => {
                    handleOk();
                    handleClose(props);
                }}
                onCancel={() => {
                    handleClose(props);
                }}
            >
                {component}
            </Modal>
        </div>
    );
};

export default GraphModal;
