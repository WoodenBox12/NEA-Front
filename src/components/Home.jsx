import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["sessionId"], {
        doNotParse: true,
    });
    

    console.log(cookies["sessionId"])

    if (cookies["sessionId"] == null) {
        //this.props.history.push("/signup")
    }

    return (
        <>

        </>
    )
}

export default Home