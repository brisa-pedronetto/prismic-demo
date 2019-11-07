import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Preview from './Preview';
import Help from './Help';
import NotFound from './NotFound';
import Project from './Components/Project/Project';

const App = props => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/help" />
      <Route exact path="/help" component={Help} />
      <Route
        exact
        path="/preview"
        render={routeProps => (
          <Preview {...routeProps} prismicCtx={props.prismicCtx} />
        )}
      />
      <Route
        exat
        path="/project/:uid"
        render={routeProps => (
          <Project {...routeProps} prismicCtx={props.prismicCtx} />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
