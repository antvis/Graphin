/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
import React, { useContext, useState } from 'react';
import type { IRouteComponentProps } from '@umijs/types';
import { context, Link } from 'dumi/theme';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import SlugList from './components/SlugList';
import SearchBar from './components/SearchBar';
import Cases from './components/Cases/Cases';
import Banner from './components/Banner/index';
import Ideas from './components/Features';
import NotFoundPage from './components/404';

import './style/layout.less';
import Footer from './components/Footer';

const isEmpty = obj => {
  return Object.keys(obj).length === 0;
};

const processRedirect = (context, location) => {
  const { pathname } = location;
  const { meta, routes } = context;

  const isEmptyMeta = isEmpty(meta);
  let matchRoute = { meta: {} };
  const needRedirectPath = ['/zh', '/zh/', '/zh-CN', '/zh-CN/', '/en', '/en/', '/en-US', '/en-US/'];
  const isInclude = needRedirectPath.some(item => item === pathname);
  if (isEmptyMeta) {
    if (isInclude) {
      // 存在重定向需求
      const isZh = pathname.slice(1, 3) === 'zh';
      const isEn = pathname.slice(1, 3) === 'en';
      if (isZh) {
        matchRoute = routes.find(item => {
          return item.path === '/';
        });
      }
      if (isEn) {
        matchRoute = routes.find(item => {
          return item.path === '/en-US';
        });
      }
    }
  }

  return {
    meta: isEmptyMeta ? matchRoute.meta : meta,
    isDirect: isInclude,
  };
};

const Hero = hero => (
  <div className="__dumi-default-layout-hero">
    {hero.image && <img src={hero.image} alt="banner" />}
    <h1>{hero.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: hero.desc }} />
    {hero.actions &&
      hero.actions.map(action => (
        <Link to={action.link} key={action.text}>
          <button type="button">{action.text}</button>
        </Link>
      ))}
  </div>
);

const BannerPanel = banner => {
  const { image, title, desc, actions, notifications } = banner;
  const description = <div dangerouslySetInnerHTML={{ __html: desc }} />;
  const coverImage = <img alt="graphin" style={{ width: '100%', marginTop: '20%' }} src={image} />;

  return (
    <Banner
      coverImage={coverImage}
      title={title}
      // @ts-ignore
      description={description}
      notifications={notifications}
      buttons={actions}
      className="banner"
    />
  );
};

const Features = features => (
  <div className="__dumi-default-layout-features">
    {features.map(feat => (
      <dl key={feat.title} style={{ backgroundImage: feat.icon ? `url(${feat.icon})` : undefined }}>
        {feat.link ? (
          <Link to={feat.link}>
            <dt>{feat.title}</dt>
          </Link>
        ) : (
          <dt>{feat.title}</dt>
        )}
        <dd dangerouslySetInnerHTML={{ __html: feat.desc }} />
      </dl>
    ))}
  </div>
);

const Layout: React.FC<IRouteComponentProps> = ({ children, location }) => {
  const Context = useContext(context);
  const {
    config: { mode, repository },
    locale,
  } = Context;

  const { meta, isDirect } = processRedirect(Context, location);
  console.log('Context', Context, 'calculate meta', meta);
  const { url: repoUrl, branch, platform } = repository;
  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(true);
  const isSiteMode = mode === 'site';
  const showHero = isSiteMode && meta.hero;
  const showBanner = isSiteMode && meta.banner;
  const showCases = isSiteMode && meta.cases;
  const showFeatures = isSiteMode && meta.features;
  const showIdeas = isSiteMode && meta.ideas;
  const showSideMenu = meta.sidemenu !== false && !showHero && !showBanner && !showFeatures && !meta.gapless;
  const showSlugs =
    !showHero &&
    !showBanner &&
    !showFeatures &&
    Boolean(meta.slugs?.length) &&
    (meta.toc === 'content' || meta.toc === undefined) &&
    !meta.gapless;
  const isCN = /^zh|cn$/i.test(locale);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatedTime: any = new Date(meta.updatedTime).toLocaleString([], { hour12: false });
  const repoPlatform =
    { github: 'GitHub', gitlab: 'GitLab' }[(repoUrl || '').match(/(github|gitlab)/)?.[1] || 'nothing'] || platform;
  // 等dumi最新版发布后解决路由匹配问题
  if (isEmpty(meta) && !isDirect) {
    return (
      <div>
        <div
          style={{ marginBottom: '60px' }}
          className="__dumi-default-layout home"
          data-route={location.pathname}
          data-show-sidemenu={false}
          data-show-slugs={false}
          data-site-mode="site"
          data-gapless={String(!!meta.gapless)}
          onClick={() => {
            if (menuCollapsed) return;
            setMenuCollapsed(true);
          }}
        >
          <div style={{ height: '60px' }} />
          <Navbar
            location={location}
            navPrefix={<SearchBar />}
            onMobileMenuClick={ev => {
              setMenuCollapsed(val => !val);
              ev.stopPropagation();
            }}
          />
          <NotFoundPage />
          <Footer githubUrl={repoUrl} rootDomain="https://antv.vision" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`__dumi-default-layout ${showBanner ? 'home' : ''}`}
      data-route={location.pathname}
      data-show-sidemenu={String(showSideMenu)}
      data-show-slugs={String(showSlugs)}
      data-site-mode={isSiteMode}
      data-gapless={String(!!meta.gapless)}
      onClick={() => {
        if (menuCollapsed) return;
        setMenuCollapsed(true);
      }}
    >
      <Navbar
        location={location}
        navPrefix={<SearchBar />}
        onMobileMenuClick={ev => {
          setMenuCollapsed(val => !val);
          ev.stopPropagation();
        }}
      />
      {showSideMenu && <SideMenu mobileMenuCollapsed={menuCollapsed} location={location} />}
      {showSlugs && <SlugList slugs={meta.slugs} className="__dumi-default-layout-toc" />}
      {showBanner && BannerPanel(meta.banner)}
      {showHero && Hero(meta.hero)}
      {showFeatures && Features(meta.features)}
      {showIdeas && <Ideas features={meta.ideas} style={{ width: '100%' }} />}
      {showCases && <Cases cases={meta.cases} className="graph-cases" />}
      <div className="__dumi-default-layout-content">
        {children}
        {showSideMenu && (
          <div className="__dumi-default-layout-footer-meta">
            {repoPlatform && (
              <Link to={`${repoUrl}/edit/${branch}/${meta.filePath}`}>
                {isCN ? `在 ${repoPlatform} 上编辑此页` : `Edit this doc on ${repoPlatform}`}
              </Link>
            )}
            <span data-updated-text={isCN ? '最后更新时间：' : 'Last update: '}>{updatedTime}</span>
          </div>
        )}
        {!showSideMenu && <Footer githubUrl={repoUrl} rootDomain="https://antv.vision" />}
      </div>
    </div>
  );
};

export default Layout;
