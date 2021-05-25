import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, path }) =>
    isAuthenticated ? 
      <Route path={path} component={Component} />
    : loading ? <Spinner /> : <Redirect to="/login" />;

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);