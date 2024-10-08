import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const SignUp = () => {
    const [user, SetUser] = useState("")
    const [pass, SetPass] = useState("")

    function UserUpdate(e) {
        console.log("onblur")

        // logic to check if password is free
        // to improve make it call only when they stop typing/ click off box
        // think onblur is when clicked off
    }

    return (
        <>
            <form className="card">
                <div>
                    <label htmlFor="username">username:</label>
                    <input 
                    className="button" id="username" type="text" 
                    minLength={5} required 
                    onChange={(e) => SetUser(e.target.value)} 
                    onBlur={UserUpdate}
                    />
                </div>

                <div>
                    <label  htmlFor="password">password:</label>
                    <input className="button" id="password" type="password" minLength={5} required onChange={(e) => SetUser(e.target.value)} />
                </div>

                <input className="button" type="submit" value="Computer go Brrr Brrr"/>
            </form>

            <Link className="button" to="/">back to index</Link>
        </>
    )
}

export default SignUp