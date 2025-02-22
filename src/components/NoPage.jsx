import { Link } from "react-router-dom"

const NoPage = () => {

    return(
        <>
            <h1>404</h1>
            <p>{window.location.href} does not exist</p>
            <Link className="button" to="/">back to home</Link>
        </>
    )
}

export default NoPage