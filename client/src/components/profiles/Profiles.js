import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import { clearProfile, getProfiles } from '../../actions/profile';

const Profiles = ({clearProfile, getProfiles, profile: { profiles, loading }, auth}) => {
    useEffect(()  => {
        getProfiles();
    }, [getProfiles]);

    //additional clear profile to clear out dashboard rerendering
    useEffect(()  => {
        clearProfile();
    }, [clearProfile]);


    const displayAll = profiles.map(profile => {
            if (profile.user._id !== auth.user._id) {
                return <ProfileItem key = {profile._id} profile ={profile} />
            }
        })

    return <Fragment> 
        { loading || displayAll.length===0 ? <Spinner /> : <Fragment>
            <h1 className = "large text-dark big-header"> Friends in NUS </h1>

            <div className ="input-group my-3">
                <input type="search" className ="form-control rounded" placeholder="Search" aria-label="Search"
                    aria-describedby="search-addon" />
                <button type="button" class="btn btn-outline-primary">search</button>
            </div>
            <div className="profiles">
                {displayAll}
            </div>

        </Fragment>}
    </Fragment>
    
}
  
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    clearProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

  
export default connect(mapStateToProps, { clearProfile, getProfiles})(Profiles);