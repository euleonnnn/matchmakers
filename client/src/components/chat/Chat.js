import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfilesById } from '../../actions/profile';
import axios from 'axios';


const Chat = ({getProfilesById, auth: { user }, convo, profile: { profile, loading }}) => {
  const [otherUser, setUser] = useState(null);

  useEffect(()=> { 
    const friendID = convo.users.filter((id)=> id !== user._id)[0];
    const getProfile = async() => {
      const res = await axios.get(`/api/profile/user/${friendID}`);
      setUser(res.data)
    }
    getProfile()
  },[])
    
    if (loading || profile === null || otherUser == null) {
      return <Spinner />
    }
    else {
      return <Fragment>
        <div className="conversation my-top-small">
          <span className="conversationName">{otherUser.user.name}</span>
        </div>
      </Fragment>
    }
}


Chat.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfilesById: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    chat: state.chat    
});

  
export default connect(mapStateToProps, {getProfilesById})(Chat);
