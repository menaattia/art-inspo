import React from "react"
import {Redirect, Link} from "react-router-dom"
// import AppBar from "../components/AppBar"
import Avatar from '../components/Avatar';
import UserTab from "../components/UserTab"
import Profile from "../components/Profile"
import axios from 'axios'

function UserPage(props) {

  // const [isUser, setUser] = React.useState(true)
  // let isUnmount = false;

  // React.useEffect(() => {
  //   axios.get("/user/username/"+props.match.params.userId)
  //   .then(response => {
  //     console.log(response);
  //     console.log(isUser);



  //   })
  //   .catch(error => {
  //     console.log(error);
  //     if (!isUnmount) {
  //       setUser(false)
  //       console.log(isUser);
  //     }
  //   });
  //   return () => {
  //     isUnmount= true;
  //   };}, [isUser])

  const loggedIn = props.user.username === props.match.params.userId


  return (
    <div>

    <div style={{marginTop: "10%"}}></div>
    {console.log(props.user.username)}
      <Profile status={loggedIn} user={props.user} username={props.match.params.userId}/>

    <UserTab user={props.match.params.userId}/>

    {/* {!isUser ? <Redirect to="/404" /> : null} */}
     </div>
  )

}

export default UserPage
