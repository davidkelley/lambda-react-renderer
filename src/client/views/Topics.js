import React from 'react';
import { Link, Route } from 'react-router-dom';

import Topic from './Topic';

export default ({ pathname }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li><Link to={`${pathname}/rendering`}>Rendering with React</Link></li>
      <li><Link to={`${pathname}/components`}>Components</Link></li>
      <li><Link to={`${pathname}/props-v-state`}>Props v. State</Link></li>
    </ul>

    <Route pattern={`${pathname}/:topicId`} component={Topic}/>
    <Route pattern={pathname} exactly render={() => (
      <h3>Please select a topic</h3>
    )}/>
  </div>
);
