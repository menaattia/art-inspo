import React from "react"
import {Redirect, Link} from "react-router-dom"
// import AppBar from "../components/AppBar"
import Avatar from '../components/Avatar';
import UserTab from "../components/UserTab"
import Profile from "../components/Profile"
import axios from 'axios'

function UserPage(props) {

  const [isUser, setUser] = React.useState(true)
  const loggedIn = props.user.username === props.match.params.userId

  React.useEffect(() => {
    axios.get("/user/"+props.match.params.userId)
    .then(response => {
      console.log("response", response);
      if(response.status === 200) {
        setUser(true)
      }

    })
    .catch(error => {
      console.log(error);
      setUser(false)
    });}, [])

  


  return (
    <div>

    {!isUser ? <Redirect to="/404" /> : 

    <div style={{marginTop: "10%"}}>
    {console.log(props.user.username)}
      <Profile status={loggedIn} user={props.user} username={props.match.params.userId}/>

    <UserTab user={props.match.params.userId}/>
    </div> }
    
     </div>
  )

}

export default UserPage
