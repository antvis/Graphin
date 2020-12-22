import * as React from 'react';

const processValue = (params) => {
  if (typeof params === 'string' && params.endsWith('px')) {
    return Number(params.slice(0, -2));
  }
  return Number(params);
};

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IMenuProps {
  children: any;
  style?: {
    width: number | string;
    height: number | string;
  };
}
const Item = (props) => {
  const { children } = props;

  return <div>{children}</div>;
};
const Menu: React.FunctionComponent<IMenuProps> & {
  Item: typeof Item;
} = (props) => {
  const { children } = props;
  return <div>{children}</div>;
};

Menu.Item = Item;

export default Menu;
