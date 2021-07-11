import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { withRouter } from 'react-router-dom';

const EditProfile = ({profile : {profile, loading}, 
    createProfile, getCurrentProfile, history}) => {
    const [formData, setFormData] = useState({
        avatar: '',
        faculty: '',
        year: '',
        interests: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: ''
    });

    const [displaySocial, toggleSocial] = useState(false);

    useEffect(() => {
        getCurrentProfile(); 
        setFormData({
            avatar: loading || !profile.user.avatar ? '' : profile.user.avatar,
            faculty: loading || !profile.faculty ? '' : profile.faculty,
            year: loading || !profile.year ? '' : profile.year,
            interests: loading || !profile.interests ? '' : profile.interests,
            bio: loading || !profile.bio ? '' : profile.bio,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            instagram: loading || !profile.social ? '' : profile.social.instagram
        });
        // eslint-disable-next-line
    }, [loading, getCurrentProfile]);

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
        createProfile(formData, history, true);
    }


    return (
        <Fragment>
            <h1 className="large text-primary"> <i className="fas fa-address-card"></i>
                {" "} Update Your Profile
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
                <select name="year" value={year} onChange = {e=> onChange(e)}>
                        <option value="" disabled selected hidden>Year</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                </select> 
                <small className="form-text"
                    >Year of Study</small
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
                <button  onClick= {()=> toggleSocial(!displaySocial)} type="button" className="btn btn-dark btn-lg btn-block">
                    Let others know more about you
                </button>
                </div>
                
                {displaySocial && (<Fragment>

                            <div className="form-group social-input my-3">
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
                <input type="submit" className="btn btn-primary btn-lg btn-block my-5" />
                
                
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile
})



export default connect (mapStateToProps, { createProfile, getCurrentProfile }) 
(withRouter(EditProfile));