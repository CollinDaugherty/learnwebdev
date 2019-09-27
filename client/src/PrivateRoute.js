import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserConsumer } from './UserContext';

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

export default PrivateRoute;
