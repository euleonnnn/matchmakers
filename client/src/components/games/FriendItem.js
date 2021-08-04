import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createChat, getChats } from '../../actions/chat';
import axios from 'axios';



const FriendItem = ({ createChat, getChats, auth: { user }, friend, game : {game} }) => {

    const [invited, toggle] = useState(false);

    const inviteUninvite = () => {
        try {
          if (!invited) {
            toggle(!invited);
            axios.put(`/api/users/${friend._id}/invite`, {
              userId: user._id,
              gameId: game._id
            });
          } else {
            toggle(!invited);
            axios.put(`/api/users/${friend._id}/uninvite`, {
              userId: user._id,
              gameId: game._id
            });
          }
        }catch (err) { 
          console.log(err.status)
        }
      };


    return (
        <Fragment>
            <li className="list-group-item">
                {friend.name}
                {!invited && <button onClick={() => {inviteUninvite()}} type="button" className="btn btn-dark join-all">
                    <i className="fa fa-plus" />
                </button>}
                {invited && <button onClick={() => {inviteUninvite()}} type="button" className="btn btn-danger join-all">
                    <i className="far fa-window-close" />
                </button>}
            </li>
        </Fragment>
    );
}


FriendItem.propTypes = {
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    getChats: PropTypes.func.isRequired,
    createChat: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat,
    game: state.game
});


export default connect(mapStateToProps, { getChats, createChat })(withRouter(FriendItem));
