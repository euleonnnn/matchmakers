import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import GameMessage from './GameMessage';
import {format} from 'timeago.js'


let model;

const GameChat = ({gamechat : {gamechat}, game : {game, loading} }) => {
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState("");
    const [toxicloading, setLoadingToxic] = useState(false);
    const [toxic, setToxic] = useState();

    const scroll = useRef();

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
    
    useEffect(() => {
      let cancel = false;
      const loadModel = async () => {
        if (cancel) return;
        model = await window.toxicity.load(0.8);
        setLoadingToxic(false);        
        console.log("Model loaded")
      };
      loadModel();
      return () => {
        cancel = true;
      }
    },[]);

    const isToxic = async (model, message) => {
      const predictions = await model.classify(message);
      const toxicPredictions = predictions.filter((p) => p.results[0].match);
      return toxicPredictions.length > 0;
    };
  
    useEffect(() => {
      let cancel = false;
      const getToxic = async () => {
        if (cancel) return;
        if (model) {
          const textToxicity = await isToxic(model, formData); 
          setToxic(textToxicity);
          setLoadingToxic(false);
        }
      };
      getToxic();
      return () => { 
        cancel = true;
      }
    }, [formData]);
 
    useEffect(() => {
        let cancel = false;
        const getMessages = async () => {
          if (cancel) return;
          try {
            const res = await axios.get(`/api/message/${gamechat[0]._id}`);
            setMessages(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
        return () => { 
          cancel = true;
        }
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
                    <div className="messagetext flexi"> {game.name} has created the ChatRoom</div>
                    </div>
                }
                {messages.length >= 1 && 
                <div className="messagetext flexi"> {game.name} has created the ChatRoom</div>}
                {messages.length > 0 && messages.map((msg) => (
                    <div ref = {scroll}>
                    < GameMessage message={msg} key ={msg} />
                    </div>
                  ))}
            <form className ="input-group my-top" onSubmit={e => e.preventDefault()}> 
              <input  
                type="text" 
                className ="form-control rounded" 
                placeholder="Type Something"  
                value={formData}
                onChange={(e)=>setFormData(e.target.value)}/> 
                <input type="submit" className="btn btn-outline-primary" onClick={onSubmit} value="Send" />            
            </form>
        </div>
        {!toxicloading && toxic ? <div className="badge bg-danger flexi"  role="alert">
                Warning: Please chat politely </div> : null}
      </Fragment>

}



GameChat.propTypes = {
    gamechat: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({ 
    gamechat: state.gamechat,
    game: state.game
});

  

export default connect(mapStateToProps)(GameChat);
