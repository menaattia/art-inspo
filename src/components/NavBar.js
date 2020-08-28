import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap'

import '../App.css';
import axios from 'axios'

function NavBar(props) {
  const location = useLocation();

  // useEffect(() => {
  //   var x = document.getElementsByClassName("nav-link-custom");
  //   for (var i = 0; i < x.length; i++) {
  //     x[i].style.color = "#282828";
  //   }
  //
  //   if (!loggedIn) {
  //     console.log(location.pathname);
  //     var active = document.getElementById(location.pathname)
  //     active.style.color = "#A0A0A0";
  //   }
  // })

  function logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        props.updateUser({
          loggedIn: false,
          username: null
        })
      }
    }).catch(error => {
        console.log('Logout error')
    })
  }

  const loggedIn = props.loggedIn;
  console.log('navbar render, props: ')
  console.log(props);

  return (
    <Navbar expand="lg">
    <Navbar.Brand></Navbar.Brand>
    <Navbar.Toggle className="toggler" aria-controls="basic-navbar-nav"> <i className="fas fa-bars"></i> </Navbar.Toggle>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto" activeKey={location.pathname}>
      {loggedIn ?
        <Nav.Link className="nav-link-custom" onClick={logout} id="#" href="#">logout</Nav.Link>
        :
        <>
        <Nav.Link className="nav-link-custom" id="/" href="/">home</Nav.Link>
        <Nav.Link className="nav-link-custom" id="/login" href="/login">login</Nav.Link>
        <Nav.Link className="nav-link-custom" id="/signup" href="/signup">sign up</Nav.Link>
        </>
      }
      </Nav>
    </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar
