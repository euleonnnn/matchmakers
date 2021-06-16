import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGames, clearGame, deleteGame } from '../../actions/game';
import Spinner from '../layout/Spinner';
import dateformat from '../../utils/dateformat';
import { getCurrentProfile } from '../../actions/profile';


const Games = ( {getCurrentProfile, deleteGame, clearGame, getGames, game: {games, loading}, auth}) => {
    // eslint-disable-next-line
    useEffect(() => {
        getGames();
    },[getGames]);

    useEffect(() => {
        clearGame();
    });

    useEffect(() => {
        getCurrentProfile();
      }, [getCurrentProfile]);

    return loading ? <Spinner /> : <Fragment>
          <h1 className = "large big-header text-dark"> Available Game Rooms </h1>

            <div className ="input-group my-3">
                <input type="search" className ="form-control rounded" placeholder="Search" aria-label="Search"
                    aria-describedby="search-addon" />
                <button type="button" class="btn btn-outline-primary">search</button>
            </div>
            <Link to="/create-game" className="btn btn-primary btn-block btn-lg my-4"> <i class="fas fa-football-ball"/> {" "} Host Your Game </Link>
        {games.map(game => (
            <div className="card mb-3">
                <div className="card-body">
                <h5 className="card-title">{game.sport}</h5>
                <br></br>
                <p className="card-text"> <span className='text-primary'> Location: </span> {game.location==="Others"? game.otherLoc : game.location}</p>
                <p className="card-text"> <span className='text-primary'> Waiting Room: </span> {game.players.length} players out of {game.maxPlayers}</p>
                <p className="card-text"> <span className='text-primary'> Time: </span> {dateformat(game.dateTime)} </p>
                <p className="card-text">
                    <br></br>
                    <small className="text-muted"> Game Host: {game.name} </small>
                    <br></br>
                    <small className="text-muted"> Created on: {dateformat(game.createTime)} </small>
                </p>
                {auth.user._id !== game.user ? <Link to={`/games/${game._id}`} className="btn btn-dark join-all"> Enter Room</Link> :
                <Fragment>
                 <Link to={`/games/${game._id}`} className="btn btn-dark join-all "> Enter Room </Link>
                 <button onClick={()=>deleteGame(game._id)} type ="button" className="btn btn-danger join-all my-right"> Cancel Game </button>
                 </Fragment>
                 }
                 
                </div>
            </div>
        ))}

    </Fragment>
}


Games.propTypes = {
    getGames: PropTypes.func.isRequired,
    clearGame: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    game: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    game : state.game,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteGame, getGames, clearGame })(Games);