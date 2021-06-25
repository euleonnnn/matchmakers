import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';


const FollowerItem = ({ auth: { user }, follower }) => {

  const [follow, toggle] = useState(false)

  const followUnfollow = () => {
    try {
      toggle(!follow)
      axios.put(`/api/users/${follower._id}/follow`, {
        userId: user._id,
      });
    } catch (err) {
      console.log(err.status)
    }
  };

  return (
    <Fragment>
      <li className="list-group-item">
        <Link to={`/profile/${follower._id}`}> {follower.name} </Link>
        {!follow && <button onClick={() => {
          followUnfollow();
        }} type="button" className="btn btn-dark join-all">
          <i class="fas fa-user-plus" />
        </button>}

        {follow && <button className="btn btn-success join-all"><i class="fas fa-cog fa-spin" /></button>}
      </li>
    </Fragment>
  );
}


FollowerItem.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});


export default connect(mapStateToProps)(withRouter(FollowerItem));
