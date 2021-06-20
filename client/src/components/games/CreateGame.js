import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createGame } from '../../actions/game';
import { Link, withRouter } from 'react-router-dom';
import SportsForm from './SportsForm';
import StudyForm from './StudyForm';
import OnlineGamesForm from './OnlineGamesForm';

const CreateGame = ({ createGame, history }) => {

    const [formType, setFormType] = useState("");

    return (
        <Fragment>
            <div className ="container">
            <h1 className="large my-btm"> <i class="fas fa-football-ball"/> {" "}
                Host Your Own Game
            </h1>

            <div className="btn-group btn-group-lg" role="group">
                <button type="button" className="btn btn-secondary" onClick={() => setFormType("sport")}>Sports</button>
                <button type="button" className="btn btn-secondary" onClick={() => setFormType("online")}>Online Games</button>
                <button type="button" className="btn btn-secondary" onClick={() => setFormType("study")}>Study Session</button>
            </div>

            {formType === "sport"
                ? <SportsForm/>
                : formType ==="online"
                    ? <OnlineGamesForm/>
                    : <StudyForm/>

               
            }
            

            </div>
        </Fragment>
    )
}


CreateGame.propTypes = {
    createGame: PropTypes.func.isRequired
}


export default connect(null, {createGame}) (CreateGame)