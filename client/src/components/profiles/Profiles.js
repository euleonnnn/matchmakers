import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import { clearProfile, getProfiles } from '../../actions/profile';

const Profiles = ({clearProfile, getProfiles, profile: { profiles, loading }, auth}) => {
    const [searchterm, setSearch] = useState('')

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
            <h5>Search for Friends :</h5>
            <input type="search" className ="form-control rounded my-3" placeholder="Find Friend" aria-label="Search"
            onChange={event => {setSearch(event.target.value)}} />
         
            <div className="profiles">
                {profiles.filter( p => {
                    if (searchterm == "") {
                        return p
                    } 
                    if (p.user.name.toLowerCase().includes(searchterm.toLowerCase())) {
                        return p
                    }
                }).map(profile => {
                    if (profile.user._id !== auth.user._id) {
                        return <ProfileItem key = {profile._id} profile ={profile} />
                    }
                })}
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