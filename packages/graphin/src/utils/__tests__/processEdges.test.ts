import { IUserEdge } from '../../index';
import processEdges from '../processEdges';

describe('processEdges', () => {
  describe('Should process edges as loops', () => {
    let edges: IUserEdge[];

    beforeEach(() => {
      edges = [
        {
          source: '23a07720-b446-11e9-8592-cdfa43d74b9b',
          target: '23a07720-b446-11e9-8592-cdfa43d74b9b',
          data: {},
          style: {
            label: {
              value: 'a',
            },
          },
        },
        {
          source: '23a07720-b446-11e9-8592-cdfa43d74b9b',
          target: '23a07720-b446-11e9-8592-cdfa43d74b9b',
          data: {},
          style: {
            label: {
              value: 'b',
            },
          },
        },
        {
          source: '23a07720-b446-11e9-8592-cdfa43d74b9b',
          target: '23a07720-b446-11e9-8592-cdfa43d74b9b',
          data: {},
          style: {
            label: {
              value: 'c',
            },
          },
        },
      ];
    });

    it('With default values', () => {
      const newEdges = processEdges(edges);

      expect(newEdges[0].style?.label?.offset).toEqual([0, -30]);
      expect(newEdges[0].style?.keyshape?.type).toEqual('loop');
      expect(newEdges[0].style?.keyshape?.loop?.distance).toEqual(0);

      expect(newEdges[1].style?.label?.offset).toEqual([0, -50]);
      expect(newEdges[1].style?.keyshape?.type).toEqual('loop');
      expect(newEdges[1].style?.keyshape?.loop?.distance).toEqual(10);

      expect(newEdges[2].style?.label?.offset).toEqual([0, -70]);
      expect(newEdges[2].style?.keyshape?.type).toEqual('loop');
      expect(newEdges[2].style?.keyshape?.loop?.distance).toEqual(20);
    });

    it('With custom loop definition', () => {
      const newEdges = processEdges(edges, { loop: 20 });

      expect(newEdges[0].style?.label?.offset).toEqual([0, -30]);
      expect(newEdges[0].style?.keyshape?.type).toEqual('loop');
      expect(newEdges[0].style?.keyshape?.loop?.distance).toEqual(0);

      expect(newEdges[1].style?.label?.offset).toEqual([0, -70]);
      expect(newEdges[1].style?.keyshape?.type).toEqual('loop');
      expect(newEdges[1].style?.keyshape?.loop?.distance).toEqual(20);

      expect(newEdges[2].style?.label?.offset).toEqual([0, -110]);
      expect(newEdges[2].style?.keyshape?.type).toEqual('loop');
      expect(newEdges[2].style?.keyshape?.loop?.distance).toEqual(40);
    });

    it('With custom loop label position', () => {
      const newEdges = processEdges(edges, { loopLabelPosition: 0.5 });

      expect(newEdges[0].style?.label?.offset).toEqual([0, -15]);
      expect(newEdges[0].style?.keyshape?.type).toEqual('loop');
      expect(newEdges[0].style?.keyshape?.loop?.distance).toEqual(0);

      expect(newEdges[1].style?.label?.offset).toEqual([0, -35]);
      expect(newEdges[1].style?.keyshape?.type).toEqual('loop');
      expect(newEdges[1].style?.keyshape?.loop?.distance).toEqual(10);

      expect(newEdges[2].style?.label?.offset).toEqual([0, -55]);
      expect(newEdges[2].style?.keyshape?.type).toEqual('loop');
      expect(newEdges[2].style?.keyshape?.loop?.distance).toEqual(20);
    });
  });
});
