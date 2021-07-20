import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Chat from './Chat';
import Message from './Message';
import { getChats } from '../../actions/chat';
import axios from 'axios';
import ChatBG from '../../img/ChatBG.png';
import {io} from "socket.io-client";

let model;

//main page for display of all conversations and messages 
const MessageBox = ({getChats, auth: { user }, chat : {chats}}) => {
    const [currChat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState("");
    const [incomingMessage, setIncomingMessage] = useState(null);

    const scroll = useRef();
    const socket = useRef();

    useEffect(() => {
      socket.current = io();
      socket.current.on("getMessage", (data) => {
        setIncomingMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }, []);

    useEffect(() => {
      incomingMessage &&
        currChat?.users.includes(incomingMessage.sender) &&
        setMessages((prev) => [...prev, incomingMessage]);
    }, [incomingMessage, currChat]);

    useEffect(() => {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) =>{
        console.log(users); 
      });
    }, [user]);

    useEffect(() => {
        getChats();
      }, [getChats]);

    useEffect(() => async () => {
      try {
        if (currChat !== null) {
          const friendId = currChat.users.find((u)=> u !== user._id);
          const res = await axios.get(`/api/profile/user/${friendId}`);
          } 
      } catch (error) {
          console.log(error);
        }
      }, []);

    useEffect(() => {
        const getMessages = async () => {
          try {
            if (currChat) {
            const res = await axios.get(`/api/message/${currChat._id}`);
            setMessages(res.data);
            }
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
      if(currChat) {
        const receiver = currChat.users.find(id => user._id !== id);

        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId: receiver,
          text: formData,
        });

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
        <div className="col-sm-4 col-md-4 chatbg-dark">
        <Link to ='/profiles' className="btn btn-outline-primary my-top"> Find More Friends <i class="fas fa-plus"/> </Link>
            {chats.map((chat=> (
                <div onClick ={()=> setChat(chat)}>
                    <Chat key ={chat._id} chat = {chat} /> 
                </div>
            )))}
        </div>
        {currChat ? 
        <Fragment>             
        <div className="col-sm-8 col-md-8 namebox chatbg-dark">
        <h4 className="nametext my-btm my-top"> 
          {currChat === null ? <></> : currChat.names.find(name => name !== user.name)} 
        </h4>     
            <div className="chatbox chatbg">
                {messages.length>0 && messages.map((msg) => (
                    <div ref = {scroll}>
                      <Message message={msg} sent={msg.sender === user._id} key= {msg._id}/>
                    </div>
                  ))}
            </div>
            <form className ="input-group my-top" onSubmit={e => e.preventDefault()}> 
              <input  
                type="text" 
                className ="form-control rounded" 
                placeholder="Type Something"  
                aria-label="Search" value={formData}
                onChange={(e)=>setFormData(e.target.value)}/>   
            <input type="submit" className="btn btn-outline-primary" onClick={onSubmit} value="Send" />
            </form>
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
