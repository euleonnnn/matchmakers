import React, { Fragment, useEffect, useState, useRef } from 'react';
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
    const [formData, setFormData] = useState("");
    const scroll = useRef();

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

    const onSubmit = async (e) => {
      e.preventDefault();
      const message = {
        text: formData
      }

      try {
        if (message.text !== ""){
          const res = await axios.post(`/api/message/${currChat._id}`, message);
          setMessages([...messages, res.data])
          setFormData("")
        } 
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  
    
    return <Fragment>
        <div className ="row">
        <div className="col-sm-4 col-md-4">
        <Link to ='/profiles' className="btn btn-outline-dark my-top"> Find More Friends <i class="fas fa-plus"/> </Link>
            {chats.map((chat=> (
                <div onClick ={()=> setChat(chat)}>
                    <Chat chat = {chat}/> 
                </div>
            )))}
        </div>
        {currChat ? 
        <Fragment>             
        <div className="col-sm-8 col-md-8 namebox bg-secondary">      
        <h4 className="nametext my-btm"> {currChat === null ? <></> : currChat.names.find(name => name !== user.name)} </h4>     
            <div className="chatbox">
                {messages.map((msg) => (
                    <div ref = {scroll}>
                      <Message message={msg} sent={msg.sender === user._id} />
                    </div>
                  ))}
            </div>
            <div className ="input-group my-top">
            <textarea 
                type="text" 
                className ="form-control rounded" 
                placeholder="Type Something" 
                onChange={(e)=>setFormData(e.target.value)}
                value = {formData}
                />
            <button type="button" class="btn btn-outline-primary my-right" onClick={onSubmit}> <i class="fas fa-paper-plane" /> </button>
            </div>
        </div>
        </Fragment> : 
        <div className="col-sm-8 col-md-8 emptychat">
          <h3 className ="emptychattextln1">Howdy, {user.name}!</h3>
          <h3 className ="emptychattextln2">Open a Conversation to Start Chatting :-)</h3>
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
