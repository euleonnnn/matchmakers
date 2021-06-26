import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FollowerItem from "./FollowerItem";

const Request = ({auth: { user }, chat:{chats}}) => {

    const [friends, setFriends] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
          try {
            const friendList = await axios.get("/api/users/friends/" + user._id);
            setFriends(friendList.data);
          } catch (err) {
            console.log(err);
          }
        };
        getFriends()
      });


      useEffect(() => {
        const getFollowers = async () => {
          try {
            const followerList = await axios.get("/api/users/followers/" + user._id);
            setFollowers(followerList.data);
          } catch (err) {
            console.log(err);
          }
        };
        getFollowers()
      });
    
    
      const idlist = []
      friends.map(friend => idlist.push(friend._id))


        return followers.length === 0 ? null:
      <div className="card">
          <div className="card-header2">
              <strong> Follow Requests </strong>
          </div>
          <ul className="list-group list-group-flush">
            {followers.filter(follower => !idlist.includes(follower._id)).map(f => 
                <FollowerItem follower = {f} key={f._id}/>
                )}
          </ul>
        </div>
       
    
}


Request.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat
});

export default connect(mapStateToProps)(Request);