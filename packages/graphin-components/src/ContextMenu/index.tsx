import React, { useEffect } from 'react';
import { GraphinContext } from '@antv/graphin';

interface IContextMenuProps {
  children: any;
}

const ContextMenu: React.FunctionComponent<IContextMenuProps> = (props) => {
  const { children } = props;
  const { graph } = React.createContext(GraphinContext);
  useEffect(() => {
    graph.on(`${bindType}:contextmenu`, (e: IG6GraphEvent) => {});
  }, []);
  return <div>{}</div>;
};

export default ContextMenu;
