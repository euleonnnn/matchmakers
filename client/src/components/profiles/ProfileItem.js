import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profile from '../../reducers/profile';
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    faculty,
    year,
    interests
  }
}) => {

  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p> <span className='text-primary'> Faculty: {""} </span> {faculty}, <span className='text-primary'> Year: {""} </span> {""} {year} </p>
        <p> <strong> Interests: </strong></p>
        <ul>
            {interests.map(item => {
              return <li>{item}</li>;
            })}
        </ul>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

    </div>
  );
};


ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;