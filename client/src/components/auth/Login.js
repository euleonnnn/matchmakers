import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import "../../App.css";
import '../../css/bootstrap.min.css';

/**
 * Functional component for login page, allows client to
 * change the fields on the login page, as well as log into
 * their account provided their credentials are correct. 
 * Parameters will be destructured props
 * @param login Our login action which will dispatch LOGIN_SUCCESS if successfully logged in with provided 
 * email and password
 * @param isAuthenticated A boolean state in auth, to ensure that 
 * authenticated users who are logged in will be directed to dashboard
 */
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = a => {
    a.preventDefault();
    login(formData.email, formData.password);
  };


  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
            <div className ="box-body">
              <h1 className="large text-primary">Sign In</h1>
              
              <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                      <input
                        type="email"
                        placeholder="NUS Email Address"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                      />
                </div>

                <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={onChange}
                      minLength="7"
                    />
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Login" />
              </form>
             
            </div>
    </Fragment>
  );
}; 

Login.propTypes = {
  login: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);