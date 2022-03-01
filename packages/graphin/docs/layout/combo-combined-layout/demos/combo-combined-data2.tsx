/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import Graphin, { Behaviors } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import G6 from '@antv/g6';
import cloneDeep from '../../../../lib/utils/cloneDeep';

const { DragCombo } = Behaviors;
const { Menu } = ContextMenu;

const COMBO_STATE_STYLES = {
  'selected': {
    lineWidth: 3,
    'text-shape': {
      fontWeight: 500
    }
  },
  'active': {
    lineWidth: 3,
    'text-shape': {
      fontWeight: 500
    }
  },
  'hightlight': {
    lineWidth: 3,
    'text-shape': {
      fontWeight: 500
    }
  },
  'inactive': {
    lineWidth: 1,
    fillOpacity: 0,
    strokeOpacity: 0.2,
    'text-shape': {
      opacity: 0.3
    }
  }
}

const colors = [
  '#5F95FF',
  '#61DDAA',
  '#65789B',
  '#F6BD16',
  '#7262FD',
  '#78D3F8',
  '#9661BC',
  '#F6903D',
  '#008685',
  '#F08BB4',
]

/** 数据 */
const data = {
  nodes: [
    {
      id: '0',
      label: '0',
      comboId: 'a',
    },
    {
      id: '1',
      label: '1',
      comboId: 'a',
    },
    {
      id: '2',
      label: '2',
      comboId: 'a',
    },
    {
      id: '3',
      label: '3',
      comboId: 'a',
    },
    {
      id: '4',
      label: '4',
      comboId: 'a',
    },
    {
      id: '5',
      label: '5',
      comboId: 'a',
    },
    {
      id: '6',
      label: '6',
      comboId: 'a',
    },
    {
      id: '7',
      label: '7',
      comboId: 'a',
    },
    {
      id: '8',
      label: '8',
      comboId: 'a',
    },
    {
      id: '9',
      label: '9',
      comboId: 'a',
    },
    {
      id: '10',
      label: '10',
      comboId: 'a',
    },
    {
      id: '11',
      label: '11',
      comboId: 'a',
    },
    {
      id: '12',
      label: '12',
      comboId: 'a',
    },
    {
      id: '13',
      label: '13',
      comboId: 'b',
    },
    {
      id: '14',
      label: '14',
      comboId: 'b',
    },
    {
      id: '15',
      label: '15',
      comboId: 'b',
    },
    {
      id: '16',
      label: '16',
      comboId: 'b',
    },
    {
      id: '17',
      label: '17',
      comboId: 'b',
    },
    {
      id: '18',
      label: '18',
      comboId: 'c',
    },
    {
      id: '19',
      label: '19',
      comboId: 'c',
    },
    {
      id: '20',
      label: '20',
      comboId: 'c',
    },
    {
      id: '21',
      label: '21',
      comboId: 'c',
    },
    {
      id: '22',
      label: '22',
      comboId: 'c',
    },
    {
      id: '23',
      label: '23',
      comboId: 'c',
    },
    {
      id: '24',
      label: '24',
      comboId: 'c',
    },
    {
      id: '25',
      label: '25',
      comboId: 'c',
    },
    {
      id: '26',
      label: '26',
      comboId: 'c',
    },
    {
      id: '27',
      label: '27',
      comboId: 'c',
    },
    {
      id: '28',
      label: '28',
      comboId: 'c',
    },
    {
      id: '29',
      label: '29',
      comboId: 'c',
    },
    {
      id: '30',
      label: '30',
      comboId: 'c',
    },
    {
      id: '31',
      label: '31',
      comboId: 'd',
    },
    {
      id: '32',
      label: '32',
      comboId: 'd',
    },
    {
      id: '33',
      label: '33',
      comboId: 'd',
    },
  ],
  edges: [
    {
      source: 'a',
      target: 'b',
      size: 3,
      style: {
        stroke: 'red',
      },
    },
    {
      source: 'a',
      target: '33',
      size: 3,
      style: {
        stroke: 'blue',
      },
    },
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '8',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '0',
      target: '10',
    },
    {
      source: '0',
      target: '11',
    },
    {
      source: '0',
      target: '13',
    },
    {
      source: '0',
      target: '14',
    },
    {
      source: '0',
      target: '15',
    },
    {
      source: '0',
      target: '16',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '7',
      target: '13',
    },
    {
      source: '8',
      target: '14',
    },
    {
      source: '9',
      target: '10',
    },
    {
      source: '10',
      target: '22',
    },
    {
      source: '10',
      target: '14',
    },
    {
      source: '10',
      target: '12',
    },
    {
      source: '10',
      target: '24',
    },
    {
      source: '10',
      target: '21',
    },
    {
      source: '10',
      target: '20',
    },
    {
      source: '11',
      target: '24',
    },
    {
      source: '11',
      target: '22',
    },
    {
      source: '11',
      target: '14',
    },
    {
      source: '12',
      target: '13',
    },
    {
      source: '16',
      target: '17',
    },
    {
      source: '16',
      target: '18',
    },
    {
      source: '16',
      target: '21',
    },
    {
      source: '16',
      target: '22',
    },
    {
      source: '17',
      target: '18',
    },
    {
      source: '17',
      target: '20',
    },
    {
      source: '18',
      target: '19',
    },
    {
      source: '19',
      target: '20',
    },
    {
      source: '19',
      target: '33',
    },
    {
      source: '19',
      target: '22',
    },
    {
      source: '19',
      target: '23',
    },
    {
      source: '20',
      target: '21',
    },
    {
      source: '21',
      target: '22',
    },
    {
      source: '22',
      target: '24',
    },
    {
      source: '22',
      target: '25',
    },
    {
      source: '22',
      target: '26',
    },
    {
      source: '22',
      target: '23',
    },
    {
      source: '22',
      target: '28',
    },
    {
      source: '22',
      target: '30',
    },
    {
      source: '22',
      target: '31',
    },
    {
      source: '22',
      target: '32',
    },
    {
      source: '22',
      target: '33',
    },
    {
      source: '23',
      target: '28',
    },
    {
      source: '23',
      target: '27',
    },
    {
      source: '23',
      target: '29',
    },
    {
      source: '23',
      target: '30',
    },
    {
      source: '23',
      target: '31',
    },
    {
      source: '23',
      target: '33',
    },
    {
      source: '32',
      target: '33',
    },
  ],
  combos: [
    {
      id: 'a',
      label: 'combo a',
    },
    {
      id: 'b',
      label: 'combo b',
    },
    {
      id: 'c',
      label: 'combo c',
    },
    {
      id: 'd',
      label: 'combo d',
      parentId: 'b',
    },
  ],
}

