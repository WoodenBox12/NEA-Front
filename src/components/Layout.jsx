import axios from 'axios'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {

    // mabye put cookie code in here

    return(
        <>
            <Outlet></Outlet>
        </>
    )
}

export default Layout