import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
import Features from '@antv/gatsby-theme-antv/site/components/Features';
import Cases from '@antv/gatsby-theme-antv/site/components/Cases';
import Solution from '../components/Solution';
import './index.less';

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
  const solutions = [
    {
      image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*99jtSaqlpKoAAAAAAAAAAAAAARQnAQ',
      link: 'https://gw.alipayobjects.com/os/bmw-prod/c8ddbda8-c742-4c11-9c68-3783dd5954b9.pdf',

      description: t('解决方案'),
    },
    {
      image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*LR7AS48cdOIAAAAAAAAAAAAAARQnAQ',
      link: 'https://gw.alipayobjects.com/os/bmw-prod/660e1732-ff10-4f00-8594-a08d5a2d11d8.pdf',
      description: t('云安全'),
    },
    {
      image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*qDi4RYggJJAAAAAAAAAAAAAAARQnAQ',
      link: 'https://gw.alipayobjects.com/os/bmw-prod/b6686d7a-2860-43a4-a75e-880490d5a414.pdf',
      description: t('知识图谱'),
    },
    {
      image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*uRQRTYLhg9sAAAAAAAAAAAAAARQnAQ',
      link: 'https://gw.alipayobjects.com/os/bmw-prod/0b872268-1388-457f-9358-c41327a861e1.pdf',
      description: t('企业风控'),
    },
    {
      image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*p0e3T7DGQ_IAAAAAAAAAAAAAARQnAQ',
      link: 'https://gw.alipayobjects.com/os/bmw-prod/a381a006-85e8-4c55-83b3-278a02f83535.pdf',
      description: t('图数据库'),
    },
    {
      image: 'https://gw.alipayobjects.com/mdn/rms_402c1a/afts/img/A*rfTMSJhfUXQAAAAAAAAAAAAAARQnAQ',
      link: 'https://gw.alipayobjects.com/os/bmw-prod/cf756b00-86ec-4f8e-b885-f4f5808cb739.pdf',
      description: t('性能优化'),
    },
  ];

  const notifications = [
    {
      type: t('重磅推出'),
      title: t('AntV图可视分析解决方案，来啦～'),
      date: '2020.11.22',
      link: 'https://www.yuque.com/antv/g6/solution',
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
      logo: 'https://img.alicdn.com/tfs/TB1rh1xy7T2gK0jSZFkXXcIQFXa-128-128.svg',
      title: t('Graph Studio'),
      description: t(
        'Graph Studio 是阿里云Dataworks团队围绕Graph Compute引擎打造的一站式图开发平台。其中基于Graphin开发的图分析平台提供了数据检索、关系扩散、布局切换、节点筛选、关联高亮、分享等常用图分析能力，能够帮助用户快速完成相关分析工作',
      ),
      link:
        'https://gs-share-cn-shanghai.aliyuncs.com/index8b5ab67a3e754e02a77aae7871465031.html#/?mock=true&source=graphin',
      image: 'https://img.alicdn.com/tfs/TB1laWQyVT7gK0jSZFpXXaTkpXa-600-600.gif',
    },
  ];

  const abstract = t(
    '一份联合了阿里巴巴集团和蚂蚁集团 8 个 BG/BU，30 多位相关的产品经理，设计师，工程师，基于各个业务领域实践产出的图可视分析解决方案白皮书。业务的发展让我们意识到，除了图技术的迭代，对于图认知的”迭代“同样需要我们重视，这是一次新的尝试，让我们一同探索，助力图分析业务更好地创新',
  );

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

      <Solution items={solutions} abstract={abstract} />
      <Features features={features} style={{ width: '100%' }} />
      <Cases cases={cases} className="graph-cases" />
    </>
  );
};

export default IndexPage;
