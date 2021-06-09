import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Chat from './Chat';
import Message from './Message';
import { getChats } from '../../actions/chat';


//main page for display of all conversations and messages 
const MessageBox = ({getChats, auth: { user }, chat}) => {
    useEffect(() => {
        getChats();
      }, [getChats]);

    return <Fragment>
        <h1 className = "large text-dark big-header"> My Messages </h1>
        <div className ="row">
        <div className="col-sm-4 col-md-4">
            <Chat />
            <Chat />
            <Chat />
            <Chat />
        </div>
        <div className="col-sm-8 col-md-8"> 
            <div className="chatbox">
                < Message />
                < Message sent ={true}/>
                < Message />
                < Message />
                < Message sent ={true}/>
                < Message sent ={true}/>
                < Message sent ={true}/>
            </div>
            <div className ="input-group my-top">
            <textarea type="text" className ="form-control rounded" placeholder="Type Something" aria-describedby="search-addon" />
            <button type="button" class="btn btn-outline-primary my-right"> <i class="fas fa-paper-plane" /> </button>
            </div>
        </div>
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
