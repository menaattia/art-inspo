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



export default function NewCategory(props) {
  // console.log('logged in', props.user.loggedIn);
  const loggedIn = props.user.loggedIn
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState({name: '', description: ''})

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
    setCategory({ ...category, [prop]: event.target.value });
    };

  const handleSubmit = (event) => {
    event.preventDefault();
        const newCategory = {
          user: props.user.username,
          name: category.name,
          description: category.description
        }


        console.log('new category', newCategory);

        axios.post("/categories", newCategory)
        .then((response) => {
          console.log(response);
          window.location = '/resources'
        }, (error) => {
          console.log(error);
        });
  }



  return (

    <div>
      <AddCircleIcon onClick={handleClickOpen}/>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Post a New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To post a new art category, include a name for the category as well as a description.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            onChange={handleChange('name')}
            value = {category.name}
            fullWidth
          />
          <TextField
            label="Category Description"
            multiline
            rows={2}
            rowsMax={4}
            onChange={handleChange('description')}
            value= {category.description}
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
