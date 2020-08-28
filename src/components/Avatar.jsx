import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  }));

export default function LetterAvatars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar className={classes.large}>
      {props.user != null ? props.user.substring(0,1).toUpperCase(): props.user}
      
      </Avatar>
    </div>
  );
}