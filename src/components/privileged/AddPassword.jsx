import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Cookies from "universal-cookie"

import { decryptVault, encryptVault, extGetUrl, getDomain, getUrl, hashSite, isExtension, request } from "../../Utility"

const AddPassword = () => {
    const [url, setUrl] = useState("")
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const cookies = new Cookies(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (isExtension) {
            extGetUrl().then((Url) => setUrl(Url))
        }
    }, [])

    const uploadVault = async (e) => {
        e.preventDefault()

        const siteHash = await hashSite(getDomain(url), cookies.get("email"))
        let vault = {}

        const data = await request("getvault", JSON.stringify({
            "sessionId":cookies.get("sessionId"),
            "siteHash":siteHash
        }))

        if (!data.success && data.message != "vault not found") {// show errors
            alert(data.message)
            return
        }
        else if (data.success) {// on case of hash collision data must be added to existing
            // if decryption fails then json parse fails
            const current = JSON.parse((await decryptVault(cookies.get("baseKey"), data.nonce, data.keySalt, data.data)).data)

            vault = current
        }

        if (vault[getDomain(url)] != undefined) {
            console.log("domain entry already found")
        }
        else {// entry doesent exist
            vault[getDomain(url)] = {}
        }

        if (vault[getDomain(url)][url] != undefined) {
            console.log("url entry already found")
        }
        else {
            vault[getDomain(url)][url] = []
        }
        // by end of this block of is statements vault is in the right format to be altered

        /*
        let a = {
           "domain": {
                "domain/signin": [
                    {
                        "username": "hey",
                        "password": "hey"
                    },
                    {
                        "username": "hey",
                        "password": "hey"
                    }
                ],
                "domain/admin/login": [
                    {
                    "username": "hey2",
                    "password": "hey2"
                    }
                ]
            }
        }
        */
        
        let added = false

        vault[getDomain(url)][url].forEach(e => {// if there is a username match and update the password for that username
            if (e["username"] == user) {
                console.log(`updated password for ${user}`)
                e["password"] = password
                added = true
            }
        });

        if (!added) {
            vault[getDomain(url)][url].push({
                username: user,
                password: password
            })
        }

        const vaultData = await encryptVault(cookies.get("baseKey"), JSON.stringify(vault))

        const response = await request("/updatevault", JSON.stringify({
            "sessionId": cookies.get("sessionId"),
            "siteHash": siteHash,
            "keySalt": vaultData.keySalt,
            "nonce": vaultData.nonce,
            "data": vaultData.data
        }))
        console.log(response)
        navigate("/")
    }

    // add password generator

    return (// make readonly if extension
        <>
            <form onSubmit={uploadVault}>
                <div>
                    <label htmlFor="url">url</label>
                    <input className="button" id="url" type="text" placeholder="url"
                    required autoComplete="off" defaultValue={url} onBlur={(e) => setUrl(getUrl(e.target.value))}/>
                </div>
                <div>
                    <label htmlFor="user">username/email</label>
                    <input className="button" id="user" type="text" placeholder="username/email"
                    required autoComplete="off" onBlur={(e) => setUser(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input className="button" id="password" type="password"
                    required autoComplete="off" onBlur={(e) => setPassword(e.target.value)}/>
                </div>
                <input  className="button" type="submit" value="add to vault"/>
            </form>
        </>
    )
}

export default AddPassword