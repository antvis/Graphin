import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';

const IndexPage = () => {
    const { t, i18n } = useTranslation();

    const coverImage = (
        <img
            alt="graphin"
            style={{ width: '100%', marginTop: '20%' }}
            src="https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*Gix7Rry3-5wAAAAAAAAAAABkARQnAQ"
        />
    );

    const features = [
        {
            icon: 'https://gw.alipayobjects.com/zos/basement_prod/5dbaf094-c064-4a0d-9968-76020b9f1510.svg',
            title: t('数据驱动'),
            description: t('充分利用 React 框架特性，支持数据到视图的映射与变化'),
        },
        {
            icon: 'https://gw.alipayobjects.com/zos/basement_prod/0a0371ab-6bed-41ad-a99b-87a5044ba11b.svg',
            title: t('自动布局'),
            description: t('内置丰富的布局，支持布局切换，满足不同场景下的布局需求'),
        },
        {
            icon: 'https://gw.alipayobjects.com/zos/basement_prod/716d0bc0-e311-4b28-b79f-afdd16e8148e.svg',
            title: t('分析探索'),
            description: t('沉淀分析方法，内置分析组件，专注关系可视分析领域'),
        },
    ];

    const notifications = [
        {
            type: t('点线析源远'),
            title: t('G6 3.2.0 全新发布！'),
            date: '2019.11.22',
            link: 'https://github.com/antvis/g6',
        },
        {
            type: t('小试牛刀'),
            title: t('Graphin 1.0.0 全新发布！'),
            date: '2019.11.22',
            link: 'https://github.com/antvis/graphin',
        },
    ];

    const cases = [
        {
            logo: 'https://gw.alipayobjects.com/zos/basement_prod/f90e2f08-630b-4b02-8886-5c7c174a3fca.svg',
            title: t('Graphin Studio'),
            description: t(
                'GraphinStudio 是基于 Graphin 开发的通用关系分析平台，具有关系扩散，关系发现，布局切换等功能',
            ),
            link: `/${i18n.language}/GraphinStudio`,
            image: 'https://gw.alipayobjects.com/mdn/rms_00edcb/afts/img/A*Y9y9QqfXYdkAAAAAAAAAAABkARQnAQ',
        },
    ];

    const bannerButtons = [
        {
            text: t('继续了解'),
            link: `/${i18n.language}/docs/manual/introduction`,
            type: 'primary',
        },
        {
            text: t('下载使用'),
            link: 'https://github.com/antvis/graphin',
        },
    ];
    return (
        <>
            <SEO title={t('蚂蚁数据可视化')} lang={i18n.language} />
            <Banner
                coverImage={coverImage}
                title={t('Graphin 图的分析洞察')}
                description={t(
                    'Graphin 取名意为 Graph Insight（图的分析洞察），是一个基于 G6 封装的 React 组件库，专注在关系可视分析领域，简单高效，开箱即用。',
                )}
                notifications={notifications}
                buttons={bannerButtons}
                className="banner"
            />

            <Features features={features} style={{ width: '100%' }} />
            <Cases cases={cases} />
        </>
    );
};

export default IndexPage;
