import GICoreAssets from '@antv/gi-core-assets';
import { GISDK } from '@antv/gi-sdk';
import React from 'react';
import {createRoot} from 'react-dom/client';
import { myAssetPackage } from './asset';
import { config } from './config';
import './index.less';

export const Demo: React.FC = () => {
  const assets = [GICoreAssets, myAssetPackage];

  return (
    <GISDK
      className="my-graph-application"
      config={config}
      assets={assets}
      initialGlobalState={{ panel: false, sider: true, currentNode: null }}
    />
  );
};
const app = document.createElement('div');
app.id = 'app';
document.getElementsByTagName('body')[0].appendChild(app);
createRoot(app).render(<Demo />);
