import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

const RouteWithLayout = (props) => {
  const history = useHistory();
  const { layout: Layout, component: Component, ...rest } = props;
  if (localStorage.getItem('@oc19-Token') !== null) {
    api.get('api/v1/me').then((response) => {
      if (response !== null && response !== undefined) {
        if (response.data.role.name !== 'ANALYST') {
          history.push('/signin');
        }
      } else {
        history.push('/signin');
      }
    });
  } else {
    history.push('/signin');
  }
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteWithLayout;
