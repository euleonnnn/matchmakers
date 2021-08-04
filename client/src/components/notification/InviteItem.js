import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateformat from '../../utils/dateformat';


const InviteItem = ({ auth: { user }, invite }) => {


  return (
    <Fragment>
      <li className="list-group-item">
        Invited By: {" "}<p className="text-primary">{invite.name}</p>

      <div className="icon-box3 mb-3 my-top-small">
                <div className="card-body" >
                    <div className="row g-0">
                        <div className="card-body">
                        <h5 className="card-title">{invite.sport}</h5>
                        <br></br>
                        <p className="card-text"> <span className='text-primary'> Location: </span> {invite.location}</p>
                        <p className="card-text"> <span className='text-primary'> Day: </span> {dateformat(invite.dateTime)} </p>
                        <Link to={`/games/${invite._id}`} className="btn btn-dark join-all"> Join Now </Link>

                        </div>
                    </div>
                </div>
            </div>
        </li>
    </Fragment>
  );
}


InviteItem.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});


export default connect(mapStateToProps)(withRouter(InviteItem));
