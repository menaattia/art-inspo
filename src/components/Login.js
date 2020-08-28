import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

function LoginForm(props) {
  const [user, setUser] = useState({
      username: '',
      password: '',
      redirectTo: null
  });


  function handleChange(event) {
      setUser({
          ...user,
          [event.target.name]: event.target.value
      });
  }


  function handleSubmit(event) {
      event.preventDefault()
      console.log('handleSubmit')

      axios
          .post('/user/login', {
              username: user.username,
              password: user.password
          })
          .then(response => {
              console.log('login response: ')
              console.log(response)
              if (response.status === 200) {
                  // update App.js state
                  props.updateUser({
                      loggedIn: true,
                      username: response.data.username
                  })
                  // update the state to redirect to home
                  setUser({
                      redirectTo: '/users/' + response.data.username
                  })
              }
          }).catch(error => {
              console.log('login error: ')
              console.log(error);

          })
    }


    return (
        <div>
        {user.redirectTo !== null? <Redirect to={{ pathname: user.redirectTo }} /> :null}
          <div className="sign-up">
            <div className="sign-up-form">
              <h1>LOG IN</h1>

              <form className="form-horizontal" autoComplete="off" onSubmit={handleSubmit}>
        				<div className="form-group">
                  <input className="form-input"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={user.username}
                      onChange={handleChange}
                  />
        				</div>
                <div className="form-group">
                  <input className="form-input"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                  />
        				</div>

        				<div className="form-group">
        					<button
        					type="submit"
        					className="btn btn-dark"
        					>login</button>
        				</div>
        			</form>
              <p>Don't have an account? <Link style={{color: 'grey', fontWeight: '600'}} to="/signup">Sign Up</Link></p>
            </div>
          </div>
    </div>
    )
}

export default LoginForm
