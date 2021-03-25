import { Device } from '../const';
import { ComponentMeta } from '../types';
import { Component } from './component';
import { NotFound } from './not-found';

export { Component };

/**
 * 全局所有的组件
 */
const COMPS = new Map<string, ComponentMeta>();

/**
 * 组件池的 key 生成方式
 * @param tag
 * @param device
 */
function getCompKey(tag: string, device: Device): string {
  return `${tag}-${device}`;
}

/**
 * 注册组件
 * @param tag
 * @param device
 * @param componentMeta
 */
export function registerComponent(tag: string, device: Device, componentMeta: ComponentMeta) {
  COMPS.set(getCompKey(tag, device), componentMeta);
}

/**
 * 获取组件
 * @param tag
 * @param device
 */
export function getComponent(tag: string, device: Device): ComponentMeta {
  const cm = COMPS.get(getCompKey(tag, device));
  // 找不到，则直接返回内置的 NotFound 组件
  return cm || NotFound;
}
