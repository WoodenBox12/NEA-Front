import { useEffect, useState } from "react"


const Settings = () => {
  const [localSettings, setLocalSettings] = useState({})

  let localKdf = ["PBKDF2"]
  let remoteKdf = ["PBKDF2", "Argon2id"]




  useEffect(() => {
    
  }, [])

  const getSettings = async () => {

    // gets data from server and sets the local variables
  }

  const updateSettings = async (e) => {
    e.preventDefault()

    // needs to re-compute all keys and vaults

    // same system as change password

    // both need to be conceptualised to be secure

    // 2fa could make it secure (email or app)
  }

  return (
    <>
      <form onSubmit={updateSettings}>
        <div>
          <label htmlFor="localKdf">local KDF</label>
          <select className="button" id="localKdf" defaultValue={localKdf[0]}>
            
            {localKdf.map((e, index) => {
              return (
                <option key={index} value={e}>{e}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label htmlFor="remoteKdf">remote KDF</label>
          <select className="button" id="remoteKdf" defaultValue={remoteKdf[1]}>    
            {remoteKdf.map((e, index) => {
              return (
                <option key={index} value={e}>{e}</option>
              )
            })}
          </select>
        </div>
        <input className="button" type="submit" value="update settings"></input>
      </form>
    </>
  )
}

export default Settings