import React from "react"
import {Link} from "react-router-dom"
import RegisterForm from "../components/RegisterForm"


function RegisterPage() {
  return (
    <div>
    <RegisterForm />
    <Link to="/users"> </Link>
     </div>
  )
}

export default RegisterPage
