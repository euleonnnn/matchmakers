import React, { Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGames, clearGame, deleteGame } from '../../actions/game';
import Spinner from '../layout/Spinner';
import dateformat from '../../utils/dateformat';
import { getCurrentProfile } from '../../actions/profile';


const Games = ( {getCurrentProfile, deleteGame, clearGame, getGames, game: {games, game, loading}, auth}) => {

    const [filters, setFilters] = useState([]);
    //Search term for UI filter handling
    const [searchterm, setSearch] = useState('');
    //searchdata for backend filtering of games
    const [searchdata, setSearchData] = useState('');
    const [formType, setFormType] = useState("");

    const disabledActivity = <button type="button" className="btn btn-secondary my-right" disabled={true}>Activity</button>
    const disabledLoc = <button type="button" className="btn btn-secondary my-right" disabled={true}>Location</button>
    const disabledName = <button type="button" className="btn btn-secondary my-right" disabled={true}>Host Name</button>


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

    const changefilters = (cancel) => {
        setFilters(filters.filter(item => item !== cancel.f).sort());
        console.log(filters)
    }

    const onSubmit = () => {
        setFilters ((prev) => [...prev, formType + ": " + searchdata].sort())
        setSearch("")
        setFormType("")
        setSearchData("")
    }

    const getSecondPart = (str) => str.split(": ")[1];
    

    const displayGame = () => games ? games
        .filter(game => (convertTime(game.dateTime) > Date.now()))
        .filter(g => {
            if (getSecondPart(filters[0]) === ""){
                return g
            }
            if (g.sport.toLowerCase().includes(getSecondPart(filters[0]).toLowerCase())) {
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

    const displayLocation = () => games ? games
    .filter(game => (convertTime(game.dateTime) > Date.now()))
    .filter(g => {
        if (getSecondPart(filters[0]) === ""){
            return g
        }
        if (g.location.toLowerCase().includes(getSecondPart(filters[0]).toLowerCase()) || g.otherLoc.toLowerCase().includes(getSecondPart(filters[0]).toLowerCase())) {
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

    const displayName = () => games ? games
        .filter(game => (convertTime(game.dateTime) > Date.now()))
        .filter(g => {
            if (getSecondPart(filters[0]) === ""){
                return g
            }
            if (g.name.toLowerCase().includes(getSecondPart(filters[0]).toLowerCase())) {
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
    
    const displayGL = () =>  games ? games
        .filter(game => (convertTime(game.dateTime) > Date.now()))
        .filter(g => {
            if (getSecondPart(filters[0]) === ""){
                return g
            }
            if (g.sport.toLowerCase().includes(getSecondPart(filters[0]).toLowerCase())) {
                return g
            }
        })
        .filter(g => {
            if (getSecondPart(filters[1]) === ""){
                return g
            }
            if (g.location.toLowerCase().includes(getSecondPart(filters[1]).toLowerCase()) || g.otherLoc.toLowerCase().includes(getSecondPart(filters[1]).toLowerCase())) {
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
    

    const displayGN = () =>  games ? games
        .filter(game => (convertTime(game.dateTime) > Date.now()))
        .filter(g => {
            if (getSecondPart(filters[0]) === ""){
                return g
            }
            if (g.sport.toLowerCase().includes(getSecondPart(filters[0]).toLowerCase())) {
                return g
            }
        })
        .filter(g => {
            if (getSecondPart(filters[1]) === ""){
                return g
            }
            if (g.name.toLowerCase().includes(getSecondPart(filters[1]).toLowerCase())) {
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


    const displayLN = () =>  games ? games
        .filter(game => (convertTime(game.dateTime) > Date.now()))
        .filter(g => {
            if (getSecondPart(filters[0]) === ""){
                return g
            }
            if (g.location.toLowerCase().includes(getSecondPart(filters[0]).toLowerCase()) || g.otherLoc.toLowerCase().includes(getSecondPart(filters[0]).toLowerCase())) {
                return g
            }
        })
        .filter(g => {
            if (getSecondPart(filters[1]) === ""){
                return g
            }
            if (g.name.toLowerCase().includes(getSecondPart(filters[1]).toLowerCase())) {
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


    const displayAll =  games ? games.filter(game => (convertTime(game.dateTime) > Date.now())).
        map(game =>
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
        </div>) : <></>
    

    const displayALN = () =>  games ? games
        .filter(game => (convertTime(game.dateTime) > Date.now()))
        .filter(g => {
            if (getSecondPart(filters[0]) === ""){
                return g
            }
            if (g.sport.toLowerCase().includes(getSecondPart(filters[0]).toLowerCase())) {
                return g
            }
        })
        .filter(g => {
            if (getSecondPart(filters[1]) === ""){
                return g
            }
            if (g.location.toLowerCase().includes(getSecondPart(filters[1]).toLowerCase()) || g.otherLoc.toLowerCase().includes(getSecondPart(filters[1]).toLowerCase())) {
                return g
            }
        })
        .filter(g => {
            if (getSecondPart(filters[2]) === ""){
                return g
            }
            if (g.name.toLowerCase().includes(getSecondPart(filters[2]).toLowerCase())) {
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

    const displayAllResults = games.filter(game => (convertTime(game.dateTime) > Date.now())).length;

    return loading ? <Spinner /> : <Fragment>
          <h1 className = "large big-header text-dark"> Available Rooms </h1>

          <Link to="/create-game" className="btn btn-primary btn-block btn-lg my-2">  <i class="fas fa-icons"/> Create Your Activity</Link>

            <h5 className="my-top"> Search By : </h5>
                { filters.filter(f => f.charAt(0) === "a").length === 0 ? 
                (formType === "activity" ? <button type="button" className="btn btn-primary my-right">Activity</button> : 
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("activity")}>Activity</button>) :
                   disabledActivity }


                { filters.filter(f => f.charAt(0) === "l").length === 0 ?
                (formType === "location" ? <button type="button" className="btn btn-primary my-right">Location</button> :
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("location")}>Location</button>) :
                    disabledLoc }

                { filters.filter(f => f.charAt(0) === "n").length === 0 ? 
                (formType === "name" ? <button type="button" className="btn btn-primary my-right">Host Name</button> :
                <button type="button" className="btn btn-secondary my-right" onClick={() => setFormType("name")}>Host Name</button>) :
                    disabledName }      
                
                <form className ="input-group my-3" onSubmit={e => e.preventDefault()}>
                    <input type="search" className ="form-control rounded" placeholder= {formType} aria-label="Search" value={searchdata}
                    onChange={(e) => setSearchData(e.target.value)}/> 
                    <input type="submit" className="btn btn-outline-primary" onClick={()=>{onSubmit(); setSearch(searchdata)}} value="Filter" />
                </form>

            { filters.length> 0 && filters.map(f => 
                <div className="bdg bg-dark my-right"> <p className="filter"> "{f}" </p>  <button type="button" onClick={
                    ()=> changefilters({f}) } className="btn2 btn-round join-all"> <i className="far fa-times-circle"/> </button> </div>
                )}
            
          
            
            <hr className="line"></hr>
            <h6 className="my-btm"> Matching Results: {" "}
                { filters.length === 0 && displayAllResults}
                { filters.length === 1 && filters[0].charAt(0) === "a" && displayGame().length }
                { filters.length === 1 && filters[0].charAt(0) === "l" && displayLocation().length }
                { filters.length === 1 && filters[0].charAt(0) === "n" && displayName().length }
                { filters.length === 2 ? 
                filters[0].charAt(0) === "a" && filters[1].charAt(0) === "l" ? displayGL().length :
                <></>
                : <></>}
                { filters.length === 2 ? 
                filters[0].charAt(0) === "a" && filters[1].charAt(0) === "n" ? displayGN().length :
                <></>
                : <></>}
                { filters.length === 2 ? 
                filters[0].charAt(0) === "l" && filters[1].charAt(0) === "n" ? displayLN().length :
                <></>
                : <></>}
                 { filters.length === 3 && displayALN().length } 

            </h6>


            { filters.length === 0 && displayAll}
            { filters.length === 1 && filters[0].charAt(0) === "a" && displayGame() }
            { filters.length === 1 && filters[0].charAt(0) === "l" && displayLocation() }
            { filters.length === 1 && filters[0].charAt(0) === "n" && displayName() }
            { filters.length === 2 ? 
                filters[0].charAt(0) === "a" && filters[1].charAt(0) === "l" ? displayGL() :
                <></>
                : <></>}
            { filters.length === 2 ? 
                filters[0].charAt(0) === "a" && filters[1].charAt(0) === "n" ? displayGN() :
                <></>
                : <></>}
             { filters.length === 2 ? 
                filters[0].charAt(0) === "l" && filters[1].charAt(0) === "n" ? displayLN() :
                <></>
                : <></>}
            { filters.length === 3 && displayALN()} 

    
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