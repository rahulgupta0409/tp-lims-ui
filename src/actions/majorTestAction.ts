import { requestHelper } from "../requestHelper";
import { API_URL, headers } from "../utils/constants";
import { getCookie } from "../utils/cookies";
import { ADD_MAJOR_LAB_TEST, SET_MAJOR_TESTS } from "./actionTypes";

// Define the type for the response from the "getAllMajorTests" API
interface MajorTestResponse {
  data: any[]; // Adjust the data structure based on your actual response
}

// Define the type for the callback function
type CallbackType = (res: any) => void;

// Action creator for setting major tests
const setMajorTest = (payload: MajorTestResponse) => {
  return {
    type: SET_MAJOR_TESTS,
    payload: payload,
  };
};

// Thunk action to fetch all major tests
export const getAllMajorTest = (callback?: CallbackType) => {
  return (dispatch: any) =>
    requestHelper.getRequest({
      url: `${API_URL}/majortest/getAllMajorTests`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onSuccess: (res: MajorTestResponse) => {
        dispatch(setMajorTest(res));
        callback && callback(res);
      },
      onError: (res: any) => {
        callback && callback(res);
      },
    });
};

// Action creator for adding a major lab test to the list
const updateMajorLabTestList = (payload: MajorTestResponse) => {
  return {
    type: ADD_MAJOR_LAB_TEST,
    payload: payload,
  };
};

// Thunk action to add a major lab test
export const addMajorLabTest = (data: any, callback?: CallbackType) => {
  const createdBy = getCookie("user");
  return (dispatch: any) =>
    requestHelper.postRequest({
      url: `${API_URL}/majortest/addMajorLabTest`,
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...data, createdBy }),
      onSuccess: (res: MajorTestResponse) => {
        dispatch(updateMajorLabTestList(res));
        callback && callback(res);
      },
      onError: (res: any) => {
        callback && callback(res);
      },
    });
};
