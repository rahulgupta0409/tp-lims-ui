import CryptoJS from "crypto-js";

const SECRET_KEY = "ixihaid837e829duxn2b298wbxw9898wxd";

// Encrypt a string using AES encryption
export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

// Decrypt an AES-encrypted string
export function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
