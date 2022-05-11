import G6, { IGroup, IShape, ModelConfig, ShapeOptions } from '@antv/g6';
import registerNode from './graphin-circle';
import { IUserNode } from '../typings/type';
import { ShapeItemsNames } from './utils';

jest.mock('@antv/g6', () => ({
  registerNode: jest.fn(),
}));

type ShapeOptionsMock = ShapeOptions & {
  draw: (cfg?: ModelConfig, group?: IGroup) => IShape;
};

describe('graphin-circle', () => {
  let registerNodeCall: [string, ShapeOptionsMock];
  let cfg: IUserNode;
  let group: IGroup;

  const labelPositionOnTest = [50, 10];

  beforeEach(() => {
    G6.Util = {
      getTextSize: jest.fn().mockReturnValue(labelPositionOnTest),
    };

    registerNode();
    [registerNodeCall] = (G6.registerNode as jest.Mock).mock.calls;

    cfg = Object.assign({} as IUserNode, {
      style: {
        status: {
          hover: {
            halo: {
              visible: false,
            },
          },
          selected: {
            halo: {
              visible: false,
            },
            keyshape: {
              fillOpacity: 0,
              lineWidth: 3.5,
              stroke: 'yellow',
              strokeOpacity: 1,
            },
            label: {
              background: {
                fill: 'red',
                padding: 5,
                radius: 2,
                fillOpacity: 1,
              },
            },
          },
        },
        label: {
          fontSize: 14,
          fillOpacity: 1,
          fill: 'white',
          offset: [0, 2],
          background: {
            fill: 'orange',
            stroke: 'green',
            padding: 5,
            radius: 2,
            fillOpacity: 0.5,
          },
          value: 'Node',
        },
        keyshape: {
          lineWidth: 0,
          fillOpacity: 0,
          size: 62,
        },
        icon: {
          type: 'font',
          size: 40,
          fillOpacity: 1,
          fontFamily: 'someFontFamily',
          value: 'h',
          fill: 'purple',
        },
        badges: [
          {
            id: 'count',
            position: 'RT',
            offset: [3, 0],
            type: 'text',
            size: 18,
            color: 'white',
            fill: 'green',
            fontSize: 11,
            value: 2,
            stroke: 'brown',
          },
        ],
        halo: {},
      },
    });

    group = Object.assign({} as IGroup, {
      addShape: jest.fn(),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should register expected node', () => {
    expect(registerNodeCall[0]).toBe('graphin-circle');
  });

  describe('draw', () => {
    it('should add shape for label background before shape for label', () => {
      const nodeDefinition = registerNodeCall[1];
      nodeDefinition.draw(cfg, group);

      const addShapeCalls = (group.addShape as jest.Mock).mock.calls;

      const labelBackgroundCall = addShapeCalls.find(
        shapeCall => shapeCall[1].name === ShapeItemsNames.labelBackground,
      );
      const labelCall = addShapeCalls.find(shapeCall => shapeCall[1].name === ShapeItemsNames.label);

      expect(addShapeCalls.indexOf(labelCall)).toBeGreaterThan(addShapeCalls.indexOf(labelBackgroundCall));
    });

    it('should add shape for label background with default styles', () => {
      delete cfg.style?.label?.background;

      const nodeDefinition = registerNodeCall[1];
      nodeDefinition.draw(cfg, group);

      const labelBackgroundCall = (group.addShape as jest.Mock).mock.calls.find(
        shapeCall => shapeCall[1].name === ShapeItemsNames.labelBackground,
      );

      expect(labelBackgroundCall[0]).toBe('rect');
      expect(labelBackgroundCall[1]).toEqual({
        attrs: {
          fill: undefined,
          fillOpacity: 0,
          padding: [0, 0],
          stroke: undefined,
          strokeOpacity: 0,
          lineWidth: 0,
          radius: 0,
          x: -25,
          y: 33,
          width: 50,
          height: 10,
        },
        name: 'label-background',
      });
    });

    it('should add shape for label background with custom styles', () => {
      const nodeDefinition = registerNodeCall[1];
      nodeDefinition.draw(cfg, group);

      const labelBackgroundCall = (group.addShape as jest.Mock).mock.calls.find(
        shapeCall => shapeCall[1].name === ShapeItemsNames.labelBackground,
      );

      expect(labelBackgroundCall[0]).toBe('rect');
      expect(labelBackgroundCall[1]).toEqual({
        attrs: {
          fill: 'orange',
          fillOpacity: 0.5,
          padding: 5,
          radius: 2,
          x: -27.5,
          y: 30.5,
          width: 55,
          height: 15,
          stroke: 'green',
          strokeOpacity: 1,
          lineWidth: 1,
        },
        name: 'label-background',
      });
    });
  });
});
