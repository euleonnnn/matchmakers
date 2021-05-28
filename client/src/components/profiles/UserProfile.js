import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfilesById } from '../../actions/profile';
import { authUser } from '../../actions/auth'
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserProfile = ({ authUser, getProfilesById, profile: { profile, loading }, auth, match }) => {
    useEffect(() => {
      getProfilesById(match.params.id);
    }, [getProfilesById]);

    useEffect(() => {
      authUser();
    });

    
    const [followed, toggle] = useState(
      auth.user.followings.includes(match.params.id)
    );


    const followUnfollow = () => {
        try {
          if (!followed) {
            toggle(!followed);
            axios.put(`/api/users/${profile.user._id}/follow`, {
              userId: auth.user._id,
            });
          } else {
            toggle(!followed);
            axios.put(`/api/users/${profile.user._id}/unfollow`, {
              userId: auth.user._id,
            });
          }
        }catch (err) { 
          console.log(err.status)
        }
      };
    

    return (
      <Fragment>
          {profile === null || loading ? (
            <Spinner />
      ) : (
          <Fragment>
         
            <h1> {profile.user.name}'s Profile  </h1>
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
            
            {profile.hasOwnProperty("social")  && <Fragment>
              <p> <strong> Social Media: </strong> </p>
                  <ul>
                      {profile.social.hasOwnProperty("facebook") && <Fragment> <li><i class="fab fa-facebook"/> {" "} {profile.social.facebook}</li> </Fragment> }
                      {profile.social.hasOwnProperty("instagram") && <Fragment> <li><i class="fab fa-instagram"/> {" "} {profile.social.instagram}</li> </Fragment> }
                  </ul>
            </Fragment>
            }

            <Link to="/profiles" className="btn btn-secondary">
            Find more Friends
            </Link>
            <>  </>
            {!followed && auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id !== profile.user._id && (
                <button onClick= {()=> {
                  followUnfollow();
                }} type="button" className="btn btn-dark">
                  <i class="fas fa-user-plus"/>   Follow
                </button>
                ) 
            }

            {followed && auth.isAuthenticated &&
                auth.loading === false && 
                auth.user._id !== profile.user._id && (
                <button onClick= {()=> {
                  followUnfollow();
                }} type="button" className="btn btn-success">
                   <i class="fas fa-user-minus"/>   Unfollow
                </button>
                ) 
            }
            
            <>  </>
            {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id !== profile.user._id && (
                <Link to="/message" className="btn btn-primary my-1"> <i class="fas fa-comment-dots"/>
                    {" "} Message
                </Link>
                ) 
            }

           
            </Fragment>
        )}
        </Fragment> 
    
    );
  };


UserProfile.propTypes = {
    getProfilesById: PropTypes.func.isRequired,
    authUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { authUser, getProfilesById })(UserProfile);