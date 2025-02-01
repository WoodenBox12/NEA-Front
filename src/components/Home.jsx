import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["sessionId"], {
        doNotParse: true,
    });
    
    useEffect(() => {
        console.log(cookies["sessionId"])// prints twice for some reason
    }, [])

    if (cookies["sessionId"] == null) {
        return (
            <Navigate to="/signin" replace />
        )
    }

    return (
        <>
            <h1>home</h1>
        </>
    )
}

export default Home