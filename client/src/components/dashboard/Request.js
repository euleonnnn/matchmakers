import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FollowerItem from "./FollowerItem";
import Loading from '../layout/Loading';


const Request = ({auth: { user }, chat:{chats}}) => {

    const [friends, setFriends] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [reqlength, setLength] = useState(" ");


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


      useEffect(() => {
        let cancel = false;
        const getFollowers = async () => {
          try {
            if (cancel) return;
            const followerList = await axios.get("/api/users/followers/" + user._id);
            setFollowers(followerList.data);
            setLength(followerList.data.length)
          } catch (err) {
            console.log(err);
          }
        };
        getFollowers()
        return () => { 
          cancel = true;
        }
      }, []);
    
    
      const idlist = []
      friends.map(friend => idlist.push(friend._id))


        return followers.length === 0 ? null:
      <div className="card">
          <div className="card-header2">
              <strong> Follow Requests </strong>
              {followers.length > friends.length && <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger rounded-circle">
              </span>}
          </div>
          <ul className="list-group list-group-flush">
            {reqlength === " " && <Loading/>}
            {followers.filter(follower => !idlist.includes(follower._id)) === 0 && 
            <li className="list-group-item"> No Incoming Requests <span role="img"> 😞 </span></li>}
            {followers.filter(follower => !idlist.includes(follower._id)).map(f => 
                <FollowerItem follower = {f}  key={f._id}/>
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