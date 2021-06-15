import React, { Fragment, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {format} from 'timeago.js'
import axios from 'axios';


const GameMessage = ({auth: { user }, message}) => {

  const sent = message.name === user.name;

  return <Fragment>
       <div className={sent ? "message sent" : "message"}>
        <p>{message.name}</p> 
        <div className="toptext">
          {sent ? <></> : <img className="gamechatdp" src={message.avatar} alt=""/>}
          <p className="messagetext">{message.text}</p>
        </div>
        <div className="text-muted btmtext">{format(message.createdAt)}</div>
      </div>
      </Fragment>

}


GameMessage.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ 
    auth: state.auth,
});

  
export default connect(mapStateToProps)(GameMessage);
