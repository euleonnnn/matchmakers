import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Chat from './Chat';
import Message from './Message';
import { getChats } from '../../actions/chat';
import axios from 'axios';
import ChatBG from '../../img/ChatBG.png'

//main page for display of all conversations and messages 
const MessageBox = ({getChats, auth: { user }, chat : {chats}}) => {
    const [currChat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getChats();
      }, [getChats]);

    useEffect(() => {
        const getMessages = async () => {
          try {
            const res = await axios.get(`/api/message/${currChat._id}`);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currChat]);

    return <Fragment>
        <div className ="row">
        <div className="col-sm-4 col-md-4">
            {chats.map((chat=> (
                <div onClick ={()=> setChat(chat)}>
                    <Chat chat = {chat}/> 
                </div>
            )))}
        </div>
        {currChat ? 
        <div className="col-sm-8 col-md-8 chatstyles"> 
            <div className="chatbox">
                {messages.map((msg) => (
                    <div >
                      <Message message={msg} sent={msg.sender === user._id} />
                    </div>
                  ))}
            </div>
            <div className ="input-group my-top">
            <textarea type="text" className ="form-control rounded" placeholder="Type Something" aria-describedby="search-addon" />
            <button type="button" class="btn btn-outline-primary my-right"> <i class="fas fa-paper-plane" /> </button>
            </div>
        </div>
        : <div className="col-sm-8 col-md-8 chatstyles emptychat">
          <h3 className ="emptychattextln1">Howdy, {user.name}!</h3>
          <h3 className ="emptychattextln2">Click on a Profile to Begin Chatting :-)</h3>
          <br/>
          <img className="emptychatimg" src={ChatBG} alt="ChatBG"/>
          </div>
        }
        </div>
    </Fragment> 
}


MessageBox.propTypes = {
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    getChats: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    chat: state.chat
});

  
export default connect(mapStateToProps, {getChats})(MessageBox);
