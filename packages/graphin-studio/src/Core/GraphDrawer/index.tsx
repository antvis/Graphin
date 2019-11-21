import React from 'react';
import { Drawer } from 'antd';
import Setting from '../Setting';
import AddNodes from '../AddNodes';
import NodeAttr from '../NodeAttr';
import EdgeAttr from '../EdgeAttr';
import DiffusePanel from '../DiffusePanel';
import './index.less';
import { GraphDrawerProps } from './interface';

const getComponent = (component: string, props: GraphDrawerProps) => {
    switch (component) {
        case 'setting':
            return <Setting {...props} />;
        case 'addNodes':
            return <AddNodes {...props} />;
        case 'nodeAttr':
            return <NodeAttr {...props} />;
        case 'edgeAttr':
            return <EdgeAttr {...props} />;
        case 'diffuse':
            return <DiffusePanel {...props} />;
        default:
            return null;
    }
};
const handleClose = (props: GraphDrawerProps) => {
    const { dispatch } = props;
    dispatch({ type: 'graph/drawer', payload: { visible: false, type: '', width: null } });
};
const GraphDrawer: React.FC<GraphDrawerProps> = props => {
    const {
        state: { drawer },
    } = props;
    const { type, visible, width, title, closeMask = false } = drawer;
    const component = getComponent(type, props);

    return (
        <div>
            <Drawer
                width={width}
                title={title}
                placement="right"
                closable
                mask={!closeMask}
                onClose={() => {
                    handleClose(props);
                }}
                visible={visible}
            >
                {component}
            </Drawer>
        </div>
    );
};

export default GraphDrawer;
