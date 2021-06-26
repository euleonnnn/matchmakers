import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfilesById } from '../../actions/profile';
import { authUser } from '../../actions/auth'
import { Link, withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';
import {createChat} from '../../actions/chat';


const UserProfile = ({ createChat, chat:{chats}, authUser, getProfilesById, profile: { profile, loading }, auth, match, history}) => {


  const chatID = [];
  if (chats.length > 0) {
    chats.map(chat => {
      chatID.push(chat.users.find(id => id !== auth.user._id));
    })
  }
  

  const startNewConvo= () => {
      try {
        if (!chatID.includes(profile.user._id)) {
            const formData = {
                receiver: profile.user._id
            }
            createChat(formData, history)
        } else {
            history.push('/messagebox')
        }
      } catch (error) {
        console.log(error)
      }
    }

  

  const [followed, toggle] = useState(
    auth.user.followings.includes(match.params.id)
  );

  useEffect(() => {
    authUser();
  });


  //cannot rerender if not clicking directly on the main page will conflict with main page rerender
  useEffect(() => {
      getProfilesById(match.params.id);
      // eslint-disable-next-line
    },[getProfilesById]);

  let hist = useHistory();
  const goToPreviousPath = () => {
      hist.goBack()
  }


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
    
    if (profile === null || loading) {
      return < Spinner />
    } else {
        return <Fragment>
            <h1> {profile.user.name}'s Profile  </h1>
            <br></br>
            <p> <strong> School:  </strong>National University of Singapore</p>
            <p> <strong> Faculty: </strong> { profile.faculty }</p>
            <p> <strong> Year: </strong> { profile.year }</p>
            <p> <strong> Bio: </strong> { profile.bio }</p>
            <p> <strong> Your Interests: </strong></p>
                <ul>
                {profile.interests.map(item => {
                    return <li key={item._id}>{item}</li>;
                    })}
                </ul>
            
            {profile.hasOwnProperty("social")  && <Fragment>
              <p> <strong> Social Media: </strong> </p>
                  <ul>
                      {profile.social.hasOwnProperty("facebook") && <Fragment> <li><i className="fab fa-facebook"/> {" "} {profile.social.facebook}</li> </Fragment> }
                      {profile.social.hasOwnProperty("instagram") && <Fragment> <li><i className="fab fa-instagram"/> {" "} {profile.social.instagram}</li> </Fragment> }
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
                }} type="button" className="btn btn-success">
                  <i className="fas fa-user-plus"/>   Follow
                </button>
                ) 
            }

            {followed && auth.isAuthenticated &&
                auth.loading === false && 
                auth.user._id !== profile.user._id && (
                <button onClick= {()=> {
                  followUnfollow();
                }} type="button" className="btn btn-danger">
                   <i class="fas fa-user-minus"/>   Unfollow
                </button>
                ) 
            }
            
            <>  </>
            {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id !== profile.user._id && 
                auth.user.followings.find(id => id === profile.user._id) !== undefined &&
                auth.user.followers.find(id => id === profile.user._id) !== undefined &&(
                <button onClick= {()=> {startNewConvo()}} type="button" className="btn btn-primary my-1"> <i className="fas fa-comment-dots"/>
                    {" "} Message
                 </button>
                ) 
            }
             <button onClick={goToPreviousPath} type="button" className="btn btn-dark join-all my-btm">Return</button>
        </Fragment>
      }
  };


UserProfile.propTypes = {
    getProfilesById: PropTypes.func.isRequired,
    authUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    createChat: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    chat: state.chat
})

export default connect(mapStateToProps, { authUser, getProfilesById, createChat })(withRouter(UserProfile));