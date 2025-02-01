import { useState } from 'react'
import { Link } from 'react-router-dom'

const NoPage = () => {

    // mabye put cookie code in here



    return(
        <>
            <h1>404</h1>
            <p>{window.location.href} does not exist</p>
            <Link className="button" to="/home">back to home</Link>
        </>
    )
}

export default NoPage