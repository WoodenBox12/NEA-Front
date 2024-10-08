import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Test = () => {
    const [URL, setURL] = useState(`http://localhost:5000/createaccount`)
    const [JSONData, setJSON] = useState(`{
    "username": "olly",
    "password": "olly123"
}`)


    function SendRequest(e) {
        e.preventDefault()
        console.log(URL)
        console.log(JSONData)
        axios.post(URL, JSONData, {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            //headers go here when i know what the hell they are
        ).then((response) => {
            console.log(response)
            document.getElementById("response").innerHTML = JSON.stringify(response.data)
            
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <>
            <h1>REST api test page</h1>
            <form className="card" onSubmit={SendRequest}>
                <div>
                    <label htmlFor="url">post url:</label>
                    <br/>
                    <input className="button" id="url" type="text" defaultValue={URL} size="30" required onChange={(e) => {
                        console.log("trigger")
                        setURL(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="json">data:</label>
                    <br/>
                    <textarea className="button" id="json" rows="4" cols="30" defaultValue={JSONData} spellCheck="false" required onChange={(e) => setJSON(e.target.value)}/>
                </div>

                <input className="button" type="submit" value="send request"></input>
            </form>
            
            <div id="response" className="card"></div>

            <Link className="button" to="/">back to index</Link>
        </>
    )
}

export default Test