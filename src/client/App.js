import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import Home from './views/Home';
import Contact from './views/Contact';
import About from './views/About';

// Use this as the entry-point for your app.
export default () => (
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>

    <hr/>

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Switch>
  </div>
);
