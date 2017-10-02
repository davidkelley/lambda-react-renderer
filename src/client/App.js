import React from 'react';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';
import Link from 'react-router/Link';

import Home from './Home';
import About from './About';

// Use this as the entry-point for your app.
export default () => (
  <div>
    <ul>
      <li><Link to="/Home">Home</Link></li>
      <li><Link to="/About">About</Link></li>
    </ul>

    <hr/>

    <Match pattern="/Home" component={Home} />
    <Match pattern="/About" component={About} />
  </div>
);
