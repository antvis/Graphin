/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';
import { Select, Icon } from 'antd';

// import 'antd/dist/antd.css'; 避免与全局样式污染
import '@antv/graphin/dist/index.css'; // 引入Graphin CSS
import '@antv/graphin-components/dist/index.css'; // 引入Graphin CSS

const data = Utils.mock(15)
  .tree()
  .graphin();

const SelectOption = Select.Option;
const LayoutSelector = props => {
  const { apis, value, onChange } = props;
  // 包裹在graphin内部的组件，将获得graphin提供的额外props
  const { layouts } = apis.getInfo();
  return (
    <div style={{ position: 'absolute', top: 10, left: 10 }}>
      <Select style={{ width: '120px' }} value={value} onChange={onChange}>
        {layouts.map(item => {
          const { name, icon, disabled, desc } = item;
          return (
            <SelectOption key={name} value={name} disabled={disabled}>
              <Icon type={icon} /> &nbsp;{desc}
            </SelectOption>
          );
        })}
      </Select>
    </div>
  );
};

const App = () => {
  const [layout, changeLayout] = React.useState({ name: 'force', options: {} });
  return (
    <div className="App">
      <Graphin data={data} layout={layout}>
        <LayoutSelector
          value={layout.name}
          onChange={value => {
            changeLayout({
              ...layout,
              name: value,
            });
          }}
        />
        <Toolbar style={{ position: 'absolute', bottom: 28, left: 28 }} />
      </Graphin>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('container'));
