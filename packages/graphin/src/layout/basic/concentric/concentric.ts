// import unChunk from './unChunk';
// import calculateCircleR from './calculateCircleR';
// import circleLayout from '../circle';
// import { sortNodesByDegree } from '../utils/graph';

// const defaults = {
//     layerNumber: 4,
//     sortByDegree: true,
//     type: 'compact',
//     r: 40,
//     gap: 8,
//     innerR: 100,
// };
// class ConcentricLayout {
//     constructor(params) {
//         this.props = {
//             ...defaults,
//             ...params,
//         };
//         this.state = {
//             nodes: this.props.data.nodes,
//             edges: this.props.data.edges,
//             sortNodes: this.props.data.nodes,
//             chunkNodes: [[]],
//         };
//         this.run();
//     }

//     run() {
//         this.sortNodes();
//         this.chooseType();
//     }

//     sortNodes() {
//         const { data, sortByDegree } = this.props;
//         const { nodes } = sortNodesByDegree(data, sortByDegree);

//         this.setState({
//             sortNodes: nodes,
//         });
//     }

//     chooseType() {
//         const { type } = this.props;
//         switch (type) {
//             case 'average':
//                 this.averageLayout();
//                 break;
//             case 'compact':
//                 this.compactLayout();
//                 break;
//             case 'standard':
//                 this.standardLayout();
//                 break;
//             default:
//                 this.standardLayout();
//                 break;
//         }
//         this.calculateNodes();
//     }

//     standardLayout() {
//         // 标准的就是cy的算法，根据度数的区间来存储nodes，
//         /**
//          * 比如 degreeRange为25，那么0-5度的放在数组1，6-10放在数组2..
//          */
//         const { layerNumber } = this.props;
//         const { sortNodes } = this.state;
//         const maxDegree = sortNodes[0].degree;
//         const minDegree = sortNodes[sortNodes.length - 1].degree;

//         const degreeArray = [];
//         for (let i = minDegree; i <= maxDegree; i++) {
//             degreeArray.push(i);
//         }
//         const newDegreeArray = unChunk(degreeArray, layerNumber);
//         const chunkNodes = [];
//         sortNodes.forEach(node => {
//             newDegreeArray.forEach((degree, degreeIndex) => {
//                 if (degree.indexOf(node.degree) !== -1) {
//                     if (chunkNodes[degreeIndex]) {
//                         chunkNodes[degreeIndex].push(node);
//                     } else {
//                         chunkNodes[degreeIndex] = [node];
//                     }
//                 } else {
//                     chunkNodes[degreeIndex] = [];
//                 }
//             });
//         });

//         // 计算最外层圆的半径

//         this.setState({
//             chunkNodes,
//         });
//     }

//     compactLayout() {
//         const {
//             r, // 小圆的半径,
//             innerR, // 第一圈距离圆心的位置
//             gap,
//         } = this.props;
//         const { sortNodes } = this.state;
//         // 紧凑同心圆，需要将
//         const newNodes = [];
//         const N = sortNodes.length;
//         // const R = [innerR + r + r * 0, innerR + r + r * 2, innerR + r + r * 4];
//         const nArray = [];
//         let nSum = 0;

//         for (let i = 0; nSum < N; i++) {
//             const n = parseInt((2 * Math.PI * (innerR + r + 2 * i * r)) / (2 * r + gap));
//             nArray.push(n);
//             nSum = nArray.reduce((pre, curr) => {
//                 return pre + curr;
//             }, 0);
//         }

//         const sliceArray = [];
//         nArray.reduce((pre, curr) => {
//             let sum = pre + curr;
//             if (sum > N) {
//                 sum = N;
//             }
//             sliceArray.push(sum);
//             return sum;
//         }, 0);
//         for (let i = 0; i < sliceArray.length; i++) {
//             let nodes;
//             if (i === 0) {
//                 nodes = sortNodes.slice(0, sliceArray[i]);
//             } else {
//                 nodes = sortNodes.slice(sliceArray[i - 1], sliceArray[i]);
//             }
//             newNodes.push(nodes);
//         }

//         // 紧凑同心圆的半径
//         const compactR = [];
//         for (let i = 0; i < nArray.length; i++) {
//             const tempR = innerR + r + r * 2 * i;
//             compactR.push(tempR);
//         }

//         this.setState({
//             chunkNodes: newNodes,
//             compactR,
//         });
//     }

//     averageLayout() {
//         const { sortNodes } = this.state;
//         const newNodes = unChunk(sortNodes, this.props.layerNumber);
//         this.setState({
//             chunkNodes: newNodes,
//         });
//     }

//     calculateNodes() {
//         const { x, y, type, id } = this.props;
//         const { chunkNodes, compactR } = this.state;
//         const outerR = [...compactR].pop(); // 最外圈半径

//         let arrayR = calculateCircleR(chunkNodes.map(c => c.length), {
//             r: this.props.r,
//             gap: this.props.gap,
//         });
//         if (type === 'compact') {
//             arrayR = compactR;
//         }

//         const tempNodes = [];
//         arrayR.forEach((c, index) => {
//             const nodes = circleLayout(chunkNodes[index], { r: c, x, y });

//             const nodeArray = nodes.map(node => {
//                 const { theta, x: xx, y: yy, isCenter } = node.layout.circle;
//                 return {
//                     ...node,
//                     layout: {
//                         ...node.layout,
//                         concentric: {
//                             type: this.props.type,
//                             outerR,
//                             theta,
//                             isCenter,
//                             id,
//                             center: { x: xx, y: yy },
//                         },
//                     },
//                 };
//             });

//             /** 将布局信息写入每一个节点中 */
//             tempNodes.push(nodeArray);
//         });
//         this.state.nodes = tempNodes.reduce((pre, curr) => {
//             return pre.concat(curr);
//         }, []);
//     }

//     getData() {
//         return {
//             nodes: this.state.nodes,
//             edges: this.state.edges,
//         };
//     }

//     setState(state) {
//         this.state = {
//             ...this.state,
//             ...state,
//         };
//     }
// }

// export default ConcentricLayout;
