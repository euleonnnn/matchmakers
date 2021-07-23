import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import FriendList from './FriendList';
import GameItem from './GameItem';
import { getCurrentProfile } from '../../actions/profile';
import { getGames } from '../../actions/game';
import '../../css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from "axios";
import { logout } from '../../actions/auth';

const Dashboard = ({getGames, getCurrentProfile, auth: { user }, profile: { profile, loading }, game: { games }, logout }) => {

  const icon_dict = {
    "basketball" : <span role="img">🏀</span>,
    "soccer" : <span role="img">⚽</span>,
    "football" : <span role ="img">⚽</span>,
    "rugby" : <span role="img">🏉</span>,
    "running" : <span role ="img">🏃</span>,
    "jogging" : <span role ="img">🏃</span>,
    "table tennis": <span role="img">🏓</span>,
    "ping pong" : <span role="img">🏓</span>,
    "volleyball" : <span role="img">🏐</span>,
    "softball" : <span role="img">🥎</span>,
    "cycling" : <span role="img">🚴</span>,
    "lifting" :  <span role="img">🏋️</span>,
    "gym" :  <span role="img">🏋️</span>,
    "swimming" : <span role="img">🏊</span>,
    "study": <span role ="img">📖</span>,
    "studying": <span role ="img">📖</span>,
    "MLBB": <span role ="img">🎮</span>,
    "game": <span role ="img">🎮</span>,
    "gaming": <span role ="img">🎮</span>,
    "tennis" : <span role="img">🎾</span>,
    "boxing" : <span role="img">🥊</span>,
    "badminton" : <span role="img">🏸</span>
  }

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let cancel = false;
    try {
      if (cancel) return;
      getGames();
    } catch (err) {
      console.log(err);
    }
  }, [games, getGames]);

  useEffect(() => {
    let cancel = false;
    try {
      if (cancel) return;
      getCurrentProfile();
    } catch (err) {
      console.log(err);
    }
  }, [profile, getCurrentProfile]);


  useEffect(() => {
    let cancel = false;
    const getFriends = async () => {
      try {
        if (cancel) return;
        const friendList = await axios.get("/api/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends()
    return () => { 
      cancel = true;
    }
  }, [user]);

  const convertTime = e => {
    var d1 = new Date(e);
    return d1.getTime();
  }

  if (loading || user === null) {
    return <Spinner />;
  } else {
    const my_games = games.filter(game => game.user === user._id);
    const joined_games = games.filter(game => game.user !== user._id && game.players.filter(player => player.user === user._id).length > 0);

    return <Fragment>
      <h1 className="large big-header my-top"><i className="fas fa-dumbbell" /> {" "} Hello There, {user && user.name}</h1>
      {profile !== null && user !== null ?
        (profile.user._id !== user._id ? <Spinner /> :
          <Fragment>

            <div className="container">
              <div className="  row">
                <div className="col-sm-8 col-md-8">
                  <h4 className="text-primary">  My Interests </h4>

                  <ul>
                    {profile.interests.map(item => {
                      return <li key={item._id}> 
                      {icon_dict[item.toLowerCase()] !== undefined && icon_dict[item.toLowerCase()]} 
                      {icon_dict[item.toLowerCase()] === undefined && <span role="img">🎲</span>}
                      {" "}
                      {item}</li>;
                    })}
                  </ul>
                      
                  <h4 className="text-primary my-top my-btm-small"> Your Upcoming Activities </h4>


                  {my_games.filter(game => (convertTime(game.dateTime) > Date.now())).length === 0 &&
                    joined_games.filter(game => (convertTime(game.dateTime) > Date.now())).length === 0
                    && <h4 className="my-top">You have no upcoming games</h4>}

                  {my_games.length > 0 && my_games.map(game => (convertTime(game.dateTime) < Date.now() ? <></> :
                      <GameItem game={game} key={game._id} mine={true}/>
                  ))}

                  {joined_games.length > 0 && joined_games.map(game => (convertTime(game.dateTime) < Date.now() ? <></> :
                      <GameItem game={game} key={game._id} mine={false}/>
                  ))}


                </div>

                <div className="col-sm-4 col-md-4">
                  <div className="my-btm"> <FriendList /></div>

                  <Link to="/my-profile" className="btn btn-secondary btn-lg btn-block my-top"> <i className="fas fa-cog" /> Profile Settings </Link>

                </div>
              </div>
            </div>

          </Fragment>) :

        <Fragment>
          <p> No Profile Yet. You will need a profile to host or join games. </p>
          <Link to='/create-profile' className="btn btn-primary my-1"> Set Up One Now </Link>

          <Link to="#!" onClick={logout} className="btn btn-danger join-all"> Logout </Link>

        </Fragment>}
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