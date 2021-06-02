import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfilesById } from '../../actions/profile';
import { authUser } from '../../actions/auth'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getGameById } from '../../actions/game';
import { GAME_FAIL } from '../../actions/types';
import auth from '../../reducers/auth';

const GameRoom = ({ getGameById, authUser, auth, game : {game, loading}, match }) => {
    useEffect(() => {
        getGameById(match.params.id);
      });
    
    useEffect(() => {
        authUser();
    }, []);

    if (game === null || loading) {
        return(
            <Fragment>
                <Spinner />; 
            </Fragment>
        ) 
    } else {
        return (
            <Fragment>
                <h1 className="text-primary my-3 my-btm"> Game Lobby </h1>
                    <div class="row">
                        <div class="col-sm-6 col-md-6">
                            <div className="card mb-3">
                            <div className="card-body">
                            <h5 className="card-title my-3 host-title">{game.sport}</h5>
                                <p className="card-text"> <span className='text-primary'> Experience Level: </span> {game.experience}</p>
                                <p className="card-text"> <span className='text-primary'> Location: </span> {game.location}</p>
                                <p className="card-text"> <span className='text-primary'> Date: </span> {game.dateTime} </p>
                                <small className="card-text text-muted"> Created on: {game.dateTime} </small>
                                <br></br>
                            </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-6">
                            <div className="card mb-3">
                                <div className="card-body">
                                <h5 className="card-title my-3 host-title">Players In Waiting Room</h5>
                                {game.players.length > 0 && game.players.map(player => { 
                                    if (player.user === auth.user._id) {
                                        return (
                                            <Fragment>
                                            <div className="card mb-3">
                                            <div className="card-body">
                                                {player.name}
                                                <Link to="#!" className="btn btn-danger join-all"> <i class="far fa-times-circle"/> </Link>
                                            </div>
                                            </div>
                                            </Fragment>
                                        )
                                    } else {
                                        return (
                                            <div className="card mb-3">
                                            <div className="card-body">
                                                {player.name}
                                            </div>
                                            </div>
                                        )
                                    }
                                })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <div className="card mb-3">
                            <div className="card-body">
                            <h5 className="card-title my-3 host-title ">About Game Host </h5>
                                <p className="card-text"> <span className='text-primary'> Host Name: </span> {game.name}</p>
                                <p className="card-text"> <span className='text-primary'> Date: </span> {game.dateTime} </p>
                                <small className="card-text text-muted"> Created on: {game.dateTime} </small>
                                <br></br>
                            </div>
                            </div>
                        </div>
                    </div>

            </Fragment>
        )
    };
}


GameRoom.propTypes = {
    getGameById: PropTypes.func.isRequired,
    authUser: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    game: state.game,
    auth: state.auth
})

export default connect(mapStateToProps, { getGameById, authUser })(GameRoom);