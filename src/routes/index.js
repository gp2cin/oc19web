import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../services/auth';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import NewWarning from '../pages/NewWarning';
import OfficialCases from '../pages/OfficialCases';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/warnings/new'} component={NewWarning} />
      <Route path={'/official-cases'} component={OfficialCases} />
      <Route path={'/signin'} component={SignIn} />
      <PrivateRoute path={'/app'} component={() => <h1>App</h1>} />
      <Route path={'*'} component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
