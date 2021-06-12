import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Chat = ({auth : {user} , chat , loading }) => {
  const [otherUser, setUser] = useState(null);
  
  useEffect(() => {
    const friendName = chat.names.find((name)=> name !== user.name);
    setUser(friendName);
  });

    if (loading || otherUser == null) {
      return null;
    }
    else {
      return <Fragment>
        <div className="conversation my-top-small">
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
