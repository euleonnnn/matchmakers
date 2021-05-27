import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import FriendList from './FriendList';
import { getCurrentProfile } from '../../actions/profile';
import '../../css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import bball from '../layout/bball.jpg';
import bball2 from '../layout/bball2.jpg';

const Dashboard = ({ getCurrentProfile, auth: { user}, profile : { profile, loading } }) => {
  // eslint-disable-next-line
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);


  if (loading && (profile === null || user === null)) {
    return <Spinner />; 
  } else {
      return  <Fragment>
      <h1 className="large text-primary big-header"><i class="fas fa-dumbbell"/> {" "} Hello There, {user && user.name}</h1>
      {profile !== null ? 
      <Fragment> 

      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-9">
            <h4 className="text-primary">  My Interests </h4>
              <ul>
                  {profile.interests.map(item => {
                    return <li>{item}</li>;
                  })}
              </ul>

              <h4 className="text-primary">  Here are the games we think you'd like : </h4>
              <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={bball} alt="Eusoff"/>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Basketball</h5>
                          <p className="card-text">Location: Eusoff Hall Basketball Court</p>
                          <p className="card-text">Players: 2 out of 6</p>
                          <p className="card-text"><small className="text-muted">Created: 3 mins ago</small></p>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={bball2} alt="MPSH"/>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Basketball</h5>
                          <p className="card-text">Location: MPSH 5 Basketball Court </p>
                          <p className="card-text">Players: 5 out of 6</p>
                          <p className="card-text"><small className="text-muted">Created: 1 hour ago</small></p>
                        </div>
                      </div>
                    </div>
                </div>
              
          </div>
          
          <div class="col-sm-3 col-md-3">
            <FriendList />
          </div>
        </div>
      </div>

      

      </Fragment> : 
      <Fragment> 
        <p> No Profile Yet. You will need a profile to host or join games. </p> 
        <Link to ='/create-profile' className="btn btn-primary my-1"> Set Up One Now </Link>
      </Fragment> }
      </Fragment>
  }
} 

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);