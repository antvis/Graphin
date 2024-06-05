import { css } from '@emotion/react';
import { SIDER_WIDTH } from '../../constants';

export const SIDER_STYLE = css`
  display: flex;
  height: 100%;
  background-color: var(--background-color);

  .gi-tool {
    position: relative;
    width: 24px;
    height: 100%;
    border-right: 1px solid var(--border-color);
  }

  .gi-sider-icon {
    position: absolute;
    width: 24px;
    height: 24px;
    bottom: 0;
    text-align: center;
    cursor: pointer;
  }

  .gi-sider-content {
    overflow: hidden;
    width: ${SIDER_WIDTH}px;
    overflow-y: auto;
    box-shadow: var(--box-shadow);
  }
  .fade-enter {
    width: 0;
  }
  .fade-enter-active {
    width: ${SIDER_WIDTH}px;
    transition: all 0.3s ease-in;
  }
  .fade-enter-done {
    width: ${SIDER_WIDTH}px;
  }
  .fade-exit {
    width: ${SIDER_WIDTH}px;
  }
  .fade-exit-active {
    width: 0;
    transition: all 0.3s ease-in;
    border-right: none;
  }
  .fade-exit-done {
    width: 0;
    border-right: none;
  }
`;
