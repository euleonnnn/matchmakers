import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createGame } from '../../actions/game';
import { Link, withRouter } from 'react-router-dom';

const OnlineGamesForm = ({ createGame, history }) => {

    const [formData, setFormData] = useState({
        roomType: 'onlineGame',
        sport: '',
        location: '',
        otherLoc: '',
        experience: '',
        maxPlayers: '',
        dateTime: Date.now,
        createTime: Date.now,
    });
    
    const {
        sport,
        location,
        otherLoc,
        experience,
        maxPlayers,
        dateTime,
    } = formData;

    const setToday = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var hh = today.getHours() + 1;
        var mins = "00";

        if (dd<10) {
            dd = "0" + dd;
        }

        if (mm<10) {
            mm = "0" + mm;
        }


        if (hh<10) {
            hh = "0" + hh;
        }

        if (hh===24) {
            hh = "00";
        }

        today = yyyy+'-'+mm+'-'+dd+'T'+hh+":"+mins;
        document.getElementById("datefield").setAttribute("min", today);
    }

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const locationChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (e.target.value!=="Others" && formData.otherLoc!=='') {
            document.getElementById('otherLoc').value = '';
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        createGame(formData, history);
    }

    return (
            <form className="form2" onSubmit = {data => onSubmit(data)}>
                <div className="form-group2 my-top">
                    <input type="text" name="sport" placeholder="Game" value={sport} onChange = {e=> onChange(e)}/>
                    <small className="form-text"> Example of Online Games: Poker, Chess, Among Us </small>

                </div>
                
                <div className="row">
                    <div className="col">
                        <div className="form-group2">
                            <select name="location" value={location} onChange = {e=> locationChange(e)}>
                                <option value="" disabled selected hidden>Location</option>
                                <option>Online</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group2">
                            {formData.location==="Others" && 
                            <Fragment>
                            <input 
                                    id="otherLoc"
                                    type="text" 
                                    name="otherLoc" 
                                    value={otherLoc} 
                                    placeholder="Other Locations" 
                                    onChange = {e=> onChange(e)}/>
                             <small className="form-text"> Facilities booking for these locations will not be allowed within (Match) Maker </small>
                            </Fragment>
                            }
                        </div>
                    </div>
                </div>

                <div className="form-group2">
                    <select name="experience" value={experience} onChange = {e=> onChange(e)}>
                            <option value="" disabled selected hidden>Experience Level</option>
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Expert</option>
                    </select> 
                </div>
               
               
                <div className="form-group2">
                    <select name="maxPlayers" value={maxPlayers} onChange = {e=> onChange(e)}>
                            <option value="" disabled selected hidden>Max Number of Players</option>
                            <option>2</option>
                            <option>4</option>
                            <option>5</option>
                            <option>8</option>
                            <option>10</option>
                            <option>20</option>
                    </select> 
                </div>

                <div className="form-group row my-btm">
                    <div className="col-md-2"> <h5> Date and Time </h5> </div>
                    <input 
                        id="datefield"
                        name="dateTime"
                        type="datetime-local"
                        value={dateTime}
                        onChange={e => onChange(e)}
                        onClick={setToday}
                        className="col-md-6"
                        max="2022-07-14T00:00"
                    />
                </div>

                <input type="submit" className="btn btn-primary my-3" />

                <>   </>
                <Link className="btn btn-light my-3" to="/all-games">Go Back</Link>
            </form>
    )
}

OnlineGamesForm.propTypes = {
    createGame: PropTypes.func.isRequired
}


export default connect(null, {createGame}) (withRouter(OnlineGamesForm))