import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Cookies from "universal-cookie"

import { calculateAuth, calculateBaseKey, request } from "../Utility"

const SignIn = () => {
  const [email, SetEmail] = useState("")
  const [pass, SetPass] = useState("")
  const cookies = new Cookies(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (cookies.get("sessionId") != undefined) {
      navigate("/")
    }
  }, [])



  const SignIn = async (e) => {
    e.preventDefault()

    const auth = await calculateAuth(email, pass)
    const baseKey = await calculateBaseKey(email, pass)

    const data = await request("generatesession", JSON.stringify({
      "email":email,
      "auth":auth
    }))

    if (data.success) {
      cookies.set("sessionId", data.sessionId, {
        "maxAge": data.expiry * 60 * 60
      })
      cookies.set("email", email, {
        "maxAge": data.expiry * 60 * 60
      })
      cookies.set("baseKey", baseKey, {
        "maxAge": data.expiry * 60 * 60
      })
      navigate("/")
    }
    else if (data.message == "incorrect auth/email") {
      alert("incorrect email/password")
    }
  }

  return (
    <>
      <form className="card" autoComplete="off" onSubmit={SignIn}>
        <div>
          <label htmlFor="email">email:</label>
          <input
            className="button" id="email" type="text" placeholder="email"
            minLength={5} required autoFocus defaultValue={cookies["email"]}
            onBlur={e => SetEmail(e.target.value)}
            autoComplete="email"/>
        </div>

        <div>
          <label  htmlFor="password">password:</label>
          <input 
            className="button" id="password" type="password" placeholder="password"
            minLength={5} required onBlur={e => SetPass(e.target.value)} 
            autoComplete="current-password"/>
        </div>

        <input className="button" type="submit" value="Sign In"/>
      </form>

      <Link className="button" to="/signup">create account</Link>
    </>
  )
}

export default SignIn