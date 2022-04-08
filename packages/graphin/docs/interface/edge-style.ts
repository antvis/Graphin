/* eslint-disable @typescript-eslint/no-unused-vars */
import { EdgeStyle } from '@antv/graphin';

export type KeyshapeType = EdgeStyle['keyshape'];
export type HaloType = EdgeStyle['halo'];
export type LabelType = EdgeStyle['label'];
export type AnimateType = EdgeStyle['animate'];

/** Node Style Interface */

export const keyshape = (props: KeyshapeType) => {};

export const label = (props: LabelType) => {};

export const halo = (props: HaloType) => {};

export const animate = (props: AnimateType) => {};
