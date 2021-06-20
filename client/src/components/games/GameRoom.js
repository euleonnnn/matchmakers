import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { authUser } from '../../actions/auth'
import { Link } from 'react-router-dom';
import { getGameById } from '../../actions/game';
import { clearProfile } from '../../actions/profile';
import axios from 'axios';
import dateformat from '../../utils/dateformat';
import GameChat from './GameChat';
import { getGameChat, createGameChat } from '../../actions/gamechat';
import EnterCall from '../video/EnterCall';


const GameRoom = ({ getGameChat, createGameChat, clearProfile, getGameById, authUser, auth, game : {game, loading}, match, gamechat: {gamechat} }) => {

    const [messages, setMessages] = useState([]);  
    
    const startNewConvo= () => {
        try {
            const formData = {
                room: game._id
            }
            createGameChat(formData)
        } catch (error) {
          console.log(error)
        }
    }

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
        getGameChat(match.params.id);
    },[]);

    useEffect(() => {
        getGameById(match.params.id);
    });
    
    useEffect(() => {
        authUser();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        clearProfile();
        // eslint-disable-next-line
    }, []);


    if (game === null || loading || gamechat === null) {
        return(
            <Fragment>
                <Spinner />
            </Fragment>
        ) 
    } else {
        return (
            <Fragment>
                <h1 className="text-primary my-3 my-btm"> {game.name}'s Game Lobby  </h1>
                <div className="row">
                <div className="card-body">
                <Link to="/all-games" className="btn btn-dark join-all"> <i class="fas fa-sign-out-alt" /> Leave Lobby </Link>
                </div>
                </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <div className="card mb-3">
                            <div className="card-body">
                            <h5 className="card-title my-3 host-title">{game.sport}</h5>
                                <p className="card-text"> <span className='text-primary'> Experience Level: </span> {game.experience}</p>
                                <p className="card-text"> <span className='text-primary'> Location: </span> {game.location==="Others"?game.otherLoc:game.location}</p>
                                <p className="card-text"> <span className='text-primary'> Date: </span> {dateformat(game.dateTime)} </p>
                                <p className="card-text"> <span className='text-primary'> Max Players: </span> {game.maxPlayers} </p>
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
                                                }} type="button" className="btn btn-danger btn-round join-all"> <i class="far fa-times-circle"/> </button>
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
                                <p> { game.players.length < game.maxPlayers && game.players.filter(player => 
                                    player.user === auth.user._id).length === 0  && 
                                    <button onClick= {()=> {
                                        joinGame();
                                    }} type="button" className="btn btn-primary join-all"> Join Game </button>}
                                </p>

                                <h5> { game.players.length >= game.maxPlayers && <span class="badge badge-light">
                                    Waiting Room is Currently Full</span>}</h5>
                             
                                </div>
                            </div>
                             <EnterCall/>
                            <div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <div className="card mb-3">
                                <div className="row g-0">
                                <div className="col-md-4">
                                    <img height="195" width ="195" src={game.avatar} className="round-img" alt=""/>
                                </div>
                                <div className="col-md-8">
                                    <h5 className="card-title my-3 host-title ">About Game Host </h5>
                                    <p className="card-text"> <span className='text-primary'> Host Name: </span> {game.name}</p>
                                    <small className="card-text text-muted"> Room Created: {dateformat(game.createTime)} </small>
                                    <br></br>
                                </div>
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

                                { gamechat.length === 0 && game.user !== auth.user._id &&
                                    <Fragment>
                                        <h1 className ="badge badge-danger"> Game Chat has not been enabled </h1>
                                    </Fragment>
                                }

                                { (gamechat.length === 0 && game.user === auth.user._id) 
                                    && <button type="button" onClick = {()=> {startNewConvo()}} className="btn btn-success btn-lg btn-block ">
                                      Enable Chat
                                </button> }

                                { gamechat.length > 0 &&  <GameChat />}

                                
                               
                            </div>
                        </div>
                    </div>

            </Fragment>
        )
    }
}


GameRoom.propTypes = {
    getGameById: PropTypes.func.isRequired,
    authUser: PropTypes.func.isRequired,
    clearProfile: PropTypes.func.isRequired,
    createGameChat: PropTypes.func.isRequired,
    getGameChat: PropTypes.func.isRequired,
    getChats: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    gamechat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    game: state.game,
    auth: state.auth,
    gamechat: state.gamechat
})

export default connect(mapStateToProps, { getGameChat, createGameChat, clearProfile, getGameById, authUser })(GameRoom);