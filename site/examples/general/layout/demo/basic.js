import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReactDOM from 'react-dom';
import { message } from 'antd';
import Graphin, {
  Minimap,
  ClickSelect,
  ContextMenu,
  Toolbar,
  Tooltip,
  Snapline,
  Fisheye,
  Hull,
  Legend,
} from '@antv/graphin';

const data = {
  nodes: [
    { id: 'node0', size: 50, nodeType: 'a' },
    { id: 'node1', size: 30, nodeType: 'a' },
    { id: 'node2', size: 30, nodeType: 'a' },
    { id: 'node3', size: 30, nodeType: 'a' },
    { id: 'node4', size: 30, isLeaf: true, nodeType: 'b' },
    { id: 'node5', size: 30, isLeaf: true, nodeType: 'b' },
    { id: 'node6', size: 15, isLeaf: true, nodeType: 'b' },
    { id: 'node7', size: 15, isLeaf: true, nodeType: 'b' },
    { id: 'node8', size: 15, isLeaf: true, nodeType: 'b' },
    { id: 'node9', size: 15, isLeaf: true, nodeType: 'b' },
    { id: 'node10', size: 15, isLeaf: true, nodeType: 'b' },
    { id: 'node11', size: 15, isLeaf: true, nodeType: 'b' },
    { id: 'node12', size: 15, isLeaf: true, nodeType: 'b' },
    { id: 'node13', size: 15, isLeaf: true, nodeType: 'b' },
    { id: 'node14', size: 15, isLeaf: true, nodeType: 'b' },
    { id: 'node15', size: 15, isLeaf: true, nodeType: 'b' },
    { id: 'node16', size: 15, isLeaf: true, nodeType: 'b' },
  ],
  edges: [
    { source: 'node0', target: 'node1' },
    { source: 'node0', target: 'node2' },
    { source: 'node0', target: 'node3' },
    { source: 'node0', target: 'node4' },
    { source: 'node0', target: 'node5' },
    { source: 'node1', target: 'node6' },
    { source: 'node1', target: 'node7' },
    { source: 'node2', target: 'node8' },
    { source: 'node2', target: 'node9' },
    { source: 'node2', target: 'node10' },
    { source: 'node2', target: 'node11' },
    { source: 'node2', target: 'node12' },
    { source: 'node2', target: 'node13' },
    { source: 'node3', target: 'node14' },
    { source: 'node3', target: 'node15' },
    { source: 'node3', target: 'node16' },
  ],
};

const CustomMenu = forwardRef((props, ref) => {
  const handleClick = e => {
    const { id } = props;
    message.info(`${e.key}:${id}`);
  };

  useImperativeHandle(ref, () => handleClick);

  return (
    <React.Fragment>
      <p data-key="copy">复制</p>
      <p data-key="delete">删除</p>
      <p data-key="tag" style={{ marginBottom: 0 }}>
        打标
      </p>
    </React.Fragment>
  );
});

const Demo = () => {
  const menuRef = useRef(null);
  return (
    <Graphin
      data={data}
      layout={{
        type: 'force',
        linkDistance: 50,
        animated: true,
        clustering: true,
        nodeClusterBy: 'cluster',
        clusterNodeStrength: 100,
      }}
    >
      {/* <Minimap />
      <ClickSelect /> */}
      {/* <Toolbar /> */}
      {/* <Tooltip /> */}
      <Legend
        options={{
          background: '#eee',
          node: {
            enable: true,
            padding: 10,
            typeField: 'nodeType',
            rows: 1,
            cols: 4,
            labelStyle: {
              spacing: 8,
              fontSize: 20,
            },
            markerStyle: {
              shape: 'circle',
              size: 10,
              color: type => {
                return type === 'a' ? '#f00' : '#0f0';
              },
            },
          },
        }}
      />
      {/* <Hull
        options={{
          style: {
            fill: 'green',
          },
          hulls: [
            {
              members: ['node4', 'node5'],
            },
          ],
        }}
      /> */}
      {/* <Snapline /> */}
      {/* <Fisheye /> */}
      {/* <ContextMenu
        onClick={(item, model) => {
          menuRef.current(item);
        }}
      >
        {value => <CustomMenu {...value} ref={menuRef} />}
      </ContextMenu> */}
    </Graphin>
  );
};

ReactDOM.render(<Demo />, document.getElementById('container'));
