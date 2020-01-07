import Graphin from '../Graphin';
import { G6Event } from '../types';

const dragWithForce = (graphin: Graphin) => {
  const { graph, g6Options } = graphin;

  const { autoFollowWithForce = true, autoPinWithForce = true, restartForceOnDrag = true } = g6Options!;

  /** 拖拽Force节点：start */
  graph!.on('node:dragstart', () => {
    if (graphin.state.forceSimulation) {
      graphin.state.forceSimulation.stop();
    }
  });

  /** 拖拽结束 */
  graph!.on('node:dragend', (e: G6Event) => {
    if (graphin.state.forceSimulation && autoFollowWithForce && restartForceOnDrag) {
      const nodeModel = e.item.get('model');
      nodeModel.x = e.x;
      nodeModel.y = e.y;
      // 策略：拖拽后就定在拖拽处
      nodeModel.layout = {
        ...nodeModel.layout,
        force: {
          mass: autoPinWithForce ? 1000000 : null,
        },
      };
      // TODO :未来多选可以拖拽。
      const drageNodes = [nodeModel];

      graphin.state.forceSimulation.restart(drageNodes, graph!);
      graph!.refreshPositions();
    }
  });
};
export default dragWithForce;
