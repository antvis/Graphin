import React from 'react';
import { LayoutProps } from './types';

const Footer: React.FC<LayoutProps> = props => {
    const { children } = props;
    return <div className="graphin-studio-footer">{children}</div>;
};

export default Footer;
