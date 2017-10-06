import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import React, { Component, Children } from 'react';
import { Switch, Link, Route } from 'react-router-dom';

import Home from './views/Home';
import Contact from './views/Contact';
import Todos from './views/Todos';

export class App extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          // <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/todos">Todos</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <hr/>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/todos" component={Todos} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    );
  }
}
