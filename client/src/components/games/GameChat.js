import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import GameMessage from './GameMessage';


const GameChat = ({gamechat : {gamechat} }) => {
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState("");
    
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

    const onSubmit = async (e) => {
      e.preventDefault();
      const message = {
        text: formData
      }

      try {
        if (message.text !== ""){
          const res = await axios.post(`/api/message/${gamechat[0]._id}`, message);
          setMessages([...messages, res.data])
          setFormData("")
        } 
      } catch (error) {
        console.log(error)
      }
    }

      return <Fragment>
          <div className="chatbox chatbg">
                {messages.length === 0 &&
                 <div ref = {scroll}>
                  </div>
                }
                {messages.length > 0 && messages.map((msg) => (
                    <div ref = {scroll}>
                    < GameMessage message={msg} />
                    </div>
                  ))}
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
      </Fragment>

}



GameChat.propTypes = {
    gamechat: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({ 
    gamechat: state.gamechat
});

  

export default connect(mapStateToProps)(GameChat);
