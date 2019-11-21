import React from 'react';
import './index.less';

export interface ItemProps {
    /** 自定义样式  */
    style?: React.CSSProperties;
    /** 标题 */
    title: string;
    /** 内容区域 */
    children: React.ReactNode; // any | JSX.Element[]
}

const Item: React.FC<ItemProps> = ({ title, children }) => {
    return (
        <div className="item">
            <div className="item-title">{title}</div>
            <div className="item-children">{children}</div>
        </div>
    );
};

export default Item;
