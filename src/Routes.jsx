import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

// Import components for routing
import HomePage from './components/HomePage';

const Routes = (
  <Router>
    <div>
      <Route component={ HomePage } />
    </div>
  </Router>
);

export default Routes;
