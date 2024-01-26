import { set } from 'lodash-es';
import { useSnapshot } from 'valtio';
import { SDKModel } from '../model';
import { PATH_PREFIX } from '../constants';
import { IModel } from '../types'; // Import the necessary types

export const useModel = (): [IModel, (path: string, value: unknown) => void] => {
  const model = useSnapshot(SDKModel);
  const setModel = (path: string, value: unknown) => {
    let realPath = path;
    const [prefix, ...rest] = path.split(':');
    if (rest.length) {
      realPath = `${PATH_PREFIX[prefix]}.${rest.join('.')}`;
    }
    set(SDKModel, realPath, value);
  };
  return [model, setModel];
};