let comboPositionCache = {};

const defaultLayout = {
  type: 'comboCombined',
  animation: false,
  comboPadding: 120,
  innerLayout: new G6.Layout['concentric']({ sortBy: 'degree' }),
  outerLayout: new G6.Layout['gForce']({
    preventOverlap: true,
    animate: false, // for gForce and fruchterman
    gravity: 1,
    factor: 2,
    nodeStrength: 100,
    linkDistance: (edge, source, target) => {
      const nodeSize = ((source.size?.[0] || 40) + (target.size?.[0] || 40)) / 2;
      return Math.min(nodeSize * 1.5 + 150, 700);
    },
  }),
  refresh: 0
}

const Demo = () => {
  const graphinRef = React.createRef();
  const [comboMap, setComboMap] = useState({});
  const [comboChildMap, setComboChildMap] = useState({});
  const [nodeMap, setNodeMap] = useState({});
  const [graphData, setGraphData] = useState({});
  const [comboAction, setComboAction] = useState();
  const [uncomboedList, setUncomboedList] = useState([]);
  const [layout, setLayout] = useState(defaultLayout);

  useEffect(() => {
    // 合并跨 combo 边
    const gData = processData();
    setGraphData(gData);
    bindGraphEvents(gData);
    const { graph } = graphinRef.current;
    setTimeout(() => {
      if (graph && !graph.destroyed) {
        graph.getEdges().forEach(edge => edge.refresh());
      }
    }, 501);
  }, []);

  useEffect(() => {
    const { delay, item, action } = comboAction || {};
    const { graph } = graphinRef.current;
    if (!item || !graph || graph.destroyed) return;
    if (action === 'uncombo') {
      uncombo(item, delay);
    } else if (action === 'add-combo') {
      addCombo(item.getModel());
    }
  }, [comboAction])

  const processData = () => {
    const map = {};
    const cMap = {};
    const nMap = {};
    data.nodes.forEach(node => nMap[node.id] = node);
    data.combos.forEach(combo => cMap[combo.id] = combo);
    const gData = {
      nodes: cloneDeep(data.nodes),
      combos: cloneDeep(data.combos),
      edges: []
    }

    gData.edges = processEdges(gData, nMap, []);

    gData.nodes.forEach(node => {
      nMap[node.id] = node;
      if (node.comboId) {
        if (!map[node.comboId]) map[node.comboId] = [];
        map[node.comboId].push(node);
      }
    });
    gData.combos.forEach(combo => {
      combo.isCombo = true;
      cMap[combo.id] = combo;
      if (combo.parentId) {
        if (!map[combo.parentId]) map[combo.parentId] = [];
        map[combo.parentId].push(combo);
      }
    });
    // 处理颜色
    Object.keys(map).forEach((comboId, i) => {
      const color = cMap[comboId]?.color || colors[i % colors.length];
      cMap[comboId].color = color;
      cMap[comboId].style = {
        fill: color,
        stroke: color,
        fillOpacity: 0.2
      }
      map[comboId].forEach(child => {
        child.color = color;
        child.style = {
          keyshape: {
            fill: color,
            stroke: color,
            fillOpacity: 0.2
          }
        }
      });
    });

    setComboChildMap(map);
    setComboMap(cMap);
    setNodeMap(nMap);

    return gData;
  }

  const bindGraphEvents = (gData) => {
    const { graph } = graphinRef.current;
    if (graph && !graph.destroyed) {
      // 双击 combo 解散，恢复相关的边（包括内部元素到其他 combo 的边）
      graph.on('combo:dblclick', e => {
        setComboAction({
          item: e.item,
          delay: 200,
          action: 'uncombo'
        });
      });
      // 接收从 contextmenu 传过来的合并事件
      graph.on('comboparent', e => {
        const { currentItem } = e;
        setComboAction({
          item: currentItem,
          action: 'add-combo'
        });
      });
    }
  }

  const uncombo = (combo, delay = 0) => {
    const { graph } = graphinRef.current;
    const comboId = combo.getID();
    const comboChildren = combo.getChildren();
    const children = comboChildren.nodes.concat(comboChildren.combos);
    const childNodeIds = children.map(child => child.getID());
    
    // 更新数据之前的动画：combo 缩小+渐隐动画
    combo.getKeyShape().animate(
      { r: 1, opacity: 0 },
      {
        duration: 300,
        delay,
        easing: 'easeCubic',
      }
    );
    const newUncomboedList = [...uncomboedList, comboId];
    // 在重新布局前，为节点增加 mass 等参数，保证重新布局的稳定
    const newData = {
      nodes: graphData.nodes,
      combos: graphData.combos.filter(combo => combo.id !== comboId),
      edges: []
    }
    newData.edges = processEdges(newData, nodeMap, newUncomboedList);
    newData.nodes.forEach(node => {
      if (childNodeIds.includes(node.id)) {
        delete node.fx;
        delete node.fy;
        node.mass = 200;
        return;
      }
      if (!isNaN(nodeMap[node.id]?.x) && !isNaN(nodeMap[node.id]?.x)) {
        node.fx = nodeMap[node.id]?.x;
        node.fy = nodeMap[node.id]?.y;
        node.mass = 300;
      }
    });
    comboPositionCache = {};
    graph.getCombos().forEach(item => {
      const model = item.getModel();
      if (childNodeIds.includes(model.id)) {
        delete comboMap[model.id].parentId;
        return;
      }
      comboPositionCache[model.id] = {
        x: model.x,
        y: model.y
      }
    });
    // 触发重新布局
    setTimeout(() => {
      setGraphData(newData);
      setLayout({
        ...defaultLayout,
        refresh: Math.random()
      })
      setUncomboedList(newUncomboedList);
    }, 300 + delay);
  }

  const addCombo = (nodeModel) => {
    const { graph } = graphinRef.current;
    // 找到该节点原先所在 combo id
    const comboId = nodeModel.comboId;
    if (!comboId) return;
    // 计算该 combo 子元素的平均中心
    const meanCenter = { x: 0, y: 0, count: 0 };
    comboChildMap[comboId].forEach(child => {
      meanCenter.x += (child.x || 0);
      meanCenter.y += (child.y || 0);
      meanCenter.count++;
    });
    meanCenter.x /= meanCenter.count;
    meanCenter.y /= meanCenter.count;

    const newUncomboedList = [...uncomboedList];
    const comboIdIdx = newUncomboedList.indexOf(comboId);
    newUncomboedList.splice(comboIdIdx, 1);

    const newData = {
      nodes: graphData.nodes,
      combos: graphData.combos,
      edges: []
    }
    // 新增 combo
    const newCombo = {
      id: comboId,
      label: comboId,
      x: meanCenter.x,
      y: meanCenter.y,
      mass: 300,
      color: nodeModel.color,
      style: {
        fill: nodeModel.color,
        stroke: nodeModel.color,
        fillOpacity: 0.2
      }
    };
    comboMap[comboId] = newCombo;
    newData.combos.push(newCombo);
    comboChildMap[comboId].forEach(child => {
      if (comboMap[child.id]) {
        comboMap[child.id].parentId = comboId;
      }
      const childItem = graph.findById(child.id);
      if (!childItem) return;
      graph.updateComboTree(child.id, comboId);
    });
    // 恢复边
    newData.edges = processEdges(newData, nodeMap, newUncomboedList);
    setUncomboedList(newUncomboedList);
    setGraphData(newData);
    setLayout({
      ...defaultLayout,
      refresh: Math.random()
    });
  }

  const processEdges = (currentData, nMap, filterList = []) => {
    const edges = [];
    const currentDataMap = {};
    currentData.nodes.concat(currentData.combos).forEach(model => currentDataMap[model.id] = model);
    const edgeMap = {};
    data.edges.forEach(edge => {
      let sourceId = edge.source;
      let targetId = edge.target;
      const sourceComboId = nMap[sourceId]?.comboId;
      const targetComboId = nMap[targetId]?.comboId;
      let comboEnd = false;
      let currentEdge = edge;
      // 若端点是在 combo 中，将边连接到 combo 上
      if (sourceComboId && filterList.indexOf(sourceComboId) < 0) {
        sourceId = sourceComboId;
        comboEnd = true;
      }
      if (targetComboId && filterList.indexOf(targetComboId) < 0) {
        targetId = targetComboId;
        comboEnd = true;
      }
      if (comboEnd) {
        const key = `${edge.source}-${edge.target}`;
        if (!edgeMap[key]) {
          const isLoop = sourceComboId === targetComboId;
          currentEdge = {
            ...edge,
            source: sourceId,
            target: targetId,
            weight: 1,
            type: isLoop ? 'loop' : 'line',
            loopCfg: {
              position: 'top',
              dist: 80,
            },
            style: {
              lineWidth: 1,
              lineDash: [15, 15]
            }
          };
          edgeMap[key] = currentEdge;
        } else {
          edgeMap[key].style.lineWidth ++;
        }
      }
      // 若起点、终点都存在于数据中，则加入该边
      if (currentDataMap[currentEdge.source] && currentDataMap[currentEdge.target]) {
        edges.push(currentEdge);
      }
      
    });
    return edges;
  }

  return (
    <div className="App">
      <Graphin
        ref={graphinRef}
        data={graphData}
        layout={layout}
        groupByTypes={false}
        defaultCombo={{
          style: {
            opacity: 0.6
          }
        }}
        comboStateStyles={COMBO_STATE_STYLES}
        animate={true}
        animateCfg={{
          duration: 800,
          easing: 'easeCubic'
        }}
      >
        <DragCombo />
        <ContextMenu>
          <Menu
            bindType="node"
            options={[
              {
                key: 'combo',
                name: '合并到父 combo',
              },
            ]}
            onChange={(menuItem, nodeModel) => addCombo(nodeModel)}
          />
        </ContextMenu>
      </Graphin>
    </div>
  );
};
export default Demo;
