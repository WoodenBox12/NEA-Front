import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const SignIn = () => {
    const [user, SetUser] = useState("")
    const [pass, SetPass] = useState("")

    function SignIn(e) {

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

            <Link className="button" to="/">back to index</Link>
        </>
    )
}

export default SignIn