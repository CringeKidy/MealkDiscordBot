import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import LandingPage from './landingPage';
import DashboardPage from './dashboardPage';
import MenuPage from './menuPage';

const Main = () => {
  return (
    <Router>
      <Switch> {/* The Switch decides which component to show based on the current URL.*/}
        <Route exact path='/' component={LandingPage}></Route>
        <Route exact path='/dashboard' component={DashboardPage}></Route>
        <Route exact path='/menu' component={MenuPage}></Route>
      </Switch>
    </Router>
  );
}

export default Main;