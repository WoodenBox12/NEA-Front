import { useState } from "react"

import Cookies from "universal-cookie"

import { isExtension, request, hashSite, encryptVault } from "../../Utility"

import "./Vaults.css"

const Vaults = ({data}) => {
  const [save, setSave] = useState(false)
  const cookies = new Cookies(null)

  const copyToClipboard = async (id) => {
    let tag = document.getElementById(id)
    tag.select();
    tag.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(tag.value)
  }

  const toggleVisibility = async (id) => {
    let tag = document.getElementById(id)
    if (tag.type == "password") {
      tag.type = "text"
    }
    else {
      tag.type = "password"
    }
  }

  const editMode = async (id) => {
    if (save) {
      // pop up confirmation if possible
      document.getElementById(id + "-1").readOnly = true
      document.getElementById(id + "-2").readOnly = true        
      document.getElementById(id + "-3").className = "button row img edit"

      let matches = id.match(/(?<num1>\d+)-(?<num2>\d+)-(?<num3>\d+)-(?<num4>\d+)/i)// for indexing

      let newData = data[matches[1]]
      const domain = Object.keys(newData)[matches[2]]
      const uri = Object.keys(newData[domain])[matches[3]]
      const index4 = matches[4]

      const username = document.getElementById(id + "-1").value
      const password = document.getElementById(id + "-2").value

      if ((newData[domain][uri][index4].username == username) && (newData[domain][uri][index4].password == password)) {
        setSave(!save)
        return
      }

      newData[domain][uri][index4].username = username
      newData[domain][uri][index4].password = password

      const siteHash = await hashSite(domain, cookies.get("email"))
      const vaultData = await encryptVault(cookies.get("baseKey"), JSON.stringify(newData))

      const response = await request("/updatevault", JSON.stringify({
        "sessionId": cookies.get("sessionId"),
        "siteHash": siteHash,
        "keySalt": vaultData.keySalt,
        "nonce": vaultData.nonce,
        "data": vaultData.data
      }))
    }
    else {
      document.getElementById(id + "-1").removeAttribute("readonly")
      document.getElementById(id + "-2").removeAttribute("readonly")
      document.getElementById(id + "-3").className = "button row img tick"
    }
        
    setSave(!save)
  }

  const remove = async (id) => {
    let matches = id.match(/(?<num1>\d+)-(?<num2>\d+)-(?<num3>\d+)-(?<num4>\d+)/i)// for indexing

    let newData = data[matches[1]]
    const domain = Object.keys(newData)[matches[2]]
    const uri = Object.keys(newData[domain])[matches[3]]
    const index4 = matches[4]
       
    const siteHash = await hashSite(domain, cookies.get("email"))
        
    newData[domain][uri].splice(index4,1)// deletes given entry

    if (newData[domain][uri].length == 0) {
      delete newData[domain][uri]// deletes uri if list is now empty
    }
    if (Object.keys(newData[domain]).length == 0) {
      delete newData[domain]
    }
    if (Object.keys(newData).length == 0) {//if hash collision there will be another domain

      const response = await request("/deletevault", JSON.stringify({
        "sessionId": cookies.get("sessionId"),
        "siteHash": siteHash
      }))
      document.getElementById(id.match(/^\d+-\d+/i)[0]).remove()
      return
    }

    const vaultData = await encryptVault(cookies.get("baseKey"), JSON.stringify(newData))

    const response = await request("/updatevault", JSON.stringify({
      "sessionId": cookies.get("sessionId"),
      "siteHash": siteHash,
      "keySalt": vaultData.keySalt,
      "nonce": vaultData.nonce,
      "data": vaultData.data
    }))
    console.log(response)
    document.getElementById(id).remove()
  }

  const rendered = data.map((e, index) => {
    // each call will usually just have 1 site but sometimes more based hash collision
    return Object.keys(e).map((key, index1) => {
      return (    
        <div key={`${index}-${index1}`} id={`${index}-${index1}`}>
          <details>
            <summary style={{all: "unset"}}>
              <div>
                <div className="button" style={{display: "inline-block"}}>
                  <div>
                    <img height="16" width="16" src={`https://icons.duckduckgo.com/ip3/${key}.ico`} />
                    <b>{key}</b>
                  </div>
                </div>
              </div>
            </summary>
            <div className="area" style={{display: "inline-block"}}>
              {Object.keys(e[key]).map((key2, index2) => {// sometimes has a pair in a list for 2 usernames on same url        
                return e[key][key2].map((item, index3) => (
                  <div key={index3} id={`${index}-${index1}-${index2}-${index3}`}>
                    <input id={`${index}-${index1}-${index2}-${index3}-1`} className="button row" defaultValue={item.username} type="text" readOnly/>
                    <button className="button row img copy" onClick={() => copyToClipboard(`${index}-${index1}-${index2}-${index3}-1`)} />

                    <input id={`${index}-${index1}-${index2}-${index3}-2`} className="button row" defaultValue={item.password} type="password" readOnly/>
                    <button className="button row img eye" onClick={() => toggleVisibility(`${index}-${index1}-${index2}-${index3}-2`)} />
                    <button className="button row img copy" onClick={() => copyToClipboard(`${index}-${index1}-${index2}-${index3}-2`)} />

                    <button id={`${index}-${index1}-${index2}-${index3}-3`}
                      className="button row img edit" onClick={() => editMode(`${index}-${index1}-${index2}-${index3}`)} />
                    <button className="button row img bin" onClick={() => remove(`${index}-${index1}-${index2}-${index3}`)} />
                  </div>
                ))
              })}
            </div>
          </details>
        </div>
      )
    }) 
  })

  return (
    <>
      <div>
        {rendered}
        <div>
          <p>{(data.length == 0) && ("passwords not found")}</p>
        </div>
      </div>
    </>
    )
}

export default Vaults