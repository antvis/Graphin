import React from 'react';
import FoldingPanel from '../../Components/FoldingPanel/FoldingPanel';
import Theme from './Theme';
import NodeColorPicker from '../Styling/NodeColorPicker';
// import NodeSizePicker from '../Styling/NodeSizePicker';
import ToolbarConfig from './ToolbarConfig';
import { SettingProps } from './interface';

const Setting: React.FC<SettingProps> = props => {
    const data = [
        {
            title: '切换主题',
            children: <Theme {...props} />,
        },
        {
            title: 'Toolbar',
            children: <ToolbarConfig {...props} />,
        },
        {
            title: '节点样式',
            children: <NodeColorPicker {...props} />,
        },
        // {
        //     title: '节点大小',
        //     children: <NodeSizePicker {...props} />,
        // },
    ];
    return (
        <div>
            <FoldingPanel data={data} />
        </div>
    );
};

export default Setting;
