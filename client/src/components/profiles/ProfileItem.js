import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    faculty,
    year,
    interests
  }
}) => {

  return (
    <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={avatar} alt="" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text"><span className='text-primary'> Faculty: {""} </span> {faculty} {" "} | {" "} <span className='text-primary'> Year: {""} </span> {""} {year}</p>
              <p className="card-text"><strong>Interests:</strong></p>
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
        </div>
    </div>
  )
};


ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;