import Cookies from "js-cookie";
import { decrypt, encrypt } from "./crypto";

// Define types for the function parameters
interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  const encryptedValue = encrypt(value); // Assuming encrypt is properly typed elsewhere
  Cookies.set(name, encryptedValue, options);
}

export function getCookie(name: string): string | null {
  const encryptedValue = Cookies.get(name);
  return encryptedValue ? decrypt(encryptedValue) : null; // Assuming decrypt is properly typed elsewhere
}

export function removeCookie(name: string): void {
  Cookies.remove(name);
}
