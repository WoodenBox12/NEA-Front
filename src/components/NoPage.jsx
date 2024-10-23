import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const NoPage = () => {

    // mabye put cookie code in here



    return(
        <>
            <h1>404</h1>
            <p>{window.location.href} does not exist</p>
        </>
    )
}

export default NoPage