import React from 'react';
import { LayoutProps } from './types';

const Main: React.FC<LayoutProps> = props => {
    const { children } = props;
    return <div className="graphin-studio-main">{children}</div>;
};

export default Main;
