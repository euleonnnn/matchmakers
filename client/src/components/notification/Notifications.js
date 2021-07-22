import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Request from "../dashboard/Request";
import { Fragment } from "react";
import SuggestedGames from "../dashboard/SuggestedGames";
import { getGames } from '../../actions/game';
import { getCurrentProfile } from '../../actions/profile';
import axios from "axios";


const Notifications = ({getGames, getCurrentProfile, auth: { user }, chat:{chats}, game: {games}, profile: { profile, loading }}) => {

    
    const [friends, setFriends] = useState([]);
    const [showing, toggleShow] = useState(false)
    
    const convertTime = e => {
        var d1 = new Date(e);
        return d1.getTime();
    }

    useEffect(() => {
        getGames();
    }, [games, getGames]);
    
    useEffect(() => {
        getCurrentProfile();
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
      }, []);
    

    var suggestedGames = new Array(4);
    var friendGames = new Array(2);
    const not_joined = games.filter(game => game.user !== user._id && game.players.filter(player => player.user === user._id).length === 0 && convertTime(game.dateTime) > Date.now());

    for (let i = 0; i < 4; i++) {
      suggestedGames[i] = [];
    }
    for (let i = 0; i < 2; i++) {
      friendGames[i] = [];
    }

  
    const suggestGames = (game) => { 
        if (profile.interests.includes(game.sport)) {
          if (friends.filter(friend => friend._id === game.user).length > 0) {
            if (friends.filter(friend => game.players.includes(friend._id)).length > 0) {
              suggestedGames[3].push(game);
              return;
            }
            suggestedGames[2].push(game);
            return;
          }
          if (friends.filter(friend => game.players.includes(friend._id)).length > 0) {
            suggestedGames[2].push(game);
            return;
          }
          suggestedGames[1].push(game);
          return;
        }
        if (friends.filter(friend => friend._id === game.user).length > 0) {
          if (friends.filter(friend => game.players.includes(friend._id)).length > 0) {
            friendGames[1].push(game);
            return;
          }
          friendGames[0].push(game);
          return;
        }
        if (friends.filter(friend => game.players.includes(friend._id)).length > 0) {
          friendGames[0].push(game);
          return;
        }
        suggestedGames[0].push(game);
        return;
      }
    
      if (not_joined.length > 0 && profile) {
        not_joined.map(game => suggestGames(game));
      }
    
      var suggestions = new Array(2);
      var withfriends = new Array(2);
      if (suggestedGames[0].length > 0 || suggestedGames[1].length > 0 || suggestedGames[2].length > 0 || suggestedGames[3].length > 0) {
        let i = 0;
        for (i; i <= 1; i++) {
          if(suggestedGames[3].length > 0) {
            suggestions.push(suggestedGames[3].pop());
          } else if(suggestedGames[2].length > 0) {
            suggestions.push(suggestedGames[2].pop());
          } else if(suggestedGames[1].length > 0) {
            suggestions.push(suggestedGames[1].pop());
          } else {
            suggestions.push(suggestedGames[0].pop());
          }
        }
     }
    
     if (friendGames[0].length > 0 || friendGames[1].length > 0) {
      let i = 0;
      for (i; i <= 1; i++) {
        if(friendGames[1].length > 0) {
          withfriends.push(friendGames[1].pop());
        } else {
          withfriends.push(friendGames[0].pop());
        } 
      }
      console.log(withfriends);
    }



    return <Fragment> 
        <div className="my-top">
        <Request/> 
            <div className="card-header2 my-top">
                <strong> Recommended for You </strong>  
                {!showing && <button onClick= {()=>toggleShow(!showing)} type="button" className="btn btn-dark btn-lg btn-round join-all">
                    <i className="fas fa-arrow-circle-down"/></button>}
                {showing && <button onClick= {()=>toggleShow(!showing)} type="button" className="btn btn-dark btn-lg btn-round join-all">
                    <i className="fas fa-arrow-circle-up"/></button>}
                </div>
                
                <div className="card-header">
     
                <div className="centralize"><strong> Based on your interests </strong> </div>
                </div>
                {showing ? (suggestions.length > 0 && 
                    suggestions.map(game => game ? <SuggestedGames game={game}/> : <></>)) : 
                    <li className="list-group-item"> <h2 className="centralize"> . . . </h2> </li>}
                
                <div className="card-header my-top">
                <div className="centralize"><strong> Join Your Friends </strong> </div>
                </div>
                {showing ? (withfriends.length > 0 && 
                    withfriends.map(game =>  game ? <SuggestedGames game={game}/> : <></>)) : 
                    <li className="list-group-item"> <h2 className="centralize"> . . . </h2> </li>}
                </div>  
                
        </Fragment>
}


Notifications.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  getGames: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat,
    game: state.game,
    profile: state.profile
});

export default connect(mapStateToProps, {getGames, getCurrentProfile})(Notifications);