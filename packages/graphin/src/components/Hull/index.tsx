import React from 'react';
import type { GraphinContextType } from '../../GraphinContext';
import GraphinContext from '../../GraphinContext';
import { debounce } from '@antv/util';

const defaultHullCfg = {
  members: [],
  type: 'round-convex',
  nonMembers: [],
  style: {
    fill: 'lightblue',
    stroke: 'blue',
    opacity: 0.2,
  },
  padding: 10,
};

/**
 * deep merge hull config
 * @param defaultCfg
 * @param cfg
 */
const deepMergeCfg = (defaultCfg: typeof defaultHullCfg, cfg: HullCfg) => {
  const { style: DefaultCfg = {}, ...defaultOtherCfg } = defaultCfg;
  const { style = {}, ...others } = cfg;
  return {
    ...defaultOtherCfg,
    ...others,
    style: {
      ...DefaultCfg,
      ...style,
    },
  };
};

export interface HullCfgStyle {
  /**
   * @description 填充颜色
   * @default 'lightblue'
   */
  fill: string;
  /**
   * @description 描边颜色
   * @default 'blue'
   */
  stroke: string;
  /**
   *
   * @description 透明度
   * @default 0.2
   */
  opacity: number;
}
export interface HullCfg {
  /**
   * @description 在包裹内部的节点实例或节点 Id 数组
   * @default []
   *
   */
  members: string[];
  /**
   * 包裹的 id
   */
  id?: string;
  /**
   * @description 包裹的类型
   * round-convex: 生成圆角凸包轮廓，
   * smooth-convex: 生成平滑凸包轮廓
   * bubble: 产生一种可以避开 nonMembers 的平滑凹包轮廓（算法）。
   * @default round-convex
   */
  type?: 'round-convex' | 'smooth-convex' | 'bubble';
  /** 不在轮廓内部的节点数组，只在 bubble 类型的包裹中生效 */
  nonMembers?: string[];
  /** 轮廓的样式属性 */
  style?: Partial<HullCfgStyle>;
  /**
   * @description 轮廓边缘和内部成员的间距
   * @default 10
   */
  padding?: number;
}

export interface IHullProps {
  /**
   * @description 配置
   */
  options: HullCfg[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let hullInstances: any[];

const Hull: React.FunctionComponent<IHullProps> = props => {
  const graphin = React.useContext<GraphinContextType>(GraphinContext);
  const { graph } = graphin;
  const { options } = props;

  React.useEffect(() => {
    // 如果options有更改，先删除再创建
    if (hullInstances && hullInstances.length) {
      hullInstances.forEach(item => graph.removeHull(item));
    }

    hullInstances = options.map(item => {
      return graph.createHull(
        // @ts-ignore
        deepMergeCfg(defaultHullCfg, {
          id: `${Math.random()}`, // Utils.uuid(),
          ...item,
        }),
      );
    });

    // afterupdateitem会触发多次，所以使用debounce包裹一下
    const handleAfterUpdateItem = debounce(() => {
      hullInstances.forEach((item, index) => {
        // Graphin的数据更新后，这里存储的instance.group已经被销毁了
        // 直接调用updateData会报错
        if (item.group.destroyed) {
          // @ts-ignore
          hullInstances[index] = graph.createHull(
            // @ts-ignore
            deepMergeCfg(defaultHullCfg, {
              id: `${Math.random()}`, // Utils.uuid(),
              ...options[index],
            }),
          );
        } else {
          item.updateData(item.members);
        }
      });
    });

    graph.on('afterupdateitem', handleAfterUpdateItem);
    return () => {
      graph.on('afterupdateitem', handleAfterUpdateItem);
    };
  }, [graph, options]);

  return null;
};
export default Hull;
