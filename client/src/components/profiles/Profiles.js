import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import { getProfiles } from '../../actions/profile';

const Profiles = ({getProfiles, profile: { profiles, loading }}) => {
    useEffect(()  => {
        getProfiles();
    }, []);

    const displayAll = profiles.length <= 0 ? <h4>No profiles found</h4> : 
    profiles.map(profile => (
        <ProfileItem key = {profile._id} profile ={profile} />
    )) 

    return <Fragment> 
        { loading ? <Spinner /> : <Fragment>
            <h1 className = "large text-primary"> Sports Enthusiasts of NUS </h1>
            <p className = "lead"> Browse and connect with fellow sports enthusiasts</p>  
            <div className="profiles">
                {displayAll}
            </div>

        </Fragment>}
    </Fragment>
    
}
  
Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};
  
const mapStateToProps = (state) => ({
    profile: state.profile
});

  
export default connect(mapStateToProps, { getProfiles})(Profiles);