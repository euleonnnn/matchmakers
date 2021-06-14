import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

const Chat = ({auth : {user} , chat , loading }) => {
  const [otherUser, setUser] = useState(null);
  const [friendImg, setImg] = useState(null);
  
  useEffect(() => {
    const friendName = chat.names.find((name)=> name !== user.name);
    setUser(friendName);
  });

  useEffect(() => async () => {
    try {
    const friendId = chat.users.find((u)=> u !== user._id);
      const res = await axios.get(`/api/profile/user/${friendId}`);
      const img = res.data.user.avatar;
      setImg(img);
    } catch (error) {
      console.log(error);
    }
  });

    if (loading || otherUser == null) {
      return null;
    }
    else {
      return <Fragment>
        <div className="conversation my-top-small">
          <img className="chatdp" src={friendImg} alt=""/>
          <span className="conversationName">{otherUser}</span>
        </div>
      </Fragment>
    }
}



Chat.propTypes = {
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({ 
    auth: state.auth,
});

  

export default connect(mapStateToProps, {})(Chat);
