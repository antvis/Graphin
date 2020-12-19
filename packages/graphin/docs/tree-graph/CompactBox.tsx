import * as React from 'react';
import { useEffect } from 'react';
import Grahpin from '@antv/graphin';
import { Behavior } from '@antv/graphin-components';
interface ICompactBoxProps {}

const { TreeCollapse } = Behavior;

const CompactBox: React.FunctionComponent<ICompactBoxProps> = props => {
  const [state, setState] = React.useState({
    data: null,
  });
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
      .then(res => res.json())
      .then(res => {
        console.log('data', res);
        setState({
          data: res,
        });
      });
  }, []);
  const { data } = state;
  return (
    <div>
      {data && (
        <Grahpin
          data={data}
          layout={{
            type: 'compactBox',
            direction: 'TB',
            getId: function getId(d) {
              return d.id;
            },
            getHeight: function getHeight() {
              return 16;
            },
            getWidth: function getWidth() {
              return 16;
            },
            getVGap: function getVGap() {
              return 80;
            },
            getHGap: function getHGap() {
              return 50;
            },
          }}
        >
          <TreeCollapse trigger="click" />
        </Grahpin>
      )}
    </div>
  );
};

export default CompactBox;
