import React from 'react';
import { LayoutProps } from './types';

const Side: React.FC<LayoutProps> = props => {
    const { children } = props;
    return <div className="graphin-studio-side">{children}</div>;
};

export default Side;
