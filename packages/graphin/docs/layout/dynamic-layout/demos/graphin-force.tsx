/* eslint-disable no-undef */
import React from 'react';
import { Row, Col, Card } from 'antd';
import Graphin, { Utils } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import { TagFilled, DeleteFilled, ExpandAltOutlined } from '@ant-design/icons';

// 引入Graphin CSS

const { Menu } = ContextMenu;
const defSpreingLen = (_edge, source, target) => {
  // NOTE: 固定200还是效果好
  return 200;
  /** 默认返回的是 200 的弹簧长度 */
  /** 如果你要想要产生聚类的效果，可以考虑 根据边两边节点的度数来动态设置边的初始化长度：度数越小，则边越短 */
  const nodeSize = 30;
  const Sdegree = source.data.layout.degree;
  const Tdegree = target.data.layout.degree;
  const minDegree = Math.min(Sdegree, Tdegree);
  console.log(minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize);
  return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize;
};

const App = () => {
  const [state, setState] = React.useState({
    selected: [],
    data: Utils.mock(5).circle().graphin(),
  });

  const handleChange = (menuItem, menuData) => {
    console.log(menuItem, menuData);
    const count = 4;
    const expandData = Utils.mock(count).expand([menuData]).type('company').graphin();

    setState({
      ...state,
      data: {
        // 还需要对Node和Edge去重，这里暂不考虑
        nodes: [...state.data.nodes, ...expandData.nodes],
        edges: [...state.data.edges, ...expandData.edges],
      },
    });
  };
  const { data } = state;
  return (
    <div className="App">
      <Row gutter={16}>
        <Col span={12}>
          <Card title="GraphinForce：无动画扩散">
            <Graphin
              data={data}
              layout={{
                type: 'graphin-force',
                preset: {
                  type: 'concentric',
                },
                animation: false,
                defSpringLen: defSpreingLen,
              }}
            >
              <ContextMenu bindType="node" style={{ width: 100 }}>
                <Menu
                  bindType="node"
                  options={[
                    {
                      key: 'expand',
                      icon: <ExpandAltOutlined />,
                      name: '一度扩散',
                    },
                    {
                      key: 'tag',
                      icon: <TagFilled />,
                      name: '节点打标',
                    },
                    {
                      key: 'delete',
                      icon: <DeleteFilled />,
                      name: '节点删除',
                    },
                  ]}
                  onChange={handleChange}
                />
              </ContextMenu>
            </Graphin>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="GraphinForce：有动画扩散">
            <Graphin
              data={data}
              layout={{
                type: 'graphin-force',
                preset: {
                  type: 'concentric',
                },
                animation: true,
                defSpringLen: defSpreingLen,
              }}
            >
              <ContextMenu bindType="node" style={{ width: 100 }}>
                <Menu
                  bindType="node"
                  options={[
                    {
                      key: 'expand',
                      icon: <ExpandAltOutlined />,
                      name: '一度扩散',
                    },
                    {
                      key: 'tag',
                      icon: <TagFilled />,
                      name: '节点打标',
                    },
                    {
                      key: 'delete',
                      icon: <DeleteFilled />,
                      name: '节点删除',
                    },
                  ]}
                  onChange={handleChange}
                />
              </ContextMenu>
            </Graphin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default App;
