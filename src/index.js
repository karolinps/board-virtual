import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import './App.css';
import TopBarProgress from "react-topbar-progress-indicator";

import Taks from "./components/Taks"
import Dashboard from "./components/Dashboard"
import NavigationBar from "./components/Nav"

TopBarProgress.config({
  barColors: {
    "0": "#2bab38",
    "1.0": "#fff"
  },
  shadowBlur: 5
});

ReactDOM.render(
  <Router>
    <NavigationBar />
    <Switch>
      <Route exact path="/taks/:id" render={() => <Taks />} />
      <Route exact path="/" render={() => <Dashboard />} />
      <Route exact path="/dashboard" render={() => <Dashboard />} />

    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
