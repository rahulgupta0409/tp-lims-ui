import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { getCookie } from "../utils/cookies";
import { ADD_MINOR_LAB_TEST, SET_MINOR_TESTS } from "./actionTypes";

// Define the type for the response from the "getAllMinorTests" API
interface MinorTestResponse {
  data: any[]; // Adjust the data structure based on your actual response
}

// Define the type for the callback function
type CallbackType = (res: any) => void;

// Action creator for setting minor tests
const setMinorTest = (payload: MinorTestResponse) => {
  return {
    type: SET_MINOR_TESTS,
    payload: payload,
  };
};

// Thunk action to fetch all minor tests
export const getAllMinorTest = (callback?: CallbackType) => {
  return (dispatch: any) =>
    requestHelper.getRequest({
      url: `${API_URL}/minortest/getAllMinorTests`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onSuccess: (res: MinorTestResponse) => {
        dispatch(setMinorTest(res));
        callback && callback(res);
      },
      onError: (res: any) => {
        callback && callback(res);
      },
    });
};

// Action creator for adding a minor lab test to the list
const updateMinorLabTestList = (payload: MinorTestResponse) => {
  return {
    type: ADD_MINOR_LAB_TEST,
    payload: payload,
  };
};

// Thunk action to add a minor lab test
export const addMinorLabTest = (data: any, callback?: CallbackType) => {
  const createdBy = getCookie("user");
  return (dispatch: any) =>
    requestHelper.postRequest({
      url: `${API_URL}/minortest/getAllMinorTests`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...data, createdBy }),
      onSuccess: (res: MinorTestResponse) => {
        dispatch(updateMinorLabTestList(res));
        callback && callback(res);
      },
      onError: (res: any) => {
        callback && callback(res);
      },
    });
};
