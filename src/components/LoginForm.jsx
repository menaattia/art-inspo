import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { Typography } from '@material-ui/core';
import {Redirect, Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
    redirectTo: null
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function submitForm(event) {
    event.preventDefault();
    const user = {
      username: values.username,
      password: values.password
    }

    axios.post("http://localhost:3001/user/login", user)
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
          setValues({
              redirectTo: '/'
          })
      }
  }).catch(error => {
      console.log('login error: ')
      console.log(error);

  })

    
  }


  return (
    <div>
      {values.redirectTo !== null? <Redirect to={{ pathname: values.redirectTo }} /> :null}
    <form onSubmit={submitForm} className={classes.root} noValidate autoComplete="off">
      <TextField required id="username" label="Username" value={values.username} onChange={handleChange('username')}/>
      <div>
      <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>

      <InputLabel htmlFor="password">Password</InputLabel>
      <Input
            required="true"
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
        />
        </FormControl>
        <Typography>Don't have an account? Register <Link to='/register'>here</Link></Typography>
        <Button type="submit" style={{marginTop: "10%"}} variant="outlined">Login</Button>
        </div>

    </form>
    </div>
  );
}
