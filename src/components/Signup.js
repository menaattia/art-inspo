import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {
	const [user, setUser] = useState({
		username: '',
		password: '',
		confirmPassword: '',

	});

	const [redirectTo, setRedirectTo] = useState(null);


	function handleChange(event) {
		setUser({
			...user,
			[event.target.name]: event.target.value
		})
	}

	function handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(user.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: user.username,
			password: user.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					setRedirectTo('/login')
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


	return (

		<div className="sign-up">
		{redirectTo !== null && <Redirect exact to={redirectTo} />}
      <div className="sign-up-form">
        <div className="sign-up-form-header">
          <h1>SIGN UP</h1>
        </div>
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
  					>sign up</button>
  				</div>
  			</form>
        <p>Already have an account? <Link style={{color: 'grey', fontWeight: '600'}} to="/login">Login</Link></p>
      </div>
    </div>

	)

}

export default Signup
