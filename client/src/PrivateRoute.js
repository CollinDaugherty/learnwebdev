import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserContext, { UserConsumer } from './UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <UserConsumer>
    {({ isAuthenticated }) => (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login' }} />
          )
        }
      />
    )}
  </UserConsumer>
);
PrivateRoute.contextType = UserContext;

export default PrivateRoute;
