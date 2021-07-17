import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateformat from '../../utils/dateformat';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {format} from 'timeago.js'


const GameItem = ({ game }) => {

    const [messages, setMessages] = useState([]);
    const [latesttext, setText] = useState("");
    const [latestsender, setSender] = useState("");
    const [timeago, setTime] = useState("");
    const [secondtext, setsecondText] = useState("");
    const [secondsender, setsecondSender] = useState("");
    const [secondtimeago, setsecondTime] = useState("");
    
    useEffect(() => {
      const getChatMessages = async () => {
        try {
          const res = await axios.get(`/api/gamechat/${game._id}`);
          const res2 = await axios.get(`/api/message/${res.data[0]._id}`);
          setMessages(res2.data);
        } catch (err) {
          console.log(err);
        }
      };
      getChatMessages();
    }, []);

    
    useEffect(() => {
      if(messages.length>0) {
        const len = messages.length;
        setText(messages[len-1].text);
        setSender(messages[len-1].name);
        setTime(format(messages[len-1].createdAt));
        if (messages.length>1) {
          setsecondText(messages[len-2].text)
          setsecondSender(messages[len-2].name);
          setsecondTime(format(messages[len-2].createdAt));
        }
      }
    }, [messages]);
    
    return (
        <Fragment>
            <div className="card mb-3" >
                <div className="card-body">
                <h5 className="card-title">{game.sport}</h5>
                <br></br>
                <p className="card-text"> <span className='text-primary'> Location: </span> {game.location === "Others" ? game.otherLoc : game.location}</p>
                <p className="card-text"> <span className='text-primary'> Waiting Room: </span> {game.players.length} players out of {game.maxPlayers}</p>
                <p className="card-text"> <span className='text-primary'> Game Day: </span> {dateformat(game.dateTime)} </p>
                <Link to={`/games/${game._id}`} className="btn btn-dark join-all my-left my-top"> Enter Room</Link>
                  <div className="card mb-3" >
                    <div className="card-body">
                    <p className="card-text"> <h6> Chat Notification: </h6> </p>
                      {secondsender !== "" && 
                      <p className="my-top-small"> {secondsender} : <span className="messagetext"> {secondtext}
                      <span className="text-muted btmtext"> {" "}{secondtimeago}</span> </span> </p> }
                      <br></br>
                      {latestsender !== "" &&  
                      <p> {latestsender} : <span className="messagetext"> {latesttext} 
                      <span className="text-muted btmtext"> {" "}{timeago}</span> </span> </p> }
                      </div>
                  </div>
                </div>
            </div>
        </Fragment>
    );
}


GameItem.propTypes = {
    gamechat: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    gamechat: state.gamechat
});


export default connect(mapStateToProps)(withRouter(GameItem));
