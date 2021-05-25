import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';


const CreateProfile = ({createProfile, history}) => {
    const [formData, setFormData] = useState({
        faculty: '',
        year: '',
        interests: '',
        bio: '',
        facebook: '',
        instagram: ''
    });

    const [displaySocial, toggleSocial] = useState(false);

    const {
        faculty, 
        year,
        interests,
        bio,
        facebook,
        instagram
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    }


    return (
        <Fragment>
            <h1 className="large text-primary"> <i className="fas fa-address-card"></i>
                {" "} Create Your Profile
            </h1>
            <p className="lead">
                "Beauty begins the moment you decide to be yourself" — Coco Chanel
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit = {data => onSubmit(data)}>
                <div className="form-group">
                <input type="text" placeholder="* Faculty" name="faculty" value={faculty}
                onChange = {e=> onChange(e)} />
                <small className="form-text"
                    >Your Home Faculty</small
                >
                </div>
                <div className="form-group">
                <input type="text" placeholder="Year" name="year" value={year}
                onChange = {e=> onChange(e)}/>
                <small className="form-text"
                    >Year of University Education</small
                >
                </div>
                
                <div className="form-group">
                <input type="text" placeholder="* Interests" name="interests" value={interests}
                onChange = {e=> onChange(e)} />
                <small className="form-text"
                    > If more than 1, separate your inputs with a comma Eg. Running, Soccer, Badminton </small
                >
                </div>
               
                <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={bio}
                onChange = {e=> onChange(e)} > </textarea>
                <small className="form-text">Tell everyone a little about yourself</small>
                </div>

                <div className="my-2">
                <button onClick= {()=> toggleSocial(!displaySocial)} type="button" className="btn btn-dark btn-lg btn-block">
                    Let others know more about you
                </button>
                </div>
                
                {displaySocial && (<Fragment>
                    <div className="form-group social-input">
                    <i className="fab fa-facebook fa-2x"></i>
                    <input type="text" placeholder="Facebook Name Eg. James Tan" name="facebook" value={facebook}
                    onChange = {e=> onChange(e)}/>
                    </div>

                    <div className="form-group social-input">
                    <i className="fab fa-instagram fa-2x"></i>
                    <input type="text" placeholder="Instagram Username Eg. @jamestan99" name="instagram" value={instagram}
                    onChange = {e=> onChange(e)}/>

                    </div>
                </Fragment>)
                }

                <input type="submit" className="btn btn-primary my-3" />

                <>   </>
                <Link className="btn btn-light my-3" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};

export default connect (null, { createProfile }) 
(withRouter(CreateProfile));