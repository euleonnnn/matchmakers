import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

const Chat = ({auth : {user} , chat , loading , online}) => {
  const [otherUser, setUser] = useState(null);
  
  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    try {
      const friendName = chat.names.find((name)=> name !== user.name);
      setUser(friendName);
    } catch (error) {
      console.log(error);
    }
    return () => { 
      cancel = true;
    }
  });

  useEffect(() => async () => {
    let cancel = false;
    if (cancel) return;
    try {
      const friendId = chat.users.find((u)=> u !== user._id);
      const res = await axios.get(`/api/profile/user/${friendId}`);
    } catch (error) {
      console.log(error);
    }
    return () => { 
      cancel = true;
    }
  });

    if (loading || otherUser == null) {
      return null;
    }
    else {
      return <Fragment> 
        { online 
          ? <div className="conversation my-top-small">
              <span className="conversationName">{otherUser} </span>
              <div className="chatOnlineBadge"/>
            </div>
          : <div className="conversation my-top-small">
              <span className="conversationName">{otherUser}</span>
            </div>
        }
      </Fragment>
    }
}



Chat.propTypes = {
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({ 
    auth: state.auth
});

  

export default connect(mapStateToProps, {})(Chat);
