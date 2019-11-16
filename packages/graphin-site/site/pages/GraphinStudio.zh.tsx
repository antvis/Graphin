import React from 'react';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';

const IndexPage = () => {
    const { t } = useTranslation();
    return (
        <>
            <SEO title="蚂蚁数据可视化" lang="zh" />
            <div style={{ margin: '0 auto', padding: '0', height: 'calc(100vh - 64px)' }}>
                <iframe
                    src="https://antvis.github.io/graphin-studio-site/#/graphin-studio"
                    title="graphin-studio"
                    style={{ width: '100%', height: '100%', border: 0, borderRadius: '4px', overflow: 'hidden' }}
                    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
                    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
                />
            </div>
        </>
    );
};

export default IndexPage;
