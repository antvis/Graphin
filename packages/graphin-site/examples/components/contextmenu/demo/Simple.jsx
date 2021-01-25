/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { message } from 'antd';
import { DeleteOutlined, SelectOutlined } from '@ant-design/icons';
// import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import { ContextMenu } from '@antv/graphin-components';
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS

const data = Utils.mock(6).circle().graphin();

const App = () => {
  const options = [
    {
      key: 'deleteNode',
      title: 'Delete',
      visible: true,
      iconType: <DeleteOutlined />,
      onClick: (e) => {
        const nodes = e.graph.findAllByState('node', 'selected');
        const nodeIds = nodes.map((node) => node.get('id'));
        if (nodeIds.length === 0) {
          message.info(`oh,你好像没有选中节点...`);
        } else {
          message.info(`确认删除节点 ${nodeIds.join(';')} 吗？`);
        }
      },
    },
    {
      key: 'invertSelect',
      title: 'Invert Select',
      iconType: <SelectOutlined />,
      visible: true,
      onClick: () => {},
    },
  ];

  return (
    <div>
      <Graphin data={data} layout={{ name: 'concentric' }}>
        <ContextMenu options={options} />
      </Graphin>
    </div>
  );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
