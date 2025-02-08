// the quick reload thing doesent allways work when changing these functions (i learnt that the hard way)

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
    const out = Array.prototype.map.call(keyArray, x => ('00' + x.toString(16)).slice(-2)).join('')
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
export const calculateAuth = async (email, password) => {
    const encoder = new TextEncoder()

    const encodedPassword = encoder.encode(email + password)
    const encodedSalt = encoder.encode("placeholder salt")

    const baseKey = await PBKDF2(encodedPassword, encodedSalt, 64, 1000000)
    const auth = await PBKDF2(hexToBuffer(bufferToHex(baseKey) + bufferToHex(encodedPassword)), encodedSalt, 64, 1000000)
    
    //console.log(bufferToHex(baseKey) + bufferToHex(encodedPassword))// same as py
    //console.log(bufferToHex(auth))// different to py

    return bufferToHex(auth)
}
export const calculateKey = async (email, password, encodedKeySalt) => {
    const encoder = new TextEncoder()

    const encodedPassword = encoder.encode(email + password)
    const encodedSalt = encoder.encode("placeholder salt")

    const baseKey = await PBKDF2(encodedPassword, encodedSalt, 64, 1000000)

    const key = await PBKDF2(baseKey, encodedKeySalt, 32, 1000000)
    return key
}
export const Request = (path, body) => {
    return fetch(`http://localhost:5000/${path}`, {
        method: "POST",
        body: body,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json()).catch(err => undefined)
}
export const encryptVault = async (email, password, data) => {

    
    const keySalt = await crypto.getRandomValues(new Uint8Array(32)).buffer
    const nonce = await crypto.getRandomValues(new Uint8Array(12)).buffer

    const key = await crypto.subtle.importKey(
        "raw", 
        await calculateKey(email, password, keySalt), // same output as encrypt input
        {"name": "AES-GCM"}, 
        false, 
        ["encrypt"]
    )

    const encoder = new TextEncoder()
    const encodedData = encoder.encode(data)

    const vault = await crypto.subtle.encrypt({name:"AES-GCM", iv:nonce}, key, encodedData)

    return {
        "vault":bufferToHex(vault),
        "nonce":bufferToHex(nonce),
        "keySalt":bufferToHex(keySalt)
    }
}
export const decryptVault = async (email, password, nonce, keySalt, vault) => {


    const key = await crypto.subtle.importKey(
        "raw", 
        await calculateKey(email, password, hexToBuffer(keySalt)),// same input as encrypt output
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
    const hash = crypto.subtle.digest("SHA-256", encodedData)
    console.log(hash)
    return hash
}