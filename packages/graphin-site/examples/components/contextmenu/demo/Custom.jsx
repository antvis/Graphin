/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { message } from 'antd';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import { ContextMenu } from '@antv/graphin-components';
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS

const data = Utils.mock(6)
  .circle()
  .graphin();
const styles = {
  list: {
    width: '100px',
    background: '#fff',
    border: '1px solid #ddd',
  },
  item: {
    height: '30px',
    inlineHeight: '30px',
    textAlign: 'center',
  },
};

const App = () => {
  const handleDelete = e => {
    const nodes = e.graph.findAllByState('node', 'selected');
    const nodeIds = nodes.map(node => node.get('id'));
    if (nodeIds.length === 0) {
      message.info(`oh,你好像没有选中节点...`);
    } else {
      message.info(`确认删除节点 ${nodeIds.join(';')} 吗？`);
    }
  };
  return (
    <div>
      <Graphin data={data} layout={{ name: 'concentric' }}>
        <ContextMenu
          render={props => {
            return (
              <div style={styles.list}>
                <div
                  style={styles.item}
                  onClick={() => {
                    handleDelete(props);
                  }}
                >
                  Delete
                </div>
                <div style={styles.item}>Copy</div>
              </div>
            );
          }}
        />
      </Graphin>
    </div>
  );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
