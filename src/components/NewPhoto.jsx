import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Input from '@material-ui/core/Input'
import axios from 'axios'


export default function NewPhoto(props) {
  const loggedIn = props.user.loggedIn
    const [open, setOpen] = React.useState(false);

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



    const [values, setValues] = React.useState({
        title: ''

      });

    const [file, setFile] = React.useState(null);

    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };

    function handleFile(event) {
        // console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    function submitForm(event) {
        event.preventDefault();
        const photo = {
          user: props.user.username,
          title: values.title,
          img: file
        }

        let formData = new FormData();

        formData.append('user', props.user.username);
        formData.append('title', values.title);
        formData.append('img', file);


        // console.log(post);

        axios.post("/photos", formData, {
            headers: {
             'content-type': 'multipart/form-data'
            }})
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });

        formData.append('theme', props.theme);

        axios.post("/photos/themes", formData, {
            headers: {
             'content-type': 'multipart/form-data'
            }})
        .then((response) => {
          console.log(response);
          window.location = '/photos'
        }, (error) => {
          console.log(error);
        });

    }

  return (
    <div>
      <AddCircleIcon onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Post a Reference Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To post a reference photo, upload file as jpeg or png. Include a title.
          </DialogContentText>
            <Input name='img' type="file" onChange={handleFile} fullWidth></Input>
          <TextField
            required
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            onChange={handleChange('title')}
            value = {values.title}
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type='submit' onClick={submitForm} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
