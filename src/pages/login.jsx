import React from "react"
import {Link} from "react-router-dom"
import LoginForm from "../components/LoginForm"


function LoginPage() {
  return (
    <div>
    <LoginForm />
    <Link to="/users"> </Link>
     </div>
  )
}

export default LoginPage
