import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';


const MyProfile = ({ auth: { user }, profile : { profile, loading } }) => {
    // eslint-disable-next-line
    useEffect(() => {
      getCurrentProfile();
    }, [getCurrentProfile]);
  
    return (
      <Fragment>
          {profile === null || loading ? (
            <Spinner /> ):
        <Fragment> 
            <h1> {user.name}'s Profile  </h1>
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
          </div>
        </Fragment> 
    }
    </Fragment>
  );
}
   
  
  MyProfile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
  });
  
  export default connect(mapStateToProps, { getCurrentProfile })(MyProfile);