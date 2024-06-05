/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { PlusCircleOutlined, MinusCircleOutlined, ColumnWidthOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import { useGraph } from '../../hooks';
import { PREFIX } from '../../constants';

export const Toolbar: React.FC<any> = props => {
  const { zoomSensitivity = 20 } = props;
  const { t } = useTranslation();
  const { graph } = useGraph();

  const zoomIn = () => {
    const zoomRatio = (100 + zoomSensitivity) / 100;
    graph.zoom(zoomRatio, undefined, {});
  };
  const zoomOut = () => {
    const zoomRatio = 100 / (100 + zoomSensitivity);
    graph.zoom(zoomRatio, undefined, {});
  };

  const fitWiew = () => {
    graph.fitView();
  };

  return (
    <div
      className={`${PREFIX}-toolbar`}
      css={css`
        position: absolute;
        display: flex;
        flex-direction: column;
        left: 24px;
        top: 24px;
        box-shadow: var(--box-shadow);
        border-radius: var(--boder-radius);
        padding: 4px;

        > span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 32px;
          margin-bottom: 4px;
          transition: all 0.3s ease-in;

          &:hover {
            background-color: #f5f5f5;
          }
        }
      `}
    >
      <Popover placement="right" content={t('zoomIn')}>
        <PlusCircleOutlined onClick={() => zoomIn()} />
      </Popover>
      <Popover placement="right" content={t('zoomOut')}>
        <MinusCircleOutlined onClick={() => zoomOut()} />
      </Popover>
      <Popover placement="right" content={t('zoomFit')}>
        <ColumnWidthOutlined onClick={() => fitWiew()} />
      </Popover>
    </div>
  );
};
