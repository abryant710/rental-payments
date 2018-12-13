import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

// Import components for routing
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import LeaseResult from './components/LeaseResult';

const Routes = (
  <Router>
    <div>
      <Route component={ NavBar } />
      <Route exact path="/" component={ HomePage } />
      <Route exact path="/leases.html" component={ LeaseResult } />
    </div>
  </Router>
);

export default Routes;
