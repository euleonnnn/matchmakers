import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import '../../css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { getCurrentProfile} from '../../actions/profile';

/**
 * Styles for the Menu Button
 */
 const useStyles = makeStyles({
  root: {
    backgroundColor: 'black',
    display:"flex",
    marginLeft:"auto",
  },
});

/**
 * Functional component for the navigation bar. The links on the 
 * nav bar will switch based on user's logged in and set up state.
 * Params are destructured prop.
 * @param getCurrentProfile function which helps to get profile of current logged in user
 * @param auth get the auth state and document of logged in user 
 * @param profile the profile document of logged in user
 * @param logout function which logs out user
 */
const Navbar = ({getCurrentProfile, auth, profile: {profile}, logout}) => {
    // eslint-disable-next-line
    useEffect(() => {
      getCurrentProfile();
    }, [getCurrentProfile]);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const guestLinks = (
      <div>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem onClick={handleClose} component={Link} to="/register">Register</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/login">Login</MenuItem>
        </Menu>
      </div>
    )
    
      const profileLinks = (
          <div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem onClick={handleClose} component={Link} to="/all-games">All Games</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/profiles">Find Friends</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/account"> Account Settings </MenuItem>
            </Menu>
          </div>
      )
    

    
    return (
      <nav className ="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className ="container-fluid">
        <Link to="/dashboard" className="navbar-brand"> (Match) Maker </Link> 
        <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        className={classes.root}
        color='inherit'
        onClick={handleClick}>
        <MenuIcon />
        </IconButton>
        <div>
        {  !auth.loading && (<Fragment>{auth.isAuthenticated ? profileLinks : guestLinks} </Fragment> )}
        </div>
      </div>
    </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, logout}) (Navbar);