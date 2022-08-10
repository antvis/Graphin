import { Layout } from '../typings/type';

const LAYOUT_CFG_KEY_MAP: { [key: string]: string } = {
  animation: 'animate',
  minDistanceThreshold: 'minMovement',
};

export const processLayoutConfig = (layoutCfg: Layout | undefined) => {
  if (!layoutCfg) return layoutCfg;
  const newLayoutCfg: Layout = {};
  Object.keys(layoutCfg).forEach(key => {
    const newKey = LAYOUT_CFG_KEY_MAP[key];
    if (newKey) {
      newLayoutCfg[newKey] = layoutCfg[key];
    } else {
      newLayoutCfg[key] = layoutCfg[key];
    }
  });
  return newLayoutCfg;
};
