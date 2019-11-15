import React from 'react';
import { LayoutProps } from './types';
import './index.css';

const Layout: React.FC<LayoutProps> = props => {
    const { children } = props;
    return <div className="graphin-studio">{children}</div>;
};

export default Layout;
