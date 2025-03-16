import Cookies from "universal-cookie"

export const PBKDF2 = async (encodedPassword, encodedSalt, length, iter) => {
    
  const key = await crypto.subtle.importKey(
    "raw",
    encodedPassword,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  )
  const digest = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encodedSalt,
      iterations: iter,
      hash: "SHA-256",
    },
    key,
    length * 8
  )
  return digest
}
export const bufferToHex = (buffer) => {
  const keyArray = Array.from(new Uint8Array(buffer))
  const out = Array.prototype.map.call(keyArray, x => ("00" + x.toString(16)).slice(-2)).join("")
  return out
}
export const hexToBuffer = (hex) => {
  return new Uint8Array(hex.match(/[\dA-F]{2}/gi).map((s) => parseInt(s, 16))).buffer
}
export const calculateBaseKey = async (email, password) => {
  const encoder = new TextEncoder()

  const encodedPassword = encoder.encode(email + password)
  const encodedSalt = encoder.encode("placeholder salt")

  const baseKey = await PBKDF2(encodedPassword, encodedSalt, 64, 1000000)

  return bufferToHex(baseKey)
}
export const calculateAuth = async (email, password) => {// requires redoing
  const encoder = new TextEncoder()

  const encodedPassword = encoder.encode(email + password)
  const encodedSalt = encoder.encode("placeholder salt")

  const baseKey = await PBKDF2(encodedPassword, encodedSalt, 64, 1000000)
  const auth = await PBKDF2(hexToBuffer(bufferToHex(baseKey) + bufferToHex(encodedPassword)), encodedSalt, 64, 1000000)

  return bufferToHex(auth)
}
export const calculateKey = async (baseKey, encodedKeySalt) => {
  const key = await PBKDF2(hexToBuffer(baseKey), encodedKeySalt, 32, 1000000)
  return key
}
export const request = async (path, body, call=0) => {
  const data = await fetch(`http://localhost:5000/${path}`, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json())

  if (!data.success) {        
    if (data.message == "server encountered an error" && call < 1) {
      return request(path, body, call+1)
    }
    else if (data.message == "invalid session") {
      const cookies = new Cookies(null)
      cookies.remove("sessionId")
      cookies.remove("baseKey")
    }
  }
  return data  
}
export const encryptVault = async (baseKey, data) => {

  // possibly change to get from server
  const keySalt = await crypto.getRandomValues(new Uint8Array(32)).buffer
  const nonce = await crypto.getRandomValues(new Uint8Array(12)).buffer

  const key = await crypto.subtle.importKey(
    "raw", 
    await calculateKey(baseKey, keySalt), // same output as encrypt input
    {"name": "AES-GCM"}, 
    false, 
    ["encrypt"]
  )

  const encoder = new TextEncoder()
  const encodedData = encoder.encode(data)

  const vault = await crypto.subtle.encrypt({name:"AES-GCM", iv:nonce}, key, encodedData)

  return {
    "data":bufferToHex(vault),
    "nonce":bufferToHex(nonce),
    "keySalt":bufferToHex(keySalt)
  }
}
export const decryptVault = async (baseKey, nonce, keySalt, vault) => {

  const key = await crypto.subtle.importKey(
    "raw", 
    await calculateKey(baseKey, hexToBuffer(keySalt)),
    {"name": "AES-GCM"}, 
    false, 
    ["decrypt"]
  )

  const data = await crypto.subtle.decrypt({name:"AES-GCM", iv:hexToBuffer(nonce)}, key, hexToBuffer(vault))

  const decoder = new TextDecoder()

  return {
    "data":decoder.decode(data)
  }
}
export const hashSite = async (site, email) => {
  const encoder = new TextEncoder()
  const encodedData = encoder.encode(email + site)
  const hash = bufferToHex(await crypto.subtle.digest("SHA-256", encodedData))
  return hash
}
export const isExtension = (chrome.tabs != undefined)
export const extGetUrl = async () => {
  const Url = (await chrome.tabs.query({ active: true, currentWindow: true }))[0].url
  return getUrl(Url)
}
export const getUrl = (Uri) => Uri.match(/^(?<url>[^?]*)/i).groups.url

export const getDomain = (Uri) => Uri.match(/(https?:\/\/)(?<domain>[^:\/\?,]*)/i).groups.domain