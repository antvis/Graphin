import React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';

const mountMapping = new Map();
mountMapping.set('tooltip', document.createElement('div'));

export const createNode = (children: React.ReactElement, isTooltip = false) => {
  let mount: HTMLElement;
  /**
   * @description tooltip 为了防止抖动，只需一个root即可
   */
  if (isTooltip) {
    mount = mountMapping.get('tooltip');
  } else {
    mount = document.createElement('div');
    if (children?.key) {
      const exist = mountMapping.get(children.key);
      if (exist) {
        mount = exist;
      } else {
        mountMapping.set(children.key, mount);
      }
    }
  }

  // createRoot(mount).render(createPortal(children, document.getElementsByTagName('body')[0]));
  createRoot(mount).render(children);
  return mount;
};
