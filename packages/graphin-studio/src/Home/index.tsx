import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Home from './Home';
import GraphinStudio from '../GraphinStudio';

import './index.css';
// import '@antv/graphin/dist/index.css';
import '@antv/graphin-components/dist/index.css';

const propTypes = {};

const Layout = () => {
  return (
    <div className="container">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/graphin-studio" component={GraphinStudio} />
      </Router>
    </div>
  );
};

Layout.propTypes = propTypes;

export default hot(Layout);
