import CryptoJS from 'crypto-js'
const key = 'merzaya7abeb2lpi'; // change to your key
const iv = 'sinasinasisinaaa'; 
export default{
aesEncrypt:(txt)=>{
    const cipher = CryptoJS.AES.encrypt(txt, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC
    })

    return cipher.toString()
},
aesDecrypt:(txt)=>{
    const cipher = CryptoJS.AES.decrypt(txt, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC
    })

    return CryptoJS.enc.Utf8.stringify(cipher).toString()
}
}