import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import InviteItem from "./InviteItem"

const Invite = ({auth: { user }, chat:{chats}}) => {

    const [invites, setInvites] = useState([]);


    useEffect(() => {
        let cancel = false;
        const getInvites = async () => {
          try {
            if (cancel) return;
            const inviteList = await axios.get("/api/users/invitations/" + user._id);
            setInvites(inviteList.data);
          } catch (err) {
            console.log(err);
          }
        };
        getInvites()
        return () => { 
          cancel = true;
        }
      }, []);


    return <Fragment>
        <div className="card my-top">
          <div className="card-header2">
              <strong> Activity Invitations </strong>
              {invites.length > 0 && <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger rounded-circle">
              </span>}
          </div>
          <ul className="list-group list-group-flush">
            {invites.length ==0 &&  <li className="list-group-item"> No New Invitations </li>}
            {invites.map(i => 
                <InviteItem invite = {i}  key={i._id}/>
                )}
          </ul>
        </div>

    </Fragment>

}


Invite.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat
});

export default connect(mapStateToProps)(Invite);