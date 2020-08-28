import React from 'react'

function Home(props){

  return (
      <div>
      {props.user.loggedIn ? <p>Welcome, {props.user.username}</p>
      :<p>Welcome to MERN Auth boiler plate</p>}

      </div>
  )


}

export default Home
