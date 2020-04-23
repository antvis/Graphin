import React, { useState } from 'react';

import { Icon as LegacyIcon } from '@ant-design/compatible';

import { Select } from 'antd';
import './index.less';

const SelectOption = Select.Option;

interface LayoutSelectorState {
    type: string;
}
interface LayoutSelectorProps {
    dispatch?: (props: any) => any; // eslint-disable-line
}
const layouts = [
    {
        type: 'random',
        icon: 'trademark',
        name: '随机布局',
        options: {},
    },
    {
        type: 'concentric',
        name: '圆形布局',
        icon: 'chrome',
        options: {},
    },
    {
        type: 'force',
        name: '力导布局',
        icon: 'branches',
        options: {},
    },
    {
        type: 'tree',
        name: '层次布局',
        icon: 'apartment',
        disabled: true,
        options: {},
    },
];
const LayoutSelector: React.FC<LayoutSelectorProps> = props => {
    const { dispatch } = props;

    const [state, setState] = useState<LayoutSelectorState>({
        type: 'concentric',
    });
    const { type = 'concentric' } = state;

    const handleChange = (value: string) => {
        setState({
            ...state,
            type: value,
        });
        const layout = layouts.find(item => {
            return item.type === value;
        }) || { type: 'concentric', options: {} };

        dispatch({
            type: 'graph/changeLayout',
            payload: {
                name: layout.type,
                options: layout.options,
            },
        });
    };
    return (
        <div className="layout-selector">
            <Select style={{ width: '120px' }} value={type} onChange={handleChange}>
                {layouts.map(item => {
                    const { type: layoutType, name, icon, disabled } = item;
                    return (
                        <SelectOption key={layoutType} value={layoutType} disabled={disabled}>
                            <LegacyIcon type={icon} /> &nbsp;{name}
                        </SelectOption>
                    );
                })}
            </Select>
        </div>
    );
};

export default LayoutSelector;
