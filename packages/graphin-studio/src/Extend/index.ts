import layout from './layout';
import RectNodeShape from './RectNodeShape';
import marker from './marker';

const extend = {
    layout,
    nodeShape: () => {
        return [
            {
                name: 'RectNode',
                render: RectNodeShape,
            },
        ];
    },
    marker,
};
export default extend;
