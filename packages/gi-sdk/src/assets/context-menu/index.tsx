import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { ContextMenu as GraphinContextMenu } from '@antv/graphin';
import { useTranslation } from 'react-i18next';
import { PREFIX } from '../../constants';
import { useGraph } from '../../hooks';

const Menu = forwardRef((props, ref) => {
  const { graph } = useGraph();
  const { t } = useTranslation();
  const handleClick = e => {
    console.log(`${e.key}`);
  };

  useImperativeHandle(ref, () => handleClick);

  return (
    <React.Fragment>
      <p data-key="copy">{t('copy')}</p>
      <p data-key="delete">{t('delete')}</p>
      <p data-key="tag" style={{ marginBottom: 0 }}>
        {t('tag')}
      </p>
    </React.Fragment>
  );
});

export const ContextMenu: React.FC<any> = props => {
  const menuRef = useRef<Function>(null);
  return (
    <div className={`${PREFIX}-context-menu`}>
      <GraphinContextMenu
        onClick={(item, model) => {
          menuRef.current?.(item);
        }}
      >
        {value => <Menu {...value} ref={menuRef} />}
      </GraphinContextMenu>
    </div>
  );
};
