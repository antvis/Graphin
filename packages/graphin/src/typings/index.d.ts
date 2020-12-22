import { IG6GraphEvent } from '@antv/g6/es/types';
import { GraphinProps, GraphinState, IUserNode, IUserEdge, IGraphData, ITreeData } from './type';

declare global {
  /** Graphin2.0 */
  export namespace IGraphin {
    type Props = GraphinProps;
    type State = GraphinState;
    type UserNode = IUserNode;
    type UserEdge = IUserEdge;
    type GraphData = IGraphData;
    type TreeData = ITreeData;
  }
  /** G6 Type */
  export namespace IG6 {
    type Event = IG6GraphEvent;
  }
}
