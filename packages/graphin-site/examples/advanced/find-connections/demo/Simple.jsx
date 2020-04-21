/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';
import { message } from 'antd';
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import '@antv/graphin-components/dist/index.css'; // 引入Graphin CSS

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));

const App = () => {
  const [state, setState] = React.useState({
    selected: [],
    data: Utils.mock(20)
      .random()
      .graphin(),
  });

  const { data, selected } = state;
  const graphRef = React.createRef(null);
  React.useEffect(() => {
    const { graph } = graphRef.current;

    // TODO:框选进行关系扩散，暂时不支持多选
    const onNodeSelectChange = e => {
      if (e.target) {
        console.info('圈选是targets参数');
        return;
      }
      const nodes = e.targets.nodes.map(node => {
        return node.get('model');
      });

      setState({
        ...state,
        selected: nodes,
      });
    };
    graph.on('nodeselectchange', onNodeSelectChange);

    return () => {
      graph.off('nodeselectchange', onNodeSelectChange);
    };
  }, [state]);

  const onFindConnections = () => {
    if (selected.length === 0) {
      message.info('请先选中/圈选节点');
      return;
    }

    const findConnectionData = { nodes: [], edges: [] };
    // 1度扩散，中间经历一个节点
    const sortArray = chunk(selected, 2);
    sortArray.forEach(arr => {
      const [source, target = selected[0]] = arr;

      const relativeNode = {
        id: `find-node-${source.id}-${target.id}`,
        shape: 'CanonicalCircleNode',
        label: 'discover node',
        style: {
          primaryColor: '#ff7617',
          icon: 'home',
          nodeSize: 20,
        },
        data: {
          id: `find-node-${source.id}-${target.id}`,
        },
      };
      findConnectionData.nodes.push(...arr, relativeNode);
      findConnectionData.edges.push(
        {
          source: source.id,
          target: relativeNode.id,
          shape: 'CanonicalLineEdge',
          label: '一度发现',
          style: {
            line: {
              dash: [2, 2],
            },
          },
          data: {
            source: source.id,
            target: relativeNode.id,
          },
        },
        {
          source: relativeNode.id,
          target: target.id,
          shape: 'CanonicalLineEdge',
          label: '一度发现',
          style: {
            line: {
              dash: [2, 2],
            },
          },
          data: {
            source: relativeNode.id,
            target: target.id,
          },
        },
      );
    });

    setState({
      ...state,
      data: {
        // 还需要对Node和Edge去重，这里暂不考虑
        nodes: [...state.data.nodes, ...findConnectionData.nodes],
        edges: [...state.data.edges, ...findConnectionData.edges],
      },
    });
  };

  return (
    <div className="App">
      <h3>
        基于力导的关系发现：按住Shift圈选你需要发现关系的节点
        <button onClick={onFindConnections} style={{ float: 'right', height: '28px', lineHeight: '28px' }}>
          点击发现关系
        </button>
      </h3>
      <Graphin
        data={data}
        layout={{
          name: 'force',
          options: {
            defSpringLen: (_edge, source, target) => {
              /** 默认返回的是 200 的弹簧长度 */
              /** 如果你要想要产生聚类的效果，可以考虑 根据边两边节点的度数来动态设置边的初始化长度：度数越小，则边越短 */
              const nodeSize = 30;
              const Sdegree = source.data.layout?.degree;
              const Tdegree = target.data.layout?.degree;
              const minDegree = Math.min(Sdegree, Tdegree);
              return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize * 2;
            },
          },
        }}
        ref={graphRef}
      >
        <Toolbar style={{ position: 'absolute', bottom: 28, left: 28 }} />
      </Graphin>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
