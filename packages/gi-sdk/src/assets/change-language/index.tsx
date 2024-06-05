/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { LocalStore } from '../../utils';
import { PREFIX, LANGUAGE_LIST } from '../../constants';
import { SIDER_STYLE } from './style';

export const ChangeLanguage: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className={`${PREFIX}-header-language`} css={SIDER_STYLE}>
      <Select
        defaultValue={LocalStore.get('language') || 'zh-CN'}
        variant="borderless"
        options={LANGUAGE_LIST}
        onChange={value => {
          LocalStore.set('language', value);
          i18n.changeLanguage(value);
        }}
      />
    </div>
  );
};
