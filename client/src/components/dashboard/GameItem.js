import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateformat from '../../utils/dateformat';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getGameChat } from '../../actions/gamechat';
import {format} from 'timeago.js'


const GameItem = ({ getGameChat, gamechat: {gamechat}, game }) => {

    const [messages, setMessages] = useState([]);
    const [latesttext, setText] = useState("");
    const [latestsender, setSender] = useState("");
    const [timeago, setTime] = useState("");

    useEffect(() => {
      getGameChat(game._id);
    },[game, getGameChat]);

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
      }, [gamechat, messages]);

      useEffect(() => {
          if(messages.length>0) {
            const len = messages.length;
            setText(messages[len-1].text);
            setSender(messages[len-1].name);
            setTime(format(messages[len-1].createdAt));
          }
      }, [messages]);

    return (
        <Fragment>
            <div className="card mb-3" key={game._id}>
                <div className="card-body">
                <h5 className="card-title">{game.sport}</h5>
                <br></br>
                <p className="card-text"> <span className='text-primary'> Location: </span> {game.location === "Others" ? game.otherLoc : game.location}</p>
                <p className="card-text"> <span className='text-primary'> Waiting Room: </span> {game.players.length} players out of {game.maxPlayers}</p>
                <p className="card-text"> <span className='text-primary'> Game Day: </span> {dateformat(game.dateTime)} </p>
                <p className="card-text"> <span className='text-primary'> Chat: </span> {latestsender}: {latesttext} <span className="text-muted btmtext">{timeago}</span></p>
                <Link to={`/games/${game._id}`} className="btn btn-dark join-all"> Enter Room</Link>
                <p className="card-text">

                </p>
                </div>
            </div>
        </Fragment>
    );
}


GameItem.propTypes = {
    getGameChat: PropTypes.func.isRequired,
    gamechat: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    gamechat: state.gamechat
});


export default connect(mapStateToProps, { getGameChat })(withRouter(GameItem));
