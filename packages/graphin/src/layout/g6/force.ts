// import G6 from '@antv/g6';
// import cloneDeep from 'lodash/cloneDeep';
// import { LayoutOptionBase, Data } from '../../types';

// export interface G6ForceLayoutOptions extends LayoutOptionBase {
//     center: [number, number];
//     linkDistance: number;
//     preventOverlap: boolean;
//     nodeSize: number;
//     tick: () => void;
// }

// const g6Force = (data: Data, options: G6ForceLayoutOptions) => {
//     const source = cloneDeep(data);
//     // eslint-disable-next-line new-cap
//     const layout = new G6.Layout.force({
//         ...options,
//     });
//     layout.init(source);
//     layout.execute();

//     return {
//         data: {
//             nodes: layout.nodes,
//             edges: layout.edges,
//         },
//         forceSimulation: layout.forceSimulation,
//     };
// };
// export default g6Force;
