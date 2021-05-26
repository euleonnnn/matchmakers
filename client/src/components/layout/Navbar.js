import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import '../../css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { getCurrentProfile} from '../../actions/profile';

/**
 * Functional component for the navigation bar. The links on the 
 * nav bar will switch based on user's logged in and set up state.
 * Params are destructured prop.
 * @param getCurrentProfile function which helps to get profile of current logged in user
 * @param auth get the auth state and document of logged in user 
 * @param profile the profile document of logged in user
 * @param logout function which logs out user
 */
const Navbar = ({getCurrentProfile, auth, profile: {profile}, logout}) => {
    // eslint-disable-next-line
    useEffect(() => {
      getCurrentProfile();
    }, [getCurrentProfile]);
    
    const loggedinLinks = (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><a onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt"></i> {' '}
            <span className = "hide-sm"> Logout </span> 
            </a>
            </li>
        </ul> 
    );

    const guestLinks = (
      <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span className="nav-link"><Link to="/register">Register </Link> </span>
            </li>
            <li className="nav-item">
              <span className="nav-link"><Link to="/login">Login </Link> </span>
            </li>
          </ul>
      </div>
    )
    
      const profileLinks = (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className ="nav-item"> 
                 <span className = "nav-link"> <Link to="/my-profile"> My Profile </Link> </span>
              </li>
              <li className = "nav-item">
                <span className = "nav-link"><Link to="/profiles"> Find Friends </Link> </span>
              </li>
              <li className="nav-item"><a className = "nav-link" onClick={logout} href="#!">
                <i className="fas fa-sign-out-alt"></i> {' '}
                <span className = "hide-sm"> Logout </span> 
                </a>
              </li>
            </ul>
          </div>
      )


    return (
      <nav className ="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className ="container-fluid">
        <a className="navbar-brand"><Link to="/dashboard"> (Match) Maker </Link> </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" 
          aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        { !auth.loading && (<Fragment>{auth.isAuthenticated ? (profile !== null &&  
            auth.user._id === profile.user._id ? profileLinks : loggedinLinks) : guestLinks}</Fragment>)}
        </div>
      </div>
    </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, logout}) (Navbar);