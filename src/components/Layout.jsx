import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {

    useEffect(() => {
        console.log("test")
    }, [])

    return(
        <>
            <Outlet></Outlet>
        </>
    )
}

export default Layout