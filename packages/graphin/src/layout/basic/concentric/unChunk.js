// const unChunk = (nodes, layerNumber = 4) => {
//     const newNodes = [];
//     const index = parseInt(nodes.length / layerNumber);
//     for (let i = 0; i < layerNumber; i++) {
//         if (i + 1 === layerNumber) {
//             newNodes.push(nodes.slice(i * index));
//         } else {
//             newNodes.push(nodes.slice(i * index, (i + 1) * index));
//         }
//     }
//     return newNodes;
// };
// export default unChunk;
