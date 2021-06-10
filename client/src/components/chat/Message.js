import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Message = ({auth: { user }, sent, message}) => {

  return (
    <Fragment>
       <div className={sent ? "message sent" : "message"}>
        <div className="toptext">
          <p className="messagetext">{message.text}</p>
        </div>
        <div className="text-muted btmtext">3 minutes ago</div>
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
