import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

// Import components for routing
import NavBar from './components/NavBar';
import SearchPage from './components/SearchPage';
import ListPage from './components/ListPage';
import LeaseResult from './components/LeaseResult';

// Define the App title
const Title = <h1>Rental Payments App</h1>;

// Define the React Routes
const Routes = (
  <Router>
    <div>
      {Title}
      <Route component={ NavBar } />
      <Route exact path="/search" component={ SearchPage } />
      <Route exact path="/list" component={ ListPage } />
      <Route exact path="/leases.html" component={ LeaseResult } />
    </div>
  </Router>
);

export default Routes;
