import React from 'react';
import { Divider, Tooltip, Button } from 'antd';
import './index.less';

interface Item {
    /** id */
    id?: string;
    /** 名称 */
    name?: string;
    /** 名称 */
    tooltip?: string;
    /** 图标名称：参考Antd的图标 */
    icon?: string;
    /** 是否禁用按钮 */
    disabled?: boolean;
    /** 当disabled为true的时候显示的文案 */
    reason?: string;
    /** 触发的动作 */
    onClick?: (item: Item) => void;
    /** 是否是分割线 */
    isDivider?: boolean;
}

interface ToolBarProps {
    data: Item[];
    style?: object;
    className?: string;
}
const ToolBar: React.FC<ToolBarProps> = props => {
    const { data, style, className } = props;
    return (
        <ul className={`${'graphin-studio-toolbar'}${className ? ` ${className}` : ''}`} style={style}>
            {data.map(c => {
                const { isDivider, onClick, tooltip, name, disabled, icon, id } = c;
                if (isDivider) {
                    return <Divider key={id} />;
                }
                return (
                    <Tooltip key={id} placement="right" title={tooltip || name}>
                        <Button
                            disabled={disabled}
                            icon={icon}
                            onClick={(): void => {
                                if (onClick) {
                                    onClick(c);
                                }
                            }}
                        />
                    </Tooltip>
                );
            })}
        </ul>
    );
};

export default ToolBar;
