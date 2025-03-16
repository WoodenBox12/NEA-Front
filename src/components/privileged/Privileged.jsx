import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import Cookies from "universal-cookie"

const Privileged = () => {
  const cookies = new Cookies(null)
  const navigate = useNavigate()

  useEffect(() => {// only on pages that need to be logged in for

  if (cookies.get("sessionId") == undefined || cookies.get("baseKey") == undefined || cookies.get("email") == undefined) {
    // redirects to signin when cookie deleted (not allways immediate)

   // deletes remaining cookies if only some were deleted
   // Oject.keys(cookies.getAll()).forEach(cookie => cookies.remove(cookie))
            
    navigate("/signin")
  }
        
  })

  return(
    <>
      <Outlet />
    </>
  )
}

export default Privileged