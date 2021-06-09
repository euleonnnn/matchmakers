import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createGame } from '../../actions/game';
import { Link, withRouter } from 'react-router-dom';

const CreateGame = ({ createGame, history }) => {

    const [formData, setFormData] = useState({
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
       createTime,
    } = formData;

    const sports = [
        { sport: "Badminton", locations:["Kent Ridge - MPSH 5", "UTown - Sports Hall 1"], 
            maxPlayers:["2","3","4","5","6"] },
        { sport: "Basketball", locations:["Eusoff Hall", "NUS Sports & Recreation Centre","Temasek Hall","Others"], 
        maxPlayers:["4","6","8","9","10"] },
        { sport: "Frisbee", locations:["Kent Ridge - Multi-Purpose Fields","Utown - Open Field","Others"], 
        maxPlayers:["4","6","8","9","10"] },
        { sport: "Running", locations:["Kent Ridge - Running Field", "West Coast Park","Others"], 
        maxPlayers:["2","3","4","5"] },
        { sport: "Squash", locations:["Kent Ridge - Squash Courts"], 
        maxPlayers:["2","3","4"] },
        { sport: "Swimming", locations:["NUS Sports & Recreation Centre"], 
        maxPlayers:["2","3","4","5"] },
        { sport: "Table Tennis", locations:["Kent Ridge - MPSH 2"], 
        maxPlayers:["2","3","4","5","6"] },
        { sport: "Tennis", locations:["Kent Ridge - Outdoor Tennis Courts"], 
        maxPlayers:["2","3","4","5","6"] },
      ];

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
        <Fragment>
            <div className ="container">
            <h1 className="large my-btm"> <i class="fas fa-football-ball"/> {" "}
                Host Your Own Game
            </h1>

            <form className="form2" onSubmit = {data => onSubmit(data)}>
                <div className="form-group2">
                    <select name="sport" value={sport} onChange = {e=> onChange(e)}>
                        <option value="" disabled selected hidden> Sport </option>
                        {sports.map(sport => {
                            return <option>{sport.sport}</option>
                        })}
                    </select> 
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group2">
                            <select name="location" value={location} onChange = {e=> locationChange(e)}>
                                <option value="" disabled selected hidden>Location</option>
                                {sports.filter(sport => sport.sport===formData.sport).map(
                                    sport => sport.locations.map(location => {return <option>{location}</option>}))
                                }
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
                            {sports.filter(sport => sport.sport===formData.sport).map(
                                sport => sport.maxPlayers.map(player => {return <option>{player}</option>}))
                            }
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
                        max="2022-06-14T00:00"
                    />
                </div>

                <input type="submit" className="btn btn-primary my-3" />

                <>   </>
                <Link className="btn btn-light my-3" to="/all-games">Go Back</Link>
            </form>
            </div>
        </Fragment>
    )
}


CreateGame.propTypes = {
    createGame: PropTypes.func.isRequired
}

export default connect(null, {createGame}) (withRouter(CreateGame))

