import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import FriendList from './FriendList';
import { getCurrentProfile } from '../../actions/profile';
import { getGames } from '../../actions/game';
import '../../css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import bball from '../layout/bball.jpg';
import bball2 from '../layout/bball2.jpg';
import { logout } from '../../actions/auth';
import dateformat from '../../utils/dateformat';



const Dashboard = ({ getGames, getCurrentProfile, auth: { user }, profile : { profile, loading }, game: {games}, logout }) => {

  useEffect(() => {
    getGames();
  }, [getGames]);
 
  //Necessary to rerender 
  // eslint-disable-next-line
  useEffect(() => {
    getCurrentProfile();
  });

  const convertTime = e => {
    var d1 = new Date(e);
    return d1.getTime();
}
 

  if (loading || user === null) {
    return <Spinner />; 
  } else {
    const my_games = games.filter(game => game.user === user._id)
    const joined_games = games.filter(game => game.user !== user._id && game.players.filter(player => player.user === user._id).length > 0)
    return  <Fragment>
      <h1 className="large text-primary big-header"><i class="fas fa-dumbbell"/> {" "} Hello There, {user && user.name}</h1>
      {profile !== null && user !== null ? 
        (profile.user._id !== user._id ? <Spinner /> :
      <Fragment> 

      <div class="container">
        <div class="row">
          <div class="col-sm-8 col-md-8">

            
            <h4 className="text-primary">  My Interests </h4>

              <ul>
                  {profile.interests.map(item => {
                    return <li><i class="fas fa-dot-circle"/> {item}</li>;
                  })}
              </ul>
              
              {my_games.length>0 && <h4 className="text-primary my-top"> Pending Games </h4>}
              
              {my_games.length>0 && my_games.map(game => (convertTime(game.dateTime) < Date.now() ? <></>:
              
                  <div className="card mb-3">
                  <i className="fas fa-crown my-left my-top-small"></i>
                  <div className="card-body">
                  <h5 className="card-title">{game.sport}</h5>
                  <br></br>
                  <p className="card-text"> <span className='text-primary'> Location: </span> {game.location==="Others"? game.otherLoc : game.location}</p>
                  <p className="card-text"> <span className='text-primary'> Waiting Room: </span> {game.players.length} players out of {game.maxPlayers}</p>
                  <p className="card-text"> <span className='text-primary'> Game Day: </span> {dateformat(game.dateTime)} </p>
                  <Link to={`/games/${game._id}`} className="btn btn-dark join-all"> Enter Room</Link>
                  <p className="card-text">
                     
                  </p>
                  </div>
                  </div>
                 
              ))}

              {joined_games.length > 0 && joined_games.map(game => (convertTime(game.dateTime) < Date.now() ? <></>:
                 <div className="card mb-3">
                 <div className="card-body">
                 <h5 className="card-title">{game.sport}</h5>
                 <br></br>
                 <p className="card-text"> <span className='text-primary'> Location: </span> {game.location==="Others"? game.otherLoc : game.location}</p>
                 <p className="card-text"> <span className='text-primary'> Waiting Room: </span> {game.players.length} players out of {game.maxPlayers}</p>
                 <p className="card-text"> <span className='text-primary'> Game Day: </span> {dateformat(game.dateTime)} </p>
                 <Link to={`/games/${game._id}`} className="btn btn-dark join-all"> Enter Room</Link>
                 <p className="card-text">
                    
                 </p>
                 </div>
                 </div>
              ))}

            
          </div>
          
          <div className="col-sm-4 col-md-4">
            <FriendList />

            <Link to="/my-profile" className="btn btn-secondary btn-lg btn-block my-top"> <i class="fas fa-cog"/> Profile Settings </Link>

              
            <h4 className="text-primary my-top">  Suggested Games : </h4>
              <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img height="100" width ="195" src={bball} alt="Eusoff"/>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Placeholder</h5>
                        </div>
                      </div>
                    </div>
                </div>      
          </div>
        </div>
      </div>

      </Fragment> ) : 

      <Fragment> 
        <p> No Profile Yet. You will need a profile to host or join games. </p> 
        <Link to ='/create-profile' className="btn btn-primary my-1"> Set Up One Now </Link>
        
        <Link to ="#!" onClick={logout} className="btn btn-danger join-all"> Logout </Link>

      </Fragment> }
      </Fragment>
  }
} 

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getGames: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  game: state.game
});

export default connect(mapStateToProps, { getGames, getCurrentProfile, logout })(Dashboard);