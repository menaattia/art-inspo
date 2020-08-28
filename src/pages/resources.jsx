import React, { useEffect } from "react"
import ResourcesDrawer from "../components/Resources"


function ResourcesPage(props) {


  return (
    <div>
    <ResourcesDrawer user={props.user}/>
     </div>
  )
}

export default ResourcesPage
