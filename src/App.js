import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import axios from 'axios'
import {BrowserRouter as Router, Route, Switch, Link, Redirect }from 'react-router-dom'

// components
import Signup from './components/Signup'
import LoginForm from './components/Login'
import AppBar from './components/AppBar'
import Home from './components/Home'

import MainPage from "./pages/index"
import NotFoundPage from "./pages/404"
import LoginPage from "./pages/login"
import UserPage from "./pages/user"
import PostPage from "./pages/post"
import ChallengesPage from "./pages/challenges"
import PhotosPage from "./pages/photos"
import ResourcesPage from "./pages/resources"
import RegisterPage from "./pages/register"
import NewChallengePage from "./pages/new-challenge"

import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: {
      main: '#37474f',
    },
  },
});

function App() {
  const [state, setState] = useState({
    loggedIn: false,
    username: null
  });

  useEffect(()=> {
    getUser()
    console.log('state',state);
  },[])

  function updateUser(userObject) {
    setState(userObject)
  }

  function getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }


  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="container">
        <AppBar updateUser={updateUser} loggedIn={state.loggedIn} user={state.username} />
        <div style={{padding: '3% 0'}}>
        <Switch>

          <Route exact path='/login'>
            <LoginForm updateUser= {updateUser} />
          </Route>

          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path="/post" component={PostPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/" component={MainPage}/>
          <Route exact path="/users/:userId" render={(props) => <UserPage{...props} user={state}/>}>

          </Route>
          <Route exact path="/challenges">
            <ChallengesPage user={state} />
          </Route>
          <Route exact path="/resources">
            <ResourcesPage user={state} />
          </Route>
          <Route exact path="/photos">
            <PhotosPage user={state} />
          </Route>
          <Route exact path="/new-challenge" component={NewChallengePage}/>
          <Route exact path="/404" component={NotFoundPage}/>
          <Redirect to="/404" />

        </Switch>
        </div>
      </div>
    </Router>
    </ThemeProvider>


  );

}

export default App;
