import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FriendItem from "./FriendItem";


const FriendList = ({auth: { user }, chat:{chats}}) => {

    const [friends, setFriends] = useState([]);

    useEffect(() => {
      let cancel = false;
      const getFriends = async () => {
        if (cancel) return;
        try {
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
  

    return (
      
      <div className="card">
          <div className="card-header">
              <strong> My Friends ({friends.length}) </strong>
          </div>
        
          <ul className="list-group list-group-flush">
            {friends.map((friend) => (
                <FriendItem friend ={friend} key = {friend._id}/>
           ))}
          </ul>
        </div>
       
    )
}


FriendList.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat
});

export default connect(mapStateToProps)(FriendList);