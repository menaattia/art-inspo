import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"



function PostPage() {
    const [values, setValues] = React.useState({
        user: '',
        title: '',
        content: ''
        
      });
      console.log(values);

    const [file, setFile] = React.useState(null);

    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };  

    function handleFile(event) {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    function submitForm(event) {
        event.preventDefault();
        const post = {
          user: values.user,
          title: values.title,
          content: values.content,
          img: file
        }

        let formData = new FormData();
        formData.append('img', file);
        formData.append('user', values.user);
        formData.append('title', values.title);
        formData.append('content', values.content);

        
        console.log(post);
    
        axios.post("http://localhost:3001/posts", formData, {
            headers: {
             'content-type': 'multipart/form-data'
            }})
        .then((response) => {
          console.log(response);
          window.location = '/challenges'
        }, (error) => {
          console.log(error);
        });

    }

  return (
    <div>
    <form onSubmit={submitForm}>
        <label for="file">Choose image </label>
        <input type="file" id="file" onChange={handleFile}/> <br/>
        <input value={values.user}
            onChange={handleChange('user')} id="user" type="text" placeholder="user"></input> <br/>
        <input value={values.title}
            onChange={handleChange('title')} id="title" type="text" placeholder="title"></input> <br/>
        <input value={values.content}
            onChange={handleChange('content')} id="content" type="text" placeholder="content"></input> <br/>
        <button type="submit">Post</button>
    </form>
     </div>
  )
}

export default PostPage