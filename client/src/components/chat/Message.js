import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Message = ({auth: { user }, sent}) => {

  return (
    <Fragment>
        <div className= { sent ? "message sent": "message"}>
        <p className="textmessage"> Hello I am not your friend</p>
        <p className="text-muted btmtext">Sent: 3 mins ago</p>
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
