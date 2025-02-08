import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { calculateAuth, decryptVault, encryptVault, Request } from '../Utility'

const SignIn = () => {
    const [email, SetEmail] = useState("")
    const [pass, SetPass] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["sessionId","email"], {
        doNotParse: true,
    })
    const navigate = useNavigate()

    useEffect(() => {
        if (cookies["sessionId"] != undefined) {
            navigate("/home")
        }
    }, [])



    const SignIn = async (e) => {
        e.preventDefault()

        if (chrome.tabs != undefined) {// if extension 
            console.log("ok")
            /*chrome.runtime.sendMessage({
                host:hostname
            }).then((response) => {
                console.log(response)
            })*/
        }

        const response = await encryptVault(email, pass, "{\"www.chrome.com\": [\"idk\"]}")
        const response2 = await decryptVault(email, pass, response.nonce, response.keySalt, response.vault)
        //console.log(response)
        //console.log(response2)

        const auth = await calculateAuth(email, pass)

        Request("generatesession", JSON.stringify({
            "email":email,
            "auth":auth
        })).then((data) => {
            if (data.success) {
                setCookie("sessionId", data.sessionId, {
                    "maxAge": data.expiry * 60 * 60
                })
                setCookie("email", email, {
                    "maxAge": data.expiry * 60 * 60
                })
                navigate("/home")
            }
        })
    }

    return (
        <>
            <form className="card" autoComplete="off" onSubmit={SignIn}>
                <div>
                    <label htmlFor="email">email:</label>
                    <input
                    className="button" id="email" type="text" 
                    minLength={5} required autoFocus defaultValue="email" 
                    onBlur={e => SetEmail(e.target.value)}/>
                </div>

                <div>
                    <label  htmlFor="password">password:</label>
                    <input className="button" id="password" type="password" minLength={5} required onBlur={e => SetPass(e.target.value)} />
                </div>

                <input className="button" type="submit" value="Sign In"/>
            </form>

            <Link className="button" to="/signup">create account</Link>
        </>
    )
}

export default SignIn