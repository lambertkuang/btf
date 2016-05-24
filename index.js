import React from 'react';
import {Router, browserHistory} from 'react-router';
import { render } from 'react-dom';
import routes from './components/routes';

render((
  <Router routes={routes} history={browserHistory}/>
), document.getElementById('app'));
