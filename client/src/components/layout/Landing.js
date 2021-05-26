import React, {Fragment} from 'react'
import {Link, Redirect} from 'react-router-dom';
import logo from "./logo.png"
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
                <h3> Welcome to (Match) Maker. </h3>
                <p> 
                
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                  deserunt mollit anim id est laborum.
                </p>
              </div>


              
              <div className="buttons">
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
                <>            </>
                <Link to="/login" className = "btn btn-light">Login</Link>
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