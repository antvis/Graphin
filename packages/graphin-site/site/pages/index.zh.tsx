import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Companies from '@antv/gatsby-theme-antv/site/components/Companies';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';
// import BannerSVG from '@antv/gatsby-theme-antv/site/components/BannerSVG';

const IndexPage = () => {
    const { t, i18n } = useTranslation();

    // const coverImage = BannerSVG();

    const features = [
        {
            icon: 'https://gw.alipayobjects.com/zos/basement_prod/5dbaf094-c064-4a0d-9968-76020b9f1510.svg',
            title: t('数据驱动'),
            description: t('从数据出发，仅需几行代码可以轻松获得想要的图表展示效果。'),
        },
        {
            icon: 'https://gw.alipayobjects.com/zos/basement_prod/0a0371ab-6bed-41ad-a99b-87a5044ba11b.svg',
            title: t('自动布局'),
            description: t('大量产品实践之上，提供绘图引擎、完备图形语法，专业设计规范。'),
        },
        {
            icon: 'https://gw.alipayobjects.com/zos/basement_prod/716d0bc0-e311-4b28-b79f-afdd16e8148e.svg',
            title: t('分析组件'),
            description: t('任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。'),
        },
        {
            icon: 'https://gw.alipayobjects.com/zos/basement_prod/716d0bc0-e311-4b28-b79f-afdd16e8148e.svg',
            title: t('灵活配置'),
            description: t('任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。'),
        },
        {
            icon: 'https://gw.alipayobjects.com/zos/basement_prod/716d0bc0-e311-4b28-b79f-afdd16e8148e.svg',
            title: t('高级分析'),
            description: t('任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。'),
        },
    ];

    const companies = [
        {
            name: '公司1',
            img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Z1NnQ6L4xCIAAAAAAAAAAABkARQnAQ',
        },
        {
            name: '公司2',
            img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*6u3hTpsd7h8AAAAAAAAAAABkARQnAQ',
        },
        {
            name: '公司3',
            img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Fw8HTbFgUdAAAAAAAAAAAABkARQnAQ',
        },
        {
            name: '公司4',
            img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lUdjTqQix48AAAAAAAAAAABkARQnAQ',
        },
        {
            name: '公司5',
            img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*1q8NQZ9GaN0AAAAAAAAAAABkARQnAQ',
        },
        {
            name: '公司6',
            img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*SqmTSqj4FjEAAAAAAAAAAABkARQnAQ',
        },
    ];

    const notifications = [
        {
            type: t('抛砖引玉'),
            title: t('Graphin 1.0 全新上线！'),
            date: '2019.11.22',
            link: '#',
        },
        {
            type: t('推荐'),
            title: t('G6 3.2 全新上线！'),
            date: '2019.11.22',
            link: '#',
        },
    ];

    const cases = [
        {
            logo: 'https://gw.alipayobjects.com/zos/basement_prod/f90e2f08-630b-4b02-8886-5c7c174a3fca.svg',
            title: 'Graphin Stduio',
            description: 'GraphinStudio是基于Graphin开发的通用关系分析平台，具有自动布局，关系扩散等功能',
            link: 'zh/GraphinStudio',
            image: 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*Y9y9QqfXYdkAAAAAAAAAAABkARQnAQ',
        },
    ];

    return (
        <>
            <SEO title={t('蚂蚁数据可视化')} lang={i18n.language} />
            <Banner
                // coverImage={coverImage}
                title={t('Graphin 图的分析洞察')}
                description={t(
                    'Graphin 取名意为 Graph Insight（图的分析洞察），是一个基于 G6 封装的 React 组件库，简单，高效，开箱即用。',
                )}
                buttonText={t('继续了解')}
                buttonHref="zh/docs/manual/introduction"
                notifications={notifications}
                className="banner"
                // style={{ height: '600px' }}
            />
            <Features
                features={features}
                // className="features"
                style={{ width: '100%' }}
            />
            <Cases cases={cases} />
            {/* <Companies
                title={t('合作公司')}
                companies={companies}
                // className="companies"
                // style={{ width: '100%' }}
            /> */}
        </>
    );
};

export default IndexPage;
