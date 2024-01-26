import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { ContextMenu as GraphinContextMenu } from '@antv/graphin';
import { PREFIX } from '../../constants';
import { useGraph } from '../../hooks';
import './style.less';

const Menu = forwardRef((props, ref) => {
  const { graph } = useGraph();

  const handleClick = e => {
    console.log(`${e.key}`);
  };

  useImperativeHandle(ref, () => handleClick);

  return (
    <React.Fragment>
      <p data-key="copy">复制</p>
      <p data-key="delete">删除</p>
      <p data-key="tag" style={{ marginBottom: 0 }}>
        打标
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
