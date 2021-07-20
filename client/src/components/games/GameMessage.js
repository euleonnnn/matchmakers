import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {format} from 'timeago.js'


const GameMessage = ({auth: { user }, message}) => {

  const sent = message.name === user.name;

  return <Fragment>
       <div className={sent ? "message sent" : "message"}>
        <p> <strong>{message.name}</strong></p> 
        <div className="toptext">
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
