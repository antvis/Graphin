import React from 'react';

//@ts-ignore
import { GraphinContext } from '@antv/graphin';

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

const defaultHullCfg = {
  id: 'g6-hull',
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

interface HullCfg {
  /** 包裹的 id */
  id: string;
  /** 在包裹内部的节点实例或节点 Id 数组 */
  members: string[];
  /**
   * 包裹的类型：
   * round-convex: 生成圆角凸包轮廓，
   * smooth-convex: 生成平滑凸包轮廓
   * bubble: 产生一种可以避开 nonMembers 的平滑凹包轮廓（算法）。
   * 默认值是 round-convex。 */
  type?: 'round-convex' | 'round-convex' | 'smooth-convex' | 'bubble';
  /** 不在轮廓内部的节点数组，只在 bubble 类型的包裹中生效 */
  nonMembers?: string[];
  /** 轮廓的样式属性 */
  style?: {
    /** 填充颜色 */
    fill: string;
    /** 描边颜色 */
    stroke: string;
    /**  透明度 */
    opacity: number;
  };
  /** 轮廓边缘和内部成员的间距 */
  padding?: number;
}
export interface IHullProps {
  options: HullCfg[];
}

let hullInstances: any[];

const Hull: React.FunctionComponent<IHullProps> = (props) => {
  React.useEffect(() => {
    const graphin = React.useContext(GraphinContext);
    //@ts-ignore
    const { graph } = graphin;
    const { options } = props;

    const handleAfterLayout = () => {
      hullInstances = options.map((item) => {
        return graph.createHull(deepMergeCfg(defaultHullCfg, item));
      });
    };
    const handleAfterUpdateItem = () => {
      hullInstances.forEach((item) => {
        item.updateData(item.members);
      });
    };

    graph.on('afterlayout', handleAfterLayout);
    graph.on('afterupdateitem', handleAfterUpdateItem);

    return () => {
      graph.off('afterlayout', handleAfterLayout);
      graph.on('afterupdateitem', handleAfterUpdateItem);
    };
  }, []);

  return <div className="graphin-hull-container"></div>;
};
export default Hull;
