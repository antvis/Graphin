import Graphin, { Utils } from '@antv/graphin';
import React from 'react';

const Graphene = () => (
  <div style={{ height: '100%' }}>
    <Graphin data={Utils.mock(10).graphin()} />
  </div>
);

export default Graphene;
