import React from "react";
import "./App.css";
import {Switch, Route} from "react-router-dom"
import {LandingPage, MenuPage, DashboardPage} from './pages'
require('dotenv').config();



function App() {
  /* const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []); */

  return (
    <Switch>
      <Route path="/" exact={true} component={LandingPage}/>
      <Route path='/menu' exact={true} component={MenuPage}/>
      <Route path='/dashboard/:id' exact={true} component={DashboardPage}/>
    </Switch>
  );
}


export default App;
