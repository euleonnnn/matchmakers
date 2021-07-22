import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/user-profile/CreateProfile';
import MyProfile from './components/user-profile/MyProfile';
import EditProfile from './components/user-profile/EditProfile';
import UserProfile from './components/profiles/UserProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import Profiles from './components/profiles/Profiles';
import Games from './components/games/Games';
import GameRoom from './components/games/GameRoom';
import CreateGame from './components/games/CreateGame';
import { Provider } from 'react-redux';
import store from './store';
import { authUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AccountSettings from './components/auth/AccountSettings';
import MessageBox from './components/chat/MessageBox';
import PasswordChange from './components/auth/PasswordChange';
import EnterCall from './components/video/EnterCall';
import BookFacility from './components/games/BookFacility';
import Notifications from './components/notification/Notifications';

if (localStorage.token) { 
  setAuthToken(localStorage.token);
}

/**
 * App is a function with no parameter and will be rendered
 * by ReactDOM. It contains all the routes and necessary components
 * that we have used so far. useEffect is mounted, and will only run 
 * once.
 */
const App = () => {
  useEffect(()=> {     
    store.dispatch(authUser());  
  }, []);

  return (
    <Provider store = {store}>
    <Router>
      
    <Fragment>
      <Navbar />
        <Route exact path ="/" component= { Landing } />
      <section className="box">
       <Alert />
        <Switch> 
          <Route exact path ="/register" component= {Register} />
          <Route exact path ="/login" component= {Login} />
          <PrivateRoute exact path ="/profiles" component= {Profiles} />
          <PrivateRoute exact path ="/dashboard" component= {Dashboard} />
          <PrivateRoute exact path ="/my-profile" component= {MyProfile} />
          <PrivateRoute exact path ="/profile/:id" component= {UserProfile} />
          <PrivateRoute exact path ="/create-profile" component= {CreateProfile} />
          <PrivateRoute exact path ="/edit-profile" component= {EditProfile} />
          <PrivateRoute exact path ="/all-games" component = {Games} />
          <PrivateRoute exact path ="/games/:id" component = {GameRoom} />
          <PrivateRoute exact path ="/create-game" component = {CreateGame} />
          <PrivateRoute exact path ="/account" component = {AccountSettings} />
          <PrivateRoute exact path ="/messagebox" component = {MessageBox} />
          <PrivateRoute exact path ="/change-password" component = {PasswordChange} />
          <PrivateRoute exact path ="/entercall/:id" component = {EnterCall} />
          <PrivateRoute exact path ="/book-facility" component = {BookFacility} />
          <PrivateRoute exact path ="/notifications" component = {Notifications} />
        </Switch> 
      </section>
    </Fragment>
    </Router>
    </Provider>
)};


export default App;
