import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './App';
import About from './About';
import Home from './Home';
import Repo from './Repo';
import Repos from './Repos';
import TwistedTreeline from './TwistedTreeline';

module.exports = (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='/repos' component={Repos}>
      <Route path='/repos/:userName/:repoName' component={Repo}/>
    </Route>
    <Route path='/twistedtreeline' component={TwistedTreeline}/>
    <Route path='/about' component={About}/>
  </Route>
);