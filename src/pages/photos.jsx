import React, { useEffect } from "react"
import PhotosDrawer from "../components/Photos"


function PhotosPage(props) {


  return (
    <div>
    <PhotosDrawer user={props.user}/>
     </div>
  )
}

export default PhotosPage
