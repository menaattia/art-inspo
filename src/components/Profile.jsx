import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '../components/Avatar'
import NewPost from '../components/NewPost'
import Typography from '@material-ui/core/Typography';
// import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: 'auto 0 1',
    },
    cover: {
        width: 151,
      }
}));


export default function Profile(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
      <Card className={classes.root}>
          <div className={classes.cover}>
          <CardContent>
            <Avatar user={props.username}/>
          </CardContent>
          </div>
          <div className={classes.content}>
          <CardContent>
          <Typography component="h5" variant="h5">
            {props.username}
          </Typography>
          </CardContent>
          </div>
          <div className={classes.details}>
          <CardContent>
              <Typography>Insert bio here</Typography>
          </CardContent>

          {props.status? <NewPost user={props.user}/> : null}
          </div>
      </Card> ) }
