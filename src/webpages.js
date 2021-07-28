import React from "react";
import {BrowserRouter as Router,Switch, Route, Link} from "react-router-dom"
import {LandingPage, MenuPage, DashboardPage} from './pages'


const Webpages= () => {
  return (
    <Router>
      <Route exact path="/" exact={true} component={LandingPage}/>
      <Route path='/menu' exact={true} component={MenuPage}/>
      <Route path='/dashboard/:id' exact={true} component={DashboardPage}/>
    </Router>
  );
}


export default Webpages();
