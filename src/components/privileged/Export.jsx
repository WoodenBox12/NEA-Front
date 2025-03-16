
import Cookies from "universal-cookie"

import { decryptVault, request } from "../../Utility"

const Export = () => {
  const cookies = new Cookies(null)

  
  const makeCsv = async (e) => {
    const data = await request("getallvaults", JSON.stringify({
      "sessionId": cookies.get("sessionId")
    }))

    if (data.success) {
      console.log(data)

      let temp = []

      data.vaults.forEach(e => {
        decryptVault(cookies.get("baseKey"), e.nonce, e.keySalt, e.data).then((data) => {
          temp.push(JSON.parse(data.data))
        })
      })

      // write file from data in temp

      // make new utility function that returns serialised list of objects


    }
  }
  
  return (
    <>
      <button onClick={makeCsv}>export to csv</button>
    </>
  )
}

export default Export