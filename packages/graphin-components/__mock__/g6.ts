import EventEmitter from 'eventemitter3';

let canvasSize = { width: 1000, height: 1000 };

export const setCanvasSize = size => {
    canvasSize = size;
};

export const getMockGraph = () => {
    let mockGraph: any = new EventEmitter();

    mockGraph.get = key => {
        return mockGraph[key];
    };
    mockGraph.canvas = {
        get: key => {
            return mockGraph.canvas[key];
        },
        width: canvasSize.width,
        height: canvasSize.height,
    };
    mockGraph.getCanvasByPoint = (x, y) => {
        return {
            x,
            y,
        };
    };
    return mockGraph;
};

export const getMockG6Event = (BBox = { x: 0, y: 0 }) => {
    return {
        preventDefault: () => {},
        item: {
            getBBox: () => {
                return {
                    maxY: BBox.y,
                    minX: BBox.x,
                };
            },
        },
    };
};
