import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createChat, getChats } from '../../actions/chat';


const OnlineUserItem = ({ createChat, getChats, auth: { user }, onlineUser, chat: { chats }, history }) => {
    useEffect(() => {
        getChats();
    }, [getChats]);

    const chatID = [];
    
    useEffect(() => {
        let cancel = false;
        if (cancel) return;
        const loadchat = async() => {
            chats.map(chat => {
                chatID.push(chat.users.find(id => id !== user._id));
            })
        }
        loadchat();
        return () => { 
            cancel = true;
        }
    })

    const startNewConvo = () => {
        try {
            if (!chatID.includes(onlineUser._id)) {
                const formData = {
                    receiver: onlineUser._id
                }
                createChat(formData, history)
            } else {
                history.push('/messagebox')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Fragment>
            <li className="list-group-item">
                {onlineUser.name}
                <button onClick={() => { startNewConvo() }} type="button" className="btn btn-dark join-all">
                    <i className="fas fa-comment-dots" />
                </button>
            </li>
        </Fragment>
    );
}


OnlineUserItem.propTypes = {
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    getChats: PropTypes.func.isRequired,
    createChat: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat
});


export default connect(mapStateToProps, { getChats, createChat })(withRouter(OnlineUserItem));