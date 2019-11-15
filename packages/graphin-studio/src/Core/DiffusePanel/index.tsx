import React, { useState } from 'react';
import { Button } from 'antd';
import { FoldingPanel } from '@com';
import NodeType from './NodeType';
import EdgeType from './EdgeType';
import { CheckboxValueType, DiffusePanelProps, DiffusePanelState } from './interface';
import './index.less';

const DiffusePanel: React.FC<DiffusePanelProps> = props => {
    const { dispatch, state: propsData } = props;
    const { selectedNodes } = propsData;
    const [state, setState] = useState<DiffusePanelState>({
        selectedNodeTypes: [],
        selectedEdgeTypes: [],
    });
    const { selectedNodeTypes, selectedEdgeTypes } = state;
    const handleChangeNodeTypes = (value: CheckboxValueType[]) => {
        setState({
            ...state,
            selectedNodeTypes: value,
        });
    };
    const handleChangeEdgeTypes = (value: CheckboxValueType[]) => {
        setState({
            ...state,
            selectedEdgeTypes: value,
        });
    };
    const confirm = () => {
        dispatch({
            type: 'graph/diffuse',
            payload: {
                start: selectedNodes,
            },
        });
    };
    const data = [
        {
            title: '实体类型',
            children: <NodeType onChange={handleChangeNodeTypes} value={selectedNodeTypes} />,
        },
        {
            title: '关系类型',
            children: <EdgeType onChange={handleChangeEdgeTypes} value={selectedEdgeTypes} />,
        },
    ];
    return (
        <div>
            <FoldingPanel data={data} />
            <div
                style={{
                    width: propsData.drawer.width,
                }}
                className="diffuse_confirm_wrapper"
            >
                <Button className="diffuse_confirm_button" onClick={confirm}>
                    确定
                </Button>
            </div>
        </div>
    );
};

export default DiffusePanel;
