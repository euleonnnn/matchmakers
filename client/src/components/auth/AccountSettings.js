import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';



const AccountSettings= ({ getCurrentProfile, logout}) => {
  useEffect(() => {
      getCurrentProfile();
},[]);
  

  return (
    <Fragment>
        <div className="card">
         <ul className="list-group list-group-flush">
            <li className="list-group-item"> 
                <Link to={`/my-profile`} className="btn btn-light btn-lg btn-block"> My Profile </Link> 
            </li> 
            <li className="list-group-item"> 
                <Link to={`/change-password`} className="btn btn-light btn-lg btn-block"> Update Password  </Link> 
            </li> 
            <li className="list-group-item"> 
                <Link to={"#!"} className="btn btn-light btn-lg btn-block"> Privacy Settings </Link> 
            </li> 
            <li className="list-group-item"> 
                <Link to={"#!"} className="btn btn-light btn-lg btn-block"> Blocked Users  </Link> 
            </li> 
            <li className="list-group-item">
            <Link to ="#!" onClick={logout} className="btn btn-danger btn-lg btn-block"> Logout </Link>
            </li>
        </ul>
        </div>
    
    </Fragment>
  );
}; 

AccountSettings.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};


export default connect(null, { getCurrentProfile, logout })(AccountSettings);