import React from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { ToolbarConfigProps } from './interface';

const ToolbarConfig: React.FC<ToolbarConfigProps> = props => {
    const { dispatch, state } = props;
    const { toolbar } = state;
    const handleChange = (e: RadioChangeEvent) => {
        const { value } = e.target;
        dispatch({
            type: 'graph/changeToolbar',
            payload: {
                direction: value,
            },
        });
    };
    return (
        <div>
            <Radio.Group name="radiogroup" onChange={handleChange} value={toolbar.direction}>
                <Radio value="vertical">纵向布局</Radio>
                <Radio value="horizontal">横向布局</Radio>
            </Radio.Group>
        </div>
    );
};

export default ToolbarConfig;
