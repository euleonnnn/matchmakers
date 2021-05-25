import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const FriendList = ({ auth: { user }}) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const getFriends = async () => {
          try {
            const friendList = await axios.get("/api/users/friends/" + user._id);
            setFriends(friendList.data);
          } catch (err) {
            console.log(err);
          }
        };
        getFriends();
      }, [user]);

    
    
    return (
      
      <div className="card">
          <div className="card-header">
              My Friends
          </div>
        
          <ul className="list-group list-group-flush">
            {friends.map((friend) => (
                <li className="list-group-item"> {friend.name}  <button className ="btn btn-dark msg" > <i className="far fa-comments"/>     </button></li> 
           ))}
          </ul>
        </div>
       
    )
}


FriendList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(FriendList);