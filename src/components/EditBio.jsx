import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'



export default function EditBio(props) {
  // console.log('logged in', props.user.loggedIn);
  const loggedIn = props.user.loggedIn
  const [open, setOpen] = React.useState(false);
  const [bio, setBio] = React.useState()

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

  const handleChange = (event) => {
    setBio(event.target.value );
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
        username: props.user.username,
        bio: bio
    }

        axios.post("/bio", user)
        .then((response) => {
          console.log(response);
          setBio(response.data.bio)
          window.location = '/users/'+props.user.username
        }, (error) => {
          console.log(error);
        });
  }



  return (

    <div >
      <button onClick={handleClickOpen}><Typography>Edit Bio</Typography></button>
      <Dialog fullWidth={true}  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Bio</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Your current bio is: 
          </DialogContentText>
          <DialogContentText style={{whiteSpace: 'pre-wrap'}} >
            {props.bio}
          </DialogContentText>

          <DialogContentText>
            Type your new bio in the textbox below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            multiline
            id="name"
            label="Update Bio"
            type="text"
            rows={2}
            rowsMax={4}
            onChange={handleChange}
            value = {bio}
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
}
