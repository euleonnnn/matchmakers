import React, { Fragment, useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateformat from '../../utils/dateformat';

const GameItem = ({ game }) => {
    

    return (
        <Fragment>
            <div className="card mb-3" >
                <div className="row g-0">
                    <div className="card-body">
                    <h5 className="card-title">{game.sport}</h5>
                    <br></br>
                    <p className="card-text"> <span className='text-primary'> Location: </span> {game.location === "Others" ? game.otherLoc : game.location}</p>
                    <p className="card-text"> <span className='text-primary'> Waiting Room: </span> {game.players.length} players out of {game.maxPlayers}</p>
                    <p className="card-text"> <span className='text-primary'> Day: </span> {dateformat(game.dateTime)} </p>
                    <p className="card-text"> <span className='text-primary'> Host: </span> {game.name} </p>
                    <Link to={`/games/${game._id}`} className="btn btn-dark join-all my-right"> Enter Room</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}


GameItem.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps)(withRouter(GameItem));
