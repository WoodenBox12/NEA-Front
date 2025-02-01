import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


const SignIn = () => {
    const [email, SetEmail] = useState("")
    const [pass, SetPass] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["sessionId"], {
        doNotParse: true,
    })
    const navigate = useNavigate()


    const SignIn = (e) => {
        e.preventDefault()

        // webcrypto required
        alert("needs web crypto")
        /*fetch("http://localhost:5000/generatesession", {
            method: "POST",
            body: JSON.stringify({
                "email":email,
                "password":pass
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then((data) => {
            if (data.successful) {
                setCookie("sessionId", data.sessionId, {
                    "maxAge": data.expiry * 60 * 60
                })
                navigate("/home")
            }  
        }).catch(err => console.log(err))*/
    }

    return (
        <>
            <form className="card" autoComplete="off" onSubmit={SignIn}>
                <div>
                    <label htmlFor="email">email:</label>
                    <input 
                    className="button" id="email" type="text" 
                    minLength={5} required autoFocus defaultValue="email" 
                    onBlur={(e) => {SetEmail(e.target.value)}}/>
                </div>

                <div>
                    <label  htmlFor="password">password:</label>
                    <input className="button" id="password" type="password" minLength={5} required onBlur={(e) => SetPass(e.target.value)} />
                </div>

                <input className="button" type="submit" value="Sign In"/>
            </form>

            <Link className="button" to="/signup">create account</Link>
        </>
    )
}

export default SignIn