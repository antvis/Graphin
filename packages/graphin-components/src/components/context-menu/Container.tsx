import React, { ReactElement } from 'react';
import { Menu, Icon } from 'antd';
import { Graph } from '@antv/g6';

const MenuItem = Menu.Item;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1187963_50nfpuasd7b.js',
});

export interface MenuItemType {
    key: string;
    visible?: boolean;
    /** antd icon type */
    iconType?: string;
    title?: string;
    width?: number;
    height?: number;
    onClick?: (props: ContainerProps) => void;
    /** antd icon type */
    useCustomIcon?: boolean;
    /** user defined render function */
    render?: (props: ContainerProps) => ReactElement;
}

interface ContainerProps {
    graph: Graph;
    menu: MenuItemType[];
    onClose: () => void;
}

const Container: React.FC<ContainerProps> = props => {
    const { menu, onClose } = props;

    const onClickMenuItem = (item: MenuItemType) => {
        onClose();
        // call user defined menu item onClick callback
        if (item.onClick) item.onClick(props);
    };

    const menuItems = menu
        .filter(item => !(item.visible === false)) // item.visible 不传时默认可见
        .map(item => {
            // render icon
            const iconProps = {
                type: item.iconType,
                style: { fontSize: '12px' },
            };
            const icon = item.useCustomIcon === false ? <Icon {...iconProps} /> : <IconFont {...iconProps} />;

            return (
                <MenuItem key={item.key} className={item.key} onClick={() => onClickMenuItem(item)}>
                    {item.render ? (
                        item.render(props)
                    ) : (
                        <>
                            {icon}
                            {item.title}
                        </>
                    )}
                </MenuItem>
            );
        });

    return (
        <div className="graphin-context-menu">
            <Menu>{menuItems}</Menu>
        </div>
    );
};

export default Container;
