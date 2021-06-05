import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { authUser } from '../../actions/auth'
import { Link } from 'react-router-dom';
import { getGameById } from '../../actions/game';
import { clearProfile } from '../../actions/profile';
import axios from 'axios';
import dateformat from '../../utils/dateformat';


const GameRoom = ({ clearProfile, getGameById, authUser, auth, game : {game, loading}, match }) => {
    

    const quitGame = () => {
        try {
            axios.put(`/api/games/quit/${game._id}`);
        } catch (err) { 
            console.log(err.status)
        }
      };
    
    const joinGame = () => {
        try {
            axios.put(`/api/games/join/${game._id}`);
        } catch (err) { 
            console.log(err.status)
        }
      };

    useEffect(() => {
        getGameById(match.params.id);
    });
    
    useEffect(() => {
        authUser();
    }, []);

    useEffect(() => {
        clearProfile();
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
                <h1 className="text-primary my-3 my-btm"> {game.name}'s Game Lobby  </h1>
                <div class="row">
                <div className="card-body">
                <Link to="/all-games" className="btn btn-danger join-all"> <i class="fas fa-sign-out-alt" /> Leave Lobby </Link>
                </div>
                </div>
                    <div class="row">
                        <div class="col-sm-6 col-md-6">
                            <div className="card mb-3">
                            <div className="card-body">
                            <h5 className="card-title my-3 host-title">{game.sport}</h5>
                                <p className="card-text"> <span className='text-primary'> Experience Level: </span> {game.experience}</p>
                                <p className="card-text"> <span className='text-primary'> Location: </span> {game.location}</p>
                                <p className="card-text"> <span className='text-primary'> Date: </span> {dateformat(game.dateTime)} </p>
                                <p className="card-text"> <span className='text-primary'> Max Players: </span> {game.maxPlayer} </p>
                                <br></br>
                            </div>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-6">
                            <div className="card mb-3">
                                <div className="card-body">
                                <h5 className="card-title my-3 host-title">Players In Waiting Room : {game.players.length} </h5>
                                {game.players.length > 0 && game.players.map(player => { 
                                    if (player.user === auth.user._id) {
                                        return (
                                            <Fragment>
                                            <div className="card mb-3">
                                            <div className="card-body player-card">
                                                {player.name}
                                                <button onClick= {()=> {
                                                    quitGame();
                                                }} type="button" className="btn btn-danger join-all"> <i class="far fa-times-circle"/> </button>
                                            </div>
                                            </div>
                                            </Fragment>
                                        )
                                    } else {
                                        return (
                                            <Fragment>
                                            <div className="card mb-3">
                                            <div className="card-body player-card">
                                                <Link to={`/profile/${player.user}`}> {player.name} </Link> 
                                            </div>
                                            </div>
                                            </Fragment>
                                        )
                                    }
                                })}
                                <p> { game.players.filter(player=> player.user === auth.user._id).length === 0  && 
                                    <button onClick= {()=> {
                                        joinGame();
                                    }} type="button" className="btn btn-dark join-all"> Join Game </button>}
                                </p>
                             
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
                                    <small className="card-text text-muted"> Created on: {dateformat(game.dateTime)} </small>
                                    <br></br>
                                </div>
                                {game.user !== auth.user._id &&  <Link to={`/profile/${game.user}`} className="btn btn-dark btn-lg btn-block"> View Host Profile </Link>}
                                {game.user === auth.user._id &&  <Link to="#!" className="btn btn-dark btn-lg btn-block"> <i class="fas fa-cog"/> Game Settings </Link>}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title my-3 host-title "> Game Chat</h5>
                                </div>
                                <div className ="input-group my-3">
                                <input type="search" className ="form-control rounded my-left" placeholder="Type Something to Send to the Room" aria-label="Search"
                                    aria-describedby="search-addon" />
                                <button type="button" class="btn btn-outline-primary my-right"> <i class="fas fa-paper-plane" /> </button>
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
    clearProfile: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    game: state.game,
    auth: state.auth
})

export default connect(mapStateToProps, { clearProfile, getGameById, authUser })(GameRoom);