import React from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

const radioStyle: React.CSSProperties = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

export interface LayoutValue {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
    desc: string;
    icon: string;
    disabled?: boolean;
}
interface Value {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
}

interface LayoutSelectorProps {
    value: Value;
    onChange: (value: Value) => void;
    layouts: LayoutValue[];
}

const LayoutSelector = (props: LayoutSelectorProps) => {
    const { value, onChange, layouts } = props;

    const handleChange = ({ target }: RadioChangeEvent) => {
        const layout = layouts.find(item => {
            return item.name === target.value;
        });
        if (onChange) {
            onChange({
                name: layout.name,
                options: layout.options,
            });
        }
    };
    return (
        <div className="layout-selector">
            <Radio.Group value={value.name} onChange={handleChange}>
                {layouts.map(item => {
                    const { name, icon, disabled, desc } = item;
                    return (
                        <Radio key={name} value={name} disabled={disabled} style={radioStyle}>
                            <LegacyIcon type={icon} /> &nbsp;{desc}
                        </Radio>
                    );
                })}
            </Radio.Group>
        </div>
    );
};

export default LayoutSelector;
