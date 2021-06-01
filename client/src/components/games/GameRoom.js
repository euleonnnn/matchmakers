import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfilesById } from '../../actions/profile';
import { authUser } from '../../actions/auth'
import { Link } from 'react-router-dom';
import axios from 'axios';

const GameRoom = ({ game: {sport}, auth }) => {
    return <div>{sport}</div>
};


GameRoom.propTypes = {
    game: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    game: state.game,
    auth: state.auth
})

export default connect(mapStateToProps, { })(GameRoom);