import React from 'react';
import Graphin, { Utils, GraphinContext } from '@antv/graphin';
import { ContextMenu } from '@antv/graphin-components';
import PieMenu, { Slice } from 'react-pie-menu';
// Do not forget to import CSS
// import '@antv/graphin/dist/index.css';
import { ThemeProvider } from 'styled-components';
import theme from './PieMenuTheme';

const PieMenuDemo = () => {
  const graphin = React.useContext(GraphinContext);
  // const handleClick = () => {
  //   console.log('click', graphin);
  //   graphin.contextmenu.node.handleClose();
  // };

  const nodeSize = 30;
  const radius = 60;
  const centerX = 0;
  const centerY = 0;
  const zoom = graphin.graph.getZoom();
  const styles = {
    transform: `scale(${zoom})`,
    transformOrigin: 'left',
  };

  return (
    <div style={{ ...styles }}>
      <ThemeProvider theme={theme}>
        <PieMenu
          radius={`${radius}px`}
          centerRadius={`${nodeSize / 2}px`}
          centerX={`${centerX}px`}
          centerY={`${centerY}px`}
        >
          {/* Contents */}
          <Slice>delete</Slice>
          <Slice onSelect={() => window.open('https://www.facebook.com', '_blank')}>tag</Slice>
          <Slice onSelect={() => window.open('https://www.twitter.com', '_blank')}>fetch</Slice>
          <Slice onSelect={() => window.open('https://www.linkedin.com', '_blank')}>copy</Slice>
        </PieMenu>
      </ThemeProvider>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Graphin data={Utils.mock(5).circle().graphin()}>
        <ContextMenu style={{ width: 125 }} bindType="node">
          <PieMenuDemo />
        </ContextMenu>
      </Graphin>
    </div>
  );
};
export default App;
