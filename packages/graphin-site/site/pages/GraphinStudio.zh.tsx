import React from 'react';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
// import GraphinStudio from '@antv/graphin-studio';

const IndexPage = () => {
    const { t } = useTranslation();
    return (
        <>
            <SEO title="蚂蚁数据可视化" lang="zh" />
            <div style={{ margin: '0 auto', padding: '0 60px' }}>
                grahpin studio app
                {/* <GraphinStudio /> */}
            </div>
        </>
    );
};

export default IndexPage;
