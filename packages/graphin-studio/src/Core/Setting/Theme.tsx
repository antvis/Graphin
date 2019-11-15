import React from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { ThemeProps } from './interface';

const Theme: React.FC<ThemeProps> = props => {
    const { dispatch, state } = props;
    const { theme } = state;
    const handleChange = (e: RadioChangeEvent) => {
        const { value } = e.target;
        dispatch({
            type: 'graph/theme',
            payload: value,
        });
    };
    return (
        <div>
            <Radio.Group name="radiogroup" onChange={handleChange} value={theme}>
                <Radio value="light">白天主题</Radio>
                <Radio value="dark" disabled>
                    黑夜主题
                </Radio>
            </Radio.Group>
        </div>
    );
};

export default Theme;
