// import * as d3 from 'd3';
// import cloneDeep from 'lodash/cloneDeep';
// import { LayoutOptionBase, Data } from '../../types';

// export interface D3ForceLayoutOptions extends LayoutOptionBase {
//     center: [number, number];
// }

// const d3Force = (data: Data, options: D3ForceLayoutOptions) => {
//     const source = cloneDeep(data);
//     const { nodes } = source;
//     const { graph, center } = options;
//     const simulation = d3
//         .forceSimulation(nodes)
//         .force('charge', d3.forceManyBody())
//         .force('center', d3.forceCenter(center[0], center[1]));

//     simulation.on('tick', () => {
//         graph.refreshPositions();
//     });

//     return {
//         simulation,
//         data: {
//             nodes,
//             edges: data.edges,
//         },
//     };
// };
// export default d3Force;
