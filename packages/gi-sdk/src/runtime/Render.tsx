/**
 * 图应用渲染组件
 */
import classnames from 'classnames';
import type { PropsWithChildren, CSSProperties } from 'react';
import { PREFIX } from '../constants';
import type { Application } from '../spec';
import { useImplementWidgets } from '../utils/widget';

export interface GIRenderProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'style'> {
  /**
   * 图应用配置描述
   */
  config: Application;
}

export const GIRender: React.FC<PropsWithChildren<GIRenderProps>> = (props) => {
  const { className, style, config, children } = props;
  const renderWidgets = useImplementWidgets(config.spec.widgets);

  const containerStyle: CSSProperties = {
    height: 'inherit',
    position: 'relative',
    ...style,
  };

  return (
    <div className={classnames(`${PREFIX}-container`, className)} style={containerStyle}>
      {renderWidgets}
      {children}
    </div>
  );
};
