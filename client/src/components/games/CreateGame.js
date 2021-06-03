import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createGame } from '../../actions/game';
import { Link, withRouter } from 'react-router-dom';

const CreateGame = ({ createGame }) => {
    const [formData, setFormData] = useState({
        sport: '',
        location: '',
        experience: '',
        maxPlayers: ''
    });

    const {
       sport,
       location,
       experience,
       maxPlayers
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    const onSubmit = e => {
        e.preventDefault();
        createGame(formData);
    }


    return (
        <Fragment>
            <h1 className="large text-primary"> <i className="fas fa-address-card"></i>
                {" "} Host Your Own Game
            </h1>
       
            <form className="form" onSubmit = {data => onSubmit(data)}>
                <div className="form-group">
                <input type="text" placeholder="Sport" name="sport" value={sport}
                onChange = {e=> onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={location}
                onChange = {e=> onChange(e)}/>
                </div>
                
                <div className="form-group">
                <input type="text" placeholder="Experience level" name="experience" value={experience}
                onChange = {e=> onChange(e)} />
                </div>
               
                <div className="form-group">
                <input type="text" placeholder="Max Players" name="maxPlayers" value={maxPlayers}
                onChange = {e=> onChange(e)} />
                </div>

                <input type="submit" className="btn btn-dark my-3" />

                <>   </>
                <Link className="btn btn-light my-3" to="/all-games">Go Back</Link>
            </form>
        </Fragment>
    )
}


CreateGame.propTypes = {
    createGame: PropTypes.func.isRequired
}

export default connect(null, {createGame}) (withRouter(CreateGame))

