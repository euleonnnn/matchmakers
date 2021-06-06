import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
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
        getFriends()
      });

    
    return (
      
      <div className="card">
          <div className="card-header">
              <strong> My Friends ({friends.length}) </strong>
          </div>
        
          <ul className="list-group list-group-flush">
            {friends.map((friend) => (
                <li className="list-group-item"> 
                <Link to={`/profile/${friend._id}`}> {friend.name}  </Link> 
                <button className ="btn btn-dark msg" >  <i class="fas fa-comment-dots"/> </button></li> 
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