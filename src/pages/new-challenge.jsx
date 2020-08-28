import React from "react"
import {Link} from "react-router-dom"
import axios from "axios"



function NewChallengePage() {
    const [values, setValues] = React.useState({
        user: '',
        name: '',
        description: ''
        
      });
      console.log(values);


    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };  


    function submitForm(event) {
        event.preventDefault();
        const challenge = {
          user: values.user,
          name: values.name,
          description: values.description
        }
        
        console.log(challenge);
    
        axios.post("http://localhost:3001/posts", challenge)
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
        <input value={values.name}
            onChange={handleChange('name')} id="name" type="text" placeholder="Challenge Name"></input> <br/>
        <input value={values.description}
            onChange={handleChange('description')} id="description" type="text" placeholder="Challenge Description"></input> <br/>
        <input value={values.user}
            onChange={handleChange('user')} id="user" type="text" placeholder="user"></input> <br/>
        <button type="submit">Post</button>
    </form>
     </div>
  )
}

export default NewChallengePage