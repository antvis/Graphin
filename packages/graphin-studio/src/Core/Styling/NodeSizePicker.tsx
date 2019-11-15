import React from 'react';
import { Slider } from 'antd';
import { StylingProps } from './interface';

const NodeSizePicker: React.FC<StylingProps> = () => {
    return (
        <div>
            <Slider
                max={100}
                min={30}
                defaultValue={50}
                // tooltipVisible
                tipFormatter={value => {
                    return `${value} px`;
                }}
            />
        </div>
    );
};

export default NodeSizePicker;
