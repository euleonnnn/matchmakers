import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import GameMessage from './GameMessage';


const GameChat = ({game : {game}, gamechat : {gamechat} }) => {
    const [messages, setMessages] = useState([]);
    
    const scroll = useRef();

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
    

    useEffect(() => {
        const getMessages = async () => {
          try {
            const res = await axios.get(`/api/message/${gamechat[0]._id}`);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [gamechat]);
    // const onSubmit = async (e) => {
    //   e.preventDefault();
    //   const message = {
    //     text: formData
    //   }

    //   try {
    //     if (message.text !== ""){
    //       const res = await axios.post(`/api/message/${currChat._id}`, message);
    //       setMessages([...messages, res.data])
    //       setFormData("")
    //     } 
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

      return <Fragment>
          <div className="chatbox chatbg">
                {messages.map((msg) => (
                    <div ref = {scroll}>
                    < GameMessage message={msg} />
                    </div>
                  ))}
            <div className ="input-group my-top">
            <input type="search" className ="form-control rounded my-left" 
            placeholder="Type Something to Send to the Room" aria-label="Search"
                aria-describedby="search-addon" />
            <button type="button" class="btn btn-outline-primary my-right"> <i class="fas fa-paper-plane" /> </button>
            </div>
        </div>
      </Fragment>

}



GameChat.propTypes = {
    auth: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
    gamechat: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({ 
    auth: state.auth,
    chat: state.chat,
    game: state.game,
    gamechat: state.gamechat
});

  

export default connect(mapStateToProps)(GameChat);
