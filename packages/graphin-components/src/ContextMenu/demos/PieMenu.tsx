import React from 'react';
import Graphin, { Utils, GraphinContext } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import PieMenu, { Slice } from 'react-pie-menu';

// Do not forget to import CSS
import '@antv/graphin/dist/index.css';

const PieMenuDemo = () => {
  const graphin = React.useContext(GraphinContext);
  const handleClick = () => {
    console.log('click', graphin);
    graphin.contextmenu.handleClose();
  };
  const { x, y } = graphin.contextmenu;
  const nodeSize = 30;
  const radius = 80;
  const centerX = 0;
  const centerY = 0;

  return (
    <div>
      <PieMenu
        radius={`${radius}px`}
        centerRadius={`${nodeSize / 2}px`}
        centerX={`${centerX}px`}
        centerY={`${centerY}px`}
      >
        {/* Contents */}
        <Slice>1</Slice>
        <Slice onSelect={() => window.open('https://www.facebook.com', '_blank')}>2</Slice>
        <Slice onSelect={() => window.open('https://www.twitter.com', '_blank')}>3</Slice>
        <Slice onSelect={() => window.open('https://www.linkedin.com', '_blank')}>4</Slice>
        <Slice onSelect={() => window.open('https://github.com/psychobolt/react-pie-menu', '_blank')}>5</Slice>
        <Slice onSelect={() => window.open('https://en.wikipedia.org/wiki/RSS', '_blank')}>6</Slice>
        <Slice onSelect={() => window.open('https://www.pinterest.com/', '_blank')}>7</Slice>
        <Slice>8</Slice>
      </PieMenu>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(5).circle().graphin()}>
        <ContextMenu style={{ width: 125 }}>
          <PieMenuDemo />
        </ContextMenu>
      </Graphin>
    </div>
  );
};
export default App;
