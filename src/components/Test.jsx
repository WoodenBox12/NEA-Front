import axios from 'axios'
import { Link, Outlet } from 'react-router-dom'


const Test = () => {
    function SendRequest() {
        axios.post("http://localhost:5000/createaccount",
            {
                "username": "olly",
                "password": "olly"
            },
            //headers go here when i know what the hell they are
        ).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <>
            <h1>hello</h1>
            <button onClick={SendRequest}>send request</button>
            <Link to="/">back to main</Link>
        </>
    )
}

export default Test