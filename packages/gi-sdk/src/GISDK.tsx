import React from 'react';
import Graphin, {
  Minimap,
  ClickSelect,
  ContextMenu,
  Toolbar,
  Tooltip,
  Snapline,
  Fisheye,
  Hull,
  Legend,
} from '@antv/graphin';
import type { Graph } from '@antv/graphin';
import { useSnapshot } from 'valtio';
import { PREFIX } from './constants';
import { SDKModel } from './model';
import { Panel, Sider, Header } from './assets';
import { useComponent } from './hooks';
import './styles/global.less';
import './style.less';

export const GISDK = props => {
  const { spec } = props;

  const { graph: graphConfig, widgets } = spec;
  const { onInit, ...rest } = graphConfig;
  SDKModel.application = props;
  const snap = useSnapshot(SDKModel);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { renderComponent } = useComponent();

  return (
    <div className={`${PREFIX}-sdk-container`} ref={containerRef}>
      <Header>{snap.isReady && renderComponent('header')}</Header>
      <div className={`${PREFIX}-content`}>
        <Sider>{snap.isReady && renderComponent('sider')}</Sider>
        <div className={`${PREFIX}-scene`}>
          <Graphin
            {...rest}
            onInit={(graph: Graph) => {
              SDKModel.isReady = true;
              SDKModel.graph.push(graph);
              onInit?.(graph);
            }}
          >
            {renderComponent('canvas')}
            <ClickSelect />
          </Graphin>
        </div>
        <Panel>{snap.isReady && renderComponent('panel')}</Panel>
      </div>
    </div>
  );
};
