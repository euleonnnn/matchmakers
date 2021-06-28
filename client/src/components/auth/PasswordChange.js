import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { changePassword } from '../../actions/auth';
import PropTypes from 'prop-types';
import '../../css/bootstrap.min.css';


const PasswordChange = ({ setAlert, changePassword, history }) => {
    
  
  const [formData, setFormData] = useState({
    password: "",
    passwordcfm: ""
  });

  const { password, passwordcfm } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = a => {
    a.preventDefault();
    if (password !== passwordcfm) {
      setAlert('Passwords do not match. Please retype.', 'danger');
    } else {
      changePassword({password},history);
    }
  };

  return (
    <Fragment>
            <div className ="box-body">
              <h1 className="large text-primary">Change Password</h1>
              
              <form className="form" onSubmit={onSubmit}>
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
                <input type="submit" className="btn btn-primary my-1" value="Change Password" />
              </form>
            </div>
    </Fragment>
  );
};

PasswordChange.propTypes = {
  setAlert: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, changePassword })(PasswordChange);
