/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/control-has-associated-label */
import type { FC, MouseEvent } from 'react';
import React, { useContext } from 'react';
import { context, Link, NavLink } from 'dumi/theme';
import { useMedia } from 'react-use';
import LocaleSelect from './LocaleSelect';

import Products from './Products';
import Logo from './Header/Logo';

import './Navbar.less';

interface INavbarProps {
  location: any;
  navPrefix?: React.ReactNode;
  onMobileMenuClick: (ev: MouseEvent<HTMLButtonElement>) => void;
}

const Navbar: FC<INavbarProps> = ({ onMobileMenuClick, navPrefix, location }) => {
  const {
    base,
    config: { mode, title, logo },
    nav: navItems,
  } = useContext(context);

  const isWide = useMedia('(min-width: 767.99px)', true);

  const [productMenuVisible, setProductMenuVisible] = React.useState(false);
  let productMenuHovering = false;
  const onProductMouseEnter = (e: React.MouseEvent) => {
    productMenuHovering = true;
    e.persist();
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      if (e.target instanceof Element && e.target.matches(':hover')) {
        setProductMenuVisible(true);
      }
    }, 200);
  };
  const onProductMouseLeave = (e: React.MouseEvent) => {
    e.persist();
    productMenuHovering = false;
    setTimeout(() => {
      if (productMenuHovering) {
        return;
      }
      setProductMenuVisible(false);
    }, 200);
  };
  const onToggleProductMenuVisible = () => {
    setProductMenuVisible(!productMenuVisible);
  };

  const productItemProps = isWide
    ? {
        onMouseEnter: onProductMouseEnter,
        onMouseLeave: onProductMouseLeave,
      }
    : {
        onClick: onToggleProductMenuVisible,
      };

  return (
    <div className="__dumi-default-navbar" data-mode={mode}>
      {/* menu toogle button (only for mobile) */}
      <button className="__dumi-default-navbar-toggle" onClick={onMobileMenuClick} />
      {/* logo & title */}
      <Link
        className="__dumi-default-navbar-logo"
        style={{
          background: 'none',
          height: '28px',
          lineHeight: '28px',
          paddingLeft: '0px',
        }}
        to={base}
        data-plaintext={logo === false || undefined}
      >
        <Logo style={{ height: '28px', lineHeight: '28px' }} />
        <span
          style={{
            fontSize: '16px',
            width: '1px',
            height: '24px',
            backgroundColor: '#ccc',
            display: ' inline-block',
            margin: '0 20px',
          }}
        />
        <span style={{ fontSize: '16px', color: '#0d1a26', display: 'inline-block', verticalAlign: 'top' }}>
          {title}
        </span>
      </Link>

      <nav>
        {navPrefix}
        {/* nav */}
        {navItems.map(nav => {
          const child = Boolean(nav.children?.length) && (
            <ul>
              {nav.children.map(item => (
                <li key={item.path}>
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              ))}
            </ul>
          );

          return (
            <span key={nav.title || nav.path}>
              {nav.path ? (
                <NavLink to={nav.path} key={nav.path}>
                  {nav.title}
                </NavLink>
              ) : (
                nav.title
              )}
              {child}
            </span>
          );
        })}
        <span {...productItemProps}>
          所有产品
          <img
            src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png"
            alt="antv logo arrow"
            className={`arrow ${productMenuVisible && 'open'}`}
          />
          <div
            style={{
              position: 'fixed',
              top: ' 0px',
              left: '0px',
              width: ' 100%',
              right: '0px',
            }}
          >
            <Products show={productMenuVisible} rootDomain="ant.vison" language="zh" />
          </div>
        </span>
        <LocaleSelect location={location} />
      </nav>
    </div>
  );
};

export default Navbar;
