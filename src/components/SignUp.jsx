import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const SignUp = () => {
    const [user, SetUser] = useState("")
    const [pass, SetPass] = useState("")
    const [confirmpass, SetConfirmPass] = useState("")

    function UserUpdate(e) {
        e.preventDefault()
        axios.post(
            "http://localhost:5000/validateusername", {"username": e.target.value}, {// if user instead of e.target.value its delayed
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            document.getElementById("validateuser").innerHTML = response.data.message            
            if (!response.data.successful) {
                e.target.setCustomValidity("username already in use")
                return
            }
            e.target.setCustomValidity("")
        }).catch((err) => {
            console.log(err.message)
        })
    }

    function CreateAccount(e) {
        e.preventDefault()
        if (pass != confirmpass) {
            alert("usernames don't match")
            return
        }
        axios.post("http://localhost:5000/createaccount", {
            "username":user,
            "password":pass
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            console.err(err)
        })
    }

    return (
        <>
            <form className="card" autoComplete="off" onSubmit={CreateAccount}>
                <div>
                    <label htmlFor="username">username:</label>
                    <input 
                    className="button" id="username" type="text" 
                    minLength={5} required autoFocus defaultValue="username" 
                    onBlur={(e) => {
                        SetUser(e.target.value)
                        UserUpdate(e)
                    }}/>
                    <div id="validateuser" className="card"></div>
                </div>

                <div>
                    <label  htmlFor="password">password:</label>
                    <input className="button" id="password" type="password" minLength={5} required onBlur={(e) => SetPass(e.target.value)} />
                </div>

                <div>
                    <label  htmlFor="confirmpassword">confirm password:</label>
                    <input className="button" id="confirmpassword" type="password" minLength={5} required onBlur={(e) => SetConfirmPass(e.target.value)} />
                </div>

                <input className="button" type="submit" value="Computer go Brrr Brrr"/>
            </form>

            <Link className="button" to="/">back to index</Link>
        </>
    )
}

export default SignUp