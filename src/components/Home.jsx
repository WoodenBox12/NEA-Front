import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { hashSite, Request } from '../Utility'
import Vaults from './Vaults'

const Home = () => {
    const [vaults, setVaults] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(["sessionId","email"], {
        doNotParse: true,
    })
    const navigate = useNavigate()
    
    
    useEffect(() => {
        if (cookies["sessionId"] == undefined) {
            navigate("/signin")
        }  

        if (chrome.tabs == undefined) {
            Request("getallvaults", JSON.stringify({
                "sessionId":cookies["sessionId"]
            })).then((data) => {
                console.log(data)
                if (data.success) {
                    setVaults(data.vaults)
                }
            })
        }
        else {

        }

        


    }, [])

    const getAllVaults = () => {
        
    }

    const GetVault = () => {

        const tab = chrome.tabs.query({ active: true, currentWindow: true })

        const hostname = tab[0].url.match(/https?:\/\/(?<domain>[^:\/\?,]*)/i).groups.domain

        console.log(hostname)

        const hash = hashSite(hostname, cookies["email"])

        console.log(hash)

        Request("getvault", JSON.stringify({
            "sessionId":cookies["sessionId"],
            "siteHash":hash
        })).then((data) => {
            console.log(data)
            return data
        })
    }

    if (chrome.tabs == undefined) {// on website
        return (
            <>
                <h1>web home</h1>
                <Vaults data={vaults}/>
            </>
        )
    }
    return (
        <>
            <h1>extension home</h1>
            <Vaults data={vaults}/>
        </>
    )
}

export default Home