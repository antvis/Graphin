import React from 'react';
import { GraphinContext } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';

const { Menu } = ContextMenu;

interface CustomMenuProps {
  expandNeighbors: (nodeId: string, degree: number) => void;
}

const CustomMenu: React.FunctionComponent<CustomMenuProps> = props => {
  const { expandNeighbors } = props;
  const graphin = React.useContext(GraphinContext);

  const { contextmenu } = graphin;
  const model = contextmenu.node.item.getModel();

  const handleClose = () => {
    contextmenu.node.handleClose();
  };

  const handleFind = (degree: number) => {
    expandNeighbors(model.id, degree);
    handleClose();
  };

  return (
    <Menu bindType="node">
      <Menu.Item onClick={() => handleFind(1)}>一度关系</Menu.Item>
      <Menu.Item onClick={() => handleFind(2)}>二度关系</Menu.Item>
      <Menu.Item onClick={() => handleFind(3)}>三度关系</Menu.Item>
      <Menu.Item onClick={() => handleFind(4)}>四度关系</Menu.Item>
    </Menu>
  );
};

export default CustomMenu;
