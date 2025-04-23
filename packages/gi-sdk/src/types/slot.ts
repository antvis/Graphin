import type { ReactNode } from 'react';
import type { ID } from './id';

export type Slot = ID[] | Record<string, ID[]>;

export type SlotElements<K extends string = string> = {
  [key in K]?: ReactNode;
};
