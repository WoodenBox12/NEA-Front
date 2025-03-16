import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Cookies from "universal-cookie"

import { extGetUrl, hashSite, isExtension, request, decryptVault, getDomain } from "../../Utility"
import Vaults from "./Vaults"

const Home = () => {
  const [vaults, setVaults] = useState([])
  const cookies = new Cookies(null)
    
  useEffect(() => {
    if (!isExtension) {// if website
      getAllVaults()
    }
    else {// if extension
      getVault()
    }
  }, [])

  const decryptWrapper = async (nonce, keySalt, data) => JSON.parse((await decryptVault(cookies.get("baseKey"), nonce, keySalt, data)).data)

  const getAllVaults = async () => {

  const data = await request("getallvaults", JSON.stringify({
    "sessionId":cookies.get("sessionId")
  }))

  if (data.success) {

    let temp = []

      data.vaults.forEach(e => {
        decryptWrapper(e.nonce, e.keySalt, e.data).then((data) => {

          temp.push(data)
          setVaults(temp)// calls way more than needed but works
        })
      })
    }
  }

  const getVault = async () => {

    const url = await extGetUrl()

    const hash = await hashSite(getDomain(url), cookies.get("email"))

    const data = await request("getvault", JSON.stringify({
      "sessionId":cookies.get("sessionId"),
      "siteHash":hash
    }))

    if (data.success) {
      const ok = await decryptWrapper(data.nonce, data.keySalt, data.data)
      setVaults([ok])
    }
  }

  if (!isExtension) {// on website
    return (
      <>
        <h1>web home</h1>
        <Vaults data={vaults}/>
        <Link className="button" to="/addpassword">add password</Link>
      </>
    )
  }
  return (
    <>
      <h1>extension home</h1>
      <Vaults data={vaults}/>
      <div style={{display: "inline-block"}}>
        <Link className="button" to="/addpassword">add password for this site</Link>
        <Link className="button" to="/settings">change settings here</Link>
      </div>
    </>
  )
}

export default Home