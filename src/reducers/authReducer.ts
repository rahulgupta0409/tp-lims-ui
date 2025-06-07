import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOADING,
} from "../actions/actionTypes";

// Define the state types
interface User {
  fullName: string;
  email: string;
  [key: string]: any; // You can extend this if there are more properties in the user object
}

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

export default function authReducer(state = initialState, action: Action): AuthState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload, // action.payload should be of type User
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload, // action.payload is a string (error message)
      };

    case LOADING:
      return {
        ...state,
        loading: action.payload, // action.payload is a boolean
      };

    default:
      return state;
  }
}
