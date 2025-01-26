import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { setCookie } from "../utils/cookies";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOADING,
} from "./actionTypes";

// Define types for the response and data
interface LoginData {
  username: string;
  password: string;
}

interface SignupData {
  username: string;
  password: string;
  email: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    fullName: string;
    email: string;
    [key: string]: any; // Extend if necessary with other user properties
  };
  headers: any
}

type CallbackType = (res: any) => void; // Callback type for success

// Action creator for successful login
const setLoginSession = (payload: LoginResponse) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

// Action creator for login request
const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

// Async action for login
export const loginSuccessAsync = (data: LoginData, callback?: CallbackType) => async (dispatch: any) => {
  try {
    dispatch(loginRequest());
    requestHelper.postRequest({
      url: `${API_URL}/auth/signin`,
      headers: headers,
      body: JSON.stringify(data),
      onSuccess: (res: LoginResponse) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("loginSuccess", "true");
        setCookie("__rT", res.refreshToken, { expires: 7 });
        setCookie("user", res.user.fullName);

        dispatch(
          setLoginSession({
            ...res,
            headers: { ...headers, Authorization: `Bearer ${res.token}` },
          })
        );
        callback && callback(res);
      },
      onError: (error: any) => {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
      },
    });
  } catch (error: any) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Async action for signup
export const signupSuccessAsync = (data: SignupData, callback?: CallbackType) => async (dispatch: any) => {
  try {
    dispatch({
      type: LOADING,
      payload: true,
    });
    requestHelper.postRequest({
      url: `${API_URL}/auth/signup`,
      headers: headers,
      body: JSON.stringify(data),
      onSuccess: (res: any) => {
        // Add any necessary logic for successful signup
        callback && callback(res);
      },
      onError: (error: any) => {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
      },
    });
  } catch (error: any) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};
