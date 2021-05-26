import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import '../../css/bootstrap.min.css';

/**
 * Functional component for register page, allows client to
 * change the fields on the register page, as well as register 
 * their account by following the requirements for their account 
 * credentials. Parameters will be destructured props
 * @param setAlert Our setAlert action which will dispatch an alert
 * @param register Our register action which will try to register a user based on form data
 * @param isAuthenticated A boolean state in auth, to ensure that 
 * authenticated users who are logged in will be directed to dashboard
 */
const Register = ({ setAlert, register, isAuthenticated }) => {
    
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordcfm: ''
  });

  const { name, email, password, passwordcfm } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = a => {
    a.preventDefault();
    if (password !== passwordcfm) {
      setAlert('Passwords do not match. Please retype.', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  
  return (
    <Fragment>
            <div className ="box-body">
              <h1 className="large text-primary">Sign Up</h1>
              <p className="lead badge badge-secondary">
                  Join Fellow Sports Enthusiasts in NUS and Have Some Fun Together 
              </p>
              <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="name"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                  />
                  <small className="form-text">Full Name as in Matriculation Card </small>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                  <small className="form-text"> NUS Email Address only </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                  <small className="form-text"> Minimum 7 characters </small>

                </div>
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="passwordcfm"
                    value={passwordcfm}
                    onChange={onChange}
                    required
                  />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
              </form>
            </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
