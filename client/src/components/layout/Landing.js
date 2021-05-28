import React, {Fragment} from 'react'
import {Link, Redirect} from 'react-router-dom';
import "../../App.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Landing = ({isAuthenticated}) => {
  if (isAuthenticated) {
    const backToDash = <Redirect to = '/dashboard' />;
    return backToDash;
  }
    return (
      <Fragment>
        <section className="landing"> 
          <div className="dark-overlay">
            <div className="landing-inner">
       
              <div className = "my-3">
                <h3 className ="large"> Welcome to (Match) Maker. </h3>
                
              </div>
              
              <div className="buttons">
                <Link to="/register" className="btn btn-primary btn-lg">Sign Up</Link>
                <>            </>
                <Link to="/login" className = "btn btn-light btn-lg">Login</Link>
              </div>
            </div>
      </div>
    </section>
    </Fragment>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state =>  ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);