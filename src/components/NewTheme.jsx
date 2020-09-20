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



export default function NewTheme(props) {
  // console.log('logged in', props.user.loggedIn);
  const loggedIn = props.user.loggedIn
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState({name: '', description: ''})

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
    setTheme({ ...theme, [prop]: event.target.value });
    };

  const handleSubmit = (event) => {
    event.preventDefault();
        const newTheme = {
          user: props.user.username,
          name: theme.name,
          description: theme.description
        }


        console.log('new theme', newTheme);

        axios.post("/themes", newTheme)
        .then((response) => {
          console.log(response);
          window.location = '/photos'
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
        <DialogTitle id="form-dialog-title">Post a New Photo Theme</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To post a new photo theme, include a name for the theme as well as a description.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Theme Name"
            type="text"
            onChange={handleChange('name')}
            value = {theme.name}
            fullWidth
          />
          <TextField
            label="Theme Description"
            multiline
            rows={2}
            rowsMax={4}
            onChange={handleChange('description')}
            value= {theme.description}
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
