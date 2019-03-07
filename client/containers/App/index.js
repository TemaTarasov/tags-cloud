import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Detail from './Detail';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/home" component={Home}/>
      <Route path="/home/:tag" component={Detail}/>

      <Redirect from="/" to="/home"/>
    </Switch>
  </Router>
);
