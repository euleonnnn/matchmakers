import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OnlineUserItem from "./OnlineUserItem";
import Loading from '../layout/Loading';


const OnlineUserList = ({auth: { user }, onlineUsers, chat:{chats}}) => {

    const [onlineUsersLength, setOnlineUsersLength] = useState(" ");
    
    useEffect(() => {
        let cancel = false;
        if (cancel) return;
        setOnlineUsersLength(onlineUsers.length);
        return () => { 
            cancel = true;
        }
    }, [setOnlineUsersLength, onlineUsers]);
    

    return (
      <div className="card">
          <div className="card-header">
              <strong> Online ({onlineUsersLength}) </strong>
          </div>
        
          <ul className="list-group list-group-flush">
            {onlineUsersLength === " " && <Loading/>}
            {onlineUsersLength === 0 && 
            <li className="list-group-item"> No friends online <span role="img"> 😞 </span></li>}
            {onlineUsers.map((u) => (
                <OnlineUserItem onlineUser ={u} key={u._id}/>
           ))}
          </ul>
        </div>
       
    )
}


OnlineUserList.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat
});

export default connect(mapStateToProps)(OnlineUserList);