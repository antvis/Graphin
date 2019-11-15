import React from 'react';
import Item from './Item';

export interface SheetBarProps {
    children: JSX.Element;
}
const SheetBar = props => {
    const { children } = props;
    return <div>{children}</div>;
};

/** export */
SheetBar.Item = Item;
export default SheetBar;
