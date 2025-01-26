import { getCookie, setCookie } from "./cookies";

// Define the refresh function
const refresh = async (refreshToken: string): Promise<string> => {
  let token: string = "";
  try {
    const response = await fetch("http://localhost:8091/v1/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Ensure the response is in JSON format
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("data", data);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      token = data.token;
    } else {
      console.error("Refresh failed: No token received");
    }
  } catch (error) {
    console.error("Error during fetch:", error);
  }
  return token;
};

// Define the getJwtToken function
export async function getJwtToken(): Promise<string> {
  let token: string | null = localStorage.getItem("token");
  // console.log("Local token:", token);

  if (!token) {
    const refreshToken = getCookie("__rT") || "";
    // console.log("Refresh token from cookie:", refreshToken);

    token = await refresh(refreshToken);
  }

  return token || "";
}
