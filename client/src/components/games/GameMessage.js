import React, { Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {format} from 'timeago.js'
import axios from 'axios';

const GameMessage = ({auth: { user }, message, loading}) => {
  const [playerName, setName] = useState(null);
  
  useEffect(() => async () => {
    try {
      const res = await axios.get(`/api/profile/user/${message.sender}`);
      const username = res.data.user.name;
      setName(username);
    } catch (error) {
      console.log(error);
    }
  });

 
  return <Fragment>
       <div>
        <div className="toptext">
          <p className="messagetext">{message.text}</p>
        </div>
        <div className="text-muted btmtext">{format(message.createdAt)}</div>
      </div>
      </Fragment>

}


GameMessage.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ 
    auth: state.auth,
});

  
export default connect(mapStateToProps)(GameMessage);
