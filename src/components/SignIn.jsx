import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'


const SignIn = () => {
    const [user, SetUser] = useState("")
    const [pass, SetPass] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["sessionId"], {
        doNotParse: true,
    });



    function SignIn(e) {
        e.preventDefault()
        axios.post("http://localhost:5000/generatesession", {
            "username":user,
            "password":pass
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            console.log(response.data)
            let expiry = new Date()
            expiry.setDate(Date.now())
            setCookie("sessionId", response.data.sessionId, {
                "maxAge": response.data.expiry * 60 * 60
            })
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <>
            <form className="card" autoComplete="off" onSubmit={SignIn}>
                <div>
                    <label htmlFor="username">username:</label>
                    <input 
                    className="button" id="username" type="text" 
                    minLength={5} required autoFocus defaultValue="username" 
                    onBlur={(e) => {SetUser(e.target.value)}}/>
                </div>

                <div>
                    <label  htmlFor="password">password:</label>
                    <input className="button" id="password" type="password" minLength={5} required onBlur={(e) => SetPass(e.target.value)} />
                </div>

                <input className="button" type="submit" value="Sign In"/>
            </form>

            <Link className="button" to="/">create account</Link>
        </>
    )
}

export default SignIn