import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FriendItem from "./FriendItem";
import Loading from '../layout/Loading';


const FriendList = ({auth: { user }, chat:{chats}}) => {

    const [friends, setFriends] = useState([]);
    const [friendslength, setLength] = useState(" ");


    useEffect(() => {
        const getFriends = async () => {
          try {
            const friendList = await axios.get("/api/users/friends/" + user._id);
            setFriends(friendList.data);
            setLength(friendList.data.length)
          } catch (err) {
            console.log(err);
          }
        };
        getFriends()
      }, []);
    
    console.log(friends)

    return (
      
      <div className="card">
          <div className="card-header">
              <strong> My Friends ({friends.length}) </strong>
          </div>
        
          <ul className="list-group list-group-flush">
            {friendslength === " " && <Loading/>}
            {friendslength === 0 && 
            <li className="list-group-item"> No friends yet <span role="img"> 😞 </span></li>}
            {friends.map((friend) => (
                <FriendItem friend ={friend} key={friend._id}/>
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