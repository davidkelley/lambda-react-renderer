import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import Home from './views/Home';
import About from './views/About';

// Use this as the entry-point for your app.
export default () => (
  <div>
    <ul>
      <li><Link to="/Home">Home</Link></li>
      <li><Link to="/About">About</Link></li>
    </ul>

    <hr/>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  </div>
);
