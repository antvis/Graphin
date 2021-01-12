/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import Graphin, { Utils } from '@antv/graphin';
import iconsLoader from '@antv/graphin-icons';
import { Legend } from '@antv/graphin-components';
import { useState, useEffect } from 'react';

const Demo = (props) => {
  const propsOptions = props.options;
  const [state, setState] = React.useState({
    options: propsOptions,
  });
  useEffect(() => {
    setState({
      options: props.options,
    });
  }, [props.options]);

  console.log('props', propsOptions, 'state', state.options);
  return <div></div>;
};

export default () => {
  const [render, setRedener] = useState(0);
  useEffect(() => {
    setRedener(1);
  }, []);
  console.log('root', render);
  return (
    <div>
      <Demo options={render} />
    </div>
  );
};
