import * as React from 'react';
import GraphinContext from '../GraphinContext';
import useBehaviorHook from './useBehaviorHook';
import { IG6GraphEvent } from '@antv/g6';

const defaultConfig = {
  /** 收起和展开树图的方式，支持 'click' 和 'dblclick' 两种方式。默认为 'click'，即单击； */
  trigger: 'click',
  /**
   * 收起或展开的回调函数。
   * 警告：G6 V3.1.2 版本中将移除；itemcollapsed：当 collapse-expand 发生时被触发。
   * 请使用 graph.on('itemcollapsed', e => {...}) 监听，参数 e 有以下字段：
   *  */
};

export type TreeCollapseProps = Partial<{
  /** 收起和展开树图的方式，支持 'click' 和 'dblclick' 两种方式。默认为 'click'，即单击； */
  trigger: 'click' | 'dblclick' | string;
  /**
   * 收起或展开的回调函数。
   * 警告：G6 V3.1.2 版本中将移除；itemcollapsed：当 collapse-expand 发生时被触发。
   * 请使用 graph.on('itemcollapsed', e => {...}) 监听，参数 e 有以下字段：
   *  */
  onChange: (item: IG6GraphEvent['item'], collapsed: boolean) => void;
  /** 是否允许该 behavior 在当前操作的 item 上发生。 */
  shouldBegin: (e: IG6GraphEvent) => boolean;
}>;

const TreeCollapse: React.FunctionComponent<TreeCollapseProps> = props => {
  const { onChange, ...otherCofnig } = props;
  const { graph } = React.useContext(GraphinContext);

  /** 通用注册逻辑 */
  useBehaviorHook({
    defaultConfig,
    userProps: otherCofnig,
    type: 'collapse-expand',
  });

  React.useEffect(() => {
    const handleChange = (e: IG6GraphEvent) => {
      const { item, collapsed } = e;
      const model = item!.get('model');
      model.collapsed = collapsed;
      if (onChange) {
        onChange(item, collapsed as boolean); // callback
      }
    };
    graph.on('itemcollapsed', handleChange);
    return () => {
      graph.off('itemcollapsed', handleChange);
    };
  }, []);

  return null;
};

export default TreeCollapse;
