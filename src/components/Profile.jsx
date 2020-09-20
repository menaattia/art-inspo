import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '../components/Avatar'
import NewPost from '../components/NewPost'
import Typography from '@material-ui/core/Typography';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios'
import EditBio from './EditBio';

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
      },
    align: {
      display: 'flex',
      flexDirection: 'row',

    }
}));


export default function Profile(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [bio, setBio] = React.useState('');

    React.useEffect(() => {

      axios.get('/user/'+props.username)
      .then(response => {
        setBio(response.data.bio)
      })
      .catch(error => {
        console.log(error);
      })

    }, [])



    return (
      <Card className={classes.root}>
          <div className={classes.cover}>
          <CardContent>
            <Avatar user={props.username}/>
          </CardContent>
          </div>
          <div style={{marginLeft: "3%"}} className={classes.details}>
          <div className={classes.details}>
          <CardContent>
          <Typography component="h5" variant="h5">
            {props.username}
          </Typography>
          </CardContent>
          <CardContent>
              <Typography style={{whiteSpace: 'pre-wrap'}} >{bio} </Typography>
          </CardContent>
          </div>
          <div className={classes.align}>
          {props.status? <CardContent>
              <EditBio user={props.user} bio={bio}/>
          </CardContent> : null}
          {props.status?<CardContent> <NewPost user={props.user}/></CardContent> : null}
          </div>
          
          
          </div>
      </Card> ) }
