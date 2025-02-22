import { useState } from "react"

import Cookies from "universal-cookie"

const Import = () => {
    const [format, setFormat] = useState("")
    const cookies = new Cookies(null)

    


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(format)
    }

    return (// make a loadbar for x/x passwords imported
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="format">old password manager</label>
                    <select className="button" id="format" type="select" onBlur={(e) => {setFormat(e.target.value)}}>
                        <option value="generic">other</option>
                        <option value="chrome">chrome</option>
                        <option value="firefox">firefox</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="file">attach the file here</label>
                    <input id="file" type="file"/>
                </div>
                <div>
                    <input className="button" type="submit" />
                </div>
            </form>
        </>
    )
}

export default Import