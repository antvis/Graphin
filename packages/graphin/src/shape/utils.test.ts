import { NodeStyle } from '../typings/type';
import { setStatusStyle, ShapeItemsNames } from './utils';

describe('setStatusStyle', () => {
  let statusStyle: NodeStyle;

  const parseLabel = (style: NodeStyle, shapeName: string) => {
    return style[shapeName];
  };

  const createShape = (name: ShapeItemsNames) => {
    return {
      cfg: {
        name,
        visible: true,
      },
      attr: jest.fn(),
      attrs: {},
    };
  };

  beforeEach(() => {
    statusStyle = Object.assign({} as NodeStyle, {
      label: {
        background: {
          fill: 'red',
          padding: 5,
          radius: 2,
          fillOpacity: 1,
        },
      },
    });
  });

  describe('label', () => {
    it('should also set label background style when it is handled using custom properties', () => {
      const labelBackgroundShape = createShape(ShapeItemsNames.labelBackground);
      const labelShape = createShape(ShapeItemsNames.label);

      setStatusStyle([labelBackgroundShape, labelShape], statusStyle, parseLabel);

      expect(labelShape.attr).toHaveBeenCalledTimes(1);
      expect(labelShape.attr).toHaveBeenCalledWith(statusStyle[ShapeItemsNames.label]);

      expect(labelBackgroundShape.attr).toHaveBeenCalledTimes(1);
      expect(labelBackgroundShape.attr).toHaveBeenCalledWith({
        lineWidth: 0,
        stroke: undefined,
        strokeOpacity: 0,
        ...statusStyle[ShapeItemsNames.label].background,
      });
    });

    it('should also set label background style when it is handled using default properties', () => {
      delete statusStyle.label.background;

      const labelBackgroundShape = createShape(ShapeItemsNames.labelBackground);
      const labelShape = createShape(ShapeItemsNames.label);

      setStatusStyle([labelBackgroundShape, labelShape], statusStyle, parseLabel);

      expect(labelShape.attr).toHaveBeenCalledTimes(1);
      expect(labelShape.attr).toHaveBeenCalledWith(statusStyle[ShapeItemsNames.label]);

      expect(labelBackgroundShape.attr).toHaveBeenCalledTimes(1);
      expect(labelBackgroundShape.attr).toHaveBeenCalledWith({
        fill: undefined,
        fillOpacity: 0,
        stroke: undefined,
        strokeOpacity: 0,
        lineWidth: 0,
        padding: [0, 0],
        radius: 0,
      });
    });
  });
});
