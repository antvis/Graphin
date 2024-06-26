/** @jsxImportSource @emotion/react */
import './i18n/config';
import { css } from '@emotion/react';
import React from 'react';
import Graphin from '@antv/graphin';
import type { Graph } from '@antv/graphin';
import { useSnapshot } from 'valtio';
import { PREFIX, HEADER_HEIGHT } from './constants';
import { SDKModel } from './model';
import { Panel, Sider, Header } from './assets';
import { useComponent } from './hooks';
import { makeCssTheme } from './utils';
import { GLOBAL_LIGHT_STYLES } from './theme';
import { Watcher } from './plugin';

export const GISDK = props => {
  const { spec } = props;
  const styleTheme = React.useMemo(() => makeCssTheme(GLOBAL_LIGHT_STYLES), []);
  const { graph: graphConfig } = spec;
  const { onRender, ...rest } = graphConfig;
  SDKModel.application = props;
  const snap = useSnapshot(SDKModel);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { renderComponent } = useComponent();

  return (
    <React.Fragment>
      <div
        className={`${PREFIX}-sdk-container`}
        ref={containerRef}
        style={styleTheme}
        css={css`
          height: 100%;
        `}
      >
        <Header>{snap.isReady && renderComponent('header')}</Header>
        <div
          className={`${PREFIX}-content`}
          css={css`
            display: flex;
            height: calc(100% - ${HEADER_HEIGHT}px);
          `}
        >
          <Sider>{snap.isReady && renderComponent('sider')}</Sider>
          <div
            className={`${PREFIX}-scene`}
            css={css`
              flex: 1;
              height: 100%;
            `}
          >
            <Graphin
              {...rest}
              onRender={(graph: typeof Graph) => {
                SDKModel.isReady = true;
                SDKModel.graph.push(graph);
                onRender?.(graph);
              }}
            >
              {renderComponent('canvas')}
            </Graphin>
          </div>
          <Panel>{snap.isReady && renderComponent('panel')}</Panel>
        </div>
        <Watcher />
      </div>
    </React.Fragment>
  );
};
