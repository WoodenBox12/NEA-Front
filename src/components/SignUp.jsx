import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const SignUp = () => {
    const [email, SetEmail] = useState("")
    const [pass, SetPass] = useState("")
    const [confirmpass, SetConfirmPass] = useState("")
    const navigate = useNavigate()

    const EmailUpdate = (e) => {
        e.preventDefault()
        
        fetch("http://localhost:5000/validateemail", {
            method: "POST",
            body: JSON.stringify({"email": e.target.value}),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then((data) => {
            document.getElementById("validateemail").innerHTML = data.message        
            if (!data.success) {
                e.target.setCustomValidity("email already in use")
                return
            }
            e.target.setCustomValidity("")
        }).catch(err => console.log(err))
    }

    const CreateAccount = (e) => {
        e.preventDefault()
        if (pass != confirmpass) {
            alert("passwords don't match")
            return
        }

        //web crypto required
        alert("needs web crypto")
        /*fetch("http://localhost:5000/createaccount", {
            method: "POST",
            body: JSON.stringify({
                "email":email,
                "password":pass
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then((data) => {
            if (data.success) {// possibly add pause
                navigate("/signin")
            }
        }).catch(err => console.log(err))*/
    }

    return (
        <>
            <form className="card" autoComplete="off" onSubmit={CreateAccount}>
                <div>
                    <label htmlFor="email">email:</label>
                    <input 
                    className="button" id="email" type="email"
                    minLength={5} required autoFocus defaultValue="email" 
                    onBlur={(e) => {
                        SetEmail(e.target.value)
                        EmailUpdate(e)
                    }}/>
                    <div id="validateemail" className="card"></div>
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

            <Link className="button" to="/signin">i already have an account</Link>
            <Link className="button" to="/">back to index</Link>
        </>
    )
}

export default SignUp