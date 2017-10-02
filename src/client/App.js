import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import Topics from './views/Topics';
import About from './views/About';

// Use this as the entry-point for your app.
export default () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/topics">Topics</Link></li>
    </ul>

    <hr/>

    <Switch>
      <Route exact path="/" component={Topics} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </Switch>
  </div>
);
