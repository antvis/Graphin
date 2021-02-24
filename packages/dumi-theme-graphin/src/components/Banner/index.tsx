/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';

import GitHubButton from 'react-github-button';
import gh from 'parse-github-url';
import classNames from 'classnames';
import { context } from 'dumi/theme';
// @ts-ignore
import styles from './Banner.module.less';
import Notification, { NotificationProps } from './Notification';

type BannerButtonShape = 'round' | 'square';

interface BannerButton {
  text: string;
  link: string;
  style?: React.CSSProperties;
  type?: string;
  shape?: BannerButtonShape;
}

interface BannerProps {
  coverImage?: React.ReactNode;
  title: string;
  description: string;
  notifications?: NotificationProps[];
  style?: React.CSSProperties;
  className?: string;
  video?: string;
  showGithubStars?: boolean;
  buttons?: BannerButton[];
  onCloseVideo?: () => void;
  onPlayVideo?: () => void;
}

const backLeftBottom = 'https://gw.alipayobjects.com/zos/basement_prod/441d5eaf-e623-47cd-b9b9-2a581d9ce1e3.svg';

const Banner: React.FC<BannerProps> = ({
  coverImage,
  title,
  description,
  notifications,
  style = {},
  className,
  showGithubStars = true,
  buttons = [],
}) => {
  const {
    config: { repository },
  } = useContext(context);

  const githubUrl = repository.url;

  const notificationsNode = notifications
    .slice(0, 2)
    .map((notification, i) => <Notification index={i} key={i} {...notification} />);

  const renderButtons = buttons.map((button: BannerButton, i) => {
    const ButtonLink = 'a';
    const buttonProps = {} as any;
    if (button.link.startsWith('http')) {
      buttonProps.target = '_blank';
      buttonProps.rel = 'noopener noreferrer';
    }
    if (ButtonLink === 'a') {
      buttonProps.href = button.link;
    } else {
      buttonProps.to = button.link;
    }
    const { shape = 'round' } = button;
    return (
      <ButtonLink
        {...buttonProps}
        className={classNames(
          styles.buttonLink,
          styles[button.type || ''],
          button.type === 'primary' ? 'primary-button' : 'common-button',
        )}
        key={i}
        style={{
          borderRadius: shape === 'round' ? '1000px' : '4px',
          ...button.style,
        }}
      >
        <span className={styles.button}>{button.text}</span>
      </ButtonLink>
    );
  });

  if (showGithubStars) {
    const githubObj = gh(githubUrl);

    if (githubObj && githubObj.owner && githubObj.name) {
      renderButtons.push(
        <div key="github" className={styles.githubWrapper}>
          <GitHubButton type="stargazers" size="large" namespace={githubObj.owner} repo={githubObj.name} />
        </div>,
      );
    }
  }

  return (
    <section className={classNames(styles.wrapper, className)} style={style}>
      <div className={styles.content}>
        <div className={styles.text}>
          <div className={classNames(styles.title, 'banner-title')}>{title}</div>
          <div className={classNames(styles.description, 'banner-description')}>{description}</div>
          <div className={classNames(styles.buttons, 'banner-buttons')}>{renderButtons}</div>
        </div>
        <div className={classNames(styles.notifications, 'notifications')}>{notificationsNode}</div>
        <div className={classNames(styles.teaser, 'teaser')}>
          <div className={classNames(styles.teaserimg, 'teaser-img')}>{coverImage}</div>
        </div>
        <img className={styles.backLeftBottom} src={backLeftBottom} alt="back" />
      </div>
    </section>
  );
};

export default Banner;
