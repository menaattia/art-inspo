import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios'



export default function FormDialog(props) {
  // console.log('logged in', props.user.loggedIn);
  const loggedIn = props.user.loggedIn
  const [open, setOpen] = React.useState(false);
  const [challenge, setChallenge] = React.useState({name: '', description: ''})

  const handleClickOpen = () => {
    if(!loggedIn) {
      window.location ='/login'
    } else {
      setOpen(true);
    }

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setChallenge({ ...challenge, [prop]: event.target.value });
    };

  const handleSubmit = (event) => {
    event.preventDefault();
        const newChallenge = {
          user: props.user.username,
          name: challenge.name,
          description: challenge.description
        }


        console.log('new challenge', newChallenge);

        axios.post("/challenges", newChallenge)
        .then((response) => {
          console.log(response);
          window.location = '/challenges'
        }, (error) => {
          console.log(error);
        });
  }



  return (

    <div style={{height: "0px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  }}>
      <AddCircleIcon onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Post a New Challenge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To post a new art challenge, include a name for the challenge as well as a description.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Challenge Name"
            type="text"
            onChange={handleChange('name')}
            value = {challenge.name}
            fullWidth
          />
          <TextField
            label="Challenge Description"
            multiline
            rows={2}
            rowsMax={4}
            onChange={handleChange('description')}
            value= {challenge.description}
            fullWidth
            />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}
