import React from "react";
import "./App.css";
import {Switch, Route} from "react-router-dom"
import {LandingPage, MenuPage, DashboardPage} from './pages'


function App() {
  return (
    <Switch>
      <Route exact path="/" exact={true} component={LandingPage}/>
      <Route exact path='/menu' exact={true} component={MenuPage}/>
      <Route exact path='/dashboard/:id' exact={true} component={DashboardPage}/>
    </Switch>
  );
}


export default App;
