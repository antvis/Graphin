/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';

import Graphin, { Utils } from '@antv/graphin';
// 引入Graphin CSS
import { Toolbar } from '@antv/graphin-components';
// Graphin 组件 CSS

const styles = {
  root: {
    background: '#fafafa',
    display: 'flex',
    position: 'absolute',
    bottom: '0px',
    left: '68px',
    right: '28px',
  },
  itemContainer: {
    height: '100px',
    flex: 1,
    background: 'rgb(250, 250, 250)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  itemBar: {
    height: '100%',
    margin: '0px 42%',
    background: '#ddd',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  itemTime: {
    position: 'relative',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
  },
};
const Timebar = (props) => {
  const {
    data = [
      { time: '2020-3-21', nodeCount: 10 },
      { time: '2020-3-22', nodeCount: 14 },
      { time: '2020-3-23', nodeCount: 20 },
      { time: '2020-3-24', nodeCount: 30 },
    ],
    onChange = () => {},
    style = {},
  } = props;
  const maxHeight = data.reduce((acc, curr) => {
    return Math.max(acc, curr.nodeCount);
  }, 0);

  const handleClick = (timeStamp) => {
    onChange(timeStamp);
  };

  return (
    <div>
      <ul style={{ ...styles.root, style }}>
        {data.map((c) => {
          return (
            <li
              key={c.time}
              style={styles.itemContainer}
              onClick={() => {
                handleClick(c);
              }}
            >
              <div style={styles.itemBar}>
                <div style={{ height: `${(c.nodeCount / maxHeight) * 100}%`, background: '#873bf4' }}></div>
              </div>
              <div style={styles.itemTime}>{c.time}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const App = () => {
  const [data, setData] = React.useState(Utils.mock(5).circle().graphin());

  const handleChange = (time) => {
    const mockData = Utils.mock(time.nodeCount).random().graphin();
    setData(mockData);
  };
  const timebar = [
    { time: '2020-3-21', nodeCount: 2 },
    { time: '2020-3-22', nodeCount: 10 },
    { time: '2020-3-23', nodeCount: 50 },
    { time: '2020-3-24', nodeCount: 30 },
    { time: '2020-3-25', nodeCount: 10 },
  ];
  return (
    <div>
      <Graphin data={data} layout={{ name: 'force' }}>
        <Toolbar />
        <Timebar onChange={handleChange} data={timebar} />
      </Graphin>
    </div>
  );
};
const rootElement = document.getElementById('container');
ReactDOM.render(<App />, rootElement);
