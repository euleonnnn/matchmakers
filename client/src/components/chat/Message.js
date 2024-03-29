import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {format} from 'timeago.js'

const Message = ({sent, message}) => {

  return (
    <Fragment>
       <div className={sent ? "message sent" : "message"}>
        <div className="toptext">
          <p className="messagetext">{message.text}</p>
        </div>
        <div className="text-muted btmtext">{format(message.createdAt)}</div>
      </div>
      </Fragment>
  );
}


Message.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ 
    auth: state.auth,
});

  
export default connect(mapStateToProps, {})(Message);
