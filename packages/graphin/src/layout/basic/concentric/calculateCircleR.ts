// import {getCircleR} from './graph';
// /**
//     *
//     * @param {*} arrayNodeNumber 多圈节点的个数，类型为数组
//     * @param {*} options 配置 `{
//       r = 40,
//       gap = 8,
//       innerMinR = 250, //限定最小值 250
//       outerMinR = 550 //限定最小值为 550
//     } `
//     */
// const calculateCircleR = (arrayNodeNumber, options) => {
//     const {
//         r = 40,
//         gap = 0,
//         innerMinR = 200, // 限定最小值 250
//         outerMinR = 450, // 限定最小值为 500
//     } = options;
//     const arrayR = arrayNodeNumber.map(n => {
//         return getCircleR(n, r, gap);
//     });
//     // 因为两个环圆的相切长度差为2r，所以我们还要再次处理,可以认为设置为4倍
//     const newArrayR = [...arrayR];
//     for (let i = 0; i < newArrayR.length; i++) {
//         if (newArrayR[i] === 0) {
//             // 说明没有节点,那么半径就为0
//             newArrayR[i] = 0;
//             continue;
//         }
//         // 处理第一圈，限定最小值 250
//         if (i === 0 && newArrayR[i] < innerMinR) {
//             newArrayR[i] = innerMinR;
//         }
//         // 处理最后一圈，限定最小值为 550
//         if (i === newArrayR.length - 1 && newArrayR[i] < outerMinR) {
//             newArrayR[i] = outerMinR;
//         }
//         //  处理中间的圈
//         if (newArrayR[i] - newArrayR[i - 1] < 4 * (r + gap)) {
//             newArrayR[i] = newArrayR[i - 1] + 4 * (r + gap);
//         }
//     }

//     return newArrayR;
// };

// export default calculateCircleR;
