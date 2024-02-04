import ReactDOM from 'react-dom/client';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { message } from 'antd';
import Graphin, { Minimap, ClickSelect, ContextMenu, Toolbar, Tooltip, Snapline, Fisheye, Hull, Legend } from '../src';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const data = {
  nodes: [
    { id: 'node0', data: {} },
    { id: 'node1', data: {} },
    { id: 'node2', data: {} },
    { id: 'node3', data: {} },
    { id: 'node4', data: {} },
    { id: 'node5', data: {} },
    { id: 'node6', data: {} },
    { id: 'node7', data: {} },
    { id: 'node8', data: {} },
    { id: 'node9', data: {} },
    { id: 'node10', data: {} },
    { id: 'node11', data: {} },
    { id: 'node12', data: {} },
    { id: 'node13', data: {} },
    { id: 'node14', data: {} },
    { id: 'node15', data: {} },
    { id: 'node16', data: {} },
  ],
  edges: [
    { id: 'edge0', source: 'node0', target: 'node1' },
    { id: 'edge1', source: 'node0', target: 'node2' },
    { id: 'edge2', source: 'node0', target: 'node3' },
    { id: 'edge3', source: 'node0', target: 'node4' },
    { id: 'edge4', source: 'node0', target: 'node5' },
    { id: 'edge5', source: 'node1', target: 'node6' },
    { id: 'edge6', source: 'node1', target: 'node7' },
    { id: 'edge7', source: 'node2', target: 'node8' },
    { id: 'edge8', source: 'node2', target: 'node9' },
    { id: 'edge9', source: 'node2', target: 'node10' },
    { id: 'edge10', source: 'node2', target: 'node11' },
    { id: 'edge11', source: 'node2', target: 'node12' },
    { id: 'edge12', source: 'node2', target: 'node13' },
    { id: 'edge13', source: 'node3', target: 'node14' },
    { id: 'edge14', source: 'node3', target: 'node15' },
    { id: 'edge15', source: 'node3', target: 'node16' },
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
      <Minimap />
      <ClickSelect />
      <Toolbar />
      <Tooltip />
      {/* <Legend
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
                fontdata: {  ,
              },
              markerStyle: {
                shape: 'circle',
                data: {  ,
                color: type => {
                  return type === 'a' ? '#f00' : '#0f0';
                },
              },
            },
          }}
        /> */}
      <Hull
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
      />
      {/* <Snapline /> */}
      {/* <Fisheye /> */}
      <ContextMenu
        onClick={(item, model) => {
          menuRef.current(item);
        }}
      >
        {value => <CustomMenu {...value} ref={menuRef} />}
      </ContextMenu>
    </Graphin>
  );
};

root.render(<Demo></Demo>);
