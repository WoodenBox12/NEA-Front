import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const SignUp = () => {
    const [user, SetUser] = useState("")
    const [pass, SetPass] = useState("")

    function UserUpdate(e) {
        e.preventDefault()
        axios.post(
            "http://localhost:5000/validateusername", {"username": user}, {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            document.getElementById("validateuser").innerHTML = response.data.message
        })
    }

    return (
        <>
            <form className="card" autoComplete="off">
                <div>
                    <label htmlFor="username">username:</label>
                    <input 
                    className="button" id="username" type="text" 
                     required // still works if under min length
                    //onChange={(e) => SetUser(e.target.value)} 
                    onBlur={(e) => {
                        SetUser(e.target.value)
                        UserUpdate(e)// dont allow submit if username in use (less work for backend)
                    }}/>
                    <div id="validateuser" className="card"></div>
                </div>

                <div>
                    <label  htmlFor="password">password:</label>
                    <input className="button" id="password" type="password" minLength={5} required onBlur={(e) => SetPass(e.target.value)} />
                </div>

                <input className="button" type="submit" value="Computer go Brrr Brrr"/>
            </form>

            <Link className="button" to="/">back to index</Link>
        </>
    )
}

export default SignUp