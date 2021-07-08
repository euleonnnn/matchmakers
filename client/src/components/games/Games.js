import React, { Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGames, clearGame, deleteGame } from '../../actions/game';
import Spinner from '../layout/Spinner';
import dateformat from '../../utils/dateformat';
import { getCurrentProfile } from '../../actions/profile';


const Games = ( {getCurrentProfile, deleteGame, clearGame, getGames, game: {games, game, loading}, auth}) => {

    const [searchterm, setSearch] = useState('')
    const [formType, setFormType] = useState("sport");


    // eslint-disable-next-line
    useEffect(() => {
        getGames();
    },[getGames]);

    useEffect(() => {
        clearGame();
    },[game]);

    useEffect(() => {
        getCurrentProfile();
      }, [getCurrentProfile]);

    const convertTime = e => {
        var d1 = new Date(e);
        return d1.getTime();
    }

    const displayGame = games ? games
        .filter(game => (convertTime(game.dateTime) > Date.now()))
        .filter(g => {
            if (searchterm === ""){
                return g
            }
            if (g.sport.toLowerCase().includes(searchterm.toLowerCase())) {
                return g
            }
        })
        .map(game =>
            <div className="card mb-3">
            <div className="card-body">
            <h5 className="card-title">{game.sport}</h5>
            <br></br>
            <p className="card-text"> <span className='text-primary'> Location: </span> {game.location==="Others"? game.otherLoc : game.location}</p>
            <p className="card-text"> <span className='text-primary'> Waiting Room: </span> {game.players.length} players out of {game.maxPlayers}</p>
            <p className="card-text"> <span className='text-primary'> Time: </span> {dateformat(game.dateTime)} </p>
            <p className="card-text">
                <br></br>
                <small className="text-muted"> Host: {game.name} </small>
                <br></br>
                <small className="text-muted"> Created on: {dateformat(game.createTime)} </small>
            </p>
            {auth.user._id !== game.user ? <Link to={`/games/${game._id}`} className="btn btn-dark join-all"> Enter Room</Link> :
            <Fragment>
             <Link to={`/games/${game._id}`} className="btn btn-dark join-all "> Enter Room </Link>
             <button onClick={()=>deleteGame(game._id)} type ="button" className="btn btn-danger join-all my-right"> Cancel Room </button>
             </Fragment>
             }
             
            </div>
        </div>
    ) : <></>

    const displayLocation = games ? games
    .filter(game => (convertTime(game.dateTime) > Date.now()))
    .filter(g => {
        if (searchterm === ""){
            return g
        }
        if (g.location.toLowerCase().includes(searchterm.toLowerCase())) {
            return g
        }
    })
    .map(game =>
        <div className="card mb-3">
        <div className="card-body">
        <h5 className="card-title">{game.sport}</h5>
        <br></br>
        <p className="card-text"> <span className='text-primary'> Location: </span> {game.location==="Others"? game.otherLoc : game.location}</p>
        <p className="card-text"> <span className='text-primary'> Waiting Room: </span> {game.players.length} players out of {game.maxPlayers}</p>
        <p className="card-text"> <span className='text-primary'> Time: </span> {dateformat(game.dateTime)} </p>
        <p className="card-text">
            <br></br>
            <small className="text-muted"> Host: {game.name} </small>
            <br></br>
            <small className="text-muted"> Created on: {dateformat(game.createTime)} </small>
        </p>
        {auth.user._id !== game.user ? <Link to={`/games/${game._id}`} className="btn btn-dark join-all"> Enter Room</Link> :
        <Fragment>
         <Link to={`/games/${game._id}`} className="btn btn-dark join-all "> Enter Room </Link>
         <button onClick={()=>deleteGame(game._id)} type ="button" className="btn btn-danger join-all my-right"> Cancel Room </button>
         </Fragment>
         }
         
        </div>
    </div>
    ) : <></>

    const displayName = games ? games
        .filter(game => (convertTime(game.dateTime) > Date.now()))
        .filter(g => {
            if (searchterm === ""){
                return g
            }
            if (g.name.toLowerCase().includes(searchterm.toLowerCase())) {
                return g
            }
        })
        .map(game =>
            <div className="card mb-3">
            <div className="card-body">
            <h5 className="card-title">{game.sport}</h5>
            <br></br>
            <p className="card-text"> <span className='text-primary'> Location: </span> {game.location==="Others"? game.otherLoc : game.location}</p>
            <p className="card-text"> <span className='text-primary'> Waiting Room: </span> {game.players.length} players out of {game.maxPlayers}</p>
            <p className="card-text"> <span className='text-primary'> Time: </span> {dateformat(game.dateTime)} </p>
            <p className="card-text">
                <br></br>
                <small className="text-muted"> Host: {game.name} </small>
                <br></br>
                <small className="text-muted"> Created on: {dateformat(game.createTime)} </small>
            </p>
            {auth.user._id !== game.user ? <Link to={`/games/${game._id}`} className="btn btn-dark join-all"> Enter Room</Link> :
            <Fragment>
            <Link to={`/games/${game._id}`} className="btn btn-dark join-all "> Enter Room </Link>
            <button onClick={()=>deleteGame(game._id)} type ="button" className="btn btn-danger join-all my-right"> Cancel Room </button>
            </Fragment>
            }
            
            </div>
        </div>
    ) : <></>

    return loading ? <Spinner /> : <Fragment>
          <h1 className = "large big-header text-dark"> Available Rooms </h1>
            <h5> Search By : </h5>
                {formType === "sport" ? <button type="button" className="btn btn-primary my-right">Sports</button> :
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("sport")}>Sports</button> }

                {formType === "location" ? <button type="button" className="btn btn-primary my-right">Location</button> :
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("location")}>Location</button> }

                {formType === "name" ? <button type="button" className="btn btn-primary my-right">Host Name</button> :
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("name")}>Host Name</button> }      
                <input type="search" className ="form-control rounded my-3" placeholder="Search" aria-label="Search"
                    onChange={event => {setSearch(event.target.value)}}/>
            <Link to="/create-game" className="btn btn-primary btn-block btn-lg my-4"> Create Your Room </Link>
             
            { formType === "sport" && displayGame }
            { formType === "location" && displayLocation}
            { formType === "name" && displayName}

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