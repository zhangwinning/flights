import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import Home from './components/Home/Home';

render((
  <Router>
    <Route exact path="/" component={Home} />
  </Router>
), document.getElementById('app'));
