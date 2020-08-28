import React from "react"
import {Link} from "react-router-dom"
import ImageButton from "../components/ImageButton.jsx"


function MainPage() {
  return (
    <div>
    {console.log(document.cookie)}
    <ImageButton />
    <Link to="/users"> </Link>
     </div>
  )
}

export default MainPage
