import type { ImplementService } from '@antv/gi-sdk';
import $i18n from '../../i18n';
import { getFetchData } from './service';

export const FetchData: ImplementService = {
  version: '0.1',
  metadata: {
    name: 'FetchData',
    description: $i18n.t({
      id: 'core-assets.services.fetch-data.metadata.description',
      defaultMessage: '通过 fetch 获取数据',
    }),
  },
  service: getFetchData,
};
