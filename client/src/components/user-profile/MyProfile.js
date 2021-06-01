import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { logout } from '../../actions/auth';


const MyProfile = ({ auth: { user }, profile : { profile, loading }, logout}) => {
    // eslint-disable-next-line
    useEffect(() => {
      getCurrentProfile();
    }, []);
  
    return (
      <Fragment>
          {profile === null || loading ? (
            <Spinner /> ):
        <Fragment> 
            <h1 className="large"> {user.name}'s Profile  </h1>
            <br></br>
            <p> <strong> School:  </strong>National University of Singapore</p>
            <p> <strong> Faculty: </strong> { profile.faculty }</p>
            <p> <strong> Year: </strong> { profile.year }</p>
            <p> <strong> Bio: </strong> { profile.bio }</p>
          <p> <strong> Your Interests: </strong></p>
        <ul>
          {profile.interests.map(item => {
              return <li>{item}</li>;
            })}
        </ul>

        <div className ="my-2"> 
            <Link to ='/edit-profile' className="btn btn-primary my-1"> Update Profile </Link>
          
          <> </>
          <Link to="/dashboard" className="btn btn-dark">
            Go Back
          </Link>
          
          <Link to ="#!" onClick={logout} className="btn btn-danger join-all">
            Logout
          </Link>
          </div>
        </Fragment> 
    }
    </Fragment>
  );
}
   
  
  MyProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
  });
  
  export default connect(mapStateToProps, { getCurrentProfile, logout })(MyProfile);