import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FriendItem from "./FriendItem";
import Loading from '../layout/Loading';


const InviteFriend = ({auth: { user }, chat:{chats}, game: {game}}) => {

    const [friends, setFriends] = useState([]);
    const [friendslength, setLength] = useState(" ");
    let count = 0;

    useEffect(() => {
        let cancel = false;
        const getFriends = async () => {
          if (cancel) return;
          try {
            const friendList = await axios.get("/api/users/friends/" + user._id);
            setFriends(friendList.data);
            setLength(friendList.data.length)
          } catch (err) {
            console.log(err);
          }
        };
        getFriends()
        return () => { 
          cancel = true;
        }
      }, []);
    

    return (
      <div className="card">
          <div className="card-header">
              <strong> Suggested Friends to Invite </strong>
          </div>
        
          <ul className="list-group list-group-flush">
            {friendslength === " " && <Loading/>}
            {friendslength === 0 && 
            <li className="list-group-item"> No friends to invite yet <span role="img"> 😞 </span></li>}
            {friends.map((friend) => {
                if (count < 4 && game.players.filter(obj => obj.name == friend.name) == 0) {
                    count += 1;
                    return <FriendItem friend ={friend} key={friend._id}/>;
                }
            })}
          </ul>
        </div>
       
    )
}

InviteFriend.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat,
    game: state.game
});

export default connect(mapStateToProps)(InviteFriend);