// import { BBox } from '../basic/cy.concentric';
// // makes a full bb (x1, y1, x2, y2, w, h) from implicit params
// interface FunMakeBoundingBox {
//     (bb: BBox): BBox;
// }
// export const makeBoundingBox: FunMakeBoundingBox = (
//     bb: BBox = {
//         x1: Infinity,
//         y1: Infinity,
//         x2: -Infinity,
//         y2: -Infinity,
//         w: 0,
//         h: 0,
//     },
// ) => {
//     const { x1, x2, w, h, y1, y2 } = bb;

//     if (x1 && x2 && y1 && y2 && x2 >= x1 && y2 >= y2) {
//         return {
//             x1,
//             y1,
//             x2,
//             y2,
//             w: x2 - x1,
//             h: y2 - y1,
//         };
//     }

//     if (w && h && w >= 0 && bb.h >= 0) {
//         return {
//             x1,
//             y1,
//             x2: x1 + w,
//             y2: y1 + h,
//             w,
//             h,
//         };
//     }
//     return {
//         x1,
//         y1,
//         x2,
//         y2,
//         w,
//         h,
//     };
// };
// export default {
//     makeBoundingBox,
// };
